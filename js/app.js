/* ============================================================================
   scienceWiki — Uygulama Kabuğu
   - 5 Laboratuvar "Launchpad" kartları (demo portalı: yeni sekmede aç / sayfa içi önizle)
   - Ctrl + K / ⌘ + K "Bilim Spotlight" komut paleti (bulanık arama)
   - Tema, tam ekran, laboratuvar önizleme penceresi
   ============================================================================ */
(function () {
  'use strict';

  const SW = window.SW;
  const $ = (id) => document.getElementById(id);

  /* --------------------------------------------------------------------------
     LAUNCHPAD
     -------------------------------------------------------------------------- */
  function renderLaunchpad() {
    const box = $('launchpad');
    if (!box) return;
    box.innerHTML = Object.entries(SW.LABS).map(([id, lab]) => `
      <article class="lp-card" style="--c:${lab.color}">
        <div class="lp-top">
          <span class="lp-icon">${lab.icon}</span>
          <div>
            <h3>${SW.esc(lab.name)}</h3>
            <small>${SW.esc(lab.title)}</small>
          </div>
          ${SW.isLocal(id) ? '<span class="lp-badge" title="Aynı repodaki klasörden açılıyor">yerel</span>' : ''}
        </div>
        <p>${SW.esc(lab.desc)}</p>
        <div class="lp-actions">
          <button class="lp-btn primary" data-open="${id}">Laboratuvara Git ↗</button>
          <button class="lp-btn" data-embed="${id}">▶ Burada Önizle</button>
        </div>
      </article>`).join('');
  }

  /* --------------------------------------------------------------------------
     KOMUT PALETİ (Ctrl + K)
     -------------------------------------------------------------------------- */
  const TR = { ç: 'c', ğ: 'g', ı: 'i', i̇: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
  function norm(s) {
    return String(s || '').toLocaleLowerCase('tr-TR').replace(/[çğıöşüâîû]/g, (c) => TR[c] || c).replace(/\s+/g, ' ').trim();
  }
  function score(hay, q) {
    if (!q) return 1;
    const i = hay.indexOf(q);
    if (i === 0) return 100;
    if (i > 0) return 80 - Math.min(40, i / 4);
    const words = q.split(' ').filter(Boolean);
    if (words.length > 1 && words.every((w) => hay.includes(w))) return 50;
    let p = 0;
    for (const ch of q) { p = hay.indexOf(ch, p); if (p < 0) return 0; p++; }
    return 15;
  }

  function buildIndex() {
    const items = [];
    const views = [
      ['#/graph', '🕸️ Kavram Ağı', 'Disiplinlerarası bilgi grafiği'],
      ['#/scale', '📏 Ölçek Cetveli', "Planck'tan kozmosa 10⁻³⁵ m → 10²⁷ m"],
      ['#/articles', '📚 Ansiklopedi', 'Tüm maddeler'],
      ['#/timeline', '🕰️ Bilim Tarihi', 'Zaman çizelgesi ve büyük deneyler'],
      ['#/vault', '🧮 Sabitler & Denklemler', 'Evrensel sabitler, birim dönüştürücü, 100 denklem']
    ];
    views.forEach(([h, t, s]) => items.push({ type: 'Bölüm', title: t, subtitle: s, action: () => SW.go(h) }));
    Object.entries(SW.LABS).forEach(([id, lab]) => {
      items.push({ type: 'Laboratuvar', title: `${lab.icon} ${lab.name} — ${lab.title}`, subtitle: lab.desc, keywords: lab.domain, action: () => SW.openLab(id, '', { embed: true }) });
      lab.modules.forEach((m) => {
        if (!m.hash) return;
        items.push({ type: 'Simülasyon', title: `${lab.icon} ${m.title}`, subtitle: `${lab.name} · canlı simülasyon`, action: () => SW.openLab(id, m.hash, { embed: true }) });
      });
    });
    SW.articles.forEach((a) => {
      const d = SW.domain(a.domain);
      items.push({
        type: 'Madde', title: `${d.icon} ${a.title}`, subtitle: a.summary || '',
        keywords: [(a.tags || []).join(' '), (a.scientists || []).map((s) => s.name).join(' '), (a.formulas || []).map((f) => f.desc).join(' ')].join(' '),
        action: () => SW.openArticle(a.id)
      });
      (a.scientists || []).forEach((s) => items.push({ type: 'Bilim insanı', title: `👤 ${s.name}`, subtitle: `${s.year || ''} · ${a.title}`, action: () => SW.openArticle(a.id) }));
      (a.formulas || []).slice(0, 2).forEach((f) => items.push({ type: 'Formül', title: f.desc ? f.desc.replace(/<[^>]+>/g, '').slice(0, 80) : a.title, subtitle: a.title, tex: f.tex, action: () => SW.openArticle(a.id) }));
    });
    SW.searchItems.forEach((it) => items.push(it));
    items.forEach((it) => { it._h = norm([it.title, it.subtitle, it.keywords, it.type].join(' ')); });
    return items;
  }

  let palIndex = [], palResults = [], palSel = 0;
  function openPalette() {
    palIndex = buildIndex();
    $('palette').hidden = false;
    const inp = $('paletteInput');
    inp.value = '';
    renderPalette('');
    setTimeout(() => inp.focus(), 10);
  }
  function closePalette() { $('palette').hidden = true; }
  function renderPalette(q) {
    const nq = norm(q);
    palResults = palIndex.map((it) => ({ it, s: score(it._h, nq) + (it.type === 'Madde' ? 3 : 0) }))
      .filter((r) => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 40).map((r) => r.it);
    palSel = 0;
    $('paletteList').innerHTML = palResults.length ? palResults.map((it, i) => `
      <button class="pal-item${i === 0 ? ' sel' : ''}" data-i="${i}">
        <span class="pal-type">${SW.esc(it.type)}</span>
        <span class="pal-main"><b>${SW.esc(it.title)}</b>${it.tex ? `<span class="pal-tex">${SW.renderMath(it.tex, false)}</span>` : ''}<small>${SW.esc(String(it.subtitle || '').replace(/<[^>]+>/g, '').slice(0, 120))}</small></span>
      </button>`).join('') : '<p class="pal-empty">Sonuç yok — farklı bir kavram, bilim insanı ya da formül deneyin.</p>';
  }
  function runPal(i) {
    const it = palResults[i];
    if (!it) return;
    closePalette();
    it.action && it.action();
  }
  function movePal(d) {
    const items = $('paletteList').querySelectorAll('.pal-item');
    if (!items.length) return;
    palSel = (palSel + d + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('sel', i === palSel));
    items[palSel].scrollIntoView({ block: 'nearest' });
  }

  /* --------------------------------------------------------------------------
     BAŞLAT
     -------------------------------------------------------------------------- */
  function init() {
    renderLaunchpad();
    window.addEventListener('sw:links', renderLaunchpad);
    document.addEventListener('click', (e) => {
      const o = e.target.closest('[data-open]');
      if (o) { SW.openLab(o.dataset.open, o.dataset.hash || ''); return; }
      const em = e.target.closest('[data-embed]');
      if (em) { SW.openLab(em.dataset.embed, em.dataset.hash || '', { embed: true }); return; }
      const ar = e.target.closest('[data-article]');
      if (ar) { SW.openArticle(ar.dataset.article); }
    });
    document.querySelectorAll('.nav-tab[data-view]').forEach((b) => b.addEventListener('click', () => SW.go('#/' + b.dataset.view)));

    $('labModalClose')?.addEventListener('click', SW.closeLab);
    $('labModal')?.addEventListener('click', (e) => { if (e.target.id === 'labModal') SW.closeLab(); });

    $('openPaletteBtn')?.addEventListener('click', openPalette);
    $('palette')?.addEventListener('click', (e) => {
      if (e.target.id === 'palette') { closePalette(); return; }
      const b = e.target.closest('.pal-item');
      if (b) runPal(+b.dataset.i);
    });
    $('paletteInput')?.addEventListener('input', (e) => renderPalette(e.target.value));
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if ($('palette').hidden) openPalette(); else closePalette(); return; }
      if (e.key === 'Escape') { if (!$('palette').hidden) closePalette(); else if (!$('labModal').hidden) SW.closeLab(); return; }
      if ($('palette').hidden) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); movePal(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); movePal(-1); }
      if (e.key === 'Enter') { e.preventDefault(); runPal(palSel); }
    });

    const themeBtn = $('themeToggleBtn');
    const label = () => { if (themeBtn) themeBtn.textContent = document.documentElement.dataset.theme === 'light' ? '🌙 Karanlık' : '☀️ Aydınlık'; };
    label();
    themeBtn?.addEventListener('click', () => {
      const light = document.documentElement.dataset.theme === 'light';
      if (light) delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = 'light';
      try { localStorage.setItem('sciencewiki_theme', light ? 'dark' : 'light'); } catch (_) {}
      label();
    });
    $('fullscreenBtn')?.addEventListener('click', () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.();
    });

    const count = () => { const el = $('articleCount'); if (el) el.textContent = SW.articles.length; };
    count();
    window.addEventListener('sw:articles', count);

    SW.start();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 0);
})();
