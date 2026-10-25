/* ============================================================================
   scienceWiki — MAKALE ŞEMASI + Örnek köprü maddesi (Karbon-14)
   ----------------------------------------------------------------------------
   SW.addArticles([{
     id:        'kebab-case-benzersiz',
     title:     'Madde başlığı',
     domain:    'chem' | 'phys' | 'bio' | 'stats' | 'space',   // ana bilim dalı
     bridges:   ['phys','chem',...],   // dokunduğu TÜM dallar (≥2 ise "köprü kavram")
     tags:      ['anahtar', 'kelimeler'],
     summary:   'Tek cümlelik özet',
     intuitive: 'HTML · Feynman tekniği: sıfır jargon, günlük hayat benzetmeleri ($inline LaTeX$ olur)',
     history:   'HTML · Kim, ne zaman, nasıl buldu? Problem, deney düzeneği, kırılma anı',
     scientists:[{ name, year, note }],
     formulas:  [{ tex, desc, vars: [{ sym (LaTeX), name, unit, value? }] }],
     calc:      { title, inputs: [{ id, label, value, min, max, step, unit? }],
                  compute: (v) => ({ label, value: Number, unit, note? }) },   // mini hesaplayıcı
     perDomain: { chem:'…', phys:'…', bio:'…', stats:'…', space:'…' },     // köprü paneli metinleri
     sim:       [{ lab: 'affeSpace', hash: '#mod1', label: 'Karadeliğe Düşüş' }],  // config/labs.js anahtarları
     related:   ['diger-madde-id', ...],    // kavram ağındaki kenarlar
     refs:      ['Kaynakça satırları']
   }])
   ============================================================================ */
