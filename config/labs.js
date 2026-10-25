/* ============================================================================
   scienceWiki — MERKEZİ LABORATUVAR BAĞLANTI AYARLARI
   ----------------------------------------------------------------------------
   Demo linklerini SADECE bu dosyada güncelleyin.

   url   : Laboratuvarın yayındaki (GitHub Pages / Vercel / Netlify) adresi.
   local : scienceWiki ile aynı repoda yan yana duran klasörün göreli yolu
           (ör. affeLab-github reposunda ../bio/). Sayfa açılırken bu yol
           erişilebilirse otomatik olarak o kullanılır; değilse "url" kullanılır.
   mode  : 'auto' (önerilen) | 'remote' (her zaman url) | 'local' (her zaman local)

   Derin bağlantı (deep link): Her laboratuvar modülünü "#modN" ile açabilir,
   ör. affeSpace için ".../space/#mod8" doğrudan Güneş Sistemi'ni açar.
   ============================================================================ */
window.SW_LINK_MODE = 'auto';

window.SW_LABS = {
  affeLab: {
    domain: 'chem',
    name: 'affeLab',
    title: 'Kimya Laboratuvarı',
    icon: '🧪',
    color: '#10b981',
    url: 'https://mehmetmert.github.io/affeLab/',
    local: '../chem/',
    desc: 'Periyodik tablo, molekül çizici, kimyasal tepkimeler, asit-baz titrasyonu ve termokimya.',
    modules: [
      { hash: '', title: 'Ana laboratuvar' }
    ]
  },
  affePhysics: {
    domain: 'phys',
    name: 'affePhysics',
    title: 'Fizik & Atom Laboratuvarı',
    icon: '⚛️',
    color: '#00f2fe',
    url: 'https://mehmetmert.github.io/affePhysics/',
    local: '../phz/',
    desc: '3B kuantum atom modeli, molekül galerisi, nükleer fizik, madde–antimadde yok olması, mekanik ve optik.',
    modules: [
      { hash: '#mod1', title: '1. Kuantum Atom & Nükleer Fizik' },
      { hash: '#mod2', title: '2. Canlı Cam Lab (4 deney)' },
      { hash: '#mod3', title: '3. Mekanik & Kaos (RK4)' },
      { hash: '#mod4', title: '4. Elektromanyetizma (Maxwell)' },
      { hash: '#mod5', title: '5. Optik & Çift Yarık' },
      { hash: '#mod6', title: '6. Termodinamik & Akışkanlar' },
      { hash: '#mod7', title: '7. Görelilik & Kuantum Tünelleme' }
    ]
  },
  affeBio: {
    domain: 'bio',
    name: 'affeBio',
    title: 'Biyoloji & Anatomi Laboratuvarı',
    icon: '🧬',
    color: '#a855f7',
    url: 'https://mehmetmert.github.io/affeBio/',
    local: '../bio/',
    desc: 'Gerçek BodyParts3D verisiyle 3B insan anatomisi, 7 hücre tipi, DNA→protein, CRISPR, PCR/jel ve biyofizik.',
    modules: [
      { hash: '#mod1', title: '1. 3B İnsan Anatomisi' },
      { hash: '#mod2', title: '2. Hücre Galerisi' },
      { hash: '#mod3', title: '3. Gen → Protein, CRISPR, PCR' },
      { hash: '#mod4', title: '4. Biyofizik (Nöron, Av-Avcı)' }
    ]
  },
  affeStats: {
    domain: 'stats',
    name: 'affeStats',
    title: 'İstatistik & Olasılık Laboratuvarı',
    icon: '📊',
    color: '#f59e0b',
    url: 'https://mehmetmert.github.io/affeStats/',
    local: '../statistic/',
    desc: 'Galton tahtası, dağılım atlası ve Z/t/χ² tabloları, hipotez testleri, Bayes, regresyon, Monte Carlo ve PCA.',
    modules: [
      { hash: '#mod1', title: '1. Galton Kutusu & Merkezi Limit' },
      { hash: '#mod2', title: '2. Dağılım Atlası & Tablolar' },
      { hash: '#mod3', title: '3. Çıkarımsal İstatistik & χ²' },
      { hash: '#mod4', title: '4. Bayes Teoremi' },
      { hash: '#mod5', title: '5. Regresyon & Korelasyon' },
      { hash: '#mod6', title: '6. Monte Carlo & Markov' },
      { hash: '#mod7', title: '7. PCA & Kümeleme' },
      { hash: '#mod8', title: '8. Temel Olasılık & Ortalamalar' }
    ]
  },
  affeSpace: {
    domain: 'space',
    name: 'affeSpace',
    title: 'Uzay Bilimleri & Astrofizik',
    icon: '🌌',
    color: '#f97316',
    url: 'https://mehmetmert.github.io/affeSpace/',
    local: '../space/',
    desc: 'Karadeliğe düşüş (GPU ışın izleme), Möbius zaman modeli, yıldız evrimi, JWST, ötegezegenler, LIGO, kozmoloji, NASA canlı veri, Güneş Sistemi ve Planck.',
    modules: [
      { hash: '#mod1', title: '1. Karadelik & Möbius' },
      { hash: '#mod2', title: '2. Yıldız Evrimi & H-R' },
      { hash: '#mod3', title: '3. Uzay Teleskopları' },
      { hash: '#mod4', title: '4. Ötegezegenler' },
      { hash: '#mod5', title: '5. Kütleçekim Dalgaları (LIGO)' },
      { hash: '#mod6', title: '6. Kozmoloji' },
      { hash: '#mod7', title: '7. NASA Canlı Veri' },
      { hash: '#mod8', title: '8. Güneş Sistemi' },
      { hash: '#mod9', title: '9. Planck Sabiti' }
    ]
  }
};

window.SW_DOMAINS = {
  chem: { name: 'Kimya', lab: 'affeLab', color: '#10b981', icon: '🧪' },
  phys: { name: 'Fizik', lab: 'affePhysics', color: '#00f2fe', icon: '⚛️' },
  bio: { name: 'Biyoloji', lab: 'affeBio', color: '#a855f7', icon: '🧬' },
  stats: { name: 'İstatistik', lab: 'affeStats', color: '#f59e0b', icon: '📊' },
  space: { name: 'Uzay', lab: 'affeSpace', color: '#f97316', icon: '🌌' }
};
