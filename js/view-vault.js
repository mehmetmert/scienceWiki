/* ============================================================================
   scienceWiki — Modül 5: Evrensel Sabitler, Birim Dönüştürücü & Boyut Analizi,
   "100 Temel Denklem" Kütüphanesi (Reference Vault)
   Rotalar: #/vault/constants[/id] · #/vault/units · #/vault/equations[/id]
   Değerler: CODATA 2018 / 2019 SI yeniden tanımı (tam değerler işaretli).
   ============================================================================ */
(function () {
  'use strict';
  const SW = window.SW;

  /* --------------------------------------------------------------------------
     1. EVRENSEL SABİTLER
     -------------------------------------------------------------------------- */
  // [id, sembol (TeX), ad, değer, birim (TeX), durum, alan, not]
  const CONSTANTS = [
    ['c', 'c', 'Işığın boşluktaki hızı', 299792458, '\\mathrm{m\\,s^{-1}}', 'tam', 'phys', 'Metre 1983\'ten beri c üzerinden tanımlanır.'],
    ['h', 'h', 'Planck sabiti', 6.62607015e-34, '\\mathrm{J\\,s}', 'tam', 'phys', '2019\'dan beri kilogramı tanımlar.'],
    ['hbar', '\\hbar', 'İndirgenmiş Planck sabiti', 1.054571817e-34, '\\mathrm{J\\,s}', 'tam (türetilmiş)', 'phys', 'ħ = h/2π'],
    ['e', 'e', 'Temel yük', 1.602176634e-19, '\\mathrm{C}', 'tam', 'phys', 'Amperi tanımlar.'],
    ['kB', 'k_B', 'Boltzmann sabiti', 1.380649e-23, '\\mathrm{J\\,K^{-1}}', 'tam', 'phys', 'Kelvini tanımlar.'],
    ['NA', 'N_A', 'Avogadro sayısı', 6.02214076e23, '\\mathrm{mol^{-1}}', 'tam', 'chem', 'Molü tanımlar.'],
    ['R', 'R', 'İdeal gaz sabiti', 8.314462618, '\\mathrm{J\\,mol^{-1}\\,K^{-1}}', 'tam (türetilmiş)', 'chem', 'R = N_A · k_B'],
    ['F', 'F', 'Faraday sabiti', 96485.33212, '\\mathrm{C\\,mol^{-1}}', 'tam (türetilmiş)', 'chem', 'F = N_A · e'],
    ['sigma', '\\sigma', 'Stefan–Boltzmann sabiti', 5.670374419e-8, '\\mathrm{W\\,m^{-2}\\,K^{-4}}', 'tam (türetilmiş)', 'space', 'Karacisim toplam ışıması: σT⁴'],
    ['b', 'b', 'Wien yerdeğiştirme sabiti', 2.897771955e-3, '\\mathrm{m\\,K}', 'tam (türetilmiş)', 'space', 'λmax = b/T'],
    ['G', 'G', 'Newton kütleçekim sabiti', 6.6743e-11, '\\mathrm{m^3\\,kg^{-1}\\,s^{-2}}', 'ölçülmüş (±2,2×10⁻⁵ bağıl)', 'space', 'En az hassasiyetle bilinen temel sabit.'],
    ['me', 'm_e', 'Elektron kütlesi', 9.1093837015e-31, '\\mathrm{kg}', 'ölçülmüş', 'phys', ''],
    ['mp', 'm_p', 'Proton kütlesi', 1.67262192369e-27, '\\mathrm{kg}', 'ölçülmüş', 'phys', 'm_p / m_e ≈ 1836,15'],
    ['mn', 'm_n', 'Nötron kütlesi', 1.67492749804e-27, '\\mathrm{kg}', 'ölçülmüş', 'phys', ''],
    ['u', 'u', 'Atomik kütle birimi', 1.6605390666e-27, '\\mathrm{kg}', 'ölçülmüş', 'chem', '¹²C atomunun kütlesinin 1/12\'si'],
    ['eps0', '\\varepsilon_0', 'Boşluğun elektriksel geçirgenliği', 8.8541878128e-12, '\\mathrm{F\\,m^{-1}}', 'ölçülmüş', 'phys', '2019 sonrası artık tam değil.'],
    ['mu0', '\\mu_0', 'Boşluğun manyetik geçirgenliği', 1.25663706212e-6, '\\mathrm{N\\,A^{-2}}', 'ölçülmüş', 'phys', '≈ 4π × 10⁻⁷'],
    ['alpha', '\\alpha', 'İnce yapı sabiti', 7.2973525693e-3, '1', 'ölçülmüş', 'phys', 'α ≈ 1/137,035999 — boyutsuz.'],
    ['a0', 'a_0', 'Bohr yarıçapı', 5.29177210903e-11, '\\mathrm{m}', 'ölçülmüş', 'chem', 'Hidrojen atomunun temel hal yarıçapı.'],
    ['Rinf', 'R_\\infty', 'Rydberg sabiti', 10973731.56816, '\\mathrm{m^{-1}}', 'ölçülmüş', 'chem', 'En hassas ölçülen sabitlerden.'],
    ['KJ', 'K_J', 'Josephson sabiti', 483597.8484e9, '\\mathrm{Hz\\,V^{-1}}', 'tam (türetilmiş)', 'phys', 'K_J = 2e/h — volt standardı.'],
    ['RK', 'R_K', 'von Klitzing sabiti', 25812.80745, '\\Omega', 'tam (türetilmiş)', 'phys', 'R_K = h/e² — direnç standardı.'],
    ['eV', '\\mathrm{eV}', 'Elektronvolt', 1.602176634e-19, '\\mathrm{J}', 'tam', 'phys', ''],
    ['gn', 'g_n', 'Standart yerçekimi ivmesi', 9.80665, '\\mathrm{m\\,s^{-2}}', 'tam (tanım)', 'phys', ''],
    ['atm', '\\mathrm{atm}', 'Standart atmosfer', 101325, '\\mathrm{Pa}', 'tam (tanım)', 'chem', ''],
    ['AU', '\\mathrm{AU}', 'Astronomik birim', 149597870700, '\\mathrm{m}', 'tam (IAU 2012)', 'space', ''],
    ['ly', '\\mathrm{ly}', 'Işık yılı', 9460730472580800, '\\mathrm{m}', 'tam (tanım)', 'space', 'Jülyen yılı × c'],
    ['pc', '\\mathrm{pc}', 'Parsek', 3.0856775814913673e16, '\\mathrm{m}', 'tam (tanım)', 'space', '≈ 3,26 ışık yılı'],
    ['Msun', 'M_\\odot', 'Güneş kütlesi', 1.98847e30, '\\mathrm{kg}', 'ölçülmüş', 'space', ''],
    ['Rsun', 'R_\\odot', 'Güneş yarıçapı (nominal)', 6.957e8, '\\mathrm{m}', 'nominal (IAU)', 'space', ''],
    ['Lsun', 'L_\\odot', 'Güneş ışınımı (nominal)', 3.828e26, '\\mathrm{W}', 'nominal (IAU)', 'space', ''],
    ['H0', 'H_0', 'Hubble sabiti (Planck 2018)', 67.4, '\\mathrm{km\\,s^{-1}\\,Mpc^{-1}}', 'ölçülmüş (gerilim: SH0ES ≈ 73)', 'space', '"Hubble gerilimi" hâlâ çözülmedi.'],
    ['lP', '\\ell_P', 'Planck uzunluğu', 1.616255e-35, '\\mathrm{m}', 'türetilmiş', 'phys', '√(ħG/c³)'],
    ['tP', 't_P', 'Planck zamanı', 5.391247e-44, '\\mathrm{s}', 'türetilmiş', 'phys', '√(ħG/c⁵)'],
    ['mP', 'm_P', 'Planck kütlesi', 2.176434e-8, '\\mathrm{kg}', 'türetilmiş', 'phys', '√(ħc/G)'],
    ['TP', 'T_P', 'Planck sıcaklığı', 1.416784e32, '\\mathrm{K}', 'türetilmiş', 'phys', '√(ħc⁵/G)/k_B']
  ].map(([id, sym, name, value, unit, status, d, note]) => ({ id, sym, name, value, unit, status, d, note }));

  /* --------------------------------------------------------------------------
     2. BİRİM DÖNÜŞTÜRÜCÜ
     -------------------------------------------------------------------------- */
  const UNITS = {
    'Uzunluk': [['m', 1], ['km', 1e3], ['cm', 1e-2], ['mm', 1e-3], ['µm', 1e-6], ['nm', 1e-9], ['Å (angstrom)', 1e-10], ['pm', 1e-12], ['fm', 1e-15], ['inç', 0.0254], ['ayak (ft)', 0.3048], ['mil', 1609.344], ['deniz mili', 1852], ['AB', 149597870700], ['ışık yılı', 9460730472580800], ['parsek', 3.0856775814913673e16], ['Planck uzunluğu', 1.616255e-35]],
    'Kütle': [['kg', 1], ['g', 1e-3], ['mg', 1e-6], ['µg', 1e-9], ['ton', 1e3], ['libre (lb)', 0.45359237], ['ons (oz)', 0.028349523125], ['u (atomik kütle)', 1.6605390666e-27], ['eV/c²', 1.78266192e-36], ['Dünya kütlesi', 5.9722e24], ['Güneş kütlesi', 1.98847e30]],
    'Zaman': [['s', 1], ['ms', 1e-3], ['µs', 1e-6], ['ns', 1e-9], ['dakika', 60], ['saat', 3600], ['gün', 86400], ['hafta', 604800], ['yıl (Jülyen)', 31557600], ['yüzyıl', 3155760000], ['milyar yıl', 3.15576e16], ['Planck zamanı', 5.391247e-44]],
    'Enerji': [['J', 1], ['kJ', 1e3], ['MJ', 1e6], ['eV', 1.602176634e-19], ['keV', 1.602176634e-16], ['MeV', 1.602176634e-13], ['GeV', 1.602176634e-10], ['cal', 4.184], ['kcal', 4184], ['kWh', 3.6e6], ['erg', 1e-7], ['BTU', 1055.05585], ['ton TNT', 4.184e9]],
    'Sıcaklık': [['K', 'K'], ['°C', 'C'], ['°F', 'F']],
    'Basınç': [['Pa', 1], ['kPa', 1e3], ['MPa', 1e6], ['bar', 1e5], ['atm', 101325], ['mmHg (torr)', 133.322387415], ['psi', 6894.757293168]],
    'Hız': [['m/s', 1], ['km/s', 1e3], ['km/sa', 1 / 3.6], ['mil/sa', 0.44704], ['knot', 1852 / 3600], ['Mach (deniz sev.)', 340.3], ['ışık hızı c', 299792458]],
    'Güç': [['W', 1], ['kW', 1e3], ['MW', 1e6], ['GW', 1e9], ['beygir gücü (hp)', 745.6998715822702], ['Güneş ışınımı L☉', 3.828e26]]
  };
  function tempToK(v, u) { return u === 'K' ? v : u === 'C' ? v + 273.15 : (v - 32) * 5 / 9 + 273.15; }
  function tempFromK(k, u) { return u === 'K' ? k : u === 'C' ? k - 273.15 : (k - 273.15) * 9 / 5 + 32; }

  /* Boyut analizi: [M, L, T, I, Θ, N, J] */
  const DIMN = ['M', 'L', 'T', 'I', 'Θ', 'N', 'J'];
  const BASE = { kg: [1, 0, 0, 0, 0, 0, 0], m: [0, 1, 0, 0, 0, 0, 0], s: [0, 0, 1, 0, 0, 0, 0], A: [0, 0, 0, 1, 0, 0, 0], K: [0, 0, 0, 0, 1, 0, 0], mol: [0, 0, 0, 0, 0, 1, 0], cd: [0, 0, 0, 0, 0, 0, 1] };
  const DERIVED = {
    g: 'kg', N: 'kg*m/s^2', J: 'kg*m^2/s^2', W: 'kg*m^2/s^3', Pa: 'kg/(m*s^2)', C: 'A*s', V: 'kg*m^2/(s^3*A)', Ohm: 'kg*m^2/(s^3*A^2)',
    F: 'A^2*s^4/(kg*m^2)', T: 'kg/(s^2*A)', Wb: 'kg*m^2/(s^2*A)', H: 'kg*m^2/(s^2*A^2)', Hz: '1/s', S: 's^3*A^2/(kg*m^2)', eV: 'J', L: 'm^3',
    Wh: 'J', min: 's', h: 's', gun: 's', yil: 's', au: 'm', ly: 'm', pc: 'm', atm: 'Pa', bar: 'Pa', cal: 'J', lm: 'cd', lx: 'cd/m^2', Bq: '1/s', Gy: 'J/kg', Sv: 'J/kg', kat: 'mol/s'
  };
  const PREFIX = { k: 1, M: 1, G: 1, m: 1, u: 1, 'µ': 1, n: 1, c: 1, p: 1, f: 1, T: 1, d: 1 };
  const NAMED = [['N', 'kuvvet (newton)'], ['J', 'enerji/iş (joule)'], ['W', 'güç (watt)'], ['Pa', 'basınç (pascal)'], ['C', 'yük (coulomb)'], ['V', 'gerilim (volt)'], ['Ohm', 'direnç (ohm)'], ['F', 'sığa (farad)'], ['T', 'manyetik alan (tesla)'], ['Hz', 'frekans (hertz)'], ['Wb', 'manyetik akı (weber)'], ['H', 'indüktans (henry)'], ['J*s', 'eylem / açısal momentum (h)'], ['m/s', 'hız'], ['m/s^2', 'ivme'], ['kg*m/s', 'momentum'], ['J/K', 'entropi / ısı sığası'], ['kg/m^3', 'yoğunluk']];

  function unitDims(sym, depth) {
    if (depth > 8) throw new Error('döngü');
    if (BASE[sym]) return BASE[sym].slice();
    if (sym === 'Ω' || sym === 'ohm') sym = 'Ohm';
    if (sym === 'gün') sym = 'gun';
    if (sym === 'yıl') sym = 'yil';
    if (sym === 'AU' || sym === 'AB') sym = 'au';
    if (DERIVED[sym] != null) return parseDims(DERIVED[sym], depth + 1);
    if (sym.length > 1 && PREFIX[sym[0]] && (BASE[sym.slice(1)] || DERIVED[sym.slice(1)] != null)) return unitDims(sym.slice(1), depth + 1);
    throw new Error(`Bilinmeyen birim: "${sym}"`);
  }
  function parseDims(str, depth) {
    depth = depth || 0;
    const src = String(str).replace(/·|×/g, '*').replace(/²/g, '^2').replace(/³/g, '^3').replace(/⁻¹/g, '^-1').replace(/⁻²/g, '^-2').replace(/\s+/g, '');
    let i = 0;
    const peek = () => src[i];
    const add = (a, b, k) => a.map((v, j) => v + k * b[j]);
    function expr() {
      let v = term();
      while (peek() === '*' || peek() === '/') { const op = src[i++]; const t = term(); v = add(v, t, op === '*' ? 1 : -1); }
      return v;
    }
    function term() {
      let v = factor();
      if (peek() === '^') {
        i++;
        const m = /^[-+]?\d+(\.\d+)?/.exec(src.slice(i));
        if (!m) throw new Error('Üs bekleniyor');
        i += m[0].length;
        v = v.map((x) => x * parseFloat(m[0]));
      }
      return v;
    }
    function factor() {
      if (peek() === '(') { i++; const v = expr(); if (peek() !== ')') throw new Error('")" eksik'); i++; return v; }
      const n = /^\d+(\.\d+)?/.exec(src.slice(i));
      if (n) { i += n[0].length; return [0, 0, 0, 0, 0, 0, 0]; }
      const m = /^[A-Za-zΩµçğıöşüÇĞİÖŞÜ]+/.exec(src.slice(i));
      if (!m) throw new Error(`Beklenmeyen karakter: "${src[i] || 'son'}"`);
      i += m[0].length;
      return unitDims(m[0], depth);
    }
    const v = expr();
    if (i < src.length) throw new Error(`Beklenmeyen karakter: "${src[i]}"`);
    return v.map((x) => Math.round(x * 1000) / 1000);
  }
  const SUP = { '-': '⁻', '.': '·', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (n) => String(n).split('').map((c) => SUP[c] || c).join('');
  function dimString(v) {
    const p = v.map((x, j) => (x ? `${DIMN[j]}${x === 1 ? '' : sup(x)}` : '')).filter(Boolean);
    return p.length ? p.join(' ') : 'boyutsuz (1)';
  }
  function siString(v) {
    const names = ['kg', 'm', 's', 'A', 'K', 'mol', 'cd'];
    const p = v.map((x, j) => (x ? `${names[j]}${x === 1 ? '' : sup(x)}` : '')).filter(Boolean);
    return p.length ? p.join('·') : '1';
  }
  function namedOf(v) {
    const k = v.join(',');
    const hit = NAMED.find(([s]) => { try { return parseDims(s).join(',') === k; } catch (_) { return false; } });
    return hit ? `${hit[0] === 'Ohm' ? 'Ω' : hit[0]} — ${hit[1]}` : '';
  }

  /* --------------------------------------------------------------------------
     3. 100 TEMEL DENKLEM (her alandan 20)
     [alan, ad, tex, açıklama, bağlantı{art, lab, hash}]
     -------------------------------------------------------------------------- */
  const EQ = [
    // ---------- KİMYA ----------
    ['chem', 'İdeal gaz yasası', 'PV = nRT', 'Basınç, hacim, mol sayısı ve sıcaklık arasındaki ilişki.', { lab: 'affeLab' }],
    ['chem', 'Mol sayısı', 'n = \\frac{m}{M} = \\frac{N}{N_A}', 'Kütle/mol kütlesi veya tanecik sayısı/Avogadro sayısı.', { lab: 'affeLab' }],
    ['chem', 'pH tanımı', '\\mathrm{pH} = -\\log_{10}[\\mathrm{H^+}]', 'Asitliğin logaritmik ölçüsü.', { lab: 'affeLab' }],
    ['chem', 'Henderson–Hasselbalch', '\\mathrm{pH} = \\mathrm{p}K_a + \\log_{10}\\frac{[\\mathrm{A^-}]}{[\\mathrm{HA}]}', 'Tampon çözeltilerin pH değeri.', { lab: 'affeLab' }],
    ['chem', 'Suyun iyon çarpımı', 'K_w = [\\mathrm{H^+}][\\mathrm{OH^-}] = 1{,}0\\times 10^{-14}', '25 °C\'de suyun öziyonlaşma dengesi.', { lab: 'affeLab' }],
    ['chem', 'Denge sabiti', 'K_c = \\frac{[C]^c\\,[D]^d}{[A]^a\\,[B]^b}', 'aA + bB ⇌ cC + dD tepkimesi için kütle etkisi yasası.', { lab: 'affeLab' }],
    ['chem', 'Gibbs serbest enerjisi', '\\Delta G = \\Delta H - T\\,\\Delta S', 'ΔG < 0 ise tepkime kendiliğinden yürür.', { lab: 'affeLab' }],
    ['chem', 'Serbest enerji ve denge', '\\Delta G^\\circ = -RT\\ln K', 'Standart serbest enerji ile denge sabiti arasındaki köprü.', { lab: 'affeLab' }],
    ['chem', 'Nernst denklemi', 'E = E^\\circ - \\frac{RT}{nF}\\ln Q', 'Derişime bağlı elektrot potansiyeli.', { lab: 'affeLab' }],
    ['chem', 'Arrhenius denklemi', 'k = A\\,e^{-E_a/RT}', 'Tepkime hız sabitinin sıcaklıkla değişimi.', { lab: 'affeLab' }],
    ['chem', 'Hız yasası', 'r = k\\,[A]^m[B]^n', 'Tepkime hızının derişimlere bağlılığı; m, n deneyle bulunur.', { lab: 'affeLab' }],
    ['chem', 'Birinci dereceden kinetik', '\\ln[A] = \\ln[A]_0 - kt', 'Radyoaktif bozunma da birinci derecedendir.', { art: 'karbon-14' }],
    ['chem', 'Hess yasası', '\\Delta H^\\circ = \\sum \\Delta H_f^\\circ(\\text{\\"{u}r\\"{u}n}) - \\sum \\Delta H_f^\\circ(\\text{girdi})', 'Tepkime entalpisi izlenen yoldan bağımsızdır (ürünler − girenler).', { lab: 'affeLab' }],
    ['chem', 'Isı alışverişi', 'q = m\\,c\\,\\Delta T', 'Kalorimetre: kütle × öz ısı × sıcaklık değişimi.', { lab: 'affeLab' }],
    ['chem', 'Beer–Lambert yasası', 'A = \\varepsilon\\, l\\, c', 'Soğurganlık derişimle doğru orantılıdır (spektrofotometri).', { lab: 'affeLab' }],
    ['chem', 'Raoult yasası', 'P_A = x_A\\,P_A^{*}', 'İdeal çözeltide bileşenin buhar basıncı.', { lab: 'affeLab' }],
    ['chem', 'Ozmotik basınç', '\\Pi = i\\,M\\,R\\,T', 'Van \'t Hoff denklemi; hücre zarı ve diyaliz.', { lab: 'affeBio', hash: '#mod2' }],
    ['chem', 'Kaynama noktası yükselmesi', '\\Delta T_b = i\\,K_b\\,m', 'Koligatif özellik: çözünen tanecik sayısına bağlıdır.', { lab: 'affeLab' }],
    ['chem', 'Graham difüzyon yasası', '\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}', 'Hafif gazlar daha hızlı yayılır.', { lab: 'affeLab' }],
    ['chem', 'Clausius–Clapeyron', '\\ln\\frac{P_2}{P_1} = -\\frac{\\Delta H_{vap}}{R}\\left(\\frac{1}{T_2}-\\frac{1}{T_1}\\right)', 'Buhar basıncının sıcaklıkla değişimi.', { lab: 'affeLab' }],
    // ---------- FİZİK ----------
    ['phys', 'Newton\'un ikinci yasası', '\\vec F = m\\,\\vec a', 'Kuvvet, kütle ile ivmenin çarpımıdır.', { lab: 'affePhysics', hash: '#mod1' }],
    ['phys', 'Evrensel kütleçekim', 'F = G\\frac{m_1 m_2}{r^2}', 'İki kütle arasındaki çekim kuvveti.', { art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' }],
    ['phys', 'Kinetik enerji', 'E_k = \\tfrac{1}{2} m v^2', 'Hareket enerjisi.', { lab: 'affePhysics', hash: '#mod1' }],
    ['phys', 'Kütle–enerji eşdeğerliği', 'E = mc^2', 'Einstein 1905: kütle bir enerji biçimidir.', { art: 'karadelikler', lab: 'affeSpace', hash: '#mod5' }],
    ['phys', 'Lorentz faktörü', '\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}', 'Hızlı hareket eden saatler yavaşlar, cetveller kısalır.', { lab: 'affeSpace', hash: '#mod1' }],
    ['phys', 'Foton enerjisi', 'E = h\\nu = \\frac{hc}{\\lambda}', 'Planck–Einstein bağıntısı.', { art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' }],
    ['phys', 'de Broglie dalga boyu', '\\lambda = \\frac{h}{p}', 'Her parçacığın bir dalga boyu vardır.', { art: 'atom', lab: 'affePhysics', hash: '#mod1' }],
    ['phys', 'Heisenberg belirsizlik ilkesi', '\\Delta x\\,\\Delta p \\ge \\frac{\\hbar}{2}', 'Konum ve momentum aynı anda keyfi kesinlikte bilinemez.', { art: 'atom' }],
    ['phys', 'Schrödinger denklemi', 'i\\hbar\\frac{\\partial \\psi}{\\partial t} = \\hat H \\psi', 'Kuantum durumunun zamanla evrimi.', { art: 'atom', lab: 'affePhysics', hash: '#mod1' }],
    ['phys', 'Bohr enerji düzeyleri', 'E_n = -\\frac{13{,}6\\ \\mathrm{eV}}{n^2}', 'Hidrojen atomunun kuantumlu enerji düzeyleri.', { art: 'atom', lab: 'affePhysics', hash: '#mod1' }],
    ['phys', 'Coulomb yasası', 'F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}', 'Elektrik yükleri arasındaki kuvvet.', { lab: 'affePhysics', hash: '#mod1' }],
    ['phys', 'Ohm yasası', 'V = I\\,R', 'Gerilim, akım ve direnç ilişkisi.', {}],
    ['phys', 'Gauss yasası (Maxwell I)', '\\nabla \\cdot \\vec E = \\frac{\\rho}{\\varepsilon_0}', 'Elektrik alanın kaynağı yüklerdir.', {}],
    ['phys', 'Manyetik tek kutup yok (Maxwell II)', '\\nabla \\cdot \\vec B = 0', 'Manyetik alan çizgileri kapalıdır.', {}],
    ['phys', 'Faraday indüksiyon yasası (Maxwell III)', '\\nabla \\times \\vec E = -\\frac{\\partial \\vec B}{\\partial t}', 'Değişen manyetik alan elektrik alan üretir.', {}],
    ['phys', 'Ampère–Maxwell yasası (Maxwell IV)', '\\nabla \\times \\vec B = \\mu_0 \\vec J + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec E}{\\partial t}', 'Akımlar ve değişen elektrik alan manyetik alan üretir; ışığın dalga denklemi buradan çıkar.', {}],
    ['phys', 'Lorentz kuvveti', '\\vec F = q\\left(\\vec E + \\vec v \\times \\vec B\\right)', 'Yüklü parçacığa etki eden elektromanyetik kuvvet.', {}],
    ['phys', 'Boltzmann entropisi', 'S = k_B \\ln W', 'Entropi, mikro durum sayısının logaritmasıdır.', { lab: 'affeStats', hash: '#mod6' }],
    ['phys', 'Termodinamiğin birinci yasası', '\\Delta U = Q - W', 'Enerji korunur: iç enerji değişimi = alınan ısı − yapılan iş.', {}],
    ['phys', 'Snell kırılma yasası', 'n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2', 'Işığın ortam değiştirirken kırılması.', {}],
    // ---------- BİYOLOJİ ----------
    ['bio', 'Hardy–Weinberg dengesi', 'p^2 + 2pq + q^2 = 1', 'Evrilmeyen bir popülasyonda genotip frekansları.', { art: 'santral-dogma', lab: 'affeStats', hash: '#mod8' }],
    ['bio', 'Lotka–Volterra (av-avcı)', '\\frac{dx}{dt} = \\alpha x - \\beta x y,\\quad \\frac{dy}{dt} = \\delta x y - \\gamma y', 'Av ve avcı popülasyonlarının döngüsel dalgalanması.', { lab: 'affeBio', hash: '#mod4' }],
    ['bio', 'Lojistik büyüme', '\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)', 'Taşıma kapasitesi K ile sınırlı büyüme.', { lab: 'affeBio', hash: '#mod4' }],
    ['bio', 'Üstel büyüme', 'N(t) = N_0\\,e^{rt}', 'Sınırsız kaynakta bakteri çoğalması.', { lab: 'affeBio', hash: '#mod4' }],
    ['bio', 'Michaelis–Menten kinetiği', 'v = \\frac{V_{max}[S]}{K_m + [S]}', 'Enzim tepkime hızının substrat derişimine bağlılığı.', { art: 'hucre-organelleri-atp' }],
    ['bio', 'Nernst (membran) potansiyeli', 'E_{ion} = \\frac{RT}{zF}\\ln\\frac{[\\text{ion}]_{d}}{[\\text{ion}]_{i}}', 'Tek bir iyon için denge potansiyeli (d: dış, i: iç).', { lab: 'affeBio', hash: '#mod4' }],
    ['bio', 'Goldman–Hodgkin–Katz', 'V_m = \\frac{RT}{F}\\ln\\frac{P_K[K^+]_d + P_{Na}[Na^+]_d + P_{Cl}[Cl^-]_i}{P_K[K^+]_i + P_{Na}[Na^+]_i + P_{Cl}[Cl^-]_d}', 'Dinlenim zar potansiyeli (~ −70 mV).', { lab: 'affeBio', hash: '#mod4' }],
    ['bio', 'Hodgkin–Huxley', 'C_m\\frac{dV}{dt} = -\\bar g_{Na} m^3 h (V - E_{Na}) - \\bar g_K n^4 (V - E_K) - g_L (V - E_L) + I', 'Aksiyon potansiyelinin iyon kanalı modeli (1952).', { lab: 'affeBio', hash: '#mod4' }],
    ['bio', 'Fotosentez', '6\\,\\mathrm{CO_2} + 6\\,\\mathrm{H_2O} \\xrightarrow{h\\nu} \\mathrm{C_6H_{12}O_6} + 6\\,\\mathrm{O_2}', 'Işık enerjisinin kimyasal enerjiye dönüşümü.', { art: 'hucre-organelleri-atp', lab: 'affeBio', hash: '#mod2' }],
    ['bio', 'Hücresel solunum', '\\mathrm{C_6H_{12}O_6} + 6\\,\\mathrm{O_2} \\to 6\\,\\mathrm{CO_2} + 6\\,\\mathrm{H_2O} + \\sim 30\\ \\mathrm{ATP}', 'Glukozun mitokondride enerjiye dönüşümü.', { art: 'hucre-organelleri-atp', lab: 'affeBio', hash: '#mod2' }],
    ['bio', 'ATP hidrolizi', '\\mathrm{ATP} + \\mathrm{H_2O} \\to \\mathrm{ADP} + \\mathrm{P_i},\\quad \\Delta G^{\\circ\\prime} \\approx -30{,}5\\ \\mathrm{kJ/mol}', 'Hücrenin enerji para birimi.', { art: 'hucre-organelleri-atp' }],
    ['bio', 'Fick difüzyon yasası', 'J = -D\\,\\frac{dc}{dx}', 'Maddeler derişimin yüksek olduğu yerden düşüğe yayılır.', { lab: 'affeBio', hash: '#mod2' }],
    ['bio', 'Poiseuille yasası (kan akışı)', 'Q = \\frac{\\pi r^4 \\Delta P}{8\\eta L}', 'Damar yarıçapı %10 daralınca akış ~%35 azalır (r⁴).', { art: 'insan-anatomisi', lab: 'affeBio', hash: '#mod1' }],
    ['bio', 'Kalp debisi', 'CO = HR \\times SV', 'Dakikalık kan miktarı = kalp hızı × atım hacmi (~5 L/dk).', { art: 'insan-anatomisi', lab: 'affeBio', hash: '#mod1' }],
    ['bio', 'Kleiber yasası', 'B \\propto M^{3/4}', 'Metabolizma hızı vücut kütlesinin 3/4 kuvvetiyle ölçeklenir.', {}],
    ['bio', 'Kalıtsallık', 'h^2 = \\frac{V_A}{V_P}', 'Fenotipik varyansın eklemeli genetik varyansla açıklanan payı.', { lab: 'affeStats', hash: '#mod5' }],
    ['bio', 'Yetiştiricinin denklemi', 'R = h^2 S', 'Seçilime yanıt = kalıtsallık × seçilim diferansiyeli.', {}],
    ['bio', 'SIR salgın modeli', '\\frac{dS}{dt} = -\\beta \\frac{S I}{N},\\quad \\frac{dI}{dt} = \\beta \\frac{S I}{N} - \\gamma I', 'Duyarlı–enfekte–iyileşen popülasyon dinamiği.', { lab: 'affeStats', hash: '#mod6' }],
    ['bio', 'Temel üreme sayısı', 'R_0 = \\frac{\\beta}{\\gamma}', 'R₀ > 1 ise salgın büyür.', { lab: 'affeStats', hash: '#mod6' }],
    ['bio', 'Shannon çeşitlilik indeksi', "H' = -\\sum_{i} p_i \\ln p_i", 'Ekosistemdeki tür çeşitliliğinin ölçüsü.', { lab: 'affeStats', hash: '#mod8' }],
    // ---------- İSTATİSTİK ----------
    ['stats', 'Aritmetik ortalama', '\\bar x = \\frac{1}{n}\\sum_{i=1}^{n} x_i', 'Verinin ağırlık merkezi.', { lab: 'affeStats', hash: '#mod8' }],
    ['stats', 'Örneklem varyansı', 's^2 = \\frac{1}{n-1}\\sum_{i=1}^{n} (x_i - \\bar x)^2', 'Bessel düzeltmeli (n−1) yansız varyans.', { lab: 'affeStats', hash: '#mod2' }],
    ['stats', 'Normal dağılım', 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}', 'Çan eğrisi; Merkezi Limit Teoremi\'nin çekim noktası.', { lab: 'affeStats', hash: '#mod2' }],
    ['stats', 'Z skoru', 'z = \\frac{x - \\mu}{\\sigma}', 'Bir değerin ortalamadan kaç standart sapma uzak olduğu.', { lab: 'affeStats', hash: '#mod2' }],
    ['stats', 'Merkezi Limit Teoremi', '\\bar X_n \\approx \\mathcal{N}\\!\\left(\\mu, \\frac{\\sigma^2}{n}\\right)', 'Örneklem ortalamaları, popülasyon dağılımı ne olursa olsun normale yaklaşır.', { lab: 'affeStats', hash: '#mod1' }],
    ['stats', 'Bayes teoremi', 'P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)}', 'Kanıtla inancı güncelleme.', { lab: 'affeStats', hash: '#mod4' }],
    ['stats', 'Binom dağılımı', 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}', 'n denemede k başarı olasılığı.', { lab: 'affeStats', hash: '#mod1' }],
    ['stats', 'Poisson dağılımı', 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}', 'Nadir olayların sayısı (bozunma, çağrı, mutasyon).', { art: 'karbon-14', lab: 'affeStats', hash: '#mod2' }],
    ['stats', 't istatistiği', 't = \\frac{\\bar x - \\mu_0}{s/\\sqrt{n}}', 'Gosset\'in küçük örneklem testi.', { lab: 'affeStats', hash: '#mod3' }],
    ['stats', 'Ki-kare istatistiği', '\\chi^2 = \\sum_{i} \\frac{(O_i - E_i)^2}{E_i}', 'Gözlenen ve beklenen frekansların uyumu.', { lab: 'affeStats', hash: '#mod3' }],
    ['stats', 'Güven aralığı', '\\bar x \\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}', 'Gerçek ortalamanın %95 güvenle bulunduğu aralık (z = 1,96).', { lab: 'affeStats', hash: '#mod3' }],
    ['stats', 'Pearson korelasyonu', 'r = \\frac{\\sum (x_i - \\bar x)(y_i - \\bar y)}{\\sqrt{\\sum (x_i - \\bar x)^2 \\sum (y_i - \\bar y)^2}}', 'Doğrusal ilişkinin gücü (−1 … +1).', { lab: 'affeStats', hash: '#mod5' }],
    ['stats', 'En küçük kareler eğimi', '\\hat\\beta_1 = \\frac{\\sum (x_i - \\bar x)(y_i - \\bar y)}{\\sum (x_i - \\bar x)^2}', 'OLS regresyon doğrusunun eğimi.', { lab: 'affeStats', hash: '#mod5' }],
    ['stats', 'Belirlilik katsayısı', 'R^2 = 1 - \\frac{SS_{res}}{SS_{tot}}', 'Modelin açıkladığı varyans oranı.', { lab: 'affeStats', hash: '#mod5' }],
    ['stats', 'Beklenen değer', 'E[X] = \\sum_{i} x_i\\, p_i', 'Uzun vadeli ortalama sonuç.', { lab: 'affeStats', hash: '#mod8' }],
    ['stats', 'Büyük Sayılar Yasası', '\\lim_{n \\to \\infty} P\\left(\\left|\\bar X_n - \\mu\\right| > \\varepsilon\\right) = 0', 'Deneme sayısı arttıkça ortalama gerçek değere yakınsar.', { lab: 'affeStats', hash: '#mod1' }],
    ['stats', 'ANOVA F oranı', 'F = \\frac{MS_{B}}{MS_{W}}', 'Gruplar arası / grup içi ortalama kareler.', { lab: 'affeStats', hash: '#mod5' }],
    ['stats', 'Markov durağan dağılımı', '\\pi = \\pi P', 'Geçiş matrisinin sol özvektörü: uzun vadeli durum olasılıkları.', { lab: 'affeStats', hash: '#mod6' }],
    ['stats', 'Monte Carlo π tahmini', '\\pi \\approx 4\\,\\frac{N_{in}}{N}', 'Kareye atılan noktaların çeyrek daireye düşme oranı.', { lab: 'affeStats', hash: '#mod6' }],
    ['stats', 'Shannon entropisi', 'H = -\\sum_{i} p_i \\log_2 p_i', 'Bilginin bit cinsinden ölçüsü.', { lab: 'affeStats', hash: '#mod8' }],
    // ---------- UZAY ----------
    ['space', 'Kepler\'in üçüncü yasası', 'T^2 = \\frac{4\\pi^2}{GM}\\,a^3', 'Yörünge periyodunun karesi yarı büyük eksenin küpüyle orantılı.', { art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' }],
    ['space', 'Vis-viva denklemi', 'v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)', 'Eliptik yörüngede herhangi bir noktadaki hız.', { art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' }],
    ['space', 'Kaçış hızı', 'v_e = \\sqrt{\\frac{2GM}{r}}', 'Dünya için 11,2 km/s.', { lab: 'affeSpace', hash: '#mod1' }],
    ['space', 'Schwarzschild yarıçapı', 'R_s = \\frac{2GM}{c^2}', 'Olay ufkunun yarıçapı; Güneş için ~3 km.', { art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' }],
    ['space', 'Kütleçekimsel zaman genişlemesi', '\\Delta t = \\frac{\\Delta \\tau}{\\sqrt{1 - R_s/r}}', 'Karadeliğe yakın saatler uzaktakilere göre yavaş işler.', { art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' }],
    ['space', 'Hubble–Lemaître yasası', 'v = H_0\\, d', 'Uzak galaksiler uzaklıklarıyla orantılı hızla uzaklaşır.', { lab: 'affeSpace', hash: '#mod6' }],
    ['space', 'Kozmolojik kırmızıya kayma', '1 + z = \\frac{\\lambda_{obs}}{\\lambda_{emit}}', 'Gözlenen ve yayılan dalga boyu oranı.', { lab: 'affeSpace', hash: '#mod6' }],
    ['space', 'Friedmann denklemi', 'H^2 = \\frac{8\\pi G}{3}\\rho - \\frac{k c^2}{a^2} + \\frac{\\Lambda c^2}{3}', 'Evrenin genişleme hızını içeriğine bağlar.', { lab: 'affeSpace', hash: '#mod6' }],
    ['space', 'Stefan–Boltzmann ışınımı', 'L = 4\\pi R^2 \\sigma T^4', 'Bir yıldızın toplam ışınım gücü.', { art: 'yildiz-evrimi-hr', lab: 'affeSpace', hash: '#mod2' }],
    ['space', 'Wien yerdeğiştirme yasası', '\\lambda_{max} = \\frac{b}{T}', 'Sıcak yıldızlar mavi, soğuk yıldızlar kırmızıdır.', { art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' }],
    ['space', 'Planck yasası', 'B_\\lambda(T) = \\frac{2hc^2}{\\lambda^5}\\,\\frac{1}{e^{hc/\\lambda k_B T} - 1}', 'Karacisim ışımasının tayfı; kuantumun doğduğu denklem.', { art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' }],
    ['space', 'Uzaklık modülü', 'm - M = 5\\log_{10}\\frac{d}{10\\ \\mathrm{pc}}', 'Görünür ve mutlak parlaklıktan uzaklık.', { art: 'yildiz-evrimi-hr', lab: 'affeSpace', hash: '#mod2' }],
    ['space', 'Kütle–ışınım bağıntısı', 'L \\propto M^{3{,}5}', 'Anakol yıldızlarında kütle iki katına çıkınca parlaklık ~11 kat artar.', { art: 'yildiz-evrimi-hr', lab: 'affeSpace', hash: '#mod2' }],
    ['space', 'Chandrasekhar limiti', 'M_{Ch} \\approx \\frac{\\omega_3^0 \\sqrt{3\\pi}}{2}\\left(\\frac{\\hbar c}{G}\\right)^{3/2}\\frac{1}{(\\mu_e m_H)^2} \\approx 1{,}44\\, M_\\odot', 'Beyaz cücelerin üst kütle sınırı.', { art: 'notron-yildizlari-chandrasekhar', lab: 'affeSpace', hash: '#mod2' }],
    ['space', 'Transit derinliği', '\\Delta F \\approx \\left(\\frac{R_p}{R_\\star}\\right)^2', 'Gezegen geçişinde yıldız ışığındaki azalma.', { lab: 'affeSpace', hash: '#mod4' }],
    ['space', 'Radyal hız yarı genliği', 'K = \\left(\\frac{2\\pi G}{P}\\right)^{1/3} \\frac{M_p \\sin i}{M_\\star^{2/3}}', 'Gezegenin yıldızı sallama hızı (dairesel yörünge, M_p ≪ M⋆).', { lab: 'affeSpace', hash: '#mod4' }],
    ['space', 'Cıvıltı (chirp) kütlesi', '\\mathcal{M} = \\frac{(m_1 m_2)^{3/5}}{(m_1 + m_2)^{1/5}}', 'Kütleçekim dalgası frekans artışını belirleyen kütle.', { art: 'karadelikler', lab: 'affeSpace', hash: '#mod5' }],
    ['space', 'Hawking sıcaklığı', 'T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}', 'Karadeliklerin kuantum ışıması; küçük karadelikler daha sıcaktır.', { art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' }],
    ['space', 'Einstein alan denklemleri', 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}', 'Madde uzay-zamana nasıl eğileceğini, uzay-zaman maddeye nasıl hareket edeceğini söyler.', { art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' }],
    ['space', 'Drake denklemi', 'N = R_\\star\\, f_p\\, n_e\\, f_l\\, f_i\\, f_c\\, L', 'Galaksimizdeki iletişim kurabilecek uygarlık sayısının tahmini.', { lab: 'affeSpace', hash: '#mod4' }]
  ].map(([d, name, tex, desc, link], i) => ({ id: 'eq-' + (i + 1), d, name, tex, desc, link: link || {} }));

  /* --------------------------------------------------------------------------
     GÖRÜNÜM
     -------------------------------------------------------------------------- */
  const FAV_KEY = 'sw_eq_favs';
  let favs = new Set();
  try { favs = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); } catch (_) { favs = new Set(); }
  function saveFavs() { try { localStorage.setItem(FAV_KEY, JSON.stringify([...favs])); } catch (_) { /* depolama kapalı */ } }

  const st = { tab: 'constants', eqDomain: 'all', eqQuery: '', favOnly: false, cat: 'Uzunluk', from: 'm', val: 1, focus: null };
  let root;

  const nf = (x, d) => Number(x).toLocaleString('tr-TR', { maximumFractionDigits: d == null ? 6 : d });
  function sciStr(mant, exp) { return `${mant.replace('.', ',')} × 10${sup(parseInt(exp, 10))}`; }
  // Sabitler: sayının tüm anlamlı basamakları (toExponential kısaltmaz).
  function fmtVal(v) {
    if (v === 0) return '0';
    const a = Math.abs(v);
    if (a >= 1e-3 && a < 1e7) return nf(v, 12);
    const [m, e] = v.toExponential().split('e');
    return sciStr(m, e);
  }
  // Dönüştürücü: 6 anlamlı basamak.
  function fmtConv(v) {
    if (v === 0) return '0';
    const a = Math.abs(v);
    if (a >= 1e-3 && a < 1e7) return nf(Number(v.toPrecision(7)), 8);
    const [m, e] = Number(v.toPrecision(6)).toExponential().split('e');
    return sciStr(m, e);
  }
  function plainNum(v) { return String(v).replace('e', 'e'); }

  function render(rootEl) {
    root = rootEl;
    root.innerHTML = `
      <div class="vt-wrap">
        <div class="vt-tabs" role="tablist">
          <button class="vt-tab" data-tab="constants">⚛️ Evrensel Sabitler <small>${CONSTANTS.length}</small></button>
          <button class="vt-tab" data-tab="units">📐 Birim Dönüştürücü & Boyut Analizi</button>
          <button class="vt-tab" data-tab="equations">∑ 100 Temel Denklem <small>${EQ.length}</small></button>
        </div>
        <div class="vt-panel" data-panel="constants"></div>
        <div class="vt-panel" data-panel="units"></div>
        <div class="vt-panel" data-panel="equations"></div>
      </div>`;
    renderConstants();
    renderUnits();
    renderEquations();
    wire();
  }

  function renderConstants() {
    const box = root.querySelector('[data-panel="constants"]');
    box.innerHTML = `
      <div class="vt-head">
        <p>2019 SI yeniden tanımında 7 sabit (Δν<sub>Cs</sub>, c, h, e, k<sub>B</sub>, N<sub>A</sub>, K<sub>cd</sub>) <b>tam değerlere</b> sabitlendi; tüm SI birimleri artık bu sabitlerden türetilir. Diğer değerler CODATA 2018 önerilen değerleridir.</p>
      </div>
      <div class="vt-table-wrap">
        <table class="vt-table">
          <thead><tr><th>Sembol</th><th>Ad</th><th>Değer</th><th>Birim</th><th>Durum</th><th></th></tr></thead>
          <tbody>${CONSTANTS.map((c) => `
            <tr id="vt-c-${c.id}" style="--c:${SW.domain(c.d).color}">
              <td class="vt-sym">${SW.renderMath(c.sym, false)}</td>
              <td><b>${SW.esc(c.name)}</b>${c.note ? `<small>${SW.esc(c.note)}</small>` : ''}</td>
              <td class="vt-val">${fmtVal(c.value)}</td>
              <td class="vt-unit">${c.unit === '1' ? '—' : SW.renderMath(c.unit, false)}</td>
              <td><span class="vt-status${c.status.startsWith('tam') ? ' exact' : ''}">${SW.esc(c.status)}</span></td>
              <td><button class="lab-chip vt-copy" data-copy="${plainNum(c.value)}" title="Değeri kopyala">⧉</button></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`;
  }

  function renderUnits() {
    const box = root.querySelector('[data-panel="units"]');
    box.innerHTML = `
      <div class="vt-units">
        <section class="vt-card">
          <h3>📐 Birim Dönüştürücü</h3>
          <div class="vt-cats">${Object.keys(UNITS).map((k) => `<button class="lab-chip vt-cat" data-cat="${k}">${k}</button>`).join('')}</div>
          <div class="vt-convrow">
            <input id="vtVal" class="bio-input" type="number" step="any" value="${st.val}" aria-label="Değer" />
            <select id="vtFrom" class="bio-select" aria-label="Birim"></select>
          </div>
          <div class="vt-results" id="vtResults"></div>
        </section>
        <section class="vt-card">
          <h3>🧩 Boyut Analizi (M L T I Θ N J)</h3>
          <p class="vt-help">Birim ifadesi yazın: <code>kg*m^2/s^2</code>, <code>J/(mol*K)</code>, <code>N*m</code>, <code>W/m^2</code>, <code>eV</code>, <code>kWh</code>… Ön ekler (k, M, G, m, u/µ, n, c, p) desteklenir.</p>
          <input id="vtDim" class="bio-input" type="text" value="kg*m^2/s^2" spellcheck="false" />
          <div class="vt-dimout" id="vtDimOut"></div>
          <h4>⚖️ Denklem boyutça tutarlı mı?</h4>
          <div class="vt-cmp">
            <input id="vtL" class="bio-input" type="text" value="J" spellcheck="false" aria-label="Sol taraf" />
            <span>=</span>
            <input id="vtR" class="bio-input" type="text" value="kg*(m/s)^2" spellcheck="false" aria-label="Sağ taraf" />
          </div>
          <div class="lab-chip-wrap vt-presets">
            <button class="lab-chip" data-pre="J|kg*(m/s)^2">E = mc²</button>
            <button class="lab-chip" data-pre="N|kg*m/s^2">F = ma</button>
            <button class="lab-chip" data-pre="Pa*m^3|mol*(J/(mol*K))*K">PV = nRT</button>
            <button class="lab-chip" data-pre="J|(J*s)*(1/s)">E = hν</button>
            <button class="lab-chip" data-pre="m|(J*s)/(kg*m/s)">λ = h/p</button>
            <button class="lab-chip" data-pre="m/s|(m^3/(kg*s^2))*kg/m">yanlış: v² = GM/r?</button>
          </div>
          <div class="vt-cmpout" id="vtCmpOut"></div>
        </section>
      </div>`;
    syncUnitSelect();
    computeConv();
    computeDim();
    computeCmp();
  }
  function syncUnitSelect() {
    const sel = root.querySelector('#vtFrom');
    const list = UNITS[st.cat];
    if (!list.find(([n]) => n === st.from)) st.from = list[0][0];
    sel.innerHTML = list.map(([n]) => `<option${n === st.from ? ' selected' : ''}>${n}</option>`).join('');
    root.querySelectorAll('.vt-cat').forEach((b) => b.classList.toggle('active', b.dataset.cat === st.cat));
  }
  function computeConv() {
    const list = UNITS[st.cat];
    const v = parseFloat(root.querySelector('#vtVal').value);
    const out = root.querySelector('#vtResults');
    if (!isFinite(v)) { out.innerHTML = '<p class="vt-help">Bir sayı girin.</p>'; return; }
    let rows;
    if (st.cat === 'Sıcaklık') {
      const code = list.find(([n]) => n === st.from)[1];
      const k = tempToK(v, code);
      rows = list.map(([n, c]) => [n, tempFromK(k, c)]);
      if (k < 0) { out.innerHTML = '<p class="vt-err">Mutlak sıfırın (0 K = −273,15 °C) altında sıcaklık olamaz.</p>'; return; }
    } else {
      const f = list.find(([n]) => n === st.from)[1];
      const base = v * f;
      rows = list.map(([n, g]) => [n, base / g]);
    }
    out.innerHTML = rows.map(([n, x]) => `<div class="vt-res${n === st.from ? ' self' : ''}"><span>${n}</span><b>${fmtConv(x)}</b></div>`).join('');
  }
  function computeDim() {
    const out = root.querySelector('#vtDimOut');
    try {
      const v = parseDims(root.querySelector('#vtDim').value);
      const nm = namedOf(v);
      out.innerHTML = `<div class="vt-dimrow"><span>Boyut</span><b>${dimString(v)}</b></div><div class="vt-dimrow"><span>SI temel</span><b>${siString(v)}</b></div>${nm ? `<div class="vt-dimrow"><span>Adlandırılmış</span><b>${nm}</b></div>` : ''}`;
    } catch (e) { out.innerHTML = `<p class="vt-err">${SW.esc(e.message)}</p>`; }
  }
  function computeCmp() {
    const out = root.querySelector('#vtCmpOut');
    try {
      const a = parseDims(root.querySelector('#vtL').value), b = parseDims(root.querySelector('#vtR').value);
      const ok = a.join(',') === b.join(',');
      out.innerHTML = ok
        ? `<p class="vt-ok">✓ Boyutça tutarlı: her iki taraf da <b>${dimString(a)}</b></p>`
        : `<p class="vt-err">✗ Tutarsız: sol <b>${dimString(a)}</b>, sağ <b>${dimString(b)}</b> — denklemde bir hata var.</p>`;
    } catch (e) { out.innerHTML = `<p class="vt-err">${SW.esc(e.message)}</p>`; }
  }

  function renderEquations() {
    const box = root.querySelector('[data-panel="equations"]');
    box.innerHTML = `
      <div class="vt-eqbar">
        <div class="vt-eqfilters">
          <button class="dom-chip vt-eqd" data-eqd="all" style="--c:#e2e8f0">Tümü</button>
          ${Object.entries(SW.DOMAINS).map(([k, d]) => `<button class="dom-chip vt-eqd" data-eqd="${k}" style="--c:${d.color}">${d.icon} ${d.name}</button>`).join('')}
          <button class="dom-chip vt-fav" id="vtFavOnly" style="--c:#fbbf24">★ Favoriler</button>
        </div>
        <input id="vtEqQ" class="bio-input" type="search" placeholder="Denklem ara: entropi, Bayes, Kepler…" value="${SW.esc(st.eqQuery)}" />
        <span class="vt-count" id="vtEqCount"></span>
      </div>
      <div class="vt-eqgrid" id="vtEqGrid">${EQ.map((q) => {
        const d = SW.domain(q.d);
        const art = q.link.art;
        const lab = q.link.lab && SW.lab(q.link.lab);
        return `
        <article class="vt-eq" id="vt-${q.id}" data-d="${q.d}" style="--c:${d.color}">
          <header><span class="vt-eqn">${SW.esc(q.name)}</span><button class="vt-star${favs.has(q.id) ? ' on' : ''}" data-fav="${q.id}" title="Favorilere ekle">★</button></header>
          <div class="vt-eqtex">${SW.renderMath(q.tex, true)}</div>
          <p>${SW.esc(q.desc)}</p>
          <footer>
            <span class="dom-chip" style="--c:${d.color}">${d.icon} ${d.name}</span>
            ${art ? `<button class="lab-chip vt-art" data-article="${art}" data-art-id="${art}" hidden>📖 Madde</button>` : ''}
            ${lab ? `<button class="lab-chip" data-embed="${q.link.lab}" data-hash="${q.link.hash || ''}">▶ ${SW.esc(lab.name)}</button>` : ''}
          </footer>
        </article>`;
      }).join('')}</div>`;
    syncArticleLinks();
    filterEquations();
  }
  function syncArticleLinks() {
    root.querySelectorAll('.vt-art').forEach((b) => { b.hidden = !SW.getArticle(b.dataset.artId); });
  }
  function norm(s) { return String(s || '').toLocaleLowerCase('tr-TR'); }
  function filterEquations() {
    const q = norm(st.eqQuery);
    let n = 0;
    EQ.forEach((e) => {
      const el = root.querySelector('#vt-' + e.id);
      const show = (st.eqDomain === 'all' || e.d === st.eqDomain) && (!st.favOnly || favs.has(e.id)) && (!q || norm(e.name + ' ' + e.desc + ' ' + e.tex).includes(q));
      el.hidden = !show;
      if (show) n++;
    });
    root.querySelector('#vtEqCount').textContent = `${n} / ${EQ.length} denklem`;
    root.querySelectorAll('.vt-eqd').forEach((b) => b.classList.toggle('active', b.dataset.eqd === st.eqDomain));
    root.querySelector('#vtFavOnly').classList.toggle('active', st.favOnly);
  }

  function setTab(tab) {
    st.tab = tab;
    root.querySelectorAll('.vt-tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.vt-panel').forEach((p) => { p.hidden = p.dataset.panel !== tab; });
  }
  function flash(el) {
    if (!el) return;
    el.classList.remove('vt-flash'); void el.offsetWidth; el.classList.add('vt-flash');
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function wire() {
    root.addEventListener('click', (e) => {
      const t = e.target.closest('.vt-tab');
      if (t) { SW.go('#/vault/' + t.dataset.tab); return; }
      const cp = e.target.closest('[data-copy]');
      if (cp) {
        const txt = cp.dataset.copy;
        const done = () => { cp.textContent = '✓'; setTimeout(() => { cp.textContent = '⧉'; }, 1200); };
        try { navigator.clipboard.writeText(txt).then(done, done); } catch (_) { done(); }
        return;
      }
      const cat = e.target.closest('.vt-cat');
      if (cat) { st.cat = cat.dataset.cat; syncUnitSelect(); computeConv(); return; }
      const pre = e.target.closest('[data-pre]');
      if (pre) { const [l, r] = pre.dataset.pre.split('|'); root.querySelector('#vtL').value = l; root.querySelector('#vtR').value = r; computeCmp(); return; }
      const eqd = e.target.closest('.vt-eqd');
      if (eqd) { st.eqDomain = eqd.dataset.eqd; filterEquations(); return; }
      if (e.target.closest('#vtFavOnly')) { st.favOnly = !st.favOnly; filterEquations(); return; }
      const fav = e.target.closest('[data-fav]');
      if (fav) {
        const id = fav.dataset.fav;
        if (favs.has(id)) favs.delete(id); else favs.add(id);
        fav.classList.toggle('on', favs.has(id));
        saveFavs();
        if (st.favOnly) filterEquations();
      }
    });
    root.addEventListener('input', (e) => {
      if (e.target.id === 'vtVal') computeConv();
      else if (e.target.id === 'vtDim') computeDim();
      else if (e.target.id === 'vtL' || e.target.id === 'vtR') computeCmp();
      else if (e.target.id === 'vtEqQ') { st.eqQuery = e.target.value; filterEquations(); }
    });
    root.addEventListener('change', (e) => {
      if (e.target.id === 'vtFrom') { st.from = e.target.value; computeConv(); }
    });
    window.addEventListener('sw:articles', syncArticleLinks);
  }

  // Arama paleti: sabitler + denklemler
  SW.addSearchItems(CONSTANTS.map((c) => ({
    type: 'Sabit', title: `⚛️ ${c.name}`, subtitle: `${fmtVal(c.value)} · ${c.status}`, tex: c.sym,
    keywords: `${c.id} sabit ${c.note || ''} ${SW.domain(c.d).name}`,
    action: () => SW.go('#/vault/constants/' + c.id)
  })));
  SW.addSearchItems(EQ.map((q) => ({
    type: 'Denklem', title: `∑ ${q.name}`, subtitle: q.desc, tex: q.tex,
    keywords: `denklem formül ${SW.domain(q.d).name}`,
    action: () => SW.go('#/vault/equations/' + q.id)
  })));

  SW.registerView('vault', {
    init(rootEl) { render(rootEl); setTab('constants'); },
    show(params) {
      const [tab, id] = String((params && params.sub) || '').split('/');
      setTab(['constants', 'units', 'equations'].includes(tab) ? tab : st.tab || 'constants');
      if (id && tab === 'constants') flash(root.querySelector('#vt-c-' + id));
      if (id && tab === 'equations') {
        const q = EQ.find((x) => x.id === id);
        if (q) { st.eqDomain = 'all'; st.favOnly = false; st.eqQuery = ''; const qi = root.querySelector('#vtEqQ'); if (qi) qi.value = ''; filterEquations(); flash(root.querySelector('#vt-' + id)); }
      }
    },
    hide() {}
  });

  window.SW_VAULT = { CONSTANTS, EQ, parseDims };
})();