window.SW.addArticles([
  {
    id: 'karbon-14',
    title: 'Karbon-14 ve Radyokarbon Tarihleme',
    domain: 'phys',
    bridges: ['chem', 'phys', 'bio', 'stats', 'space'],
    tags: ['izotop', 'beta bozunumu', 'yarı ömür', 'radyokarbon', 'arkeoloji', 'kozmik ışın', 'üstel bozunma'],
    summary: 'Kozmik ışınların atmosferde ürettiği, canlılara karışan ve 5730 yıllık yarı ömürle bozunarak "atom saati" görevi gören karbon izotopu.',
    intuitive: 'Her canlı yaşarken havadaki karbonu (bitkiler fotosentezle, hayvanlar bitkileri yiyerek) vücuduna alır. Bu karbonun çok küçük bir kısmı radyoaktif <b>karbon-14</b>\'tür ve oranı atmosferle hep aynı kalır. Canlı ölünce yeni karbon alamaz; içindeki ¹⁴C tıpkı bir <b>kum saati</b> gibi yavaş yavaş azalır: her 5730 yılda yarıya iner. Bir kemikte kalan ¹⁴C oranını ölçerek "kum saatinin ne kadar süredir aktığını", yani canlının ne zaman öldüğünü bulabiliriz. Tek bir atomun ne zaman bozunacağı tamamen rastgeledir (bir zar atışı gibi), ama trilyonlarcası bir araya gelince bozunma kusursuz bir üstel eğri çizer — istatistiğin en güzel örneklerinden biri.',
    history: '<b>Martin Kamen ve Sam Ruben</b> 1940\'ta Berkeley\'de siklotronla ¹⁴C\'yi ilk kez üretti. <b>Willard Libby</b> 1946–1949\'da kozmik ışınların atmosferde sürekli ¹⁴C ürettiğini ve canlıların bu dengeyi paylaştığını fark etti; yaşı bilinen Mısır firavun mezarlarındaki ahşaplarla yöntemini kalibre etti ve 1960 Nobel Kimya Ödülü\'nü aldı. Bugün hızlandırıcı kütle spektrometresi (AMS) ile birkaç miligram örnekten ~50.000 yıla kadar tarihleme yapılır; Torino Kefeni ve Ötzi buz adamı bu yöntemle tarihlendi.',
    scientists: [
      { name: 'Willard Libby', year: 1949, note: 'Radyokarbon tarihleme yöntemi (1960 Nobel Kimya)' },
      { name: 'Martin Kamen', year: 1940, note: '¹⁴C\'nin keşfi (Sam Ruben ile)' }
    ],
    formulas: [
      { tex: '{}^{14}_{\\;6}\\mathrm{C} \\to {}^{14}_{\\;7}\\mathrm{N} + e^- + \\bar{\\nu}_e', desc: 'Beta-eksi bozunumu: bir nötron protona dönüşür.', vars: [{ sym: 'e^-', name: 'Elektron (beta parçacığı)', unit: '—' }, { sym: '\\bar{\\nu}_e', name: 'Elektron antinötrinosu', unit: '—' }] },
      { tex: 'N(t) = N_0\\, e^{-\\lambda t},\\quad \\lambda = \\frac{\\ln 2}{t_{1/2}}', desc: 'Üstel bozunma yasası.', vars: [{ sym: 'N_0', name: 'Başlangıçtaki ¹⁴C çekirdek sayısı', unit: 'adet' }, { sym: '\\lambda', name: 'Bozunma sabiti', unit: '1/yıl', value: '1,21 × 10⁻⁴' }, { sym: 't_{1/2}', name: 'Yarı ömür', unit: 'yıl', value: '5730' }] },
      { tex: 't = -\\frac{t_{1/2}}{\\ln 2}\\,\\ln\\frac{N}{N_0}', desc: 'Kalan orandan yaş.', vars: [{ sym: 'N/N_0', name: 'Kalan ¹⁴C oranı', unit: '—' }] }
    ],
    calc: {
      title: 'Radyokarbon yaş hesaplayıcı',
      inputs: [{ id: 'ratio', label: 'Kalan ¹⁴C oranı N/N₀', value: 0.25, min: 0.001, max: 1, step: 0.001 }],
      compute: (v) => ({ label: 'Tahmini yaş', value: -5730 / Math.LN2 * Math.log(v.ratio), unit: 'yıl', note: 'Oran 0,5 → 5730 yıl (1 yarı ömür); 0,25 → 11.460 yıl.' })
    },
    perDomain: {
      chem: 'Karbonun izotopu: 6 proton + 8 nötron. Kimyasal olarak ¹²C ile aynıdır, CO₂ ve organik moleküllere aynı şekilde bağlanır — bu yüzden canlılara fark edilmeden karışır.',
      phys: 'Kararsız çekirdek: β⁻ bozunumuyla bir nötron protona dönüşür, ¹⁴N oluşur. Zayıf nükleer kuvvetin işidir; yarı ömür 5730 yıl.',
      bio: 'Fotosentezle besin zincirine girer; canlı öldüğünde alım durur. Fosil, kemik ve ahşapların yaşı ölçülür (radyokarbon tarihleme).',
      stats: 'Her çekirdeğin bozunması rastgeledir (Poisson süreci); büyük sayılarda üstel bozunma yasası ortaya çıkar. Sayım hataları √N ile ölçeklenir.',
      space: 'Kozmik ışınların ürettiği nötronlar üst atmosferdeki ¹⁴N\'ye çarparak ¹⁴C üretir: n + ¹⁴N → ¹⁴C + p. Güneş etkinliği üretim hızını değiştirir.'
    },
    sim: [
      { lab: 'affePhysics', hash: '#mod1', label: 'Çekirdek & radyoaktivite' },
      { lab: 'affeStats', hash: '#mod2', label: 'Üstel / Poisson dağılımı' },
      { lab: 'affeSpace', hash: '#mod9', label: 'Planck & foton enerjisi' }
    ],
    related: [],
    refs: ['Libby, W. F. (1955). Radiocarbon Dating. University of Chicago Press.', 'Reimer, P. J. ve ark. (2020). IntCal20 kalibrasyon eğrisi. Radiocarbon 62(4).']
  }
]);
