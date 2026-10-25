/* ============================================================================
   scienceWiki — Çekirdek (window.SW)
   - Makale deposu:   SW.addArticles([...]), SW.getArticle(id), SW.articles
   - Arama dizini:    SW.addSearchItems([{type, title, subtitle, keywords, action}])
   - Görünümler:      SW.registerView(id, {init(root), show(params), hide()})
   - Yönlendirme:     #/graph · #/scale · #/articles · #/article/<id> · #/timeline · #/vault
   - Laboratuvarlar:  SW.labUrl(labId, hash), SW.openLab(labId, hash, {embed})
   - Yardımcılar:     SW.renderMath, SW.renderInline, SW.fmtNum, SW.fmtSci, SW.esc
   ============================================================================ */
(function () {
  'use strict';

  const LABS = window.SW_LABS || {};
  const DOMAINS = window.SW_DOMAINS || {};

  const articles = [];
  const byId = new Map();
  const searchItems = [];
  const views = {};
  const labBase = {};
  const readyFns = [];
  let started = false;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function addArticles(list) {
    (list || []).forEach((a) => {
      if (!a || !a.id) return;
      if (byId.has(a.id)) { Object.assign(byId.get(a.id), a); return; }
      a.bridges = a.bridges && a.bridges.length ? a.bridges : [a.domain];
      if (!a.bridges.includes(a.domain)) a.bridges.unshift(a.domain);
      articles.push(a);
      byId.set(a.id, a);
    });
    window.dispatchEvent(new CustomEvent('sw:articles'));
  }
  function getArticle(id) { return byId.get(id); }

  function addSearchItems(items) {
    (items || []).forEach((it) => searchItems.push(it));
  }

  function renderMath(tex, display) {
    if (window.katex) {
      try { return window.katex.renderToString(tex, { displayMode: display !== false, throwOnError: false }); } catch (_) {}
    }
    return `<code>${esc(tex)}</code>`;
  }
  function renderInline(html) {
    if (!window.katex) return html;
    return String(html).replace(/\$([^$]+)\$/g, (_, tex) => {
      try { return window.katex.renderToString(tex, { displayMode: false, throwOnError: false }); } catch (_) { return tex; }
    });
  }
  function fmtNum(x, d) {
    if (!isFinite(x)) return x > 0 ? '∞' : '—';
    return Number(x).toLocaleString('tr-TR', { maximumFractionDigits: d == null ? 3 : d });
  }
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  function fmtSci(x, d) {
    if (!isFinite(x)) return x > 0 ? '∞' : '—';
    if (x === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -3 && e <= 5) return fmtNum(x, d == null ? 4 : d);
    const m = x / Math.pow(10, e);
    return `${m.toFixed(d == null ? 3 : d).replace('.', ',')} × 10${String(e).split('').map((c) => SUP[c] || c).join('')}`;
  }

  /* --------------------------------------------------------------------------
     Laboratuvar bağlantıları: aynı repoda yan klasör varsa onu, yoksa url'yi kullan
     -------------------------------------------------------------------------- */
  function labUrl(labId, hash) {
    const lab = LABS[labId];
    if (!lab) return '#';
    const base = labBase[labId] || lab.url;
    return base + (hash || '');
  }
  async function resolveLinks() {
    const mode = window.SW_LINK_MODE || 'auto';
    // 'auto': önce tek bir yan klasörü yokla; yoksa (bağımsız scienceWiki deposu) hepsi uzak adrese gider.
    if (mode === 'auto' && location.protocol !== 'file:') {
      const probeId = Object.keys(LABS).find((id) => LABS[id].local && id === 'affeSpace') || Object.keys(LABS).find((id) => LABS[id].local);
      let sibling = false;
      try { sibling = probeId ? (await fetch(LABS[probeId].local + 'index.html', { method: 'HEAD', cache: 'no-store' })).ok : false; } catch (_) {}
      if (!sibling) {
        Object.keys(LABS).forEach((id) => { labBase[id] = LABS[id].url; });
        window.dispatchEvent(new CustomEvent('sw:links'));
        return;
      }
    }
    await Promise.all(Object.keys(LABS).map(async (id) => {
      const lab = LABS[id];
      if (mode === 'remote' || !lab.local) { labBase[id] = lab.url; return; }
      if (mode === 'local') { labBase[id] = lab.local; return; }
      labBase[id] = lab.url;
      if (location.protocol === 'file:') return;
      try {
        const r = await fetch(lab.local + 'index.html', { method: 'HEAD', cache: 'no-store' });
        if (r.ok) labBase[id] = lab.local;
      } catch (_) { /* yerel kopya yok → uzak adres */ }
    }));
    window.dispatchEvent(new CustomEvent('sw:links'));
  }
  function isLocal(labId) { return labBase[labId] && labBase[labId] === (LABS[labId] || {}).local; }

  function openLab(labId, hash, opts) {
    const lab = LABS[labId];
    if (!lab) return;
    const url = labUrl(labId, hash);
    if (!opts || !opts.embed) { window.open(url, '_blank', 'noopener'); return; }
    const modal = document.getElementById('labModal');
    if (!modal) { window.open(url, '_blank', 'noopener'); return; }
    modal.style.setProperty('--lab-color', lab.color);
    document.getElementById('labModalIcon').textContent = lab.icon;
    document.getElementById('labModalTitle').textContent = `${lab.name} · ${lab.title}`;
    const sel = document.getElementById('labModalModule');
    sel.innerHTML = lab.modules.map((m) => `<option value="${esc(m.hash)}"${m.hash === (hash || '') ? ' selected' : ''}>${esc(m.title)}</option>`).join('');
    sel.onchange = () => { setFrame(labUrl(labId, sel.value)); };
    setFrame(url);
    modal.hidden = false;
    function setFrame(u) {
      const frame = document.getElementById('labModalFrame');
      document.getElementById('labModalFull').href = u;
      document.getElementById('labModalUrl').textContent = u;
      frame.src = 'about:blank';
      setTimeout(() => { frame.src = u; }, 30);
    }
  }
  function closeLab() {
    const modal = document.getElementById('labModal');
    if (!modal) return;
    modal.hidden = true;
    document.getElementById('labModalFrame').src = 'about:blank';
  }

  /* --------------------------------------------------------------------------
     Görünümler & yönlendirme
     -------------------------------------------------------------------------- */
  function registerView(id, api) {
    views[id] = api;
    if (started) route();
  }
  let activeView = null;
  function parseHash() {
    const h = (location.hash || '#/graph').replace(/^#\/?/, '');
    const [view, ...rest] = h.split('/');
    if (view === 'article') return { view: 'articles', params: { article: decodeURIComponent(rest.join('/')) } };
    return { view: view || 'graph', params: { sub: rest.join('/') } };
  }
  function route() {
    const { view, params } = parseHash();
    const id = views[view] ? view : 'graph';
    document.querySelectorAll('.sw-view').forEach((el) => { el.hidden = el.dataset.view !== id; });
    document.querySelectorAll('.nav-tab[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === id));
    document.body.dataset.view = id;
    if (activeView && activeView !== id && views[activeView] && views[activeView].hide) views[activeView].hide();
    const api = views[id];
    if (api) {
      const section = document.querySelector(`.sw-view[data-view="${id}"]`);
      const root = section ? (section.querySelector('.sw-view-root') || section) : null;
      if (!api._init) {
        api._init = true;
        try { api.init && api.init(root); } catch (e) { console.error('[scienceWiki] görünüm başlatılamadı:', id, e); }
      }
      try { api.show && api.show(params); } catch (e) { console.error('[scienceWiki] görünüm gösterilemedi:', id, e); }
    }
    activeView = id;
  }
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function openArticle(id) { go('#/article/' + encodeURIComponent(id)); }

  function onReady(fn) { if (started) fn(); else readyFns.push(fn); }
  function start() {
    started = true;
    window.addEventListener('hashchange', route);
    resolveLinks();
    readyFns.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
    route();
  }

  window.SW = {
    LABS, DOMAINS, articles, searchItems,
    addArticles, getArticle, addSearchItems,
    registerView, go, openArticle, route, onReady, start,
    labUrl, openLab, closeLab, isLocal, resolveLinks,
    renderMath, renderInline, fmtNum, fmtSci, esc,
    domain: (id) => DOMAINS[id] || { name: id, color: '#94a3b8', icon: '•' },
    lab: (id) => LABS[id]
  };
})();
