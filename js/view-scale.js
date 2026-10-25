/* ============================================================================
   scienceWiki — Modül 2: "Planck'tan Kozmosa" İnteraktif Ölçek Cetveli
   10⁻³⁵ m (Planck uzunluğu) → 10²⁷ m (gözlemlenebilir evren) arasında
   logaritmik, kesintisiz yolculuk. Nesneler gerçek boyut oranlarıyla yan yana
   dizilir (küçükten büyüğe); görüş genişliği = 10^z metre.
   Kontroller: fare tekerleği, kaydırıcı, klavye (↑/↓, +/−, Home/End),
   "Otomatik Yolculuk". Rota: #/scale/<nesne-id> doğrudan nesneye gider.
   ============================================================================ */
(function () {
  'use strict';
  const SW = window.SW;

  /* --------------------------------------------------------------------------
     VERİ — boyut: karakteristik çap/uzunluk (metre)
     -------------------------------------------------------------------------- */
  const OBJECTS = [
    { id: 'planck-uzunlugu', name: 'Planck uzunluğu', size: 1.616255e-35, d: 'phys', kind: 'glow', color: '#00f2fe', note: 'Kuantum kütleçekimin devreye girdiği, uzayın "piksel" boyutu olduğu düşünülen ölçek: ℓₚ = √(ħG/c³).', art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' },
    { id: 'sicim', name: 'Sicim (kuramsal)', size: 1e-34, d: 'phys', kind: 'string', color: '#7dd3fc', note: 'Sicim kuramında temel parçacıklar, Planck ölçeğinde titreşen tek boyutlu sicimlerdir. Henüz deneysel kanıtı yoktur.' },
    { id: 'elektron', name: 'Elektron (üst sınır)', size: 1e-22, d: 'phys', kind: 'glow', color: '#38bdf8', note: 'Deneylere göre elektronun bir iç yapısı yok; varsa boyutu 10⁻²² m\'den küçük. Nokta parçacık kabul edilir.', art: 'standart-model' },
    { id: 'kuark', name: 'Kuark (üst sınır)', size: 1e-19, d: 'phys', kind: 'quarks', color: '#f472b6', note: 'LHC çarpışmaları kuarkların 10⁻¹⁹ m\'den küçük olduğunu gösteriyor. Üç kuark gluonlarla bağlanarak proton ve nötronu yapar.', art: 'standart-model', lab: 'affePhysics', hash: '#mod1' },
    { id: 'proton', name: 'Proton', size: 1.68e-15, d: 'phys', kind: 'proton', color: '#f87171', note: 'Yük yarıçapı ≈ 0,84 fm. İki yukarı ve bir aşağı kuarktan oluşur; kütlesinin %99\'u gluon alanının enerjisidir.', art: 'standart-model', lab: 'affePhysics', hash: '#mod1' },
    { id: 'uranyum-cekirdegi', name: 'Uranyum-238 çekirdeği', size: 1.5e-14, d: 'phys', kind: 'nucleus', color: '#fb923c', note: '92 proton + 146 nötron. Atomun kütlesinin %99,97\'si bu küçücük çekirdekte toplanır.', art: 'atom', lab: 'affePhysics', hash: '#mod1' },
    { id: 'hidrojen-atomu', name: 'Hidrojen atomu', size: 1.06e-10, d: 'chem', kind: 'atom', color: '#00f2fe', note: 'Bohr yarıçapının iki katı ≈ 0,1 nm. Atom, çekirdeğinden yaklaşık 100.000 kat büyüktür — neredeyse tamamen boşluktur.', art: 'atom', lab: 'affePhysics', hash: '#mod1' },
    { id: 'karbon-atomu', name: 'Karbon atomu', size: 1.4e-10, d: 'chem', kind: 'atom', color: '#10b981', note: '6 proton, 6 nötron, 6 elektron. Dört bağ yapabilme yeteneği organik kimyanın ve yaşamın temelidir.', art: 'atom', lab: 'affeLab' },
    { id: 'su-molekulu', name: 'Su molekülü (H₂O)', size: 2.75e-10, d: 'chem', kind: 'water', color: '#38bdf8', note: '104,5°\'lik bükük yapısı onu polar yapar; hidrojen bağları suyun yüksek kaynama noktasını ve yaşam için önemini açıklar.', lab: 'affeLab' },
    { id: 'glisin', name: 'Glisin (amino asit)', size: 5e-10, d: 'bio', kind: 'molecule', color: '#a855f7', note: 'En basit amino asit. 20 standart amino asit proteinlerin yapı taşlarıdır.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'glukoz', name: 'Glukoz', size: 9e-10, d: 'chem', kind: 'molecule', color: '#10b981', note: 'C₆H₁₂O₆ — fotosentezin ürünü, hücresel solunumun yakıtı.', art: 'hucre-organelleri-atp' },
    { id: 'dna', name: 'DNA çift sarmalı (çap)', size: 2e-9, d: 'bio', kind: 'helix', color: '#a855f7', note: '2 nm çapında ama insan hücresindeki DNA uç uca eklenirse ~2 metre uzar.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'hemoglobin', name: 'Hemoglobin proteini', size: 6.5e-9, d: 'bio', kind: 'molecule', color: '#ef4444', note: '4 alt birimli, 4 demir atomlu oksijen taşıyıcı protein; her alyuvarda ~270 milyon tane.', lab: 'affeBio', hash: '#mod1' },
    { id: 'ribozom', name: 'Ribozom', size: 2.5e-8, d: 'bio', kind: 'molecule', color: '#c084fc', note: 'mRNA\'yı okuyup protein sentezleyen moleküler makine.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'koronavirus', name: 'Koronavirüs (SARS-CoV-2)', size: 1.2e-7, d: 'bio', kind: 'virus', color: '#f43f5e', note: 'Yüzeyindeki "taç" (corona) diken proteinleriyle hücre reseptörlerine bağlanır.', lab: 'affeBio', hash: '#mod2' },
    { id: 'gorunur-isik', name: 'Görünür ışık dalga boyu', size: 5.5e-7, d: 'phys', kind: 'wave', color: '#a3e635', note: '400–700 nm. Bundan küçük nesneleri ışık mikroskobuyla göremeyiz; elektron mikroskobu gerekir.', art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' },
    { id: 'e-coli', name: 'E. coli bakterisi', size: 2e-6, d: 'bio', kind: 'bacterium', color: '#34d399', note: 'Çubuk şekilli prokaryot; ideal koşullarda her 20 dakikada bölünür.', lab: 'affeBio', hash: '#mod2' },
    { id: 'alyuvar', name: 'Alyuvar (kırmızı kan hücresi)', size: 7.5e-6, d: 'bio', kind: 'rbc', color: '#ef4444', note: 'Çekirdeksiz, çift içbükey disk; vücudunuzda ~25 trilyon tane var.', art: 'insan-anatomisi', lab: 'affeBio', hash: '#mod1' },
    { id: 'hayvan-hucresi', name: 'Hayvan hücresi', size: 2e-5, d: 'bio', kind: 'cell', color: '#a855f7', note: 'Çekirdek, mitokondri, ER ve Golgi gibi organellerle dolu tipik ökaryot hücre.', art: 'hucre-organelleri-atp', lab: 'affeBio', hash: '#mod2' },
    { id: 'sac-teli', name: 'İnsan saç teli (kalınlık)', size: 7e-5, d: 'bio', kind: 'hair', color: '#fbbf24', note: '~70 µm — çıplak gözün seçebildiği sınıra yakın.' },
    { id: 'notron-govdesi', name: 'Nöron gövdesi (soma)', size: 1e-4, d: 'bio', kind: 'neuron', color: '#7d9bcf', note: 'Gövde ~100 µm ama siyatik siniri oluşturan aksonlar 1 metreye uzanır.', lab: 'affeBio', hash: '#mod4' },
    { id: 'karinca', name: 'Karınca', size: 5e-3, d: 'bio', kind: 'ant', color: '#b45309', note: 'Vücut ağırlığının ~50 katını taşıyabilir — kas kuvveti kesitle, ağırlık hacimle ölçeklendiği için.' },
    { id: 'insan', name: 'İnsan', size: 1.7, d: 'bio', kind: 'human', color: '#a855f7', note: '~37 trilyon hücre, 206 kemik, ~100.000 km kan damarı.', art: 'insan-anatomisi', lab: 'affeBio', hash: '#mod1' },
    { id: 'mavi-balina', name: 'Mavi balina', size: 30, d: 'bio', kind: 'whale', color: '#60a5fa', note: 'Yeryüzünde yaşamış en büyük hayvan: ~30 m, ~150 ton.' },
    { id: 'everest', name: 'Everest Dağı', size: 8849, d: 'phys', kind: 'mountain', color: '#94a3b8', note: '8.849 m. Zirvede hava basıncı deniz seviyesinin üçte biri.', lab: 'affeStats', hash: '#mod1' },
    { id: 'notron-yildizi', name: 'Nötron yıldızı', size: 2e4, d: 'space', kind: 'star', color: '#93c5fd', note: '~20 km çapında ama Güneş\'ten ağır: bir çay kaşığı malzemesi ~1 milyar ton.', art: 'notron-yildizlari-chandrasekhar', lab: 'affeSpace', hash: '#mod2' },
    { id: 'cygnus-x1', name: 'Cygnus X-1 olay ufku', size: 1.24e5, d: 'space', kind: 'bh', color: '#f97316', note: '21 M☉ yıldızsal karadelik; Schwarzschild yarıçapı ≈ 62 km.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' },
    { id: 'ay', name: 'Ay', size: 3.4748e6, d: 'space', kind: 'planet', color: '#cbd5e1', note: 'Dünya\'dan ortalama 384.400 km uzakta; gelgitlerin ana nedeni.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'beyaz-cuce', name: 'Beyaz cüce (Sirius B)', size: 1.17e7, d: 'space', kind: 'star', color: '#e0f2fe', note: 'Dünya boyutunda ama Güneş kütlesinde; elektron yozlaşma basıncıyla ayakta durur (Chandrasekhar limiti 1,44 M☉).', art: 'notron-yildizlari-chandrasekhar', lab: 'affeSpace', hash: '#mod2' },
    { id: 'dunya', name: 'Dünya', size: 1.2742e7, d: 'space', kind: 'earth', color: '#3b82f6', note: 'Çap 12.742 km. Bilinen tek yaşam barındıran gezegen.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'jupiter', name: 'Jüpiter', size: 1.3982e8, d: 'space', kind: 'jupiter', color: '#f59e0b', note: 'Güneş Sistemi\'nin en büyük gezegeni; 1.300 Dünya içine sığar.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'gunes', name: 'Güneş', size: 1.3927e9, d: 'space', kind: 'sun', color: '#fbbf24', note: 'Çap 1,39 milyon km; Güneş Sistemi kütlesinin %99,86\'sı.', art: 'yildiz-evrimi-hr', lab: 'affeSpace', hash: '#mod2' },
    { id: 'sgr-a', name: 'Sagittarius A* olay ufku', size: 2.54e10, d: 'space', kind: 'bh', color: '#f97316', note: 'Samanyolu\'nun merkezindeki 4,3 milyon M☉ karadelik; 2022\'de EHT ile görüntülendi.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' },
    { id: 'astronomik-birim', name: '1 Astronomik Birim (Dünya–Güneş)', size: 1.495978707e11, d: 'space', kind: 'distance', color: '#fde68a', note: '149,6 milyon km; ışık bu yolu 8 dakika 20 saniyede alır.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'betelgeuse', name: 'Betelgeuse (kırmızı süperdev)', size: 1.06e12, d: 'space', kind: 'redgiant', color: '#f87171', note: 'Güneş\'in yerine konsa Jüpiter\'in yörüngesine kadar uzanırdı; yakında süpernova olabilir.', art: 'yildiz-evrimi-hr', lab: 'affeSpace', hash: '#mod2' },
    { id: 'gunes-sistemi', name: 'Güneş Sistemi (Neptün yörüngesi)', size: 9e12, d: 'space', kind: 'orbits', color: '#fbbf24', note: 'Neptün\'ün yörünge çapı ~60 AB; Voyager 1 bunun da çok ötesinde.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'ton-618', name: 'TON 618 olay ufku', size: 3.9e14, d: 'space', kind: 'bh', color: '#f97316', note: '66 milyar M☉ — bilinen en büyük karadeliklerden; ufku Güneş Sistemi\'nin 40 katı.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' },
    { id: 'isik-yili', name: '1 ışık yılı', size: 9.4607e15, d: 'space', kind: 'distance', color: '#fde68a', note: 'Işığın bir yılda aldığı yol: 9,46 trilyon km.', lab: 'affeSpace', hash: '#mod6' },
    { id: 'oort-bulutu', name: 'Oort bulutu', size: 3e16, d: 'space', kind: 'cloud', color: '#a5b4fc', note: 'Uzun dönemli kuyruklu yıldızların kaynağı olan, Güneş\'i saran buzlu cisimler kabuğu.', lab: 'affeSpace', hash: '#mod8' },
    { id: 'proxima', name: 'Güneş–Proxima Centauri mesafesi', size: 4.0e16, d: 'space', kind: 'distance', color: '#fca5a5', note: 'En yakın yıldız: 4,24 ışık yılı. Yörüngesinde yaşanabilir bölgede bir gezegen var (Proxima b).', lab: 'affeSpace', hash: '#mod4' },
    { id: 'yengec-bulutsusu', name: 'Yengeç Bulutsusu', size: 1.04e17, d: 'space', kind: 'nebula', color: '#fb7185', note: '1054\'te gözlenen süpernovanın kalıntısı; merkezinde saniyede 30 kez dönen bir pulsar var.', art: 'notron-yildizlari-chandrasekhar', lab: 'affeSpace', hash: '#mod3' },
    { id: 'orion-bulutsusu', name: 'Orion Bulutsusu', size: 2.3e17, d: 'space', kind: 'nebula', color: '#c084fc', note: 'Yıldız doğum bölgesi; çıplak gözle görülebilir (Orion\'un kılıcı).', art: 'yildiz-evrimi-hr', lab: 'affeSpace', hash: '#mod3' },
    { id: 'omega-centauri', name: 'Omega Centauri küresel kümesi', size: 1.6e18, d: 'space', kind: 'cluster', color: '#fde68a', note: '~10 milyon yıldızlı, Samanyolu\'nun en büyük küresel kümesi.', lab: 'affeSpace', hash: '#mod2' },
    { id: 'samanyolu', name: 'Samanyolu Galaksisi', size: 9.5e20, d: 'space', kind: 'galaxy', color: '#c4b5fd', note: '~100.000 ışık yılı çapında, 100–400 milyar yıldız; karanlık madde halesi içinde döner.', lab: 'affeSpace', hash: '#mod6' },
    { id: 'andromeda', name: 'Andromeda Galaksisi', size: 2.08e21, d: 'space', kind: 'galaxy', color: '#93c5fd', note: '2,5 milyon ışık yılı uzakta; ~4,5 milyar yıl sonra Samanyolu ile birleşecek.', lab: 'affeSpace', hash: '#mod6' },
    { id: 'yerel-grup', name: 'Yerel Grup', size: 9.5e22, d: 'space', kind: 'groupg', color: '#a5b4fc', note: 'Samanyolu, Andromeda, Üçgen ve ~80 cüce galaksiden oluşan grup (~10 milyon ışık yılı).', lab: 'affeSpace', hash: '#mod6' },
    { id: 'bootes-boslugu', name: 'Boötes boşluğu', size: 3.1e24, d: 'space', kind: 'void', color: '#64748b', note: '~330 milyon ışık yılı çapında, neredeyse galaksisiz dev boşluk.', lab: 'affeSpace', hash: '#mod6' },
    { id: 'laniakea', name: 'Laniakea süperkümesi', size: 4.9e24, d: 'space', kind: 'web', color: '#818cf8', note: '"Ölçülemez cennet": ~100.000 galaksiyi barındıran, Samanyolu\'nun da üyesi olduğu süperküme.', lab: 'affeSpace', hash: '#mod6' },
    { id: 'gozlemlenebilir-evren', name: 'Gözlemlenebilir evren', size: 8.8e26, d: 'space', kind: 'universe', color: '#f97316', note: '~93 milyar ışık yılı çapında; ötesinden gelen ışık bize henüz ulaşmadı. Kenarı kozmik mikrodalga arka plan.', lab: 'affeSpace', hash: '#mod6' }
  ];
  OBJECTS.sort((a, b) => a.size - b.size);
  // Nesneleri bir çizgi üzerinde küçükten büyüğe diz: x_i = x_{i-1} + (s_{i-1} + s_i)/2 · 1,25
  OBJECTS.forEach((o, i) => {
    o.lg = Math.log10(o.size);
    o.f = o.lg + 0.42; // görüş genişliğinin ~%38'ini kapladığı ölçek
    o.x = i === 0 ? 0 : OBJECTS[i - 1].x + (OBJECTS[i - 1].size + o.size) / 2 * 1.25;
  });

  const BANDS = [
    { from: -35.5, to: -12.5, domains: ['phys'], title: 'Kuantum & Parçacık Dünyası', range: '10⁻³⁵ – 10⁻¹⁵ m', desc: 'Sicimler, kuarklar, gluonlar, proton ve atom çekirdeği.', labs: [['affePhysics', '#mod1', 'affePhysics · Kuantum atom & çekirdek'], ['affeSpace', '#mod9', 'affeSpace · Planck birimleri']], arts: ['planck-sabiti', 'standart-model', 'atom'] },
    { from: -12.5, to: -7, domains: ['chem', 'bio'], title: 'Atomlar, Moleküller & DNA', range: '10⁻¹⁰ – 10⁻⁸ m', desc: 'Hidrojen atomu, orbitaller, su molekülü, amino asitler ve DNA çift sarmalı.', labs: [['affeLab', '', 'affeLab · Kimya laboratuvarı'], ['affeBio', '#mod3', 'affeBio · Gen → Protein']], arts: ['atom', 'santral-dogma'] },
    { from: -7, to: 0.5, domains: ['bio'], title: 'Hücreler & Canlılar', range: '10⁻⁶ – 10⁰ m', desc: 'Virüsler, bakteriler, bitki ve hayvan hücreleri, nöronlar, insan anatomisi.', labs: [['affeBio', '#mod2', 'affeBio · Hücre galerisi'], ['affeBio', '#mod1', 'affeBio · 3B insan anatomisi']], arts: ['hucre-organelleri-atp', 'insan-anatomisi'] },
    { from: 0.5, to: 8.5, domains: ['phys', 'stats'], title: 'İnsan Ölçeği, Mekanik & Dünya', range: '10¹ – 10⁷ m', desc: 'Klasik mekanik, atmosfer, dağlar ve gezegenimiz — büyük sayılar ve ölçümün dünyası.', labs: [['affePhysics', '#mod1', 'affePhysics · Fizik laboratuvarı'], ['affeStats', '#mod1', 'affeStats · Galton kutusu']], arts: [] },
    { from: 8.5, to: 27.6, domains: ['space'], title: 'Yıldızlar, Galaksiler & Kozmos', range: '10⁹ – 10²⁷ m', desc: 'Güneş, beyaz cüceler, nötron yıldızları, karadelikler, bulutsular, Samanyolu ve kozmik ağ.', labs: [['affeSpace', '#mod8', 'affeSpace · Güneş Sistemi'], ['affeSpace', '#mod1', 'affeSpace · Karadeliğe düşüş'], ['affeSpace', '#mod6', 'affeSpace · Kozmoloji']], arts: ['gunes-sistemi-kepler', 'karadelikler', 'yildiz-evrimi-hr', 'notron-yildizlari-chandrasekhar'] }
  ];
  const Z_MIN = -35.2, Z_MAX = 27.4;

  /* --------------------------------------------------------------------------
     YARDIMCILAR
     -------------------------------------------------------------------------- */
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (n) => String(n).split('').map((c) => SUP[c] || c).join('');
  const nf = (x, d) => Number(x).toLocaleString('tr-TR', { maximumFractionDigits: d == null ? 2 : d });
  function fmtLen(m) {
    const a = Math.abs(m);
    if (a < 1e-15) return SW.fmtSci(m, 2) + ' m';
    if (a < 1e-12) return nf(m / 1e-15, 2) + ' fm';
    if (a < 1e-9) return nf(m / 1e-12, 1) + ' pm';
    if (a < 1e-6) return nf(m / 1e-9, 1) + ' nm';
    if (a < 1e-3) return nf(m / 1e-6, 1) + ' µm';
    if (a < 1e-2) return nf(m / 1e-3, 1) + ' mm';
    if (a < 1) return nf(m / 1e-2, 1) + ' cm';
    if (a < 1e3) return nf(m, 1) + ' m';
    if (a < 1e9) return nf(m / 1e3, 0) + ' km';
    if (a < 1e15) return nf(m / 1.495978707e11, a < 1e12 ? 3 : 1) + ' AB';
    const ly = m / 9.4607e15;
    return ly < 1e6 ? nf(ly, ly < 10 ? 2 : 0) + ' ışık yılı' : SW.fmtSci(ly, 2) + ' ışık yılı';
  }
  function bandAt(z) { return BANDS.find((b) => z >= b.from && z < b.to) || BANDS[z < 0 ? 0 : BANDS.length - 1]; }
  function hexA(hex, a) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  function centerAt(z) {
    if (z <= OBJECTS[0].f) return OBJECTS[0].x;
    for (let i = 0; i < OBJECTS.length - 1; i++) {
      const a = OBJECTS[i], b = OBJECTS[i + 1];
      if (z < b.f) {
        const t = (z - a.f) / (b.f - a.f);
        const s = t * t * (3 - 2 * t);
        return a.x + (b.x - a.x) * s;
      }
    }
    return OBJECTS[OBJECTS.length - 1].x;
  }
  function nearestObject(z) {
    let best = OBJECTS[0], bd = Infinity;
    OBJECTS.forEach((o) => { const d = Math.abs(o.f - z); if (d < bd) { bd = d; best = o; } });
    return best;
  }

  /* --------------------------------------------------------------------------
     ÇİZİM
     -------------------------------------------------------------------------- */
  function seeded(i) { let a = (i * 2654435761) >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  function drawObject(g, o, x, y, dpx, t) {
    const r = dpx / 2;
    const c = o.color;
    g.save();
    switch (o.kind) {
      case 'glow': {
        const gr = g.createRadialGradient(x, y, 0, x, y, r * 2.2);
        gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.25, c); gr.addColorStop(1, hexA(c, 0));
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 2.2, 0, 7); g.fill();
        break;
      }
      case 'string': {
        g.strokeStyle = c; g.lineWidth = Math.max(1, r * 0.08); g.shadowColor = c; g.shadowBlur = 12;
        g.beginPath();
        for (let k = 0; k <= 120; k++) {
          const a = (k / 120) * Math.PI * 2;
          const rr = r * (0.75 + 0.18 * Math.sin(a * 5 + t * 3));
          const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
          if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
        }
        g.stroke();
        break;
      }
      case 'quarks': {
        const cols = ['#ef4444', '#22c55e', '#3b82f6'];
        cols.forEach((qc, k) => {
          const a = t * 1.2 + k * 2.094;
          const px = x + Math.cos(a) * r * 0.45, py = y + Math.sin(a) * r * 0.45;
          const gr = g.createRadialGradient(px, py, 0, px, py, r * 0.4);
          gr.addColorStop(0, '#fff'); gr.addColorStop(0.35, qc); gr.addColorStop(1, hexA(qc, 0));
          g.fillStyle = gr; g.beginPath(); g.arc(px, py, r * 0.4, 0, 7); g.fill();
        });
        break;
      }
      case 'proton': {
        const gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, hexA(c, 0.55)); gr.addColorStop(1, hexA(c, 0.05));
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
        g.strokeStyle = hexA(c, 0.6); g.lineWidth = Math.max(1, r * 0.03); g.stroke();
        ['#ef4444', '#22c55e', '#3b82f6'].forEach((qc, k) => {
          const a = t * 0.9 + k * 2.094;
          g.fillStyle = qc; g.beginPath(); g.arc(x + Math.cos(a) * r * 0.42, y + Math.sin(a) * r * 0.42, r * 0.16, 0, 7); g.fill();
        });
        break;
      }
      case 'nucleus': {
        const rnd = seeded(7);
        for (let k = 0; k < 60; k++) {
          const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * r * 0.78;
          g.fillStyle = k % 5 < 2 ? '#f87171' : '#94a3b8';
          g.beginPath(); g.arc(x + Math.cos(a) * rr, y + Math.sin(a) * rr, r * 0.16, 0, 7); g.fill();
        }
        break;
      }
      case 'atom': {
        g.strokeStyle = hexA(c, 0.55); g.lineWidth = Math.max(1, r * 0.02);
        for (let k = 0; k < 3; k++) {
          g.beginPath(); g.ellipse(x, y, r, r * 0.38, k * 1.047 + t * 0.2, 0, 7); g.stroke();
          const a = t * (1.6 + k * 0.4) + k;
          const ex = Math.cos(a) * r, ey = Math.sin(a) * r * 0.38, rot = k * 1.047 + t * 0.2;
          g.fillStyle = '#e0f2fe';
          g.beginPath(); g.arc(x + ex * Math.cos(rot) - ey * Math.sin(rot), y + ex * Math.sin(rot) + ey * Math.cos(rot), Math.max(1.5, r * 0.05), 0, 7); g.fill();
        }
        const gr = g.createRadialGradient(x, y, 0, x, y, r * 0.18);
        gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#f87171');
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, Math.max(1.5, r * 0.08), 0, 7); g.fill();
        break;
      }
      case 'water': {
        const ball = (px, py, rr, col) => { const gr = g.createRadialGradient(px - rr * 0.3, py - rr * 0.3, 0, px, py, rr); gr.addColorStop(0, '#fff'); gr.addColorStop(0.3, col); gr.addColorStop(1, hexA(col, 0.6)); g.fillStyle = gr; g.beginPath(); g.arc(px, py, rr, 0, 7); g.fill(); };
        ball(x - r * 0.5, y + r * 0.35, r * 0.32, '#e2e8f0');
        ball(x + r * 0.5, y + r * 0.35, r * 0.32, '#e2e8f0');
        ball(x, y - r * 0.1, r * 0.5, '#ef4444');
        break;
      }
      case 'molecule': {
        const rnd = seeded(o.id.length * 13);
        for (let k = 0; k < 9; k++) {
          const a = rnd() * Math.PI * 2, rr = rnd() * r * 0.55;
          const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr, br = r * (0.18 + rnd() * 0.14);
          const gr = g.createRadialGradient(px - br * 0.3, py - br * 0.3, 0, px, py, br);
          gr.addColorStop(0, '#fff'); gr.addColorStop(0.35, c); gr.addColorStop(1, hexA(c, 0.5));
          g.fillStyle = gr; g.beginPath(); g.arc(px, py, br, 0, 7); g.fill();
        }
        break;
      }
      case 'helix': {
        g.lineWidth = Math.max(1, r * 0.06);
        for (let s = 0; s < 2; s++) {
          g.strokeStyle = s ? '#c084fc' : '#22d3ee';
          g.beginPath();
          for (let k = 0; k <= 80; k++) {
            const u = k / 80, py = y - r * 1.6 + u * r * 3.2, px = x + Math.sin(u * 12 + t * 1.5 + s * Math.PI) * r * 0.5;
            if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
          }
          g.stroke();
        }
        g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = Math.max(1, r * 0.03);
        for (let k = 0; k < 16; k++) {
          const u = (k + 0.5) / 16, py = y - r * 1.6 + u * r * 3.2, ph = u * 12 + t * 1.5;
          g.beginPath(); g.moveTo(x + Math.sin(ph) * r * 0.5, py); g.lineTo(x + Math.sin(ph + Math.PI) * r * 0.5, py); g.stroke();
        }
        break;
      }
      case 'virus': {
        g.strokeStyle = c; g.lineWidth = Math.max(1, r * 0.05);
        for (let k = 0; k < 18; k++) {
          const a = (k / 18) * Math.PI * 2;
          g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7); g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); g.stroke();
          g.fillStyle = c; g.beginPath(); g.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, r * 0.07, 0, 7); g.fill();
        }
        const gr = g.createRadialGradient(x - r * 0.2, y - r * 0.2, 0, x, y, r * 0.7);
        gr.addColorStop(0, '#fecdd3'); gr.addColorStop(1, '#9f1239');
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 0.7, 0, 7); g.fill();
        break;
      }
      case 'wave': {
        g.strokeStyle = c; g.lineWidth = Math.max(1.2, r * 0.05); g.shadowColor = c; g.shadowBlur = 8;
        g.beginPath();
        for (let k = 0; k <= 100; k++) {
          const u = k / 100, px = x - r + u * 2 * r, py = y + Math.sin(u * Math.PI * 2 - t * 3) * r * 0.35;
          if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
        }
        g.stroke();
        break;
      }
      case 'bacterium': {
        g.fillStyle = hexA(c, 0.35); g.strokeStyle = c; g.lineWidth = Math.max(1, r * 0.04);
        const w = r * 1.0, h = r * 0.42;
        g.beginPath(); g.moveTo(x - w + h, y - h); g.lineTo(x + w - h, y - h); g.arc(x + w - h, y, h, -Math.PI / 2, Math.PI / 2); g.lineTo(x - w + h, y + h); g.arc(x - w + h, y, h, Math.PI / 2, Math.PI * 1.5); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(x + w, y);
        for (let k = 0; k <= 30; k++) g.lineTo(x + w + k * r * 0.03, y + Math.sin(k * 0.6 + t * 4) * r * 0.08);
        g.stroke();
        break;
      }
      case 'rbc': {
        const gr = g.createRadialGradient(x, y, r * 0.2, x, y, r);
        gr.addColorStop(0, '#7f1d1d'); gr.addColorStop(0.6, '#dc2626'); gr.addColorStop(1, '#ef4444');
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
        break;
      }
      case 'cell': {
        g.fillStyle = hexA(c, 0.18); g.strokeStyle = hexA(c, 0.85); g.lineWidth = Math.max(1, r * 0.03);
        g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
        g.fillStyle = hexA('#7c3aed', 0.85); g.beginPath(); g.arc(x - r * 0.15, y - r * 0.05, r * 0.3, 0, 7); g.fill();
        const rnd = seeded(5);
        for (let k = 0; k < 7; k++) {
          const a = rnd() * 6.28, rr = r * (0.45 + rnd() * 0.4);
          g.fillStyle = '#f97316'; g.beginPath(); g.ellipse(x + Math.cos(a) * rr, y + Math.sin(a) * rr, r * 0.1, r * 0.05, a, 0, 7); g.fill();
        }
        break;
      }
      case 'hair': {
        g.fillStyle = hexA(c, 0.65); g.fillRect(x - r, y - r * 3, dpx, r * 6);
        break;
      }
      case 'neuron': {
        g.strokeStyle = c; g.lineWidth = Math.max(1, r * 0.08);
        for (let k = 0; k < 7; k++) {
          const a = (k / 7) * Math.PI * 2 + 0.3;
          g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * r * 1.4, y + Math.sin(a) * r * 1.4); g.stroke();
        }
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + r * 3.5, y + r * 0.3); g.stroke();
        g.fillStyle = '#a5b4fc'; g.beginPath(); g.arc(x, y, r * 0.5, 0, 7); g.fill();
        break;
      }
      case 'ant': {
        g.fillStyle = c;
        [[-0.55, 0.22], [0, 0.18], [0.5, 0.3]].forEach(([dx, rr]) => { g.beginPath(); g.ellipse(x + dx * r, y, rr * r, rr * r * 0.75, 0, 0, 7); g.fill(); });
        g.strokeStyle = c; g.lineWidth = Math.max(1, r * 0.04);
        for (let k = -1; k <= 1; k++) { g.beginPath(); g.moveTo(x + k * r * 0.12, y); g.lineTo(x + k * r * 0.3, y + r * 0.45); g.stroke(); g.beginPath(); g.moveTo(x + k * r * 0.12, y); g.lineTo(x + k * r * 0.3, y - r * 0.45); g.stroke(); }
        break;
      }
      case 'human': {
        const top = y - r, h = dpx;
        g.strokeStyle = c; g.fillStyle = c; g.lineWidth = Math.max(1.5, h * 0.045); g.lineCap = 'round';
        g.beginPath(); g.arc(x, top + h * 0.08, h * 0.075, 0, 7); g.fill();
        g.beginPath(); g.moveTo(x, top + h * 0.17); g.lineTo(x, top + h * 0.55);
        g.moveTo(x, top + h * 0.25); g.lineTo(x - h * 0.17, top + h * 0.45); g.moveTo(x, top + h * 0.25); g.lineTo(x + h * 0.17, top + h * 0.45);
        g.moveTo(x, top + h * 0.55); g.lineTo(x - h * 0.12, top + h); g.moveTo(x, top + h * 0.55); g.lineTo(x + h * 0.12, top + h);
        g.stroke();
        break;
      }
      case 'whale': {
        g.fillStyle = hexA(c, 0.85);
        g.beginPath(); g.ellipse(x, y, r, r * 0.22, 0, 0, 7); g.fill();
        g.beginPath(); g.moveTo(x + r * 0.85, y); g.lineTo(x + r * 1.15, y - r * 0.2); g.lineTo(x + r * 1.15, y + r * 0.2); g.closePath(); g.fill();
        break;
      }
      case 'mountain': {
        const grd = g.createLinearGradient(x, y - r, x, y + r);
        grd.addColorStop(0, '#f1f5f9'); grd.addColorStop(0.25, '#cbd5e1'); grd.addColorStop(1, '#475569');
        g.fillStyle = grd;
        g.beginPath(); g.moveTo(x - r * 1.6, y + r); g.lineTo(x - r * 0.3, y - r * 0.4); g.lineTo(x, y - r); g.lineTo(x + r * 0.4, y - r * 0.5); g.lineTo(x + r * 1.6, y + r); g.closePath(); g.fill();
        break;
      }
      case 'planet': case 'earth': case 'jupiter': {
        const gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, r);
        const base = o.kind === 'earth' ? '#2563eb' : o.kind === 'jupiter' ? '#d97706' : c;
        gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.2, base); gr.addColorStop(1, '#020617');
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
        if (o.kind === 'jupiter') {
          g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.clip();
          for (let k = -4; k <= 4; k++) { g.fillStyle = k % 2 ? 'rgba(120,53,15,0.35)' : 'rgba(254,243,199,0.18)'; g.fillRect(x - r, y + k * r * 0.2, dpx, r * 0.1); }
          g.restore();
        }
        if (o.kind === 'earth') {
          g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.clip();
          g.fillStyle = 'rgba(34,197,94,0.55)';
          [[-0.3, -0.2, 0.35], [0.25, 0.2, 0.28], [0.1, -0.45, 0.18]].forEach(([dx, dy, rr]) => { g.beginPath(); g.arc(x + dx * r, y + dy * r, rr * r, 0, 7); g.fill(); });
          g.restore();
        }
        break;
      }
      case 'star': case 'sun': case 'redgiant': {
        const gl = g.createRadialGradient(x, y, r * 0.6, x, y, r * 1.8);
        gl.addColorStop(0, hexA(c, 0.45)); gl.addColorStop(1, hexA(c, 0));
        g.fillStyle = gl; g.beginPath(); g.arc(x, y, r * 1.8, 0, 7); g.fill();
        const gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.45, c); gr.addColorStop(1, o.kind === 'redgiant' ? '#7f1d1d' : hexA(c, 0.9));
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
        break;
      }
      case 'bh': {
        const gl = g.createRadialGradient(x, y, r * 0.95, x, y, r * 1.9);
        gl.addColorStop(0, 'rgba(251,146,60,0.9)'); gl.addColorStop(0.35, 'rgba(249,115,22,0.35)'); gl.addColorStop(1, 'rgba(249,115,22,0)');
        g.fillStyle = gl; g.beginPath(); g.arc(x, y, r * 1.9, 0, 7); g.fill();
        g.fillStyle = '#000'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
        break;
      }
      case 'distance': {
        g.strokeStyle = c; g.fillStyle = c; g.lineWidth = Math.max(1.5, Math.min(4, dpx * 0.004));
        g.beginPath(); g.moveTo(x - r, y); g.lineTo(x + r, y); g.stroke();
        g.beginPath(); g.moveTo(x - r, y - 10); g.lineTo(x - r, y + 10); g.moveTo(x + r, y - 10); g.lineTo(x + r, y + 10); g.stroke();
        g.beginPath(); g.arc(x - r, y, 5, 0, 7); g.fill();
        break;
      }
      case 'orbits': {
        g.strokeStyle = 'rgba(253,230,138,0.45)'; g.lineWidth = 1;
        [0.0129, 0.024, 0.033, 0.05, 0.172, 0.317, 0.637, 1].forEach((f) => { g.beginPath(); g.arc(x, y, r * f, 0, 7); g.stroke(); });
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(x, y, Math.max(2, r * 0.01), 0, 7); g.fill();
        break;
      }
      case 'cloud': {
        const rnd = seeded(31);
        for (let k = 0; k < 260; k++) {
          const a = rnd() * 6.283, rr = r * (0.7 + rnd() * 0.3);
          g.fillStyle = hexA(c, 0.35 + rnd() * 0.4); g.fillRect(x + Math.cos(a) * rr, y + Math.sin(a) * rr, 1.6, 1.6);
        }
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(x, y, 2.5, 0, 7); g.fill();
        break;
      }
      case 'nebula': {
        const rnd = seeded(o.id.length * 3);
        for (let k = 0; k < 14; k++) {
          const a = rnd() * 6.283, rr = rnd() * r * 0.6, br = r * (0.25 + rnd() * 0.35);
          const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
          const gr = g.createRadialGradient(px, py, 0, px, py, br);
          const col = k % 3 === 0 ? '#38bdf8' : c;
          gr.addColorStop(0, hexA(col, 0.32)); gr.addColorStop(1, hexA(col, 0));
          g.fillStyle = gr; g.beginPath(); g.arc(px, py, br, 0, 7); g.fill();
        }
        break;
      }
      case 'cluster': {
        const rnd = seeded(77);
        for (let k = 0; k < 500; k++) {
          const rr = r * Math.pow(rnd(), 1.8), a = rnd() * 6.283;
          g.fillStyle = hexA(k % 4 ? '#fef3c7' : '#fca5a5', 0.75); g.fillRect(x + Math.cos(a) * rr, y + Math.sin(a) * rr, 1.5, 1.5);
        }
        break;
      }
      case 'galaxy': {
        const rnd = seeded(o.id.length * 11);
        const core = g.createRadialGradient(x, y, 0, x, y, r * 0.25);
        core.addColorStop(0, 'rgba(255,247,214,0.95)'); core.addColorStop(1, 'rgba(255,247,214,0)');
        g.fillStyle = core; g.beginPath(); g.arc(x, y, r * 0.25, 0, 7); g.fill();
        for (let k = 0; k < 900; k++) {
          const arm = k % 2, u = rnd(), rr = Math.pow(u, 0.7) * r;
          const a = arm * Math.PI + rr / r * 4.2 + (rnd() - 0.5) * 0.5 + t * 0.05;
          g.fillStyle = hexA(rnd() > 0.85 ? '#f9a8d4' : c, 0.65); g.fillRect(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.55, 1.4, 1.4);
        }
        break;
      }
      case 'groupg': {
        const rnd = seeded(99);
        for (let k = 0; k < 40; k++) {
          const a = rnd() * 6.283, rr = Math.sqrt(rnd()) * r * 0.9, br = r * (k < 2 ? 0.07 : 0.015);
          const px = x + Math.cos(a) * rr * (k < 2 ? 0.4 : 1), py = y + Math.sin(a) * rr * (k < 2 ? 0.4 : 1);
          const gr = g.createRadialGradient(px, py, 0, px, py, br);
          gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, hexA(c, 0));
          g.fillStyle = gr; g.beginPath(); g.arc(px, py, br, 0, 7); g.fill();
        }
        g.strokeStyle = hexA(c, 0.35); g.setLineDash([6, 6]); g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.setLineDash([]);
        break;
      }
      case 'void': {
        g.strokeStyle = hexA(c, 0.8); g.setLineDash([4, 8]); g.lineWidth = 1.2;
        g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.setLineDash([]);
        const rnd = seeded(41);
        for (let k = 0; k < 220; k++) { const a = rnd() * 6.283, rr = r * (1 + rnd() * 0.25); g.fillStyle = 'rgba(165,180,252,0.6)'; g.fillRect(x + Math.cos(a) * rr, y + Math.sin(a) * rr, 1.4, 1.4); }
        break;
      }
      case 'web': {
        const rnd = seeded(123);
        const pts = [];
        for (let k = 0; k < 70; k++) { const a = rnd() * 6.283, rr = Math.sqrt(rnd()) * r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
        g.strokeStyle = hexA(c, 0.35); g.lineWidth = 1;
        pts.forEach((p, i) => { pts.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < r * 0.32) { g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke(); } }); });
        pts.forEach((p) => { g.fillStyle = '#e0e7ff'; g.fillRect(p[0] - 1, p[1] - 1, 2.4, 2.4); });
        break;
      }
      case 'universe': {
        const gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, 'rgba(15,23,42,0.4)'); gr.addColorStop(0.85, 'rgba(30,27,75,0.5)'); gr.addColorStop(0.97, 'rgba(249,115,22,0.6)'); gr.addColorStop(1, 'rgba(249,115,22,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
        const rnd = seeded(5150);
        for (let k = 0; k < 600; k++) { const a = rnd() * 6.283, rr = Math.sqrt(rnd()) * r * 0.95; g.fillStyle = hexA(['#93c5fd', '#fca5a5', '#c4b5fd'][k % 3], 0.5); g.fillRect(x + Math.cos(a) * rr, y + Math.sin(a) * rr, 1.3, 1.3); }
        break;
      }
      default: {
        g.fillStyle = hexA(c, 0.6); g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
      }
    }
    g.restore();
  }

  /* --------------------------------------------------------------------------
     GÖRÜNÜM
     -------------------------------------------------------------------------- */
  const st = { z: -34.4, zT: -34.4, auto: false, active: false, sel: null, hits: [] };
  let root, canvas, ctx, raf = 0, lastT = 0, W = 800, H = 500, dpr = 1;

  function render(rootEl) {
    root = rootEl;
    root.innerHTML = `
      <div class="lab-grid sc-grid">
        <aside class="hud-panel">
          <div class="hud-section">
            <div class="hud-title"><span>Ölçek Yolculuğu</span><b class="sc-zval" id="scZLabel"></b></div>
            <input id="scSlider" type="range" min="${Z_MIN}" max="${Z_MAX}" step="0.01" value="${st.z}" aria-label="Ölçek (10 üzeri metre)" />
            <div class="sc-minmax"><span>10⁻³⁵ m</span><span>10²⁷ m</span></div>
            <div class="btn-grid">
              <button class="action-btn" id="scAuto">▶ Otomatik Yolculuk</button>
              <button class="action-btn purple" id="scHome">⟲ Planck'a Dön</button>
            </div>
            <p class="sc-hint">Fare tekerleği ile yakınlaş/uzaklaş · ↑ ↓ veya + − tuşları · nesneye tıklayın</p>
          </div>
          <div class="hud-section">
            <div class="hud-title"><span>5 Ölçek Bölgesi → Laboratuvarlar</span></div>
            <div class="sc-bands" id="scBands"></div>
          </div>
        </aside>

        <section class="stage-panel sc-stage">
          <div class="lab-toolbar">
            <span class="lab-tool-btn" style="pointer-events:none;">📏 Görüş genişliği = 10<sup>n</sup> metre · nesneler gerçek boyut oranlarıyla</span>
          </div>
          <div class="stage-viewport">
            <div class="stage-canvas-wrap"><canvas id="scCanvas" aria-label="Ölçek cetveli"></canvas></div>
            <div class="sc-readout">
              <div class="sc-pow" id="scPow"></div>
              <div class="sc-human" id="scHuman"></div>
              <div class="sc-band" id="scBandName"></div>
            </div>
          </div>
        </section>

        <aside class="hud-panel">
          <div class="hud-section" id="scInfo"></div>
          <div class="hud-section">
            <div class="hud-title"><span>Şu An Ekranda</span></div>
            <div class="sc-list" id="scList"></div>
          </div>
        </aside>
      </div>`;
    canvas = root.querySelector('#scCanvas');
    ctx = canvas.getContext('2d');
    renderBands();
    wire();
  }

  function renderBands() {
    const box = root && root.querySelector('#scBands');
    if (!box) return;
    box.innerHTML = BANDS.map((b, i) => {
      const cols = b.domains.map((d) => SW.domain(d).color);
      const arts = b.arts.filter((id) => SW.getArticle(id));
      return `
        <div class="sc-bandcard" style="--c:${cols[0]};--c2:${cols[1] || cols[0]}">
          <button class="sc-bandjump" data-band="${i}"><b>${b.title}</b><small>${b.range}</small></button>
          <p>${b.desc}</p>
          <div class="sc-bandlinks">
            ${b.labs.map(([lab, hash, label]) => `<button class="lp-btn" style="--c:${(SW.lab(lab) || {}).color || '#38bdf8'}" data-embed="${lab}" data-hash="${hash}">→ ${label}</button>`).join('')}
            ${arts.map((id) => `<button class="lab-chip" data-article="${id}">📖 ${SW.esc(SW.getArticle(id).title)}</button>`).join('')}
          </div>
        </div>`;
    }).join('');
  }

  function wire() {
    const slider = root.querySelector('#scSlider');
    slider.addEventListener('input', () => { st.auto = false; syncAuto(); release(); st.zT = +slider.value; });
    root.querySelector('#scAuto').addEventListener('click', () => {
      st.auto = !st.auto;
      release();
      if (st.auto && st.zT > Z_MAX - 0.5) { st.z = st.zT = Z_MIN + 0.3; }
      syncAuto();
    });
    root.querySelector('#scHome').addEventListener('click', () => { st.auto = false; syncAuto(); release(); st.zT = -34.4; });
    root.querySelector('#scBands').addEventListener('click', (e) => {
      const b = e.target.closest('[data-band]');
      if (!b) return;
      const band = BANDS[+b.dataset.band];
      st.auto = false; syncAuto(); release();
      st.zT = Math.max(Z_MIN, band.from + 0.8);
    });
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      st.auto = false; syncAuto(); release();
      st.zT = Math.min(Z_MAX, Math.max(Z_MIN, st.zT + e.deltaY * 0.0018));
    }, { passive: false });
    let drag = null;
    canvas.addEventListener('pointerdown', (e) => { drag = { y: e.clientY, z: st.zT, moved: false, x: e.clientX }; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dy = e.clientY - drag.y;
      if (Math.abs(dy) > 4) drag.moved = true;
      if (drag.moved) { st.auto = false; syncAuto(); release(); st.zT = Math.min(Z_MAX, Math.max(Z_MIN, drag.z + dy * 0.01)); }
    });
    canvas.addEventListener('pointerup', (e) => {
      if (drag && !drag.moved) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left, my = e.clientY - rect.top;
        const hit = st.hits.slice().reverse().find((h) => Math.hypot(mx - h.x, my - h.y) <= Math.max(10, h.r));
        if (hit) { st.sel = hit.o; st.selLock = true; renderInfo(); }
      }
      drag = null;
    });
    document.addEventListener('keydown', (e) => {
      if (!st.active || e.target.closest('input, textarea, select') || !document.getElementById('palette').hidden) return;
      const k = e.key;
      if (k === 'ArrowUp' || k === '+' || k === '=') { e.preventDefault(); st.auto = false; syncAuto(); release(); st.zT = Math.min(Z_MAX, st.zT + 0.5); }
      else if (k === 'ArrowDown' || k === '-') { e.preventDefault(); st.auto = false; syncAuto(); release(); st.zT = Math.max(Z_MIN, st.zT - 0.5); }
      else if (k === 'Home') { release(); st.zT = Z_MIN; } else if (k === 'End') { release(); st.zT = Z_MAX; }
    });
    root.addEventListener('click', (e) => {
      const it = e.target.closest('[data-obj]');
      if (it) { const o = OBJECTS.find((x) => x.id === it.dataset.obj); if (o) { st.sel = o; st.selLock = true; st.auto = false; syncAuto(); st.zT = o.f; renderInfo(); } }
    });
    window.addEventListener('sw:articles', () => { renderBands(); renderInfo(); });
  }
  function release() { st.selLock = false; }
  function syncAuto() {
    const b = root && root.querySelector('#scAuto');
    if (b) b.textContent = st.auto ? '⏸ Yolculuğu Durdur' : '▶ Otomatik Yolculuk';
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(300, Math.floor(r.width)); H = Math.max(260, Math.floor(r.height));
    if (canvas.width !== Math.floor(W * dpr) || canvas.height !== Math.floor(H * dpr)) { canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let lastInfoKey = '', lastListKey = '';
  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (!st.active) return;
    const dt = Math.min(0.05, (ts - lastT) / 1000 || 0);
    lastT = ts;
    if (st.auto) {
      st.zT += dt * 1.25;
      if (st.zT >= Z_MAX) { st.zT = Z_MAX; st.auto = false; syncAuto(); }
    }
    st.z += (st.zT - st.z) * Math.min(1, dt * 7);
    resize();
    draw(ts / 1000);
    const slider = root.querySelector('#scSlider');
    if (slider && document.activeElement !== slider) slider.value = st.z;
    updateReadout();
  }

  function draw(t) {
    const g = ctx;
    const band = bandAt(st.z);
    const bcol = SW.domain(band.domains[0]).color;
    g.clearRect(0, 0, W, H);
    const bg = g.createRadialGradient(W / 2, H * 0.48, 0, W / 2, H * 0.48, Math.max(W, H) * 0.75);
    bg.addColorStop(0, hexA(bcol, 0.12)); bg.addColorStop(1, 'rgba(6,8,13,0)');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);

    const scale = W / Math.pow(10, st.z);
    const cx = centerAt(st.z);
    const cy = H * 0.47;
    st.hits = [];
    const labels = [];
    for (let i = OBJECTS.length - 1; i >= 0; i--) {
      const o = OBJECTS[i];
      const dpx = o.size * scale;
      if (dpx < 1.2 || dpx > W * 60) continue;
      const x = W / 2 + (o.x - cx) * scale;
      if (x + dpx * 1.2 < -40 || x - dpx * 1.2 > W + 40) continue;
      drawObject(g, o, x, cy, dpx, t);
      st.hits.push({ o, x, y: cy, r: Math.max(dpx / 2, 6) });
      if (dpx > 10 && dpx < W * 3) labels.push({ o, x, dpx });
    }
    // etiketler (soldan sağa, çakışanları atla)
    labels.sort((a, b) => a.x - b.x);
    let lastX = -1e9;
    g.textAlign = 'center';
    labels.forEach((l) => {
      if (l.x - lastX < 92 && l.dpx < W * 0.2) return;
      const ly = cy + Math.min(l.dpx / 2, H * 0.36) + (l.o.kind === 'helix' ? Math.min(l.dpx * 0.8, H * 0.3) : 0) + 18;
      if (ly > H - 52) return;
      g.font = '700 12px Inter, system-ui, sans-serif';
      g.fillStyle = st.sel === l.o ? '#ffffff' : 'rgba(226,232,240,0.95)';
      g.fillText(l.o.name, Math.min(W - 70, Math.max(70, l.x)), ly);
      g.font = '600 10.5px "JetBrains Mono", monospace';
      g.fillStyle = SW.domain(l.o.d).color;
      g.fillText(fmtLen(l.o.size), Math.min(W - 70, Math.max(70, l.x)), ly + 14);
      lastX = l.x;
    });
    drawRuler(g);
  }

  function drawRuler(g) {
    const y = H - 26, x0 = 34, x1 = W - 34;
    const px = (z) => x0 + (z - Z_MIN) / (Z_MAX - Z_MIN) * (x1 - x0);
    BANDS.forEach((b) => {
      g.fillStyle = hexA(SW.domain(b.domains[0]).color, 0.55);
      g.fillRect(px(Math.max(Z_MIN, b.from)), y - 3, px(Math.min(Z_MAX, b.to)) - px(Math.max(Z_MIN, b.from)) - 1, 6);
    });
    g.font = '600 9.5px "JetBrains Mono", monospace'; g.fillStyle = 'rgba(148,163,184,0.85)'; g.textAlign = 'center';
    for (let e = -35; e <= 25; e += 5) g.fillText('10' + sup(e), px(e), y + 17);
    const mx = px(st.z);
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(mx, y - 6); g.lineTo(mx - 6, y - 14); g.lineTo(mx + 6, y - 14); g.closePath(); g.fill();
  }

  function updateReadout() {
    const e = Math.floor(st.z), m = Math.pow(10, st.z - e);
    const powEl = root.querySelector('#scPow');
    const width = Math.pow(10, st.z);
    if (powEl) powEl.innerHTML = `${nf(m, 2)} × 10<sup>${e}</sup> m <small>(${fmtLen(width)})</small>`;
    const near = nearestObject(st.z);
    const ratio = width / near.size;
    const hum = root.querySelector('#scHuman');
    if (hum) hum.textContent = `Ekran genişliği ≈ ${ratio >= 10 || ratio < 0.1 ? SW.fmtSci(ratio, 1) : nf(ratio, 1)} × ${near.name.toLocaleLowerCase('tr-TR')}`;
    const band = bandAt(st.z);
    const bn = root.querySelector('#scBandName');
    if (bn) { bn.textContent = band.title; bn.style.color = SW.domain(band.domains[0]).color; }
    const zl = root.querySelector('#scZLabel');
    if (zl) zl.textContent = '10' + sup(Math.round(st.z)) + ' m';
    if (!st.selLock && st.sel !== near) st.sel = near;
    const key = st.sel && st.sel.id;
    if (key !== lastInfoKey) { lastInfoKey = key; renderInfo(); }
    const vis = st.hits.map((h) => h.o).filter((o, i, a) => a.indexOf(o) === i).sort((a, b) => a.size - b.size);
    const lk = vis.map((o) => o.id).join(',');
    if (lk !== lastListKey) {
      lastListKey = lk;
      const list = root.querySelector('#scList');
      if (list) list.innerHTML = vis.length ? vis.map((o) => `<button class="sc-item" data-obj="${o.id}" style="--c:${SW.domain(o.d).color}"><b>${SW.esc(o.name)}</b><small>${fmtLen(o.size)}</small></button>`).join('') : '<p class="sc-hint">Bu ölçekte görünür nesne yok — tekerlekle ilerleyin.</p>';
    }
  }

  function renderInfo() {
    const box = root && root.querySelector('#scInfo');
    const o = st.sel;
    if (!box || !o) return;
    const d = SW.domain(o.d);
    const art = o.art && SW.getArticle(o.art);
    const lab = o.lab && SW.lab(o.lab);
    box.innerHTML = `
      <div class="hud-title"><span>Seçili Nesne</span><span class="dom-chip" style="--c:${d.color}">${d.icon} ${d.name}</span></div>
      <h3 class="sc-objname">${SW.esc(o.name)}</h3>
      <div class="telemetry-grid">
        <div class="tel-card"><small>Boyut</small><b>${fmtLen(o.size)}</b></div>
        <div class="tel-card"><small>Metre</small><b>${SW.fmtSci(o.size, 2)} m</b></div>
      </div>
      <p class="sc-note">${SW.esc(o.note)}</p>
      <div class="sc-actions">
        ${art ? `<button class="lp-btn" style="--c:${d.color}" data-article="${o.art}">📖 Maddeyi oku</button>` : ''}
        ${lab ? `<button class="lp-btn primary" style="--c:${lab.color}" data-embed="${o.lab}" data-hash="${o.hash || ''}">▶ Simülasyon: ${SW.esc(lab.name)}</button>` : ''}
      </div>`;
  }

  // Arama paleti: her nesne bir arama öğesi
  SW.addSearchItems(OBJECTS.map((o) => ({
    type: 'Ölçek', title: `📏 ${o.name} — ${fmtLen(o.size)}`, subtitle: o.note, keywords: `ölçek boyut ${o.d}`,
    action: () => SW.go('#/scale/' + o.id)
  })));

  SW.registerView('scale', {
    init(rootEl) { render(rootEl); raf = requestAnimationFrame(frame); },
    show(params) {
      st.active = true;
      const id = params && params.sub;
      const o = id && OBJECTS.find((x) => x.id === id);
      if (o) { st.sel = o; st.selLock = true; st.auto = false; syncAuto(); st.zT = o.f; if (Math.abs(st.z - o.f) > 8) st.z = o.f - 1.5; renderInfo(); }
    },
    hide() { st.active = false; st.auto = false; syncAuto(); }
  });

  window.SW_SCALE = { OBJECTS, BANDS, fmtLen };
})();
