/* ============================================================================
   scienceWiki — MODÜL 1: Disiplinlerarası Kavram Ağı (Force-Directed Knowledge Graph)
   - 5 alan merkez düğümü (hub) + her madde için bir düğüm
   - Kenarlar: madde → dokunduğu her alan (bridges) + related[] bağlantıları
   - Köprü kavramlar (≥2 alan): çok halkalı, alan renklerinde parlayan yıldız düğümler
   - Kendi kuvvet simülasyonu: itme, yay, merkezleme, çarpışma (60 FPS, HiDPI canvas)
   - Sürükle, tekerlekle yakınlaş, boşlukta kaydır, komşuluk vurgusu, alan filtresi,
     arama; tıklayınca sağdan "Disiplinlerarası Köprü Paneli"
   ============================================================================ */
(function () {
  'use strict';

  const SW = window.SW;
  const DOMS = Object.keys(SW.DOMAINS);

  let root, cv, ctx, stage, panel, tip;
  let nodes = [], links = [], byId = new Map(), adj = new Map();
  let cam = { x: 0, y: 0, k: 1 };
  let W = 0, H = 0, dpr = 1;
  let alpha = 1, raf = 0, running = false, lastT = 0;
  let hover = null, selected = null, dragNode = null, panning = null, downPos = null, moved = false;
  const filter = new Set();
  let query = '';
  let built = false;

  /* --------------------------------------------------------------------------
     GRAF KURULUMU
     -------------------------------------------------------------------------- */
  function hubAnchor(i) {
    const a = -Math.PI / 2 + (i / DOMS.length) * Math.PI * 2;
    const R = Math.min(640, 260 + SW.articles.length * 8.5);
    return { x: Math.cos(a) * R, y: Math.sin(a) * R * 0.78 };
  }

  function buildGraph() {
    const old = new Map(nodes.map((n) => [n.id, n]));
    nodes = []; links = []; byId = new Map(); adj = new Map();
    DOMS.forEach((d, i) => {
      const an = hubAnchor(i);
      const prev = old.get('hub:' + d);
      const n = {
        id: 'hub:' + d, type: 'hub', domain: d, domains: [d], label: SW.domain(d).name,
        r: 30, ax: an.x, ay: an.y,
        x: prev ? prev.x : an.x, y: prev ? prev.y : an.y, vx: 0, vy: 0
      };
      nodes.push(n); byId.set(n.id, n);
    });
    SW.articles.forEach((a, i) => {
      const domains = (a.bridges && a.bridges.length ? a.bridges : [a.domain]).filter((d) => SW.DOMAINS[d]);
      const prev = old.get(a.id);
      // başlangıç: dokunduğu alan merkezlerinin ortalaması + küçük sapma
      let sx = 0, sy = 0;
      domains.forEach((d) => { const h = byId.get('hub:' + d); sx += h.ax; sy += h.ay; });
      sx /= Math.max(1, domains.length); sy /= Math.max(1, domains.length);
      const jit = (i * 2.399) % (Math.PI * 2);
      const n = {
        id: a.id, type: 'article', domain: a.domain, domains, label: a.title, article: a,
        bridge: domains.length >= 2,
        r: domains.length >= 2 ? 9 + Math.min(6, domains.length * 1.2) : 7,
        x: prev ? prev.x : sx * 0.75 + Math.cos(jit) * 60, y: prev ? prev.y : sy * 0.75 + Math.sin(jit) * 60, vx: 0, vy: 0
      };
      nodes.push(n); byId.set(n.id, n);
    });
    const seen = new Set();
    function link(s, t, kind) {
      if (!byId.has(s) || !byId.has(t) || s === t) return;
      const key = s < t ? s + '|' + t : t + '|' + s;
      if (seen.has(key)) return;
      seen.add(key);
      links.push({ s: byId.get(s), t: byId.get(t), kind });
      if (!adj.has(s)) adj.set(s, new Set());
      if (!adj.has(t)) adj.set(t, new Set());
      adj.get(s).add(t); adj.get(t).add(s);
    }
    SW.articles.forEach((a) => {
      const n = byId.get(a.id);
      n.domains.forEach((d) => link(a.id, 'hub:' + d, 'domain'));
      (a.related || []).forEach((rid) => link(a.id, rid, 'related'));
    });
    alpha = 1;
    built = true;
  }

  /* --------------------------------------------------------------------------
     KUVVET SİMÜLASYONU
     -------------------------------------------------------------------------- */
  function tick() {
    const n = nodes.length;
    // itme (Coulomb benzeri)
    for (let i = 0; i < n; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < n; j++) {
        const b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; d2 = 1; }
        const qa = a.type === 'hub' ? 3.2 : 1, qb = b.type === 'hub' ? 3.2 : 1;
        const f = (2300 * qa * qb) / d2 * alpha;
        const d = Math.sqrt(d2);
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
        // çarpışma
        const minD = a.r + b.r + 10;
        if (d < minD) {
          const push = (minD - d) / d * 0.5;
          a.vx -= dx * push * 0.5; a.vy -= dy * push * 0.5;
          b.vx += dx * push * 0.5; b.vy += dy * push * 0.5;
        }
      }
    }
    // yaylar
    links.forEach((l) => {
      const dx = l.t.x - l.s.x, dy = l.t.y - l.s.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const rest = l.kind === 'domain' ? (l.s.bridge || l.t.bridge ? 150 : 110) : 90;
      const k = l.kind === 'domain' ? 0.018 : 0.03;
      const f = (d - rest) * k * alpha;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      if (l.s !== dragNode) { l.s.vx += fx; l.s.vy += fy; }
      if (l.t !== dragNode) { l.t.vx -= fx; l.t.vy -= fy; }
    });
    // merkezleme + hub çapası
    nodes.forEach((nd) => {
      if (nd.type === 'hub') { nd.vx += (nd.ax - nd.x) * 0.02 * alpha; nd.vy += (nd.ay - nd.y) * 0.02 * alpha; }
      else { nd.vx -= nd.x * 0.0012 * alpha; nd.vy -= nd.y * 0.0012 * alpha; }
    });
    nodes.forEach((nd) => {
      if (nd === dragNode) { nd.vx = 0; nd.vy = 0; return; }
      nd.vx *= 0.82; nd.vy *= 0.82;
      const sp = Math.hypot(nd.vx, nd.vy);
      if (sp > 30) { nd.vx *= 30 / sp; nd.vy *= 30 / sp; }
      nd.x += nd.vx; nd.y += nd.vy;
    });
    alpha = Math.max(0.02, alpha * 0.992);
  }

  /* --------------------------------------------------------------------------
     GÖRÜNÜRLÜK (filtre + arama)
     -------------------------------------------------------------------------- */
  function norm(s) {
    return String(s || '').toLocaleLowerCase('tr-TR').replace(/[çğıöşü]/g, (c) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' }[c]));
  }
  function passesFilter(nd) {
    if (!filter.size) return true;
    if (nd.type === 'hub') return filter.has(nd.domain);
    if (filter.size === 1) return nd.domains.some((d) => filter.has(d));
    return [...filter].every((d) => nd.domains.includes(d));
  }
  function matchesQuery(nd) {
    if (!query) return true;
    if (nd.type === 'hub') return norm(nd.label).includes(query);
    const a = nd.article;
    return norm([a.title, a.summary, (a.tags || []).join(' ')].join(' ')).includes(query);
  }
  function visible(nd) { return passesFilter(nd); }

  /* --------------------------------------------------------------------------
     ÇİZİM
     -------------------------------------------------------------------------- */
  function resize() {
    if (!stage) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = stage.clientWidth || 800; H = stage.clientHeight || 560;
    cv.width = Math.floor(W * dpr); cv.height = Math.floor(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
  }
  function toScreen(x, y) { return [W / 2 + (x + cam.x) * cam.k, H / 2 + (y + cam.y) * cam.k]; }
  function toWorld(sx, sy) { return [(sx - W / 2) / cam.k - cam.x, (sy - H / 2) / cam.k - cam.y]; }

  function hexA(hex, a) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }

  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const labelQueue = [];
    const focus = hover || selected;
    const neigh = focus ? adj.get(focus.id) || new Set() : null;
    const isHot = (nd) => !focus || nd === focus || (neigh && neigh.has(nd.id));
    const q = !!query;

    // kenarlar
    links.forEach((l) => {
      const vis = visible(l.s) && visible(l.t);
      const hot = focus && (l.s === focus || l.t === focus);
      let a = vis ? (l.kind === 'related' ? 0.32 : 0.16) : 0.025;
      if (focus) a = hot ? 0.75 : a * 0.35;
      if (q && !(matchesQuery(l.s) || matchesQuery(l.t))) a *= 0.3;
      const [x1, y1] = toScreen(l.s.x, l.s.y), [x2, y2] = toScreen(l.t.x, l.t.y);
      const col = l.kind === 'domain' ? SW.domain((l.s.type === 'hub' ? l.s : l.t).domain).color : '#e2e8f0';
      ctx.strokeStyle = hexA(col, a);
      ctx.lineWidth = (hot ? 1.8 : 1) * (l.kind === 'related' ? 1.2 : 1);
      if (l.kind === 'related') ctx.setLineDash([4, 4]); else ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    });
    ctx.setLineDash([]);

    // düğümler
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.2);
    nodes.forEach((nd) => {
      const vis = visible(nd);
      let a = vis ? 1 : 0.08;
      if (focus && !isHot(nd)) a *= 0.22;
      if (q && !matchesQuery(nd)) a *= 0.18;
      const [sx, sy] = toScreen(nd.x, nd.y);
      const r = nd.r * Math.max(0.55, Math.min(1.6, cam.k));
      if (sx < -60 || sy < -60 || sx > W + 60 || sy > H + 60) return;
      ctx.globalAlpha = a;
      if (nd.type === 'hub') {
        const dom = SW.domain(nd.domain);
        const g = ctx.createRadialGradient(sx, sy, r * 0.2, sx, sy, r * 2.4);
        g.addColorStop(0, hexA(dom.color, 0.55)); g.addColorStop(1, hexA(dom.color, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, r * 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0b0f18'; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
        ctx.lineWidth = 3; ctx.strokeStyle = dom.color; ctx.shadowColor = dom.color; ctx.shadowBlur = 18;
        ctx.stroke(); ctx.shadowBlur = 0;
        ctx.font = `${Math.round(r * 0.9)}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(dom.icon, sx, sy + 1);
        ctx.font = '700 13px "Space Grotesk", Inter, sans-serif';
        ctx.fillStyle = dom.color;
        ctx.fillText(dom.name, sx, sy + r + 14);
      } else {
        const cols = nd.domains.map((d) => SW.domain(d).color);
        const main = SW.domain(nd.domain).color;
        // parıltı
        ctx.shadowColor = main; ctx.shadowBlur = nd.bridge ? 16 + pulse * 10 : 8;
        ctx.fillStyle = hexA(main, 0.9);
        if (nd.bridge) {
          // çok halkalı yıldız: her alan için bir halka + 5 uçlu yıldız çekirdek
          cols.forEach((c, i) => {
            ctx.strokeStyle = c; ctx.lineWidth = 1.8;
            ctx.beginPath(); ctx.arc(sx, sy, r + 3 + i * 3.2, 0, Math.PI * 2); ctx.stroke();
          });
          ctx.beginPath();
          for (let k = 0; k < 10; k++) {
            const ang = -Math.PI / 2 + (k * Math.PI) / 5 + t * 0.15;
            const rr = k % 2 === 0 ? r : r * 0.48;
            const px = sx + Math.cos(ang) * rr, py = sy + Math.sin(ang) * rr;
            if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = '#fff7e6';
          ctx.fill();
        } else {
          ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.shadowBlur = 0;
        if (nd === selected) {
          ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(sx, sy, r + 6 + cols.length * 3.2, 0, Math.PI * 2); ctx.stroke();
        }
        const must = nd === hover || nd === selected;
        const want = must || (focus && isHot(nd)) || (q && matchesQuery(nd)) || (nd.bridge && cam.k >= 0.7) || cam.k >= 1.35;
        if (want && vis && a > 0.15) {
          const pri = must ? 0 : (focus && isHot(nd)) || (q && matchesQuery(nd)) ? 1 : nd.bridge ? 2 : 3;
          labelQueue.push({ nd, sx, sy: sy + r + 5 + (nd.bridge ? cols.length * 3 : 0), pri, a });
        }
      }
      ctx.globalAlpha = 1;
    });

    // etiketler: önceliğe göre, çakışanları atla (üzerine gelinen/seçili her zaman çizilir)
    labelQueue.sort((x, y) => x.pri - y.pri);
    const placed = [];
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    labelQueue.forEach((L) => {
      const nd = L.nd;
      ctx.font = `${nd.bridge ? 700 : 600} ${nd === hover ? 13 : 11.5}px Inter, sans-serif`;
      const label = nd.label.length > 34 ? nd.label.slice(0, 32) + '…' : nd.label;
      const w = ctx.measureText(label).width + 8, h = 16;
      const box = { x: L.sx - w / 2, y: L.sy, w, h };
      const hit = placed.some((p) => box.x < p.x + p.w && box.x + box.w > p.x && box.y < p.y + p.h && box.y + box.h > p.y);
      if (hit && L.pri > 0) return;
      placed.push(box);
      ctx.globalAlpha = Math.max(0.35, L.a);
      ctx.fillStyle = 'rgba(6, 8, 13, 0.78)';
      ctx.fillRect(box.x, box.y, w, h);
      ctx.fillStyle = nd.bridge ? '#fde68a' : '#e2e8f0';
      ctx.fillText(label, L.sx, L.sy + 2);
    });
    ctx.globalAlpha = 1;
  }

  function fitView() {
    if (!nodes.length) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    nodes.forEach((n) => { x0 = Math.min(x0, n.x - n.r); y0 = Math.min(y0, n.y - n.r); x1 = Math.max(x1, n.x + n.r); y1 = Math.max(y1, n.y + n.r); });
    const w = x1 - x0 + 140, h = y1 - y0 + 140;
    cam.k = Math.max(0.3, Math.min(1.2, Math.min(W / w, H / h)));
    cam.x = -(x0 + x1) / 2; cam.y = -(y0 + y1) / 2;
  }
  let userMoved = false;

  function loop(ts) {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    const t = ts / 1000;
    if (alpha > 0.021 || dragNode) tick();
    else if (Math.floor(t * 10) !== Math.floor(lastT * 10)) tick();
    lastT = t;
    draw(t);
  }

  /* --------------------------------------------------------------------------
     ETKİLEŞİM
     -------------------------------------------------------------------------- */
  function pick(sx, sy) {
    let best = null, bd = Infinity;
    nodes.forEach((nd) => {
      if (!visible(nd)) return;
      const [x, y] = toScreen(nd.x, nd.y);
      const r = nd.r * Math.max(0.55, Math.min(1.6, cam.k)) + 8;
      const d = Math.hypot(x - sx, y - sy);
      if (d < r && d < bd) { best = nd; bd = d; }
    });
    return best;
  }
  function local(e) { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }

  function wireCanvas() {
    cv.addEventListener('pointerdown', (e) => {
      const [sx, sy] = local(e);
      downPos = [sx, sy]; moved = false;
      const nd = pick(sx, sy);
      cv.setPointerCapture(e.pointerId);
      if (nd) { dragNode = nd; alpha = Math.max(alpha, 0.35); }
      else panning = { sx, sy, cx: cam.x, cy: cam.y };
      userMoved = true;
    });
    cv.addEventListener('pointermove', (e) => {
      const [sx, sy] = local(e);
      if (downPos && Math.hypot(sx - downPos[0], sy - downPos[1]) > 4) moved = true;
      if (dragNode) {
        const [wx, wy] = toWorld(sx, sy);
        dragNode.x = wx; dragNode.y = wy;
        alpha = Math.max(alpha, 0.25);
      } else if (panning) {
        cam.x = panning.cx + (sx - panning.sx) / cam.k;
        cam.y = panning.cy + (sy - panning.sy) / cam.k;
      } else {
        const nd = pick(sx, sy);
        if (nd !== hover) { hover = nd; cv.style.cursor = nd ? 'pointer' : 'grab'; }
        showTip(nd, sx, sy);
      }
    });
    const end = (e) => {
      const [sx, sy] = local(e);
      if (!moved) {
        const nd = pick(sx, sy);
        if (nd) openPanel(nd); else if (!panning || !moved) closePanel();
      }
      if (dragNode && dragNode.type === 'hub') { dragNode.ax = dragNode.x; dragNode.ay = dragNode.y; }
      dragNode = null; panning = null; downPos = null;
    };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', () => { dragNode = null; panning = null; downPos = null; });
    cv.addEventListener('pointerleave', () => { hover = null; showTip(null); });
    cv.addEventListener('wheel', (e) => {
      e.preventDefault();
      const [sx, sy] = local(e);
      const [wx, wy] = toWorld(sx, sy);
      userMoved = true;
      cam.k = Math.max(0.25, Math.min(3.2, cam.k * (e.deltaY > 0 ? 0.9 : 1.11)));
      const [nx, ny] = toWorld(sx, sy);
      cam.x += nx - wx; cam.y += ny - wy;
    }, { passive: false });
  }

  function showTip(nd, sx, sy) {
    if (!tip) return;
    if (!nd) { tip.hidden = true; return; }
    tip.hidden = false;
    if (nd.type === 'hub') {
      const cnt = nodes.filter((x) => x.type === 'article' && x.domains.includes(nd.domain)).length;
      tip.innerHTML = `<b style="color:${SW.domain(nd.domain).color}">${SW.domain(nd.domain).icon} ${SW.esc(nd.label)}</b><small>${cnt} madde · ${SW.esc(SW.domain(nd.domain).lab)}</small>`;
    } else {
      tip.innerHTML = `<b>${SW.esc(nd.label)}</b><small>${nd.domains.map((d) => SW.domain(d).icon).join(' ')}${nd.bridge ? ' · köprü kavram' : ''}</small>`;
    }
    tip.style.left = Math.min(W - 230, sx + 14) + 'px';
    tip.style.top = Math.max(6, sy - 10) + 'px';
  }

  /* --------------------------------------------------------------------------
     KÖPRÜ PANELİ
     -------------------------------------------------------------------------- */
  function simFor(a, d) {
    const lab = SW.domain(d).lab;
    return (a.sim || []).find((s) => s.lab === lab);
  }
  function openPanel(nd) {
    selected = nd;
    if (nd.type === 'hub') {
      const dom = SW.domain(nd.domain), lab = SW.lab(dom.lab) || {};
      const items = SW.articles.filter((a) => (a.bridges || [a.domain]).includes(nd.domain));
      panel.innerHTML = `
        <button class="kg-close" data-close aria-label="Kapat">✕</button>
        <div class="kg-ph" style="--c:${dom.color}">
          <span class="kg-ph-icon">${dom.icon}</span>
          <div><small>BİLİM DALI · ${SW.esc(dom.lab)}</small><h3>${SW.esc(dom.name)}</h3></div>
        </div>
        <p class="kg-sum">${SW.esc(lab.desc || '')}</p>
        <div class="kg-actions">
          <button class="lp-btn primary" style="--c:${dom.color}" data-open="${dom.lab}">Laboratuvara Git ↗</button>
          <button class="lp-btn" style="--c:${dom.color}" data-embed="${dom.lab}">▶ Sayfa İçi Önizle</button>
        </div>
        <div class="kg-sec-title">${items.length} madde</div>
        <div class="kg-list">${items.map((a) => `
          <button class="kg-row" data-article="${SW.esc(a.id)}">
            <span>${(a.bridges || [a.domain]).map((d) => `<i style="background:${SW.domain(d).color}"></i>`).join('')}</span>
            <b>${SW.esc(a.title)}</b>
          </button>`).join('')}</div>`;
    } else {
      const a = nd.article;
      const doms = nd.domains;
      panel.innerHTML = `
        <button class="kg-close" data-close aria-label="Kapat">✕</button>
        <div class="kg-ph" style="--c:${SW.domain(a.domain).color}">
          <span class="kg-ph-icon">${nd.bridge ? '✦' : SW.domain(a.domain).icon}</span>
          <div><small>${nd.bridge ? 'DİSİPLİNLERARASI KÖPRÜ KAVRAM' : 'KAVRAM'} · ${doms.length} alan</small><h3>${SW.esc(a.title)}</h3></div>
        </div>
        <div class="kg-chips">${doms.map((d) => `<span class="dom-chip" style="--c:${SW.domain(d).color}">${SW.domain(d).icon} ${SW.esc(SW.domain(d).name)}</span>`).join('')}</div>
        <p class="kg-sum">${SW.renderInline(a.summary || '')}</p>
        <button class="action-btn kg-read" data-article="${SW.esc(a.id)}">📖 Maddeyi Oku →</button>
        <div class="kg-sec-title">Beş bilimde bu kavram</div>
        ${doms.map((d) => {
          const dom = SW.domain(d);
          const text = (a.perDomain && a.perDomain[d]) || (d === a.domain ? a.summary : '');
          const sim = simFor(a, d);
          return `
          <div class="kg-dcard" style="--c:${dom.color}">
            <div class="kg-dhead"><span>${dom.icon}</span><b>${SW.esc(dom.name)}</b><small>${SW.esc(dom.lab)}</small></div>
            ${text ? `<p>${SW.renderInline(text)}</p>` : ''}
            <div class="kg-actions">
              ${sim
                ? `<button class="lp-btn primary" style="--c:${dom.color}" data-open="${sim.lab}" data-hash="${SW.esc(sim.hash || '')}">Canlı Simülasyonu Aç ↗</button>
                   <button class="lp-btn" style="--c:${dom.color}" data-embed="${sim.lab}" data-hash="${SW.esc(sim.hash || '')}">▶ Sayfa İçi Önizle</button>
                   <small class="kg-simlabel">${SW.esc(sim.label || '')}</small>`
                : `<button class="lp-btn" style="--c:${dom.color}" data-open="${dom.lab}">${SW.esc(dom.lab)} ↗</button>`}
            </div>
          </div>`;
        }).join('')}
        ${(a.related || []).filter((id) => SW.getArticle(id)).length ? `
          <div class="kg-sec-title">İlişkili kavramlar</div>
          <div class="kg-chips">${(a.related || []).map((id) => SW.getArticle(id)).filter(Boolean).map((r) => `<button class="kg-rel" data-focus="${SW.esc(r.id)}">${SW.domain(r.domain).icon} ${SW.esc(r.title)}</button>`).join('')}</div>` : ''}`;
    }
    panel.classList.add('open');
    panel.scrollTop = 0;
  }
  function closePanel() {
    selected = null;
    panel.classList.remove('open');
  }
  function focusNode(id) {
    const nd = byId.get(id);
    if (!nd) return;
    cam.x = -nd.x; cam.y = -nd.y;
    cam.k = Math.max(cam.k, 1.1);
    openPanel(nd);
  }

  /* --------------------------------------------------------------------------
     DOM
     -------------------------------------------------------------------------- */
  function renderFilters() {
    const box = root.querySelector('#kgFilters');
    box.innerHTML = DOMS.map((d) => {
      const dom = SW.domain(d);
      return `<button class="kg-fchip${filter.has(d) ? ' on' : ''}" data-dom="${d}" style="--c:${dom.color}">${dom.icon} ${SW.esc(dom.name)}</button>`;
    }).join('');
    const hint = root.querySelector('#kgFilterHint');
    if (!filter.size) hint.textContent = 'Tüm alanlar · iki veya daha fazla alan seçin → yalnızca hepsine dokunan ortak kavramlar';
    else if (filter.size === 1) hint.textContent = `${SW.domain([...filter][0]).name} ile ilgili tüm kavramlar`;
    else hint.textContent = `Yalnızca ${[...filter].map((d) => SW.domain(d).name).join(' + ')} alanlarının HEPSİNE dokunan ortak kavramlar: ${nodes.filter((n) => n.type === 'article' && passesFilter(n)).length}`;
  }
  function renderStats() {
    const el = root.querySelector('#kgStats');
    if (!el) return;
    const arts = nodes.filter((n) => n.type === 'article');
    el.innerHTML = `<span><b>${arts.length}</b> kavram</span><span><b>${arts.filter((n) => n.bridge).length}</b> köprü</span><span><b>${links.length}</b> bağlantı</span>`;
  }

  function render(rootEl) {
    root = rootEl;
    root.innerHTML = `
      <div class="kg-wrap">
        <div class="kg-toolbar">
          <div class="kg-title"><b>🕸️ Disiplinlerarası Kavram Ağı</b><span id="kgStats" class="kg-stats"></span></div>
          <div class="kg-filters" id="kgFilters"></div>
          <input id="kgSearch" class="bio-input kg-search" type="search" placeholder="Ağda ara… (entropi, foton, DNA)" />
          <button class="icon-btn" id="kgReset" title="Görünümü ve filtreleri sıfırla">↺ Sıfırla</button>
        </div>
        <div class="kg-hint" id="kgFilterHint"></div>
        <div class="kg-stage" id="kgStage">
          <canvas id="kgCanvas"></canvas>
          <div class="kg-tip" id="kgTip" hidden></div>
          <div class="kg-legend">
            <span><i class="lg-hub"></i>Bilim dalı</span>
            <span><i class="lg-node"></i>Kavram</span>
            <span><i class="lg-star">✦</i>Köprü kavram (çok halkalı)</span>
            <span><i class="lg-dash"></i>İlişkili kavram</span>
            <span class="lg-help">🖱️ sürükle · tekerlek: yakınlaş · boşluk: kaydır · tıkla: köprü paneli</span>
          </div>
          <aside class="kg-panel" id="kgPanel" aria-label="Disiplinlerarası Köprü Paneli"></aside>
        </div>
      </div>`;
    stage = root.querySelector('#kgStage');
    cv = root.querySelector('#kgCanvas');
    ctx = cv.getContext('2d');
    panel = root.querySelector('#kgPanel');
    tip = root.querySelector('#kgTip');
    new ResizeObserver(resize).observe(stage);
    resize();
    wireCanvas();

    root.querySelector('#kgFilters').addEventListener('click', (e) => {
      const b = e.target.closest('[data-dom]');
      if (!b) return;
      if (filter.has(b.dataset.dom)) filter.delete(b.dataset.dom); else filter.add(b.dataset.dom);
      renderFilters();
    });
    root.querySelector('#kgSearch').addEventListener('input', (e) => {
      query = norm(e.target.value.trim());
      if (query) {
        const hits = nodes.filter((n) => matchesQuery(n));
        if (hits.length === 1) { cam.x = -hits[0].x; cam.y = -hits[0].y; }
      }
    });
    root.querySelector('#kgReset').addEventListener('click', () => {
      filter.clear(); query = ''; root.querySelector('#kgSearch').value = '';
      closePanel(); renderFilters(); userMoved = false; fitView();
    });
    panel.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) { closePanel(); return; }
      const f = e.target.closest('[data-focus]');
      if (f) focusNode(f.dataset.focus);
    });
  }

  function fitK() { return Math.max(0.45, Math.min(1.05, Math.min(W / 900, H / 640))); }

  let pendingFocus = null;
  // Başka görünümlerden: kavram ağına geç ve düğüme odaklan
  SW.graphFocus = (id) => {
    pendingFocus = id;
    if ((location.hash || '#/graph').replace(/^#\/?/, '').split('/')[0] === 'graph' && built) { pendingFocus = null; focusNode(id); }
    else SW.go('#/graph');
  };
  // Test/otomasyon yardımcısı: düğümün ekran koordinatı
  SW._kgScreen = (id) => {
    const n = byId.get(id);
    if (!n || !cv) return null;
    const [x, y] = toScreen(n.x, n.y);
    const r = cv.getBoundingClientRect();
    return { x: r.left + x, y: r.top + y };
  };

  SW.registerView('graph', {
    init(rootEl) {
      render(rootEl);
      buildGraph();
      cam.k = fitK();
      renderFilters();
      renderStats();
      window.addEventListener('sw:articles', () => {
        buildGraph(); renderFilters(); renderStats();
        for (let i = 0; i < 120; i++) tick();
        if (!userMoved) fitView();
      });
      // ilk yerleşim: görünmeden önce simülasyonu ısıt, sonra ekrana sığdır
      for (let i = 0; i < 220; i++) tick();
      fitView();
      alpha = Math.max(alpha, 0.25);
    },
    show() {
      if (!built) buildGraph();
      const firstSize = !W;
      resize();
      if (firstSize || !userMoved) fitView();
      if (!running) { running = true; raf = requestAnimationFrame(loop); }
      if (pendingFocus) { const id = pendingFocus; pendingFocus = null; focusNode(id); }
    },
    hide() {
      running = false;
      cancelAnimationFrame(raf);
    }
  });
})();
