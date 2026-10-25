/* ============================================================================
   scienceWiki — MODÜL 3: Ansiklopedi
   - Liste: alan filtreleri, arama, yalnızca köprü kavramlar, etiketler
   - Okuyucu: 5 sekmeli akademik şablon
       💡 Sezgisel Anlatım · 🏛️ Keşif Tarihi · 📐 Matematik & Hesaplayıcı
       🔬 Canlı Simülasyon (sayfa içi iframe) · 🔗 Bağlantılar & Kaynakça
   - Formüldeki semboller: değişken çipleri + (mümkünse) formül içinde üzerine gelince açıklama
   ============================================================================ */
(function () {
  'use strict';

  const SW = window.SW;
  const DOMS = Object.keys(SW.DOMAINS);
  const TABS = [
    ['intuitive', '💡 Sezgisel Anlatım'],
    ['history', '🏛️ Keşif Tarihi'],
    ['math', '📐 Matematik & Hesaplayıcı'],
    ['sim', '🔬 Canlı Simülasyon'],
    ['links', '🔗 Bağlantılar & Kaynakça']
  ];

  let root, tipEl;
  const st = { doms: new Set(), q: '', bridgesOnly: false, current: null, tab: 'intuitive', mode: 'list' };

  const esc = SW.esc;
  function norm(s) {
    return String(s || '').toLocaleLowerCase('tr-TR').replace(/[çğıöşüâîû]/g, (c) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' }[c]));
  }
  function strip(html) { return String(html || '').replace(/<[^>]+>/g, ''); }
  function domChip(d) {
    const dom = SW.domain(d);
    return `<span class="dom-chip" style="--c:${dom.color}">${dom.icon} ${esc(dom.name)}</span>`;
  }

  /* --------------------------------------------------------------------------
     LİSTE
     -------------------------------------------------------------------------- */
  function filtered() {
    const q = norm(st.q.trim());
    return SW.articles.filter((a) => {
      const br = a.bridges || [a.domain];
      if (st.bridgesOnly && br.length < 2) return false;
      if (st.doms.size && ![...st.doms].every((d) => br.includes(d))) return false;
      if (!q) return true;
      const hay = norm([a.title, a.summary, (a.tags || []).join(' '), (a.scientists || []).map((s) => s.name).join(' ')].join(' '));
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }

  function renderList() {
    st.mode = 'list';
    const list = filtered();
    const counts = {};
    DOMS.forEach((d) => { counts[d] = SW.articles.filter((a) => (a.bridges || [a.domain]).includes(d)).length; });
    root.innerHTML = `
      <div class="ar-list-wrap">
        <div class="ar-toolbar">
          <div class="ar-title"><b>📚 Ansiklopedi</b><span>${SW.articles.length} madde · ${SW.articles.filter((a) => (a.bridges || []).length > 1).length} köprü kavram</span></div>
          <div class="ar-filters">
            ${DOMS.map((d) => { const dom = SW.domain(d); return `<button class="kg-fchip${st.doms.has(d) ? ' on' : ''}" data-fdom="${d}" style="--c:${dom.color}">${dom.icon} ${esc(dom.name)} <small>${counts[d]}</small></button>`; }).join('')}
            <button class="kg-fchip${st.bridgesOnly ? ' on' : ''}" data-fbridge style="--c:#fde68a">✦ Yalnızca köprüler</button>
          </div>
          <input class="bio-input ar-search" id="arSearch" type="search" placeholder="Madde, etiket ya da bilim insanı ara…" value="${esc(st.q)}" />
        </div>
        <p class="ar-hint">${st.doms.size > 1 ? `Seçili alanların hepsine dokunan maddeler: ${list.length}` : `${list.length} madde gösteriliyor`}</p>
        <div class="ar-grid">
          ${list.length ? list.map((a) => {
            const br = a.bridges || [a.domain];
            const dom = SW.domain(a.domain);
            return `
            <button class="ar-card" data-article="${esc(a.id)}" style="--c:${dom.color}">
              <div class="ar-card-top">
                <span class="ar-card-icon">${br.length > 1 ? '✦' : dom.icon}</span>
                <div class="ar-card-doms">${br.map((d) => `<i title="${esc(SW.domain(d).name)}" style="background:${SW.domain(d).color}"></i>`).join('')}</div>
                ${br.length > 1 ? `<span class="ar-bridge">köprü · ${br.length} alan</span>` : ''}
              </div>
              <h3>${esc(a.title)}</h3>
              <p>${esc(strip(a.summary))}</p>
              <div class="ar-tags">${(a.tags || []).slice(0, 4).map((t) => `<span>#${esc(t)}</span>`).join('')}</div>
            </button>`;
          }).join('') : '<p class="ar-empty">Bu filtreyle eşleşen madde yok.</p>'}
        </div>
      </div>`;
    const inp = root.querySelector('#arSearch');
    inp.addEventListener('input', (e) => {
      st.q = e.target.value;
      const pos = e.target.selectionStart;
      renderList();
      const n = root.querySelector('#arSearch');
      n.focus(); n.setSelectionRange(pos, pos);
    });
    root.querySelectorAll('[data-fdom]').forEach((b) => b.addEventListener('click', () => {
      const d = b.dataset.fdom;
      if (st.doms.has(d)) st.doms.delete(d); else st.doms.add(d);
      renderList();
    }));
    root.querySelector('[data-fbridge]').addEventListener('click', () => { st.bridgesOnly = !st.bridgesOnly; renderList(); });
  }

  /* --------------------------------------------------------------------------
     OKUYUCU
     -------------------------------------------------------------------------- */
  function renderReader(id) {
    st.mode = 'reader';
    const a = SW.getArticle(id);
    if (!a) {
      root.innerHTML = `
        <div class="ar-reader">
          <button class="icon-btn ar-back" data-back>← Ansiklopediye dön</button>
          <div class="lab-soon-card"><h4>Madde bulunamadı</h4><p>"${esc(id)}" adlı madde henüz yok. Ctrl + K ile arayabilirsiniz.</p></div>
        </div>`;
      root.querySelector('[data-back]').addEventListener('click', () => SW.go('#/articles'));
      return;
    }
    if (st.current !== id) { st.current = id; st.tab = 'intuitive'; }
    const br = a.bridges || [a.domain];
    const dom = SW.domain(a.domain);
    root.innerHTML = `
      <div class="ar-reader" style="--c:${dom.color}">
        <div class="ar-head">
          <div class="ar-crumbs">
            <button class="icon-btn ar-back" data-back>← Ansiklopedi</button>
            <span>${dom.icon} ${esc(dom.name)}</span><span>›</span><span>${esc(a.title)}</span>
          </div>
          <h1>${esc(a.title)}</h1>
          <div class="ar-head-chips">${br.map(domChip).join('')}${br.length > 1 ? '<span class="ar-bridge">✦ disiplinlerarası köprü kavram</span>' : ''}</div>
          <p class="ar-summary">${SW.renderInline(a.summary || '')}</p>
          ${(a.scientists || []).length ? `<div class="ar-sci-strip">${a.scientists.map((s) => `<span>👤 <b>${esc(s.name)}</b>${s.year ? ` · ${esc(s.year)}` : ''}</span>`).join('')}</div>` : ''}
        </div>
        <div class="ar-tabs" role="tablist">
          ${TABS.map(([k, label]) => `<button class="ar-tab${st.tab === k ? ' active' : ''}" data-tab="${k}" role="tab">${label}</button>`).join('')}
        </div>
        <div class="ar-body" id="arBody"></div>
      </div>`;
    root.querySelector('[data-back]').addEventListener('click', () => SW.go('#/articles'));
    root.querySelectorAll('.ar-tab').forEach((b) => b.addEventListener('click', () => {
      st.tab = b.dataset.tab;
      root.querySelectorAll('.ar-tab').forEach((x) => x.classList.toggle('active', x === b));
      renderTab(a);
    }));
    renderTab(a);
    window.scrollTo({ top: 0 });
  }

  function renderTab(a) {
    const body = root.querySelector('#arBody');
    if (!body) return;
    const t = st.tab;
    if (t === 'intuitive') {
      const br = a.bridges || [a.domain];
      body.innerHTML = `
        <div class="ar-grid2">
          <article class="theory-card ar-prose">${SW.renderInline(a.intuitive || '<p>Bu maddenin sezgisel anlatımı hazırlanıyor.</p>')}</article>
          <aside class="ar-side">
            <div class="hud-section">
              <div class="hud-title"><span>Bu kavram şu bilimlerde</span></div>
              <div class="kg-chips">${br.map(domChip).join('')}</div>
            </div>
            ${(a.tags || []).length ? `<div class="hud-section"><div class="hud-title"><span>Etiketler</span></div><div class="ar-tags">${a.tags.map((x) => `<span>#${esc(x)}</span>`).join('')}</div></div>` : ''}
            ${(a.sim || []).length ? `<div class="hud-section"><div class="hud-title"><span>Hemen dene</span></div>${a.sim.map((s, i) => simQuick(s, i)).join('')}</div>` : ''}
          </aside>
        </div>`;
    } else if (t === 'history') {
      body.innerHTML = `
        <div class="ar-grid2">
          <article class="theory-card ar-prose">${SW.renderInline(a.history || '<p>Keşif tarihi hazırlanıyor.</p>')}</article>
          <aside class="ar-side">
            ${(a.scientists || []).map((s) => `
              <div class="ar-sci-card">
                <div class="ar-sci-avatar">${esc((s.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join(''))}</div>
                <div><b>${esc(s.name)}</b><small>${esc(s.year || '')}</small><p>${SW.renderInline(s.note || '')}</p></div>
              </div>`).join('') || '<p class="ar-hint">Bilim insanı kartı yok.</p>'}
          </aside>
        </div>`;
    } else if (t === 'math') {
      renderMath(a, body);
    } else if (t === 'sim') {
      renderSim(a, body);
    } else {
      renderLinks(a, body);
    }
  }

  function simQuick(s, i) {
    const lab = SW.lab(s.lab);
    if (!lab) return '';
    return `<div class="ar-quick" style="--c:${lab.color}">
      <span>${lab.icon} <b>${esc(s.label || lab.title)}</b></span>
      <span class="kg-actions">
        <button class="lp-btn primary" style="--c:${lab.color}" data-embed="${esc(s.lab)}" data-hash="${esc(s.hash || '')}">▶ Önizle</button>
        <button class="lp-btn" style="--c:${lab.color}" data-open="${esc(s.lab)}" data-hash="${esc(s.hash || '')}">↗</button>
      </span></div>`;
  }

  /* --- Matematik sekmesi ------------------------------------------------- */
  function plainOf(tex) {
    // bir sembolün KaTeX çıktısındaki düz metnini bul (eşleştirme için)
    if (!window.katex) return '';
    try {
      const div = document.createElement('div');
      div.innerHTML = window.katex.renderToString(tex, { throwOnError: false });
      const h = div.querySelector('.katex-html');
      return (h ? h.textContent : div.textContent).replace(/\s+/g, '');
    } catch (_) { return ''; }
  }
  function tipText(v) {
    return [v.name, v.unit && v.unit !== '—' ? `birim: ${v.unit}` : '', v.value ? `değer: ${v.value}` : ''].filter(Boolean).join(' · ');
  }
  function hotSymbols(box, vars) {
    const html = box.querySelector('.katex-html');
    if (!html) return;
    vars.forEach((v) => {
      const target = plainOf(v.sym);
      if (!target || target.length > 6) return;
      const cands = Array.from(html.querySelectorAll('.mord, .mop, .minner')).filter((el) => el.textContent.replace(/\s+/g, '') === target && !el.closest('.sw-hot'));
      // en dıştaki eşleşmeler
      cands.filter((el) => !cands.some((o) => o !== el && o.contains(el))).forEach((el) => {
        el.classList.add('sw-hot');
        el.dataset.tip = `${v.sym ? '' : ''}${tipText(v)}`;
        el.dataset.tipSym = v.sym;
      });
    });
  }

  function renderMath(a, body) {
    const fs = a.formulas || [];
    body.innerHTML = `
      <div class="ar-grid2">
        <div class="ar-formulas">
          ${fs.length ? fs.map((f, i) => `
            <div class="theory-card ar-formula">
              <div class="ar-fnum">Denklem ${i + 1}</div>
              <div class="formula-box" id="arF${i}">${SW.renderMath(f.tex)}</div>
              <p class="ar-fdesc">${SW.renderInline(f.desc || '')}</p>
              ${(f.vars || []).length ? `<div class="ar-vars">${f.vars.map((v) => `
                <span class="ar-var" tabindex="0" data-tip="${esc(tipText(v))}" data-tip-sym="${esc(v.sym)}">
                  <span class="ar-var-sym">${SW.renderMath(v.sym, false)}</span><span>${esc(v.name)}</span>
                </span>`).join('')}</div>` : ''}
            </div>`).join('') : '<p class="ar-hint">Bu maddede denklem yok.</p>'}
          <p class="ar-hint">💡 Formüllerdeki sembollerin ya da alttaki çiplerin üzerine gelin: anlamı, birimi ve değeri görünür.</p>
        </div>
        <aside class="ar-side">${a.calc ? calcHtml(a.calc) : '<div class="hud-section"><div class="hud-title"><span>Hesaplayıcı</span></div><p class="ar-hint">Bu madde için hesaplayıcı yok.</p></div>'}</aside>
      </div>`;
    fs.forEach((f, i) => { const box = body.querySelector('#arF' + i); if (box && f.vars) hotSymbols(box, f.vars); });
    if (a.calc) wireCalc(a.calc, body);
  }

  function calcHtml(c) {
    return `
      <div class="hud-section ar-calc">
        <div class="hud-title"><span>🧮 ${esc(c.title || 'Hesaplayıcı')}</span></div>
        ${(c.inputs || []).map((inp) => `
          <div class="ar-cin">
            <label for="arIn_${esc(inp.id)}">${esc(inp.label)}${inp.unit ? ` <small>(${esc(inp.unit)})</small>` : ''}</label>
            <div class="ar-cin-row">
              <input type="range" data-cid="${esc(inp.id)}" min="${inp.min}" max="${inp.max}" step="${inp.step || 'any'}" value="${inp.value}" />
              <input type="number" class="bio-input" id="arIn_${esc(inp.id)}" data-cnum="${esc(inp.id)}" min="${inp.min}" max="${inp.max}" step="${inp.step || 'any'}" value="${inp.value}" />
            </div>
          </div>`).join('')}
        <div class="ar-result" id="arResult"></div>
      </div>`;
  }
  function wireCalc(c, body) {
    const vals = {};
    (c.inputs || []).forEach((inp) => { vals[inp.id] = +inp.value; });
    const out = body.querySelector('#arResult');
    function run() {
      let r;
      try { r = c.compute(Object.assign({}, vals)); } catch (e) { r = { label: 'Hata', value: NaN, note: e.message }; }
      if (!r) return;
      const shown = typeof r.value === 'number' ? SW.fmtSci(r.value) : esc(r.value);
      out.innerHTML = `<small>${esc(r.label || 'Sonuç')}</small><b>${shown}${r.unit ? ` <span>${esc(r.unit)}</span>` : ''}</b>${r.note ? `<p>${SW.renderInline(r.note)}</p>` : ''}`;
    }
    body.querySelectorAll('[data-cid]').forEach((rng) => rng.addEventListener('input', () => {
      vals[rng.dataset.cid] = +rng.value;
      const num = body.querySelector(`[data-cnum="${rng.dataset.cid}"]`);
      if (num) num.value = rng.value;
      run();
    }));
    body.querySelectorAll('[data-cnum]').forEach((num) => num.addEventListener('input', () => {
      if (num.value === '' || isNaN(+num.value)) return;
      vals[num.dataset.cnum] = +num.value;
      const rng = body.querySelector(`[data-cid="${num.dataset.cnum}"]`);
      if (rng) rng.value = num.value;
      run();
    }));
    run();
  }

  /* --- Simülasyon sekmesi ------------------------------------------------ */
  function renderSim(a, body) {
    let sims = (a.sim || []).filter((s) => SW.lab(s.lab));
    if (!sims.length) sims = (a.bridges || [a.domain]).map((d) => ({ lab: SW.domain(d).lab, hash: '', label: SW.lab(SW.domain(d).lab) ? SW.lab(SW.domain(d).lab).title : '' })).filter((s) => SW.lab(s.lab));
    body.innerHTML = `
      <div class="ar-sims">
        ${sims.map((s, i) => {
          const lab = SW.lab(s.lab);
          return `
          <div class="ar-sim" style="--c:${lab.color}">
            <div class="ar-sim-head">
              <span class="ar-sim-icon">${lab.icon}</span>
              <div><b>${esc(s.label || lab.title)}</b><small>${esc(lab.name)} · ${esc(lab.title)}${s.hash ? ` · ${esc(s.hash)}` : ''}</small></div>
              <div class="kg-actions">
                <button class="lp-btn primary" style="--c:${lab.color}" data-run="${i}">▶ Canlı Simülasyonu Burada Çalıştır</button>
                <a class="lp-btn" style="--c:${lab.color}" href="${esc(SW.labUrl(s.lab, s.hash || ''))}" target="_blank" rel="noopener">Tam Ekran Laboratuvara Git ↗</a>
              </div>
            </div>
            <div class="ar-frame" id="arFrame${i}" hidden></div>
            <div class="ar-mods">
              <small>${esc(lab.name)} modülleri:</small>
              ${lab.modules.map((m) => `<button class="lab-chip" data-embed="${esc(s.lab)}" data-hash="${esc(m.hash)}">${esc(m.title)}</button>`).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>`;
    body.querySelectorAll('[data-run]').forEach((b) => b.addEventListener('click', () => {
      const i = +b.dataset.run;
      const s = sims[i];
      body.querySelectorAll('.ar-frame').forEach((fr, j) => {
        if (j !== i) { fr.hidden = true; fr.innerHTML = ''; }
      });
      body.querySelectorAll('[data-run]').forEach((x, j) => { if (j !== i) x.textContent = '▶ Canlı Simülasyonu Burada Çalıştır'; });
      const box = body.querySelector('#arFrame' + i);
      if (!box.hidden) { box.hidden = true; box.innerHTML = ''; b.textContent = '▶ Canlı Simülasyonu Burada Çalıştır'; return; }
      const url = SW.labUrl(s.lab, s.hash || '');
      box.innerHTML = `<iframe src="${esc(url)}" title="${esc(s.label || s.lab)}" allow="fullscreen; autoplay" loading="lazy"></iframe><div class="ar-frame-foot"><span>${esc(url)}</span><a href="${esc(url)}" target="_blank" rel="noopener">Tam ekran ↗</a></div>`;
      box.hidden = false;
      b.textContent = '■ Simülasyonu Kapat';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }));
  }

  /* --- Bağlantılar sekmesi ----------------------------------------------- */
  function renderLinks(a, body) {
    const br = a.bridges || [a.domain];
    const related = (a.related || []).map((id) => SW.getArticle(id)).filter(Boolean);
    const back = SW.articles.filter((x) => x.id !== a.id && (x.related || []).includes(a.id) && !related.includes(x));
    body.innerHTML = `
      <div class="ar-grid2">
        <div class="ar-dgrid">
          ${br.map((d) => {
            const dom = SW.domain(d);
            const text = (a.perDomain && a.perDomain[d]) || (d === a.domain ? a.summary : 'Bu alandaki bağlantı için ilgili laboratuvarı keşfedin.');
            const sim = (a.sim || []).find((s) => s.lab === dom.lab);
            return `
            <div class="kg-dcard" style="--c:${dom.color}">
              <div class="kg-dhead"><span>${dom.icon}</span><b>${esc(dom.name)}</b><small>${esc(dom.lab)}</small></div>
              <p>${SW.renderInline(text)}</p>
              <div class="kg-actions">
                <button class="lp-btn primary" style="--c:${dom.color}" data-embed="${dom.lab}" data-hash="${esc(sim ? sim.hash || '' : '')}">▶ ${esc(sim ? sim.label || dom.lab : dom.lab)}</button>
                <button class="lp-btn" style="--c:${dom.color}" data-open="${dom.lab}" data-hash="${esc(sim ? sim.hash || '' : '')}">↗</button>
              </div>
            </div>`;
          }).join('')}
        </div>
        <aside class="ar-side">
          <div class="hud-section">
            <div class="hud-title"><span>İlişkili maddeler</span></div>
            <div class="kg-chips">${related.length ? related.map((r) => `<button class="kg-rel" data-article="${esc(r.id)}">${SW.domain(r.domain).icon} ${esc(r.title)}</button>`).join('') : '<span class="ar-hint">—</span>'}</div>
          </div>
          ${back.length ? `<div class="hud-section"><div class="hud-title"><span>Bu maddeye bağlananlar</span></div><div class="kg-chips">${back.map((r) => `<button class="kg-rel" data-article="${esc(r.id)}">${SW.domain(r.domain).icon} ${esc(r.title)}</button>`).join('')}</div></div>` : ''}
          <div class="hud-section">
            <div class="hud-title"><span>Kaynakça</span></div>
            ${(a.refs || []).length ? `<ol class="ar-refs">${a.refs.map((r) => `<li>${SW.renderInline(r)}</li>`).join('')}</ol>` : '<p class="ar-hint">Kaynak eklenmemiş.</p>'}
          </div>
          <button class="icon-btn" data-graphfocus="${esc(a.id)}">🕸️ Kavram ağında göster</button>
        </aside>
      </div>`;
    const gf = body.querySelector('[data-graphfocus]');
    if (gf) gf.addEventListener('click', () => (SW.graphFocus ? SW.graphFocus(a.id) : SW.go('#/graph')));
  }

  /* --------------------------------------------------------------------------
     İPUCU BALONU (formül sembolleri ve değişken çipleri)
     -------------------------------------------------------------------------- */
  function initTip() {
    tipEl = document.createElement('div');
    tipEl.className = 'ar-tipbox';
    tipEl.hidden = true;
    document.body.appendChild(tipEl);
    const showFor = (el) => {
      const sym = el.dataset.tipSym;
      tipEl.innerHTML = `${sym ? `<span class="ar-tip-sym">${SW.renderMath(sym, false)}</span>` : ''}<span>${esc(el.dataset.tip)}</span>`;
      tipEl.hidden = false;
      const r = el.getBoundingClientRect();
      const tw = tipEl.offsetWidth;
      tipEl.style.left = Math.max(8, Math.min(window.innerWidth - tw - 8, r.left + r.width / 2 - tw / 2)) + 'px';
      tipEl.style.top = Math.max(8, r.top - tipEl.offsetHeight - 8) + 'px';
      document.querySelectorAll('.sw-hot.lit, .ar-var.lit').forEach((x) => x.classList.remove('lit'));
      if (sym && root) root.querySelectorAll('[data-tip-sym]').forEach((x) => { if (x.dataset.tipSym === sym) x.classList.add('lit'); });
    };
    const hide = () => { tipEl.hidden = true; document.querySelectorAll('.sw-hot.lit, .ar-var.lit').forEach((x) => x.classList.remove('lit')); };
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('.sw-hot[data-tip], .ar-var[data-tip]');
      if (el) showFor(el); else if (!tipEl.hidden && !e.target.closest('.ar-tipbox')) hide();
    });
    document.addEventListener('focusin', (e) => { const el = e.target.closest('.ar-var[data-tip]'); if (el) showFor(el); });
    document.addEventListener('click', (e) => { const el = e.target.closest('.sw-hot[data-tip], .ar-var[data-tip]'); if (el) showFor(el); });
    window.addEventListener('scroll', hide, true);
  }

  /* --------------------------------------------------------------------------
     KAYIT
     -------------------------------------------------------------------------- */
  SW.registerView('articles', {
    init(rootEl) {
      root = rootEl;
      initTip();
      window.addEventListener('sw:articles', () => {
        if (st.mode === 'list' && root.isConnected && !root.closest('[hidden]')) renderList();
      });
    },
    show(params) {
      if (params && params.article) renderReader(params.article);
      else renderList();
    },
    hide() {
      if (!root) return;
      root.querySelectorAll('iframe').forEach((f) => { f.src = 'about:blank'; });
      if (tipEl) tipEl.hidden = true;
    }
  });
})();
