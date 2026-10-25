/* ============================================================================
   scienceWiki — Maddeler (2/2): İstatistik · Uzay · Disiplinlerarası Köprü Kavramlar
   Şema: data/articles-0.js başlığındaki açıklamaya bakın.
   ============================================================================ */
(function () {
  'use strict';

  // Standart normal birikimli dağılım Φ(z) — Abramowitz & Stegun 7.1.26 (hata < 1,5×10⁻⁷)
  function erf(x) {
    const s = x < 0 ? -1 : 1;
    const ax = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * ax);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
    return s * y;
  }
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));

  const G = 6.6743e-11, c = 2.99792458e8, Msun = 1.98892e30, h = 6.62607015e-34;

  window.SW.addArticles([
    /* ======================================================================
       İSTATİSTİK
       ====================================================================== */
    {
      id: 'merkezi-limit-teoremi',
      title: 'Merkezi Limit Teoremi ve Galton Kutusu',
      domain: 'stats',
      bridges: ['stats', 'phys', 'bio'],
      tags: ['merkezi limit', 'Galton kutusu', 'quincunx', 'örneklem ortalaması', 'standart hata', 'çan eğrisi', 'binom dağılımı'],
      summary: 'Birbirinden bağımsız çok sayıda küçük rastlantının toplamı, başlangıçtaki dağılım ne olursa olsun çan eğrisine (normal dağılıma) yaklaşır.',
      intuitive: `Bir tahtaya çivi sıraları çakın ve tepeden bilyeler bırakın. Her bilye her çiviye çarptığında yazı-tura atar gibi <b>sola ya da sağa</b> sapar. Tek bir bilyenin nereye düşeceğini bilemezsiniz; ama binlerce bilye bıraktığınızda alttaki bölmelerde her seferinde aynı şekil belirir: ortada yüksek, kenarlara doğru simetrik biçimde azalan bir <b>çan eğrisi</b>. Neden? Çünkü bilyenin son konumu, onlarca küçük ve birbirinden bağımsız "sağ/sol" kararının <b>toplamıdır</b> ve ortaya yakın sonuçlara giden yol sayısı, kenarlara gidenlerden kat kat fazladır.<br><br>Merkezi limit teoremi bunun evrensel olduğunu söyler: zarlar, boy uzunlukları, ölçüm hataları… Birçok bağımsız etkinin toplamı ya da ortalaması alındığında, tek tek etkilerin dağılımı ne kadar tuhaf olursa olsun sonuç normal dağılıma yaklaşır. Üstelik ortalamanın yayılımı örneklem büyüdükçe $\\sigma/\\sqrt{n}$ hızında daralır: 100 kişilik bir anket, 25 kişilik bir anketten <b>iki kat</b> daha kesindir (dört kat değil).`,
      history: `<b>Abraham de Moivre</b> 1733'te Londra'da kumarbazlar için yazı-tura hesaplarken, çok sayıda atışın binom dağılımının bir çan eğrisine yaklaştığını gösterdi — teoremin ilk özel hâli. <b>Pierre-Simon Laplace</b> 1810'da bunu herhangi bir dağılımın toplamına genelleştirdi ve astronomik gözlem hatalarına uyguladı. <b>Francis Galton</b> 1873'te bu fikri herkesin görebileceği bir düzeneğe dönüştürdü: Londra Kraliyet Enstitüsü'nde gösterdiği <b>quincunx</b> (bugün "Galton kutusu"), 1889'daki <i>Natural Inheritance</i> kitabının kalbiydi; Galton kalıtımsal özelliklerin neden çan eğrisi çizdiğini bununla açıkladı. Kesin matematiksel kanıtı <b>Aleksandr Lyapunov</b> 1901'de verdi; "merkezi limit teoremi" adını ise <b>George Pólya</b> 1920'de koydu (olasılık kuramındaki "merkezi" önemine atfen).`,
      scientists: [
        { name: 'Abraham de Moivre', year: 1733, note: 'Binomdan normale yaklaşım' },
        { name: 'Pierre-Simon Laplace', year: 1810, note: 'Genel merkezi limit teoremi' },
        { name: 'Francis Galton', year: 1889, note: 'Quincunx / Galton kutusu' },
        { name: 'Aleksandr Lyapunov', year: 1901, note: 'Kesin kanıt' }
      ],
      formulas: [
        { tex: 'Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \\xrightarrow{\\;d\\;} \\mathcal{N}(0,1)', desc: 'Standartlaştırılmış örneklem ortalaması, n büyüdükçe standart normal dağılıma yakınsar.', vars: [{ sym: '\\bar{X}_n', name: 'n gözlemin ortalaması', unit: 'ölçülen nicelik' }, { sym: '\\mu', name: 'Anakütle ortalaması', unit: 'ölçülen nicelik' }, { sym: '\\sigma', name: 'Anakütle standart sapması', unit: 'ölçülen nicelik' }, { sym: 'n', name: 'Örneklem büyüklüğü', unit: 'adet' }] },
        { tex: 'P(K = k) = \\binom{n}{k} p^k (1-p)^{n-k}', desc: 'Galton kutusu: n çivi sırasından sonra bilyenin k kez sağa sapma olasılığı (binom dağılımı).', vars: [{ sym: 'n', name: 'Çivi sırası sayısı', unit: 'adet' }, { sym: 'k', name: 'Sağa sapma sayısı (bölme numarası)', unit: 'adet' }, { sym: 'p', name: 'Tek çivide sağa sapma olasılığı', unit: '—', value: '0,5' }] },
        { tex: '\\mathrm{SH} = \\frac{\\sigma}{\\sqrt{n}}', desc: 'Ortalamanın standart hatası: kesinlik örneklem büyüklüğünün karekökü ile artar.', vars: [{ sym: '\\mathrm{SH}', name: 'Standart hata', unit: 'ölçülen nicelik' }, { sym: '\\sigma', name: 'Tek gözlemin standart sapması', unit: 'ölçülen nicelik' }, { sym: 'n', name: 'Örneklem büyüklüğü', unit: 'adet' }] }
      ],
      calc: {
        title: 'Standart hata hesaplayıcı',
        inputs: [
          { id: 'sigma', label: 'Tek ölçümün standart sapması σ', value: 15, min: 0.01, max: 1000, step: 0.01 },
          { id: 'n', label: 'Örneklem büyüklüğü n', value: 25, min: 1, max: 100000, step: 1 }
        ],
        compute: (v) => ({ label: 'Ortalamanın standart hatası σ/√n', value: v.sigma / Math.sqrt(v.n), unit: '', note: 'n\'yi 4 katına çıkarmak standart hatayı yalnızca yarıya indirir.' })
      },
      perDomain: {
        stats: 'İstatistiksel çıkarımın temeli: güven aralıkları, z ve t testleri, anketlerin hata payı hep örneklem ortalamasının normal dağıldığı varsayımına dayanır.',
        phys: 'Brown hareketi ve difüzyon: bir polen tanesinin milyonlarca molekül çarpışmasıyla oluşan yer değiştirmesi Gauss dağılır (Einstein, 1905). Ölçüm hataları da aynı nedenle çan eğrisi çizer.',
        bio: 'Boy uzunluğu, kan basıncı gibi çok sayıda genin ve çevresel etkenin küçük katkılarının toplamı olan (poligenik) özellikler normal dağılır — Galton\'un kalıtım çalışmalarının çıkış noktası.'
      },
      sim: [
        { lab: 'affeStats', hash: '#mod1', label: 'Galton kutusu & merkezi limit teoremi' },
        { lab: 'affeStats', hash: '#mod2', label: 'Dağılım atlası' }
      ],
      related: ['normal-dagilim', 'hipotez-testi', 'monte-carlo-markov', 'ustel-buyume-bozunma'],
      refs: ['Galton, F. (1889). Natural Inheritance. Macmillan.', 'Fischer, H. (2011). A History of the Central Limit Theorem. Springer.', 'Stigler, S. M. (1986). The History of Statistics. Harvard University Press.']
    },
    {
      id: 'normal-dagilim',
      title: 'Normal (Gauss) Dağılımı ve Çan Eğrisi',
      domain: 'stats',
      bridges: ['stats', 'phys', 'bio'],
      tags: ['Gauss', 'çan eğrisi', 'z-skoru', '68-95-99,7', 'standart sapma', 'yüzdelik', 'IQ'],
      summary: 'Ortalaması etrafında simetrik, iki parametreyle (μ, σ) tamamen belirlenen ve doğadaki sayısız ölçümün izlediği çan biçimli olasılık dağılımı.',
      intuitive: `Bir sınıftaki öğrencilerin boylarını ölçüp her boy aralığı için bir sütun çizin: çoğu öğrenci ortalamaya yakındır, çok kısa ya da çok uzun olanlar azdır. Sütunların tepesini birleştirdiğinizde bir <b>çan</b> elde edersiniz. Bu çanın iki ayarı vardır: tepenin nerede olduğu (<b>ortalama μ</b>) ve ne kadar geniş olduğu (<b>standart sapma σ</b>).<br><br>Pratik bir kural: verilerin yaklaşık <b>%68</b>'i ortalamadan bir σ, <b>%95</b>'i iki σ, <b>%99,7</b>'si üç σ uzaklıktadır. Ortalaması 100, standart sapması 15 olan IQ testinde 130 puan, ortalamanın iki σ üstündedir; yani insanların yaklaşık %97,7'sinden yüksektir. Bir değerin ortalamadan kaç σ uzakta olduğunu söyleyen sayıya <b>z-skoru</b> denir ve farklı ölçekleri karşılaştırmayı sağlar.`,
      history: `<b>Abraham de Moivre</b> eğriyi 1733'te binom olasılıklarına yaklaşım olarak buldu. <b>Carl Friedrich Gauss</b> 1801'de kaybolan cüce gezegen Ceres'in yerini yalnızca birkaç gözlemden tahmin etmek için hataların bu eğriyle dağıldığını varsaydı ve en küçük kareler yöntemini kullandı; Ceres tam tahmin ettiği yerde bulundu. Kuramı 1809'da <i>Theoria Motus</i>'ta yayımladı — bu yüzden eğriye "Gauss eğrisi" denir. <b>Laplace</b> eğrinin neden her yerde çıktığını merkezi limit teoremiyle açıkladı. Belçikalı <b>Adolphe Quetelet</b> 1835'te İskoç askerlerinin göğüs çevrelerinin çan eğrisi çizdiğini göstererek "ortalama insan" kavramını ortaya attı. "Normal" adı 1890'larda <b>Karl Pearson</b> ile yaygınlaştı.`,
      scientists: [
        { name: 'Carl Friedrich Gauss', year: 1809, note: 'Hata yasası, Ceres\'in yörüngesi' },
        { name: 'Adolphe Quetelet', year: 1835, note: '"Ortalama insan", sosyal istatistik' },
        { name: 'Karl Pearson', year: 1893, note: '"Normal eğri" adı, biyometri' }
      ],
      formulas: [
        { tex: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}', desc: 'Normal dağılımın olasılık yoğunluk fonksiyonu.', vars: [{ sym: 'x', name: 'Değişkenin değeri', unit: 'ölçülen nicelik' }, { sym: '\\mu', name: 'Ortalama (tepe noktası)', unit: 'ölçülen nicelik' }, { sym: '\\sigma', name: 'Standart sapma (genişlik)', unit: 'ölçülen nicelik' }, { sym: 'e', name: 'Euler sayısı', unit: '—', value: '2,71828' }] },
        { tex: 'z = \\frac{x - \\mu}{\\sigma}', desc: 'z-skoru: bir değerin ortalamadan kaç standart sapma uzakta olduğu.', vars: [{ sym: 'z', name: 'Standart skor', unit: '—' }, { sym: 'x', name: 'Gözlenen değer', unit: 'ölçülen nicelik' }, { sym: '\\mu', name: 'Ortalama', unit: 'ölçülen nicelik' }, { sym: '\\sigma', name: 'Standart sapma', unit: 'ölçülen nicelik' }] },
        { tex: 'P(\\mu - k\\sigma < X < \\mu + k\\sigma) \\approx 0{,}683,\\; 0{,}954,\\; 0{,}997 \\;\\;(k=1,2,3)', desc: '68–95–99,7 kuralı.', vars: [{ sym: 'k', name: 'Standart sapma sayısı', unit: '—' }, { sym: 'X', name: 'Normal dağılmış rastgele değişken', unit: 'ölçülen nicelik' }] }
      ],
      calc: {
        title: 'z-skoru ve yüzdelik hesaplayıcı',
        inputs: [
          { id: 'x', label: 'Değer x', value: 130, min: -10000, max: 10000, step: 0.1 },
          { id: 'mu', label: 'Ortalama μ', value: 100, min: -10000, max: 10000, step: 0.1 },
          { id: 'sigma', label: 'Standart sapma σ', value: 15, min: 0.001, max: 10000, step: 0.1 }
        ],
        compute: (v) => {
          const z = (v.x - v.mu) / v.sigma;
          return { label: 'Bu değerin altında kalanların oranı Φ(z)', value: Phi(z) * 100, unit: '%', note: `z = ${z.toFixed(3).replace('.', ',')}` };
        }
      },
      perDomain: {
        stats: 'Çıkarımsal istatistiğin ana dağılımı: z-tablosu, güven aralıkları ve en küçük kareler regresyonunun hata varsayımı buna dayanır. Sabit varyanslı dağılımlar içinde entropisi en yüksek olanıdır.',
        phys: 'Gazdaki moleküllerin her bir hız bileşeni normal dağılır (Maxwell–Boltzmann); ısıl gürültü, kuantum harmonik osilatörün taban durumu ve lazer ışın profili de Gauss biçimlidir.',
        bio: 'Boy, doğum ağırlığı, kan değerleri ve IQ gibi poligenik özellikler yaklaşık normal dağılır; tıptaki "normal aralık" genellikle ortalama ± 2σ olarak tanımlanır.'
      },
      sim: [
        { lab: 'affeStats', hash: '#mod2', label: 'Dağılım atlası & Z/t/χ² tabloları' },
        { lab: 'affeStats', hash: '#mod8', label: 'Çan eğrisi örnekleri' },
        { lab: 'affeStats', hash: '#mod1', label: 'Galton kutusu' }
      ],
      related: ['merkezi-limit-teoremi', 'hipotez-testi', 'ols-regresyon', 'entropi'],
      refs: ['Gauss, C. F. (1809). Theoria motus corporum coelestium.', 'Stigler, S. M. (1986). The History of Statistics. Harvard University Press.']
    },
    {
      id: 'bayes-teoremi',
      title: 'Bayes Teoremi ve Tıbbi Test Paradoksu',
      domain: 'stats',
      bridges: ['stats', 'bio'],
      tags: ['koşullu olasılık', 'önsel', 'sonsal', 'tıbbi test', 'duyarlılık', 'özgüllük', 'pozitif prediktif değer', 'Turing'],
      summary: 'Yeni kanıt geldiğinde bir inancın olasılığını nasıl güncelleyeceğimizi söyleyen formül; %99 doğru bir testin pozitif sonucunun neden çoğu zaman yanlış alarm olabileceğini açıklar.',
      intuitive: `Nadir bir hastalık 100 kişiden 1'inde görülsün. Testimiz hastaların %99'unu yakalıyor, sağlam insanların ise %5'inde yanlışlıkla "pozitif" diyor. Testiniz pozitif çıktı: hasta olma olasılığınız nedir? Çoğu insan "%99" der; doğru cevap yaklaşık <b>%17</b>!<br><br>1000 kişiyi düşünün: 10'u hasta, 990'ı sağlam. Testin yakaladığı ~10 gerçek hastaya karşılık, 990 sağlam kişinin %5'i yani ~<b>50 kişi</b> yanlış alarm verir. Toplam 60 pozitiften yalnızca 10'u gerçekten hastadır: 10/60 ≈ %17. Bayes teoremi tam olarak bunu yapar: <b>önsel</b> inancı (hastalığın ne kadar yaygın olduğu) <b>kanıtla</b> (test sonucu) birleştirip <b>sonsal</b> inancı verir. Bir dedektifin her yeni ipucuyla şüphelileri yeniden değerlendirmesi gibi.`,
      history: `İngiliz rahip <b>Thomas Bayes</b> fikri 1740'larda geliştirdi ama yayımlamadı; ölümünden sonra arkadaşı <b>Richard Price</b> 1763'te Royal Society'de "An Essay towards solving a Problem in the Doctrine of Chances" adıyla sundu. <b>Laplace</b> 1774'te bağımsız olarak buldu ve 1812'de bugünkü genel hâline getirip gök mekaniğinden nüfus istatistiğine uyguladı. 20. yüzyılın büyük bölümünde "öznel" bulunarak dışlandı; ancak II. Dünya Savaşı'nda <b>Alan Turing</b> Bletchley Park'ta Enigma şifresini kırarken kanıtları "ban" adını verdiği log-olasılık birimleriyle toplayan Bayesçi bir yöntem (Banburismus) kullandı. 1990'larda Markov zinciri Monte Carlo yöntemleriyle Bayesçi istatistik bilimin her alanına yayıldı.`,
      scientists: [
        { name: 'Thomas Bayes', year: 1763, note: 'Ters olasılık (Price tarafından yayımlandı)' },
        { name: 'Pierre-Simon Laplace', year: 1812, note: 'Genel Bayes formülü' },
        { name: 'Alan Turing', year: 1941, note: 'Banburismus: Enigma\'ya Bayesçi yaklaşım' }
      ],
      formulas: [
        { tex: 'P(A\\mid B) = \\frac{P(B\\mid A)\\,P(A)}{P(B)}', desc: 'Bayes teoremi: B gözlendiğinde A\'nın sonsal olasılığı.', vars: [{ sym: 'P(A)', name: 'Önsel olasılık (kanıttan önce)', unit: '—' }, { sym: 'P(B\\mid A)', name: 'Olabilirlik: A doğruysa B\'yi görme olasılığı', unit: '—' }, { sym: 'P(B)', name: 'Kanıtın toplam olasılığı', unit: '—' }, { sym: 'P(A\\mid B)', name: 'Sonsal olasılık', unit: '—' }] },
        { tex: 'P(H\\mid +) = \\frac{S_e\\, p}{S_e\\, p + (1 - S_p)(1 - p)}', desc: 'Pozitif test sonrası hasta olma olasılığı (pozitif prediktif değer).', vars: [{ sym: 'S_e', name: 'Duyarlılık (hastada pozitif çıkma)', unit: '—' }, { sym: 'S_p', name: 'Özgüllük (sağlamda negatif çıkma)', unit: '—' }, { sym: 'p', name: 'Yaygınlık (önsel)', unit: '—' }] },
        { tex: '\\underbrace{\\frac{P(H\\mid +)}{P(\\neg H\\mid +)}}_{\\text{sonsal oran}} = \\underbrace{\\frac{S_e}{1-S_p}}_{LR^+} \\times \\underbrace{\\frac{p}{1-p}}_{\\text{önsel oran}}', desc: 'Olasılık oranı biçimi: her test sonucu önsel oranı olabilirlik oranıyla çarpar.', vars: [{ sym: 'LR^+', name: 'Pozitif olabilirlik oranı', unit: '—' }, { sym: 'H', name: 'Hastalık var', unit: '—' }, { sym: '\\neg H', name: 'Hastalık yok', unit: '—' }] }
      ],
      calc: {
        title: 'Tıbbi test paradoksu hesaplayıcı',
        inputs: [
          { id: 'prev', label: 'Yaygınlık (%)', value: 1, min: 0.01, max: 100, step: 0.01, unit: '%' },
          { id: 'sens', label: 'Duyarlılık (%)', value: 99, min: 0, max: 100, step: 0.1, unit: '%' },
          { id: 'spec', label: 'Özgüllük (%)', value: 95, min: 0, max: 100, step: 0.1, unit: '%' }
        ],
        compute: (v) => {
          const p = v.prev / 100, se = v.sens / 100, sp = v.spec / 100;
          const den = se * p + (1 - sp) * (1 - p);
          return { label: 'Pozitif sonuçta gerçekten hasta olma olasılığı', value: den > 0 ? (se * p / den) * 100 : 0, unit: '%', note: '1000 kişide: ' + Math.round(se * p * 1000) + ' gerçek pozitif, ' + Math.round((1 - sp) * (1 - p) * 1000) + ' yanlış pozitif.' };
        }
      },
      perDomain: {
        stats: 'Önsel + olabilirlik → sonsal: Bayesçi çıkarım, makine öğrenmesi (Naive Bayes, Bayesçi ağlar) ve MCMC ile parametre tahmini.',
        bio: 'Tarama testleri (mamografi, PSA, yenidoğan taramaları), genetik risk danışmanlığı ve salgın testlerinde yanlış pozitiflerin yorumlanması; düşük yaygınlıkta tek pozitif test tanı koydurmaz.'
      },
      sim: [{ lab: 'affeStats', hash: '#mod4', label: 'Bayes: 1000 noktalık tıbbi test matrisi, Monty Hall' }],
      related: ['hipotez-testi', 'monte-carlo-markov', 'normal-dagilim', 'entropi'],
      refs: ['Bayes, T. & Price, R. (1763). An Essay towards solving a Problem in the Doctrine of Chances. Phil. Trans. R. Soc. 53.', 'McGrayne, S. B. (2011). The Theory That Would Not Die. Yale University Press.']
    },
    {
      id: 'hipotez-testi',
      title: 'Hipotez Testi: p-Değeri, α, β ve Güç',
      domain: 'stats',
      bridges: ['stats', 'bio', 'phys'],
      tags: ['p-değeri', 'sıfır hipotezi', 'Tip I hata', 'Tip II hata', 'güç', 't-testi', 'χ² testi', '5 sigma'],
      summary: 'Verinin "şans eseri" açıklanıp açıklanamayacağını, yanlış alarm (α) ve kaçırma (β) risklerini kontrol ederek karara bağlayan istatistiksel mahkeme.',
      intuitive: `Hipotez testi bir <b>mahkemeye</b> benzer. Sanık "suçsuz" kabul edilir — bu <b>sıfır hipotezi</b> (H₀: "ilacın etkisi yok"). Kanıtlar (veri) toplanır ve sorulur: "Sanık gerçekten suçsuz olsaydı, bu kadar güçlü kanıt görme olasılığımız ne olurdu?" Bu olasılık <b>p-değeridir</b>. p çok küçükse (genellikle 0,05'ten küçük) "bu kadar tesadüf olmaz" deyip H₀'ı reddederiz.<br><br>İki tür hata vardır: suçsuzu mahkûm etmek (<b>Tip I, α</b>: aslında etkisi olmayan ilaca "işe yarıyor" demek) ve suçluyu salıvermek (<b>Tip II, β</b>: işe yarayan ilacı kaçırmak). Testin <b>gücü</b> 1−β'dır ve örneklem büyüdükçe artar. Önemli uyarı: p-değeri "H₀'ın doğru olma olasılığı" <b>değildir</b>; bu bir Bayes sorusudur.`,
      history: `<b>Karl Pearson</b> 1900'de gözlenen ve beklenen sıklıkları karşılaştıran χ² testini tanıttı. Guinness bira fabrikasında çalışan <b>William Sealy Gosset</b>, küçük arpa örnekleriyle çalışmak zorunda olduğu için t-dağılımını buldu ve şirket gizliliği nedeniyle 1908'de "<b>Student</b>" takma adıyla yayımladı. <b>Ronald Fisher</b> 1925'teki <i>Statistical Methods for Research Workers</i> kitabıyla p-değerini ve 0,05 eşiğini yaygınlaştırdı; 1935'te Muriel Bristol'ün çayın mı sütün mü önce konduğunu tadından anlayabildiğini iddia etmesi üzerine tasarladığı "çay tadan hanım" deneyi, rastgeleleştirilmiş deney tasarımının simgesi oldu. <b>Jerzy Neyman ve Egon Pearson</b> 1933'te α, β ve güç kavramlarıyla karar kuramını kurdu. Parçacık fiziği keşifler için çok daha katı bir eşik kullanır: Higgs bozonu 2012'de <b>5σ</b> (p ≈ 3×10⁻⁷) ile ilan edildi.`,
      scientists: [
        { name: 'William Sealy Gosset ("Student")', year: 1908, note: 't-testi, Guinness' },
        { name: 'Ronald A. Fisher', year: 1925, note: 'p-değeri, deney tasarımı' },
        { name: 'Jerzy Neyman & Egon Pearson', year: 1933, note: 'α, β, güç' },
        { name: 'Karl Pearson', year: 1900, note: 'χ² uyum iyiliği testi' }
      ],
      formulas: [
        { tex: 'z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}', desc: 'Tek örneklem z-testi istatistiği.', vars: [{ sym: '\\bar{x}', name: 'Örneklem ortalaması', unit: 'ölçülen nicelik' }, { sym: '\\mu_0', name: 'H₀ altındaki ortalama', unit: 'ölçülen nicelik' }, { sym: '\\sigma', name: 'Anakütle standart sapması', unit: 'ölçülen nicelik' }, { sym: 'n', name: 'Örneklem büyüklüğü', unit: 'adet' }] },
        { tex: 't = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}},\\quad sd = n - 1', desc: 'Student t-testi (σ bilinmediğinde).', vars: [{ sym: 's', name: 'Örneklem standart sapması', unit: 'ölçülen nicelik' }, { sym: 'sd', name: 'Serbestlik derecesi', unit: '—' }] },
        { tex: '\\chi^2 = \\sum_i \\frac{(O_i - E_i)^2}{E_i}', desc: 'Pearson χ² testi: gözlenen ve beklenen sıklıklar.', vars: [{ sym: 'O_i', name: 'Gözlenen sıklık', unit: 'adet' }, { sym: 'E_i', name: 'H₀ altında beklenen sıklık', unit: 'adet' }] },
        { tex: '\\alpha = P(\\text{H}_0\\text{ red} \\mid \\text{H}_0),\\quad \\text{Güç} = 1 - \\beta = P(\\text{H}_0\\text{ red} \\mid \\text{H}_1)', desc: 'Tip I hata oranı ve testin gücü.', vars: [{ sym: '\\alpha', name: 'Anlamlılık düzeyi (yanlış alarm riski)', unit: '—', value: '0,05' }, { sym: '\\beta', name: 'Tip II hata (kaçırma) riski', unit: '—' }] }
      ],
      calc: {
        title: 'Tek örneklem z-testi',
        inputs: [
          { id: 'xbar', label: 'Örneklem ortalaması x̄', value: 103, min: -10000, max: 10000, step: 0.01 },
          { id: 'mu0', label: 'H₀ ortalaması μ₀', value: 100, min: -10000, max: 10000, step: 0.01 },
          { id: 'sigma', label: 'σ', value: 15, min: 0.001, max: 10000, step: 0.01 },
          { id: 'n', label: 'n', value: 100, min: 1, max: 1000000, step: 1 }
        ],
        compute: (v) => {
          const z = (v.xbar - v.mu0) / (v.sigma / Math.sqrt(v.n));
          const p = 2 * (1 - Phi(Math.abs(z)));
          return { label: 'İki yönlü p-değeri', value: p, unit: '', note: `z = ${z.toFixed(3).replace('.', ',')} → ${p < 0.05 ? 'α = 0,05 düzeyinde H₀ reddedilir' : 'H₀ reddedilemez'}` };
        }
      },
      perDomain: {
        stats: 'Neyman–Pearson karar çerçevesi, güven aralıklarıyla ikilik ilişkisi, çoklu karşılaştırma düzeltmeleri (Bonferroni) ve tekrarlanabilirlik krizi tartışmaları.',
        bio: 'Klinik deneyler (randomize kontrollü çalışma), ilaç onayı, genetik ilişkilendirme çalışmaları (GWAS\'ta p < 5×10⁻⁸ eşiği) ve Mendel oranlarının χ² ile sınanması.',
        phys: 'Keşif standardı 5σ: Higgs bozonu (2012) ve kütleçekim dalgası GW150914 (5,1σ) bu eşikle ilan edildi; 3σ yalnızca "kanıt" sayılır.'
      },
      sim: [
        { lab: 'affeStats', hash: '#mod3', label: 'H₀/H₁, Tip I/II hata, güç, χ² testi' },
        { lab: 'affeStats', hash: '#mod2', label: 'Z, t ve χ² tabloları' }
      ],
      related: ['normal-dagilim', 'bayes-teoremi', 'merkezi-limit-teoremi', 'ols-regresyon', 'kutlecekim-dalgalari-karanlik-madde'],
      refs: ['Fisher, R. A. (1925). Statistical Methods for Research Workers. Oliver & Boyd.', 'Neyman, J. & Pearson, E. S. (1933). On the Problem of the Most Efficient Tests of Statistical Hypotheses. Phil. Trans. R. Soc. A 231.', 'Student (1908). The Probable Error of a Mean. Biometrika 6(1).']
    },
    {
      id: 'ols-regresyon',
      title: 'En Küçük Kareler (OLS) Regresyonu ve Korelasyon',
      domain: 'stats',
      bridges: ['stats', 'phys', 'bio', 'space'],
      tags: ['regresyon', 'korelasyon', 'Pearson r', 'R²', 'en küçük kareler', 'ortalamaya dönüş', 'Anscombe'],
      summary: 'Bir nokta bulutundan geçen "en iyi" doğruyu, artıkların karelerinin toplamını en aza indirerek bulan yöntem ve iki değişken arasındaki doğrusal ilişkinin gücünü ölçen korelasyon katsayısı.',
      intuitive: `Elinizde boy–kilo noktalarından oluşan bir bulut var ve içinden bir doğru geçirmek istiyorsunuz. Hangi doğru "en iyisi"? Her noktadan doğruya dikey bir çizgi çekin; bu çizgiler <b>artıklardır</b> (hatalar). En küçük kareler yöntemi, bu artıkların <b>karelerinin toplamını</b> en küçük yapan doğruyu seçer — sanki her nokta doğruyu bir yayla kendine çekiyor ve doğru dengede duruyor.<br><br><b>Korelasyon katsayısı r</b>, noktaların bu doğruya ne kadar sıkı dizildiğini −1 ile +1 arasında söyler; <b>R²</b> ise y'deki değişimin ne kadarını x'in açıkladığıdır. Uyarılar: korelasyon nedensellik değildir (dondurma satışları ve boğulmalar birlikte artar — ortak neden yaz sıcağıdır), ve Anscombe'un dörtlüsü gösterir ki aynı r'ye sahip dört veri kümesi tamamen farklı görünebilir: <b>önce çizin</b>!`,
      history: `<b>Adrien-Marie Legendre</b> en küçük kareler yöntemini 1805'te kuyruklu yıldız yörüngelerini hesaplamak için yayımladı. <b>Gauss</b> 1809'da yöntemi 1795'ten beri kullandığını ve 1801'de kayıp Ceres'i bununla bulduğunu açıklayınca bir öncelik tartışması başladı. "Regresyon" kelimesi <b>Francis Galton</b>'dan gelir: 1886'da uzun boylu ebeveynlerin çocuklarının ortalamada ebeveynlerinden biraz daha kısa, kısa ebeveynlerinkilerin ise biraz daha uzun olduğunu gözledi ve buna "ortalamaya doğru gerileme" (regression towards mediocrity) dedi. Öğrencisi <b>Karl Pearson</b> 1896'da korelasyon katsayısının matematiğini kurdu. <b>Francis Anscombe</b>'ın 1973'teki dört veri kümesi, grafik çizmenin önemini gösteren klasik ders oldu.`,
      scientists: [
        { name: 'Adrien-Marie Legendre', year: 1805, note: 'En küçük kareler yöntemi' },
        { name: 'Carl Friedrich Gauss', year: 1809, note: 'Hata kuramı ile en küçük kareler' },
        { name: 'Francis Galton', year: 1886, note: '"Ortalamaya dönüş", regresyon' },
        { name: 'Karl Pearson', year: 1896, note: 'Korelasyon katsayısı r' }
      ],
      formulas: [
        { tex: '\\hat{y} = \\beta_0 + \\beta_1 x', desc: 'Basit doğrusal regresyon modeli.', vars: [{ sym: '\\hat{y}', name: 'Tahmin edilen değer', unit: 'y birimi' }, { sym: '\\beta_0', name: 'Kesişim (x = 0 iken)', unit: 'y birimi' }, { sym: '\\beta_1', name: 'Eğim', unit: 'y/x birimi' }, { sym: 'x', name: 'Bağımsız (açıklayıcı) değişken', unit: 'x birimi' }] },
        { tex: '\\beta_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = r\\,\\frac{s_y}{s_x}', desc: 'En küçük kareler eğimi.', vars: [{ sym: 'x_i, y_i', name: 'i. gözlem çifti', unit: '—' }, { sym: '\\bar{x}, \\bar{y}', name: 'Ortalamalar', unit: '—' }, { sym: 's_x, s_y', name: 'Standart sapmalar', unit: '—' }, { sym: 'r', name: 'Pearson korelasyon katsayısı', unit: '—' }] },
        { tex: 'r = \\frac{\\operatorname{cov}(x,y)}{s_x s_y},\\qquad R^2 = 1 - \\frac{SS_{art}}{SS_{top}}', desc: 'Korelasyon katsayısı ve belirleme katsayısı (basit regresyonda R² = r²).', vars: [{ sym: '\\operatorname{cov}(x,y)', name: 'Kovaryans', unit: 'x·y birimi' }, { sym: 'SS_{art}', name: 'Artık kareler toplamı', unit: 'y²' }, { sym: 'SS_{top}', name: 'Toplam kareler toplamı', unit: 'y²' }] }
      ],
      calc: {
        title: 'Korelasyondan regresyon eğimi',
        inputs: [
          { id: 'r', label: 'Korelasyon r', value: 0.8, min: -1, max: 1, step: 0.01 },
          { id: 'sx', label: 'x standart sapması sₓ', value: 10, min: 0.0001, max: 100000, step: 0.01 },
          { id: 'sy', label: 'y standart sapması s_y', value: 5, min: 0.0001, max: 100000, step: 0.01 }
        ],
        compute: (v) => ({ label: 'Regresyon eğimi β₁ = r·s_y/sₓ', value: v.r * v.sy / v.sx, unit: '', note: `R² = ${(v.r * v.r * 100).toFixed(1).replace('.', ',')} % (varyansın açıklanan kısmı)` })
      },
      perDomain: {
        stats: 'Doğrusal modellerin temeli: çoklu regresyon, ANOVA, polinom regresyonu ve aşırı uyum (overfitting), artık analizi.',
        phys: 'Deney verisinden sabit çıkarma: yay sabiti (Hooke yasası F = kx), Ohm direnci, serbest düşüşte g; hata çubuklarıyla ağırlıklı en küçük kareler.',
        bio: 'Galton\'un boy kalıtımı ve "ortalamaya dönüş"; doz–yanıt eğrileri, allometrik ölçeklenme (log–log regresyon, Kleiber yasası).',
        space: 'Hubble 1929\'da galaksilerin hızını uzaklıklarına karşı çizip doğru uydurarak evrenin genişlediğini gösterdi; eğim Hubble sabitidir (H₀ ≈ 70 km/s/Mpc).'
      },
      sim: [
        { lab: 'affeStats', hash: '#mod5', label: 'Sürüklenebilir regresyon, Anscombe, polinom' },
        { lab: 'affeStats', hash: '#mod8', label: 'Korelasyon sezgi galerisi' },
        { lab: 'affeSpace', hash: '#mod6', label: 'Hubble yasası: v–d uydurması' },
        { lab: 'affePhysics', hash: '#mod3', label: 'Mekanik deney verileri' }
      ],
      related: ['normal-dagilim', 'hipotez-testi', 'merkezi-limit-teoremi', 'kutlecekim-dalgalari-karanlik-madde'],
      refs: ['Legendre, A.-M. (1805). Nouvelles méthodes pour la détermination des orbites des comètes.', 'Galton, F. (1886). Regression towards mediocrity in hereditary stature. J. Anthropol. Inst. 15.', 'Anscombe, F. J. (1973). Graphs in Statistical Analysis. The American Statistician 27(1).']
    },
    {
      id: 'monte-carlo-markov',
      title: 'Monte Carlo Yöntemi ve Markov Zincirleri',
      domain: 'stats',
      bridges: ['stats', 'phys', 'bio', 'space'],
      tags: ['Monte Carlo', 'π tahmini', 'rastgele örnekleme', 'Markov zinciri', 'durağan dağılım', 'Metropolis', 'MCMC', 'PageRank'],
      summary: 'Zor hesapları rastgele sayılarla "deneme yaparak" çözen Monte Carlo yöntemi ve geleceğin yalnızca şimdiye bağlı olduğu rastgele süreçler: Markov zincirleri.',
      intuitive: `Bir kareye içine teğet bir çember çizin ve karenin içine gözü kapalı binlerce dart atın. Dartların çember içine düşme oranı, alanların oranına eşittir: π/4. Yani <b>π'yi dart atarak</b> hesaplayabilirsiniz! Monte Carlo yöntemi budur: analitik olarak çözülmesi imkânsız problemleri rastgele denemelerle yaklaşık çözmek. Hata, deneme sayısının karekökü ile azalır: 100 kat fazla dart, 10 kat daha kesin sonuç.<br><br><b>Markov zinciri</b> ise "geleceğin yalnızca bugüne bağlı olduğu" bir süreçtir: yarının hava durumu bugünkü havaya bağlıdır, dünküne değil. Böyle bir zincir uzun süre çalışınca her durumda geçirilen zaman sabit oranlara oturur: <b>durağan dağılım</b>. Google'ın ilk algoritması PageRank, interneti rastgele gezen birinin her sayfada geçireceği zaman oranını hesaplayan bir Markov zinciridir.`,
      history: `Rus matematikçi <b>Andrey Markov</b> 1906'da bağımlı rastgele süreçleri tanımladı ve 1913'te Puşkin'in <i>Yevgeni Onegin</i>'indeki 20.000 harfin sesli/sessiz geçişlerini sayarak ilk uygulamayı yaptı. <b>Stanisław Ulam</b> 1946'da hastalıktan iyileşirken solitaire oynarken kazanma olasılığını hesaplamak yerine "çok kez oynayıp saymanın" daha kolay olduğunu fark etti. <b>John von Neumann</b> ile fikri Los Alamos'ta nötron difüzyonu hesaplarına uyguladılar; <b>Nicholas Metropolis</b>, Ulam'ın kumarbaz amcasına gönderme yaparak yönteme Monaco'daki kumarhanenin adını verdi ve ilk hesaplar 1948'de ENIAC'ta yapıldı. 1953'te Metropolis, Rosenbluth'lar ve Teller'ler <b>Metropolis algoritmasını</b> yayımladı; <b>W. K. Hastings</b> 1970'te genelleştirdi. Bu Markov zinciri Monte Carlo (MCMC) yöntemi bugün Bayesçi istatistiğin ve kozmolojinin ana aracıdır.`,
      scientists: [
        { name: 'Andrey Markov', year: 1906, note: 'Markov zincirleri' },
        { name: 'Stanisław Ulam', year: 1946, note: 'Monte Carlo fikri' },
        { name: 'Nicholas Metropolis', year: 1953, note: 'Metropolis algoritması' },
        { name: 'John von Neumann', year: 1948, note: 'ENIAC\'ta ilk Monte Carlo hesapları' }
      ],
      formulas: [
        { tex: '\\pi \\approx 4\\,\\frac{N_{\\text{içeride}}}{N}', desc: 'Dart atarak π tahmini.', vars: [{ sym: 'N_{\\text{içeride}}', name: 'Çember içine düşen nokta sayısı', unit: 'adet' }, { sym: 'N', name: 'Toplam nokta sayısı', unit: 'adet' }] },
        { tex: '\\varepsilon \\propto \\frac{1}{\\sqrt{N}}', desc: 'Monte Carlo hatası boyuttan bağımsız olarak 1/√N ile azalır.', vars: [{ sym: '\\varepsilon', name: 'Tahmin hatası', unit: '—' }, { sym: 'N', name: 'Örnek sayısı', unit: 'adet' }] },
        { tex: '\\boldsymbol{\\pi} = \\boldsymbol{\\pi} P,\\quad \\sum_i \\pi_i = 1', desc: 'Markov zincirinin durağan dağılımı.', vars: [{ sym: '\\boldsymbol{\\pi}', name: 'Durağan olasılık vektörü', unit: '—' }, { sym: 'P', name: 'Geçiş olasılıkları matrisi', unit: '—' }] },
        { tex: 'A(x \\to x\') = \\min\\!\\left(1, \\frac{p(x\')}{p(x)}\\right)', desc: 'Metropolis kabul olasılığı (simetrik öneri dağılımında).', vars: [{ sym: 'p(x)', name: 'Örneklenecek hedef dağılım', unit: '—' }, { sym: "x'", name: 'Önerilen yeni durum', unit: '—' }] }
      ],
      calc: {
        title: 'π tahmininin beklenen hatası',
        inputs: [{ id: 'N', label: 'Atılan dart sayısı N', value: 10000, min: 1, max: 1e9, step: 1 }],
        compute: (v) => { const p = Math.PI / 4; return { label: 'π tahmininin standart hatası', value: 4 * Math.sqrt(p * (1 - p) / v.N), unit: '', note: '~%68 olasılıkla tahmin π ± bu değer aralığındadır. N\'yi 100 katına çıkarmak hatayı 10\'a böler.' }; }
      },
      perDomain: {
        stats: 'Bootstrap, permütasyon testleri, MCMC ile Bayesçi sonsal dağılım örnekleme, Markov zincirlerinin durağan dağılımı ve karışma süresi.',
        phys: 'Nötron taşınımı (Manhattan Projesi), Ising modelinde Metropolis algoritması, parçacık dedektörü simülasyonları (GEANT4), istatistiksel mekanikte faz geçişleri.',
        bio: 'Genetik sürüklenme (Wright–Fisher Markov modeli), DNA dizilerinin evrimsel modelleri, protein katlanma simülasyonları, salgın modellerinde stokastik senaryolar.',
        space: 'Planck uydusu verisinden kozmolojik parametrelerin MCMC ile tahmini, ötegezegen yörünge uydurmaları, yıldız atmosferlerinde Monte Carlo ışınım aktarımı.'
      },
      sim: [
        { lab: 'affeStats', hash: '#mod6', label: 'Monte Carlo π, Markov zinciri, rastgele yürüyüş' },
        { lab: 'affeStats', hash: '#mod3', label: 'Bootstrap' },
        { lab: 'affePhysics', hash: '#mod6', label: 'Termodinamik & difüzyon' }
      ],
      related: ['merkezi-limit-teoremi', 'bayes-teoremi', 'entropi', 'ustel-buyume-bozunma'],
      refs: ['Metropolis, N. & Ulam, S. (1949). The Monte Carlo Method. J. Am. Stat. Assoc. 44.', 'Metropolis, N. ve ark. (1953). Equation of State Calculations by Fast Computing Machines. J. Chem. Phys. 21.', 'Hayes, B. (2013). First Links in the Markov Chain. American Scientist 101.']
    },

    /* ======================================================================
       UZAY
       ====================================================================== */
    {
      id: 'karadelikler',
      title: 'Karadelikler: Schwarzschild & Kerr, Olay Ufku ve Spagettileşme',
      domain: 'space',
      bridges: ['space', 'phys'],
      tags: ['karadelik', 'olay ufku', 'Schwarzschild yarıçapı', 'Kerr', 'ergosfer', 'spagettileşme', 'zaman genişlemesi', 'EHT', 'Sagittarius A*'],
      summary: 'Kütlesi öyle küçük bir hacme sıkışmış ki ışığın bile kaçamadığı uzay-zaman bölgeleri; sınırlarına olay ufku denir.',
      intuitive: `Dünya'dan kaçmak için saniyede 11,2 km hıza ulaşmanız gerekir. Dünya'yı sıkıştırıp küçültürseniz bu kaçış hızı artar; bir misket (9 mm) boyutuna sıkıştırırsanız kaçış hızı <b>ışık hızını</b> aşar — ışık bile kaçamaz. İşte karadelik budur. Bu sınırın yarıçapına <b>Schwarzschild yarıçapı</b> denir: Güneş için yalnızca ~3 km.<br><br>Karadeliğe yaklaştıkça zaman yavaşlar (ufka yakın biri için saatler uzaktakine göre ağır işler) ve <b>gelgit kuvveti</b> sizi uzatır: başınız ve ayaklarınız farklı kuvvetle çekilir — "spagettileşme". Şaşırtıcı biçimde, dev karadelikler daha naziktir: Sagittarius A*'nın ufkunu hiçbir şey hissetmeden geçebilirsiniz, küçük bir yıldızsal karadelik ise sizi ufka varmadan parçalar. Dönen karadeliklerin (Kerr) etrafında uzay-zaman bir girdap gibi sürüklenir; ufkun dışındaki bu bölgeye <b>ergosfer</b> denir ve oradan enerji çekilebilir.`,
      history: `<b>John Michell</b> 1783'te ve <b>Laplace</b> 1796'da Newton kütleçekimiyle ışığın kaçamayacağı "karanlık yıldızlar" fikrini ortaya attı. <b>Karl Schwarzschild</b>, 1915'in sonunda I. Dünya Savaşı'nda Rus cephesinde topçu subayıyken Einstein'ın alan denklemlerinin ilk tam çözümünü buldu ve Einstein'a mektupla gönderdi; birkaç ay sonra öldü. <b>Oppenheimer ve Snyder</b> 1939'da bir yıldızın sonsuza dek çökebileceğini gösterdi. <b>Roy Kerr</b> 1963'te dönen karadelik çözümünü buldu; "karadelik" adını <b>John Wheeler</b> 1967'de yaygınlaştırdı. Cygnus X-1 1971'de ilk güçlü aday oldu. <b>Roger Penrose</b> tekilliklerin kaçınılmazlığını kanıtladığı için, <b>Reinhard Genzel ve Andrea Ghez</b> Samanyolu merkezindeki yıldızların yörüngelerinden Sgr A*'nın 4 milyon Güneş kütlesini ölçtükleri için 2020 Nobel'ini aldı. <b>Event Horizon Telescope</b> 2019'da M87*'in, 2022'de Sgr A*'nın gölgesini görüntüledi.`,
      scientists: [
        { name: 'Karl Schwarzschild', year: 1916, note: 'İlk tam çözüm' },
        { name: 'Roy Kerr', year: 1963, note: 'Dönen karadelik metriği' },
        { name: 'Roger Penrose', year: 1965, note: 'Tekillik teoremleri (2020 Nobel)' },
        { name: 'Stephen Hawking', year: 1974, note: 'Hawking ışıması' },
        { name: 'Andrea Ghez & Reinhard Genzel', year: 2002, note: 'Sgr A* çevresindeki yıldız yörüngeleri (2020 Nobel)' }
      ],
      formulas: [
        { tex: 'R_s = \\frac{2GM}{c^2}', desc: 'Schwarzschild yarıçapı (olay ufku).', vars: [{ sym: 'R_s', name: 'Olay ufku yarıçapı', unit: 'm' }, { sym: 'G', name: 'Kütleçekim sabiti', unit: 'm³ kg⁻¹ s⁻²', value: '6,674 × 10⁻¹¹' }, { sym: 'M', name: 'Karadeliğin kütlesi', unit: 'kg' }, { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '2,998 × 10⁸' }] },
        { tex: '\\Delta t_{\\infty} = \\frac{\\Delta \\tau}{\\sqrt{1 - R_s/r}}', desc: 'Durgun gözlemci için kütleçekimsel zaman genişlemesi.', vars: [{ sym: '\\Delta t_{\\infty}', name: 'Uzaktaki gözlemcinin ölçtüğü süre', unit: 's' }, { sym: '\\Delta \\tau', name: 'r\'deki gözlemcinin öz zamanı', unit: 's' }, { sym: 'r', name: 'Merkeze uzaklık', unit: 'm' }] },
        { tex: '\\Delta a = \\frac{2GMh}{r^3}', desc: 'Gelgit ivmesi: h uzunluğundaki bir cismin uçları arasındaki çekim farkı.', vars: [{ sym: '\\Delta a', name: 'Gelgit ivmesi', unit: 'm/s²' }, { sym: 'h', name: 'Cismin boyu', unit: 'm' }] },
        { tex: 'r_\\pm = \\frac{GM}{c^2}\\left(1 \\pm \\sqrt{1 - a_*^2}\\right)', desc: 'Kerr (dönen) karadeliğin dış ve iç ufukları.', vars: [{ sym: 'r_\\pm', name: 'Dış (+) ve iç (−) ufuk', unit: 'm' }, { sym: 'a_*', name: 'Boyutsuz dönme parametresi (0–1)', unit: '—' }] }
      ],
      calc: {
        title: 'Olay ufku ve ufuktaki gelgit',
        inputs: [{ id: 'M', label: 'Kütle (Güneş kütlesi, M☉)', value: 21, min: 0.000001, max: 1e11, step: 0.000001 }],
        compute: (v) => {
          const m = v.M * Msun;
          const Rs = 2 * G * m / (c * c);
          const tidal = 2 * G * m * 2 / Math.pow(Rs, 3) / 9.80665;
          return { label: 'Schwarzschild yarıçapı', value: Rs / 1000, unit: 'km', note: 'Ufukta 2 m\'lik bir astronota etkiyen gelgit: ' + (tidal >= 1e4 || tidal < 1e-2 ? tidal.toExponential(2) : tidal.toFixed(2)) + ' g' };
        }
      },
      perDomain: {
        space: 'Yıldızsal karadelikler (Cygnus X-1), galaksi merkezlerindeki süper kütleli karadelikler (Sgr A*, M87*), kuasarlar, LIGO\'nun yakaladığı birleşmeler ve EHT\'nin gölge görüntüleri.',
        phys: 'Genel göreliliğin en uç sınaması: zaman genişlemesi, ışık bükülmesi, Hawking ışıması (T ∝ 1/M) ve kuantum kütleçekimini zorlayan bilgi paradoksu.'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod1', label: 'Karadeliğe düşüş: GPU ışın izleme, gelgit, çift kronometre' },
        { lab: 'affeSpace', hash: '#mod5', label: 'Karadelik birleşmesi (LIGO)' },
        { lab: 'affePhysics', hash: '#mod7', label: 'Görelilik' }
      ],
      related: ['ak-delik-solucan-deligi', 'notron-yildizlari-chandrasekhar', 'kutlecekim-dalgalari-karanlik-madde', 'entropi', 'uzay-teleskoplari'],
      refs: ['Schwarzschild, K. (1916). Über das Gravitationsfeld eines Massenpunktes nach der Einsteinschen Theorie. Sitzungsber. Preuss. Akad. Wiss.', 'Kerr, R. P. (1963). Gravitational Field of a Spinning Mass. Phys. Rev. Lett. 11, 237.', 'Event Horizon Telescope Collaboration (2019). First M87 Event Horizon Telescope Results I. ApJL 875, L1.', 'Thorne, K. S. (1994). Black Holes and Time Warps. W. W. Norton.']
    },
    {
      id: 'ak-delik-solucan-deligi',
      title: 'Ak Delikler, Solucan Delikleri ve Zaman Yolculuğu',
      domain: 'space',
      bridges: ['space', 'phys'],
      tags: ['ak delik', 'solucan deliği', 'Einstein-Rosen köprüsü', 'egzotik madde', 'kapalı zamansı eğri', 'Möbius', 'zaman makinesi'],
      summary: 'Einstein denklemlerinin izin verdiği ama hiç gözlenmemiş egzotik yapılar: hiçbir şeyin giremediği ak delikler ve uzak bölgeleri birbirine bağlayan solucan delikleri.',
      intuitive: `Bir karadeliğin filmini <b>tersten</b> oynatın: madde ve ışık içeri düşmek yerine dışarı fışkırır ve dışarıdan hiçbir şey içeri giremez. Bu, Einstein denklemlerinin matematiksel olarak geçerli bir çözümüdür: <b>ak delik</b>. Ancak termodinamiğin ikinci yasası ile çelişir gibi göründüğü ve kararsız olduğu için doğada oluştuğu düşünülmez.<br><br><b>Solucan deliği</b> ise uzay-zamanda bir kestirmedir: bir elmanın yüzeyindeki karıncanın elmayı boydan boya delen bir tünelden geçmesi gibi. Sorun şu: tünelin boğazı kendi kütleçekimiyle anında kapanır. Açık tutmak için <b>negatif enerji yoğunluklu "egzotik madde"</b> gerekir. Bir solucan deliğinin bir ağzını ışık hızına yakın hızla götürüp getirirseniz (ikiz paradoksu), iki ağız arasında zaman farkı oluşur ve tünel bir <b>zaman makinesine</b> dönüşür. Möbius şeridi, "geri dönüp yön değiştirmiş olarak varmanın" sezgisel bir resmidir.`,
      history: `<b>Ludwig Flamm</b> 1916'da Schwarzschild çözümünün iki uzay levhasını bağlayan geometrisini fark etti. <b>Einstein ve Nathan Rosen</b> 1935'te bu "köprüyü" parçacık modeli olarak inceledi. "Solucan deliği" (wormhole) adını <b>John Wheeler</b> 1957'de verdi. Ak delikleri <b>Igor Novikov</b> (1964) ve <b>Yuval Ne'eman</b> (1965) tartıştı. <b>Kurt Gödel</b> 1949'da Einstein'a armağan olarak, dönen bir evrende kendi geçmişine dönen yolların (kapalı zamansı eğriler) bulunduğunu gösterdi. Carl Sagan, <i>Contact</i> romanı için fiziksel olarak makul bir yolculuk sorunca <b>Kip Thorne</b> ve öğrencisi <b>Michael Morris</b> 1988'de geçilebilir solucan deliklerinin egzotik madde gerektirdiğini kanıtladı; aynı yıl Thorne, Morris ve Yurtsever solucan deliği zaman makinesini önerdi. <b>Stephen Hawking</b> 1992'de "kronoloji koruma varsayımı" ile fiziğin zaman makinelerini engellediğini savundu.`,
      scientists: [
        { name: 'Albert Einstein & Nathan Rosen', year: 1935, note: 'Einstein–Rosen köprüsü' },
        { name: 'John Wheeler', year: 1957, note: '"Solucan deliği" adı' },
        { name: 'Kurt Gödel', year: 1949, note: 'Kapalı zamansı eğriler' },
        { name: 'Kip Thorne & Michael Morris', year: 1988, note: 'Geçilebilir solucan delikleri' }
      ],
      formulas: [
        { tex: 'z(r) = 2\\sqrt{R_s\\,(r - R_s)}', desc: 'Flamm paraboloidi: Schwarzschild uzayının gömme yüzeyi.', vars: [{ sym: 'z', name: 'Gömme yüksekliği', unit: 'm' }, { sym: 'r', name: 'Radyal koordinat', unit: 'm' }, { sym: 'R_s', name: 'Schwarzschild yarıçapı', unit: 'm' }] },
        { tex: 'ds^2 = -c^2 dt^2 + dl^2 + (b^2 + l^2)\\,d\\Omega^2', desc: 'Ellis / Morris–Thorne geçilebilir solucan deliği metriği.', vars: [{ sym: 'l', name: 'Boğaz boyunca öz uzaklık', unit: 'm' }, { sym: 'b', name: 'Boğaz yarıçapı', unit: 'm' }, { sym: 'd\\Omega^2', name: 'Birim küre üzerindeki açısal eleman', unit: '—' }] },
        { tex: 'T_{\\mu\\nu}\\,k^\\mu k^\\nu < 0', desc: 'Null enerji koşulunun ihlali: egzotik madde şartı.', vars: [{ sym: 'T_{\\mu\\nu}', name: 'Enerji–momentum tensörü', unit: 'J/m³' }, { sym: 'k^\\mu', name: 'Işık benzeri (null) vektör', unit: '—' }] },
        { tex: '\\Delta t = T\\left(1 - \\sqrt{1 - v^2/c^2}\\right)', desc: 'Hızla götürülüp getirilen ağzın geride kalması (ikiz paradoksu).', vars: [{ sym: 'T', name: 'Durgun ağzın ölçtüğü yolculuk süresi', unit: 'yıl' }, { sym: 'v', name: 'Taşınan ağzın hızı', unit: 'm/s' }] }
      ],
      calc: {
        title: 'Solucan deliği zaman makinesi',
        inputs: [
          { id: 'beta', label: 'Ağzın hızı v/c', value: 0.9, min: 0, max: 0.999999, step: 0.0001 },
          { id: 'T', label: 'Yolculuk süresi (durgun ağıza göre, yıl)', value: 10, min: 0, max: 1e6, step: 0.1 }
        ],
        compute: (v) => ({ label: 'İki ağız arasındaki zaman farkı', value: v.T * (1 - Math.sqrt(1 - v.beta * v.beta)), unit: 'yıl', note: 'Bu kadar geçmişe yolculuk mümkün olurdu — tabii boğazı açık tutacak egzotik madde varsa.' })
      },
      perDomain: {
        space: 'Gözlenmemiş, kuramsal yapılar; bazı modeller büyük patlamayı bir ak delik olarak yorumlar. Solucan delikleri bilimkurgu (Interstellar, Contact) ve kara delik bilgi paradoksu (ER = EPR) tartışmalarında yer alır.',
        phys: 'Genel göreliliğin sınırları: zamanın tersine çevrilmesi, enerji koşulları, Casimir etkisi gibi negatif enerji örnekleri, nedensellik ve kronoloji koruma varsayımı.'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod1', label: 'Gömme diyagramı & Möbius zaman modeli' },
        { lab: 'affePhysics', hash: '#mod7', label: 'Görelilik' }
      ],
      related: ['karadelikler', 'entropi', 'kutlecekim-dalgalari-karanlik-madde', 'kuantum-tunelleme'],
      refs: ['Einstein, A. & Rosen, N. (1935). The Particle Problem in the General Theory of Relativity. Phys. Rev. 48, 73.', 'Morris, M. S. & Thorne, K. S. (1988). Wormholes in spacetime and their use for interstellar travel. Am. J. Phys. 56, 395.', 'Hawking, S. W. (1992). Chronology protection conjecture. Phys. Rev. D 46, 603.']
    },
    {
      id: 'yildiz-evrimi-hr',
      title: 'Yıldız Evrimi ve Hertzsprung–Russell Diyagramı',
      domain: 'space',
      bridges: ['space', 'phys', 'chem'],
      tags: ['yıldız evrimi', 'H-R diyagramı', 'anakol', 'kırmızı dev', 'beyaz cüce', 'nükleosentez', 'OBAFGKM', 'füzyon'],
      summary: 'Yıldızların doğumdan ölüme yaşamı kütleleriyle belirlenir; parlaklık–sıcaklık grafiği (H-R diyagramı) bu yaşamın haritasıdır.',
      intuitive: `Bir yıldız, kendi ağırlığıyla çökmek isteyen dev bir gaz topu ile çekirdeğindeki nükleer füzyonun yarattığı basınç arasındaki bir <b>halat çekme yarışıdır</b>. Hidrojen yandığı sürece denge sürer; buna yıldızın <b>anakol</b> evresi denir. Belirleyici olan tek şey neredeyse <b>kütledir</b>: kütleli yıldızlar yakıtlarını müsrifçe yakar — 20 Güneş kütleli bir yıldız birkaç milyon yılda tükenirken kırmızı cüceler trilyonlarca yıl yaşar.<br><br>Yıldızların parlaklığını sıcaklıklarına karşı çizerseniz rastgele bir saçılım değil, düzenli bölgeler görürsünüz: çapraz uzanan anakol, sağ üstte devler, sol altta beyaz cüceler. Bu, bir şehirdeki insanların "aile fotoğrafı" gibidir: farklı yaşlardaki bireyleri yan yana görerek tek bir yaşam öyküsünü okursunuz. Ve vücudunuzdaki karbon, oksijen ve demir, ölen yıldızların içinde üretildi — <b>yıldız tozuyuz</b>.`,
      history: `Harvard'da "bilgisayar" olarak çalışan kadın gökbilimcilerden <b>Annie Jump Cannon</b> 1901'de 350.000 yıldızın tayflarını sınıflandırıp OBAFGKM dizisini kurdu. <b>Ejnar Hertzsprung</b> 1905–1911'de ve <b>Henry Norris Russell</b> 1913'te parlaklık–tayf grafiğini bağımsız olarak çizdi. <b>Cecilia Payne</b> 1925 doktora tezinde yıldızların büyük ölçüde hidrojen ve helyumdan oluştuğunu gösterdi (Russell başta reddetti, sonra kabul etti). <b>Arthur Eddington</b> 1920'de yıldız enerjisinin hidrojenin helyuma dönüşmesinden geldiğini önerdi; <b>Hans Bethe</b> 1939'da proton–proton zinciri ve CNO döngüsünü hesapladı (1967 Nobel). 1957'de <b>Burbidge, Burbidge, Fowler ve Hoyle</b> (B²FH) elementlerin yıldızlarda nasıl üretildiğini açıklayan nükleosentez makalesini yayımladı.`,
      scientists: [
        { name: 'Annie Jump Cannon', year: 1901, note: 'OBAFGKM tayf sınıflaması' },
        { name: 'Ejnar Hertzsprung & Henry Norris Russell', year: 1913, note: 'H-R diyagramı' },
        { name: 'Cecilia Payne-Gaposchkin', year: 1925, note: 'Yıldızlar H ve He\'den oluşur' },
        { name: 'Hans Bethe', year: 1939, note: 'Yıldız füzyon döngüleri (1967 Nobel)' }
      ],
      formulas: [
        { tex: 'L = 4\\pi R^2 \\sigma T^4', desc: 'Stefan–Boltzmann: yıldızın parlaklığı yarıçap ve yüzey sıcaklığından.', vars: [{ sym: 'L', name: 'Işınım gücü (parlaklık)', unit: 'W' }, { sym: 'R', name: 'Yıldız yarıçapı', unit: 'm' }, { sym: '\\sigma', name: 'Stefan–Boltzmann sabiti', unit: 'W m⁻² K⁻⁴', value: '5,670 × 10⁻⁸' }, { sym: 'T', name: 'Etkin yüzey sıcaklığı', unit: 'K' }] },
        { tex: '\\frac{L}{L_\\odot} \\approx \\left(\\frac{M}{M_\\odot}\\right)^{3{,}5}', desc: 'Anakol kütle–parlaklık ilişkisi.', vars: [{ sym: 'M', name: 'Yıldız kütlesi', unit: 'kg' }, { sym: 'L_\\odot', name: 'Güneş parlaklığı', unit: 'W', value: '3,828 × 10²⁶' }, { sym: 'M_\\odot', name: 'Güneş kütlesi', unit: 'kg', value: '1,989 × 10³⁰' }] },
        { tex: 't_{\\text{anakol}} \\approx 10^{10}\\,\\text{yıl}\\left(\\frac{M}{M_\\odot}\\right)^{-2{,}5}', desc: 'Anakol ömrü: yakıt ∝ M, yakma hızı ∝ L.', vars: [{ sym: 't_{\\text{anakol}}', name: 'Hidrojen yakma süresi', unit: 'yıl' }] },
        { tex: '4\\,{}^{1}\\mathrm{H} \\to {}^{4}\\mathrm{He} + 2e^+ + 2\\nu_e + 26{,}7\\,\\text{MeV}', desc: 'Proton–proton zincirinin net tepkimesi.', vars: [{ sym: 'e^+', name: 'Pozitron', unit: '—' }, { sym: '\\nu_e', name: 'Elektron nötrinosu', unit: '—' }] }
      ],
      calc: {
        title: 'Anakol ömrü ve parlaklık',
        inputs: [{ id: 'M', label: 'Yıldız kütlesi (M☉)', value: 1, min: 0.08, max: 150, step: 0.01 }],
        compute: (v) => ({ label: 'Anakolda kalma süresi', value: 1e10 * Math.pow(v.M, -2.5), unit: 'yıl', note: 'Parlaklık ≈ ' + Math.pow(v.M, 3.5).toPrecision(3).replace('.', ',') + ' L☉ (kaba ölçekleme; çok küçük ve çok büyük kütlelerde sapar).' })
      },
      perDomain: {
        space: 'H-R diyagramı, yıldız kümelerinin yaşının "dönüm noktası"ndan ölçülmesi, kırmızı devler, gezegenimsi bulutsular, süpernovalar ve kalıntılar (beyaz cüce, nötron yıldızı, karadelik).',
        phys: 'Hidrostatik denge, nükleer füzyon (pp zinciri, CNO döngüsü), kuantum tünellemesi sayesinde füzyonun düşük sıcaklıkta gerçekleşmesi, karacisim ışıması ve Wien yasası.',
        chem: 'Nükleosentez: H ve He büyük patlamadan; C, O, Ne, Si ve demire kadar elementler yıldız çekirdeklerinde; demirden ağır elementler süpernovalarda ve nötron yıldızı çarpışmalarında (r-süreci) üretilir — periyodik tablonun kozmik kökeni.'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod2', label: 'Yıldız evrimi & canlı H-R diyagramı' },
        { lab: 'affeSpace', hash: '#mod9', label: 'Karacisim ışıması' },
        { lab: 'affePhysics', hash: '#mod1', label: 'Atom çekirdeği & füzyon' }
      ],
      related: ['notron-yildizlari-chandrasekhar', 'foton', 'atom', 'planck-sabiti', 'periyodik-sistem', 'kuantum-tunelleme'],
      refs: ['Russell, H. N. (1914). Relations Between the Spectra and Other Characteristics of the Stars. Popular Astronomy 22.', 'Payne, C. H. (1925). Stellar Atmospheres. Harvard Observatory Monographs.', 'Burbidge, E. M., Burbidge, G. R., Fowler, W. A. & Hoyle, F. (1957). Synthesis of the Elements in Stars. Rev. Mod. Phys. 29, 547.']
    },
    {
      id: 'notron-yildizlari-chandrasekhar',
      title: 'Nötron Yıldızları, Pulsarlar, Magnetarlar ve Chandrasekhar Limiti',
      domain: 'space',
      bridges: ['space', 'phys'],
      tags: ['nötron yıldızı', 'pulsar', 'magnetar', 'Chandrasekhar limiti', 'beyaz cüce', 'yozlaşma basıncı', 'LGM-1', 'TOV limiti'],
      summary: 'Ölü yıldız çekirdekleri: 1,44 Güneş kütlesine kadar elektron yozlaşmasıyla ayakta duran beyaz cüceler, bunun üstünde şehir büyüklüğünde nötron yıldızları.',
      intuitive: `Bir yıldızın yakıtı bitince çekirdek kendi ağırlığı altında çöker. Onu kurtaran bir kuantum kuralıdır: iki elektron aynı kuantum durumunda bulunamaz (Pauli dışarlama ilkesi). Bu, sıcaklıktan bağımsız bir <b>yozlaşma basıncı</b> yaratır ve Dünya boyutunda, bir çay kaşığı bir ton gelen <b>beyaz cüceyi</b> ayakta tutar. Ama bu basıncın bir sınırı vardır: <b>1,44 Güneş kütlesi</b> (Chandrasekhar limiti).<br><br>Sınır aşılırsa elektronlar protonlara gömülür ve çekirdek tamamen nötronlardan oluşan, Güneş'ten ağır ama yalnızca ~20 km çapında bir <b>nötron yıldızına</b> dönüşür: bir çay kaşığı nötron yıldızı maddesi birkaç milyar ton gelir. Dönen bir buz patencisinin kollarını kapayınca hızlanması gibi, çöken yıldız saniyede yüzlerce kez döner; manyetik kutuplarından çıkan ışınlar Dünya'yı her taradığında bir <b>deniz feneri</b> gibi atım (pulsar) görürüz. Manyetik alanı 10¹⁵ gauss'a ulaşanlara <b>magnetar</b> denir.`,
      history: `19 yaşındaki <b>Subrahmanyan Chandrasekhar</b> 1930'da Hindistan'dan Cambridge'e giden gemide, özel göreliliği beyaz cücelere uygulayarak kütle sınırını hesapladı. Dönemin en ünlü astrofizikçisi <b>Arthur Eddington</b> 1935'te Royal Astronomical Society'de bu sonucu alay ederek reddetti; Chandrasekhar haklı çıktı ve 1983'te Nobel aldı. <b>James Chadwick</b> nötronu 1932'de keşfedince <b>Walter Baade ve Fritz Zwicky</b> 1934'te süpernovaların nötron yıldızları ürettiğini önerdi. 1967'de Cambridge'de doktora öğrencisi <b>Jocelyn Bell Burnell</b>, radyo teleskop kâğıt çıktılarında 1,337 saniyede bir tekrarlanan "bir kaşıntı izi" fark etti; şaka yollu <b>LGM-1</b> ("Küçük Yeşil Adamlar") adını verdiler. Bu ilk pulsardı; 1974 Nobel'i danışmanı Antony Hewish'e verildi ve Bell Burnell'in dışlanması tartışma yarattı. <b>Hulse ve Taylor</b> 1974'te ikili pulsarı buldu (1993 Nobel); 2017'de GW170817 iki nötron yıldızının çarpışmasını kütleçekim dalgalarıyla gösterdi.`,
      scientists: [
        { name: 'Subrahmanyan Chandrasekhar', year: 1930, note: 'Beyaz cüce kütle limiti (1983 Nobel)' },
        { name: 'Walter Baade & Fritz Zwicky', year: 1934, note: 'Süpernova → nötron yıldızı' },
        { name: 'Jocelyn Bell Burnell', year: 1967, note: 'İlk pulsar (LGM-1)' },
        { name: 'Russell Hulse & Joseph Taylor', year: 1974, note: 'İkili pulsar (1993 Nobel)' }
      ],
      formulas: [
        { tex: 'M_{Ch} \\approx \\frac{5{,}83}{\\mu_e^2}\\,M_\\odot \\approx 1{,}44\\,M_\\odot', desc: 'Chandrasekhar limiti (μₑ = 2 için).', vars: [{ sym: 'M_{Ch}', name: 'Beyaz cücenin en büyük kütlesi', unit: 'kg' }, { sym: '\\mu_e', name: 'Elektron başına ortalama kütle (nükleon sayısı)', unit: '—', value: '2 (C/O)' }, { sym: 'M_\\odot', name: 'Güneş kütlesi', unit: 'kg', value: '1,989 × 10³⁰' }] },
        { tex: '\\rho = \\frac{M}{\\tfrac{4}{3}\\pi R^3}', desc: 'Ortalama yoğunluk.', vars: [{ sym: '\\rho', name: 'Yoğunluk', unit: 'kg/m³' }, { sym: 'M', name: 'Kütle', unit: 'kg' }, { sym: 'R', name: 'Yarıçap', unit: 'm' }] },
        { tex: 'B \\approx 3{,}2 \\times 10^{19}\\sqrt{P\\,\\dot{P}}\\;\\text{G}', desc: 'Pulsarın yavaşlamasından manyetik alan tahmini (manyetik dipol modeli).', vars: [{ sym: 'B', name: 'Yüzey manyetik alanı', unit: 'gauss' }, { sym: 'P', name: 'Dönme periyodu', unit: 's' }, { sym: '\\dot{P}', name: 'Periyodun zamanla artış hızı', unit: 's/s' }] }
      ],
      calc: {
        title: 'Nötron yıldızı yoğunluğu',
        inputs: [
          { id: 'M', label: 'Kütle (M☉)', value: 1.4, min: 0.1, max: 3, step: 0.01 },
          { id: 'R', label: 'Yarıçap (km)', value: 12, min: 5, max: 30, step: 0.1 }
        ],
        compute: (v) => {
          const rho = v.M * Msun / (4 / 3 * Math.PI * Math.pow(v.R * 1000, 3));
          return { label: 'Ortalama yoğunluk', value: rho, unit: 'kg/m³', note: 'Bir çay kaşığı (5 mL): ≈ ' + (rho * 5e-6 / 1000 / 1e9).toFixed(2).replace('.', ',') + ' milyar ton' };
        }
      },
      perDomain: {
        space: 'Pulsarlar kozmik saatlerdir: milisaniye pulsar dizileri nanohertz kütleçekim dalgalarını arar; Yengeç pulsarı 1054 süpernovasının kalıntısıdır; magnetarlar hızlı radyo patlamalarıyla ilişkilidir.',
        phys: 'Pauli dışarlama ilkesi ve Fermi yozlaşma basıncı, özel görelilik, nükleer madde durum denklemi ve nötron yıldızlarının en büyük kütlesi (Tolman–Oppenheimer–Volkoff limiti ≈ 2,2–3 M☉).'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod2', label: 'Yıldız evrimi & pulsar deniz feneri' },
        { lab: 'affeSpace', hash: '#mod5', label: 'Nötron yıldızı çarpışması (GW170817)' },
        { lab: 'affePhysics', hash: '#mod1', label: 'Atom çekirdeği' }
      ],
      related: ['yildiz-evrimi-hr', 'karadelikler', 'kutlecekim-dalgalari-karanlik-madde', 'kuantum-atom-orbitaller', 'standart-model'],
      refs: ['Chandrasekhar, S. (1931). The Maximum Mass of Ideal White Dwarfs. ApJ 74, 81.', 'Hewish, A., Bell, S. J. ve ark. (1968). Observation of a Rapidly Pulsating Radio Source. Nature 217, 709.', 'Baade, W. & Zwicky, F. (1934). On Super-novae. PNAS 20, 254.']
    },
    {
      id: 'uzay-teleskoplari',
      title: 'Uzay Teleskopları: Hubble, James Webb, Chandra ve EHT',
      domain: 'space',
      bridges: ['space', 'phys'],
      tags: ['Hubble', 'James Webb', 'JWST', 'Chandra', 'Event Horizon Telescope', 'kızılötesi', 'X-ışını', 'çözünürlük', 'Lagrange L2'],
      summary: 'Atmosferin engellediği dalga boylarını görmek için uzaya gönderilen gözlemevleri ve Dünya büyüklüğünde sanal bir radyo çanağı.',
      intuitive: `Atmosfer bizim için bir kalkan, gökbilimci için bir perdedir: X-ışınlarını, çoğu morötesi ve kızılötesi ışığı yutar, görünür ışığı da titretir (yıldızların "göz kırpması"). Çözüm teleskopu atmosferin üstüne çıkarmaktır. Her dalga boyu farklı bir evren gösterir: <b>Hubble</b> görünür ışıkta toz bulutlarının siluetini, <b>James Webb</b> kızılötesinde aynı tozun <b>içini</b> — yeni doğan yıldızları ve evrenin ilk galaksilerini (ışıkları genişleyen evrende kızılötesine kaymıştır) —, <b>Chandra</b> X-ışınında milyonlarca derecelik gazı görür.<br><br>Bir teleskobun ayrıntı görme gücü aynasının çapına bölünen dalga boyuyla sınırlıdır: daha büyük ayna, daha keskin görüntü. <b>Event Horizon Telescope</b> bu yüzden bir hile kullanır: Dünya'nın dört bir yanındaki radyo teleskoplarını atom saatleriyle eşzamanlayarak Dünya çapında sanal bir çanak oluşturur ve karadelik gölgelerini görüntüler.`,
      history: `<b>Lyman Spitzer</b> 1946'da uzay teleskobu fikrini önerdi. <b>Hubble</b> 1990'da fırlatıldı ama aynası 2,2 mikron hatalı taşlanmıştı; 1993'te astronotlar düzeltici optik (COSTAR) takarak görüntüyü kurtardı ve Hubble evrenin genişleme hızını, karanlık enerjiyi ve Derin Alan görüntülerini verdi. <b>Riccardo Giacconi</b> X-ışını astronomisini başlattı (2002 Nobel); <b>Chandra</b> 1999'da fırlatıldı. <b>James Webb</b> 25 Aralık 2021'de fırlatıldı, 1,5 milyon km uzaktaki Lagrange L2 noktasına yerleşti; 18 altın kaplı berilyum segmentten oluşan 6,5 m'lik aynası ve tenis kortu büyüklüğündeki 5 katlı güneş kalkanıyla −233 °C'de çalışır; ilk görüntüleri 12 Temmuz 2022'de yayımlandı. <b>EHT</b> 10 Nisan 2019'da M87*'in ilk karadelik görüntüsünü açıkladı.`,
      scientists: [
        { name: 'Lyman Spitzer', year: 1946, note: 'Uzay teleskobu önerisi' },
        { name: 'Riccardo Giacconi', year: 1962, note: 'X-ışını astronomisi (2002 Nobel)' },
        { name: 'Edwin Hubble', year: 1929, note: 'Galaksilerin uzaklaşması (teleskobun adı)' },
        { name: 'Katie Bouman ve EHT ekibi', year: 2019, note: 'İlk karadelik görüntüsü' }
      ],
      formulas: [
        { tex: '\\theta \\approx 1{,}22\\,\\frac{\\lambda}{D}', desc: 'Kırınım sınırı (Rayleigh ölçütü): ayırt edilebilecek en küçük açı.', vars: [{ sym: '\\theta', name: 'Açısal çözünürlük', unit: 'radyan' }, { sym: '\\lambda', name: 'Dalga boyu', unit: 'm' }, { sym: 'D', name: 'Ayna / çanak çapı', unit: 'm' }] },
        { tex: '\\theta_{VLBI} \\approx \\frac{\\lambda}{B}', desc: 'Çok uzun taban çizgisi interferometrisi: çözünürlüğü teleskoplar arası uzaklık belirler.', vars: [{ sym: 'B', name: 'Teleskoplar arası en büyük uzaklık (taban çizgisi)', unit: 'm', value: '≈ 1,1 × 10⁷ (Dünya çapı)' }] },
        { tex: 'z = \\frac{\\lambda_{gözlenen} - \\lambda_{yayılan}}{\\lambda_{yayılan}}', desc: 'Kırmızıya kayma: uzak galaksilerin ışığı kızılötesine kayar.', vars: [{ sym: 'z', name: 'Kırmızıya kayma', unit: '—' }, { sym: '\\lambda', name: 'Dalga boyu', unit: 'm' }] }
      ],
      calc: {
        title: 'Teleskop çözünürlüğü',
        inputs: [
          { id: 'lam', label: 'Dalga boyu (µm)', value: 2, min: 0.0001, max: 1e7, step: 0.0001 },
          { id: 'D', label: 'Ayna çapı (m)', value: 6.5, min: 0.01, max: 1.3e7, step: 0.01 }
        ],
        compute: (v) => ({ label: 'Kırınım sınırı', value: 1.22 * v.lam * 1e-6 / v.D * 206264.806, unit: 'yay saniyesi', note: 'Hubble (2,4 m, 0,5 µm) ≈ 0,05″; JWST (6,5 m, 2 µm) ≈ 0,08″; EHT (1,3 mm, Dünya çapı) ≈ 25 µas.' })
      },
      perDomain: {
        space: 'Çok dalga boylu astronomi: Hubble (görünür/UV), JWST (kızılötesi, ilk galaksiler ve ötegezegen atmosferleri), Chandra (X-ışını, süpernova kalıntıları), EHT (karadelik gölgeleri).',
        phys: 'Kırınım ve interferometri, Wien yasası ve hangi sıcaklığın hangi dalga boyunda ışıdığı, X-ışınları için sıyırma açılı aynalar, kriyojenik dedektörler.'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod3', label: 'Çok dalga boylu gözlemevi & JWST L2' },
        { lab: 'affeSpace', hash: '#mod7', label: 'NASA günün fotoğrafı' },
        { lab: 'affePhysics', hash: '#mod5', label: 'Optik & çift yarık' }
      ],
      related: ['foton', 'dalga', 'karadelikler', 'yildiz-evrimi-hr', 'planck-sabiti'],
      refs: ['Spitzer, L. (1946). Astronomical Advantages of an Extra-Terrestrial Observatory. RAND Report.', 'Gardner, J. P. ve ark. (2006). The James Webb Space Telescope. Space Sci. Rev. 123, 485.', 'Event Horizon Telescope Collaboration (2019). ApJL 875, L1.']
    },
    {
      id: 'kutlecekim-dalgalari-karanlik-madde',
      title: 'Kütleçekim Dalgaları (LIGO) ve Karanlık Madde',
      domain: 'space',
      bridges: ['space', 'phys', 'stats'],
      tags: ['kütleçekim dalgası', 'LIGO', 'GW150914', 'cıvıltı', 'karanlık madde', 'dönüş eğrisi', 'Vera Rubin', 'Zwicky'],
      summary: 'Uzay-zamanın kendisinde yayılan dalgalanmalar ve galaksileri bir arada tutan ama ışık yaymayan görünmez kütle.',
      intuitive: `Durgun bir göle iki taş atarsanız dalgalar yayılır. İki karadelik birbirinin etrafında dönüp birleşirken de <b>uzay-zamanın kendisi</b> dalgalanır ve bu dalgalar ışık hızında yayılır. Dünya'ya ulaştıklarında o kadar zayıftırlar ki LIGO'nun 4 km'lik kolları yalnızca bir protonun <b>binde biri</b> kadar uzayıp kısalır! Sinyal sese çevrilince "vuuup" diye yükselen bir <b>cıvıltı</b> duyulur: cisimler yaklaştıkça hızlanır ve frekans artar.<br><br><b>Karanlık madde</b> ise bir galaksinin dış kenarındaki yıldızların "olması gerekenden hızlı" dönmesinden anlaşılır. Gördüğümüz kütle tek başına bu yıldızları tutamazdı; galaksi dağılırdı. Bir lunaparktaki atlıkarıncada dış atlar iç atlar kadar hızlı dönüyorsa, görünmeyen bir yapı onları taşıyor demektir. Evrenin ~%27'si karanlık madde, ~%68'i karanlık enerji; bildiğimiz sıradan madde yalnızca ~%5'tir.`,
      history: `<b>Einstein</b> 1916'da kütleçekim dalgalarını öngördü ama ölçülemeyecek kadar zayıf olduklarını düşündü. <b>Joseph Weber</b> 1960'larda alüminyum silindirlerle aradı. <b>Hulse ve Taylor</b>'ın 1974'te bulduğu ikili pulsarın yörüngesi tam öngörüldüğü gibi küçülerek dolaylı kanıt verdi. <b>Rainer Weiss</b>, <b>Kip Thorne</b> ve <b>Ronald Drever</b>'in tasarladığı, <b>Barry Barish</b>'in hayata geçirdiği LIGO, <b>14 Eylül 2015</b>'te 1,3 milyar ışık yılı uzaktaki iki karadeliğin birleşmesini (GW150914) yakaladı — 2017 Nobel. 17 Ağustos 2017'de GW170817 hem kütleçekim dalgası hem ışıkla izlendi. Karanlık madde tarafında <b>Fritz Zwicky</b> 1933'te Koma kümesindeki galaksilerin çok hızlı hareket ettiğini görüp "dunkle Materie" dedi; <b>Vera Rubin ve Kent Ford</b> 1970'lerde Andromeda ve diğer galaksilerin düz dönüş eğrilerini ölçerek en güçlü kanıtı sundu. 2006'da Mermi Kümesi çarpışması karanlık maddeyi sıradan maddeden ayrışmış hâlde gösterdi.`,
      scientists: [
        { name: 'Rainer Weiss, Kip Thorne, Barry Barish', year: 2015, note: 'LIGO ile ilk tespit (2017 Nobel)' },
        { name: 'Fritz Zwicky', year: 1933, note: 'Koma kümesinde "karanlık madde"' },
        { name: 'Vera Rubin', year: 1970, note: 'Galaksi dönüş eğrileri' },
        { name: 'Russell Hulse & Joseph Taylor', year: 1974, note: 'İkili pulsar: dolaylı kanıt' }
      ],
      formulas: [
        { tex: 'h = \\frac{\\Delta L}{L} \\sim 10^{-21}', desc: 'Kütleçekim dalgası gerinimi.', vars: [{ sym: 'h', name: 'Gerinim (boyutsuz)', unit: '—' }, { sym: '\\Delta L', name: 'Kol boyundaki değişim', unit: 'm' }, { sym: 'L', name: 'Kol uzunluğu', unit: 'm', value: '4000 (LIGO)' }] },
        { tex: '\\mathcal{M} = \\frac{(m_1 m_2)^{3/5}}{(m_1 + m_2)^{1/5}}', desc: 'Cıvıltı kütlesi: sinyalin frekans artış hızını belirler.', vars: [{ sym: '\\mathcal{M}', name: 'Cıvıltı kütlesi', unit: 'kg' }, { sym: 'm_1, m_2', name: 'Bileşenlerin kütleleri', unit: 'kg' }] },
        { tex: 'v(r) = \\sqrt{\\frac{G M(r)}{r}} \\;\\Rightarrow\\; v \\approx \\text{sabit} \\iff M(r) \\propto r', desc: 'Düz dönüş eğrisi, kütlenin uzaklıkla doğrusal arttığını — görünmez bir hale bulunduğunu — gösterir.', vars: [{ sym: 'v', name: 'Yörünge hızı', unit: 'm/s' }, { sym: 'M(r)', name: 'r yarıçapı içindeki kütle', unit: 'kg' }, { sym: 'G', name: 'Kütleçekim sabiti', unit: 'm³ kg⁻¹ s⁻²', value: '6,674 × 10⁻¹¹' }] },
        { tex: 'E = \\Delta m\\, c^2', desc: 'Birleşmede kütleçekim dalgası olarak yayılan enerji (GW150914: ~3 M☉).', vars: [{ sym: '\\Delta m', name: 'Dalgaya dönüşen kütle', unit: 'kg' }, { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '2,998 × 10⁸' }] }
      ],
      calc: {
        title: 'Cıvıltı kütlesi hesaplayıcı',
        inputs: [
          { id: 'm1', label: 'm₁ (M☉)', value: 36, min: 0.1, max: 200, step: 0.1 },
          { id: 'm2', label: 'm₂ (M☉)', value: 29, min: 0.1, max: 200, step: 0.1 }
        ],
        compute: (v) => ({ label: 'Cıvıltı kütlesi ℳ', value: Math.pow(v.m1 * v.m2, 0.6) / Math.pow(v.m1 + v.m2, 0.2), unit: 'M☉', note: 'GW150914 için ölçülen ≈ 28 M☉.' })
      },
      perDomain: {
        space: 'Çoklu haberci astronomi (GW170817 + kilonova → altın gibi ağır elementlerin kökeni), karadelik nüfus istatistikleri, galaksi dönüş eğrileri, kütleçekimsel merceklenme ve kozmik mikrodalga arka planındaki karanlık madde izi.',
        phys: 'Genel görelilikte dalga çözümleri, lazer interferometrisi, kuantum gürültüsünü azaltmak için sıkıştırılmış ışık, karanlık madde parçacık adayları (WIMP, aksiyon) ve doğrudan arama deneyleri.',
        stats: 'Eşleştirilmiş filtreleme (matched filtering) ile gürültüden sinyal çıkarma, yanlış alarm oranı ve 5,1σ anlamlılık; Bayesçi parametre tahmini (MCMC) ile kütle ve uzaklık ölçümü.'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod5', label: 'LIGO ikili çarpıştırıcı & cıvıltı' },
        { lab: 'affeSpace', hash: '#mod6', label: 'Dönüş eğrileri & karanlık madde' },
        { lab: 'affePhysics', hash: '#mod7', label: 'Görelilik' }
      ],
      related: ['karadelikler', 'notron-yildizlari-chandrasekhar', 'dalga', 'hipotez-testi', 'monte-carlo-markov', 'gunes-sistemi-kepler'],
      refs: ['Abbott, B. P. ve ark. (LIGO & Virgo) (2016). Observation of Gravitational Waves from a Binary Black Hole Merger. Phys. Rev. Lett. 116, 061102.', 'Rubin, V. C. & Ford, W. K. (1970). Rotation of the Andromeda Nebula. ApJ 159, 379.', 'Zwicky, F. (1933). Die Rotverschiebung von extragalaktischen Nebeln. Helv. Phys. Acta 6, 110.']
    },
    {
      id: 'gunes-sistemi-kepler',
      title: 'Güneş Sistemi ve Kepler Yasaları',
      domain: 'space',
      bridges: ['space', 'phys'],
      tags: ['Güneş Sistemi', 'Kepler yasaları', 'elips yörünge', 'Kopernik', 'Newton', 'vis-viva', 'Neptün keşfi', 'cüce gezegen'],
      summary: 'Gezegenlerin Güneş etrafında elipsler çizdiği, eşit zamanda eşit alan taradığı ve periyodun karesinin yörünge yarıçapının küpüyle orantılı olduğu sistem.',
      intuitive: `Gezegenler Güneş'in etrafında kusursuz çemberlerde değil, hafifçe basık <b>elipslerde</b> dolanır ve Güneş elipsin merkezinde değil, bir <b>odağındadır</b>. Güneş'e yaklaştıklarında hızlanır, uzaklaştıklarında yavaşlarlar — tıpkı salıncakta en alt noktada en hızlı olmanız gibi. Kepler bunu şöyle özetledi: Güneş'ten gezegene çekilen ip <b>eşit zamanlarda eşit alanlar</b> tarar.<br><br>Üçüncü yasa bir ölçek kuralıdır: uzaktaki gezegenler hem daha uzun yol alır hem daha yavaş gider; yıl uzunluğunun karesi uzaklığın küpüyle orantılıdır. Jüpiter Güneş'e Dünya'dan 5,2 kat uzaktır, yılı 5,2^1,5 ≈ <b>11,9 Dünya yılıdır</b>. Newton bu üç yasanın tek bir şeyden — uzaklığın karesiyle zayıflayan kütleçekiminden — çıktığını gösterdi.`,
      history: `<b>Nicolaus Copernicus</b> 1543'te ölüm döşeğinde yayımlanan <i>De revolutionibus</i>'ta Güneş merkezli modeli önerdi ama çember yörüngelerde ısrar etti. Danimarkalı <b>Tycho Brahe</b> teleskopsuz en hassas gezegen gözlemlerini topladı. Asistanı <b>Johannes Kepler</b>, Mars'ın gözlenen konumuyla çember modeli arasındaki yalnızca 8 yay dakikalık farkı göz ardı etmeyi reddetti ve yıllar süren hesaplarla 1609'da (<i>Astronomia Nova</i>) yörüngelerin elips olduğunu, 1619'da (<i>Harmonices Mundi</i>) üçüncü yasayı buldu. <b>Galileo</b> 1610'da Jüpiter'in uydularını gözledi. <b>Isaac Newton</b> 1687'de <i>Principia</i>'da evrensel çekim yasasından Kepler yasalarını türetti. <b>William Herschel</b> 1781'de Uranüs'ü buldu; Uranüs'ün yörüngesindeki sapmalardan <b>Le Verrier</b> (ve bağımsız olarak Adams) yeni bir gezegenin yerini hesapladı ve <b>Galle</b> 23 Eylül 1846'da Neptün'ü tahmin edilen yerin 1° yakınında buldu. Plüton 1930'da Tombaugh tarafından keşfedildi; IAU 2006'da onu cüce gezegen olarak sınıflandırdı.`,
      scientists: [
        { name: 'Nicolaus Copernicus', year: 1543, note: 'Güneş merkezli model' },
        { name: 'Johannes Kepler', year: 1609, note: 'Gezegen hareketinin üç yasası' },
        { name: 'Isaac Newton', year: 1687, note: 'Evrensel kütleçekim' },
        { name: 'Urbain Le Verrier & Johann Galle', year: 1846, note: 'Neptün\'ün kalemle keşfi' }
      ],
      formulas: [
        { tex: 'T^2 = \\frac{4\\pi^2}{G M_\\odot}\\, a^3', desc: 'Kepler\'in 3. yasası (Newton biçimi).', vars: [{ sym: 'T', name: 'Yörünge periyodu', unit: 's' }, { sym: 'a', name: 'Yarı büyük eksen', unit: 'm' }, { sym: 'G', name: 'Kütleçekim sabiti', unit: 'm³ kg⁻¹ s⁻²', value: '6,674 × 10⁻¹¹' }, { sym: 'M_\\odot', name: 'Güneş kütlesi', unit: 'kg', value: '1,989 × 10³⁰' }] },
        { tex: 'v^2 = G M_\\odot\\left(\\frac{2}{r} - \\frac{1}{a}\\right)', desc: 'Vis-viva denklemi: yörüngenin her noktasındaki hız.', vars: [{ sym: 'v', name: 'Yörünge hızı', unit: 'm/s' }, { sym: 'r', name: 'Güneş\'e anlık uzaklık', unit: 'm' }] },
        { tex: 'M = E - e \\sin E', desc: 'Kepler denklemi: ortalama anomaliden eksantrik anomaliye.', vars: [{ sym: 'M', name: 'Ortalama anomali', unit: 'radyan' }, { sym: 'E', name: 'Eksantrik anomali', unit: 'radyan' }, { sym: 'e', name: 'Dışmerkezlik (eksantriklik)', unit: '—' }] },
        { tex: 'r = \\frac{a(1 - e^2)}{1 + e\\cos\\nu}', desc: 'Elips yörünge denklemi (odaktan uzaklık).', vars: [{ sym: '\\nu', name: 'Gerçek anomali', unit: 'radyan' }] }
      ],
      calc: {
        title: 'Kepler\'in 3. yasası',
        inputs: [{ id: 'a', label: 'Güneş\'e ortalama uzaklık a (AB)', value: 5.2, min: 0.01, max: 1000, step: 0.01 }],
        compute: (v) => ({ label: 'Yörünge periyodu', value: Math.pow(v.a, 1.5), unit: 'Dünya yılı', note: 'Ortalama yörünge hızı ≈ ' + (29.78 / Math.sqrt(v.a)).toFixed(2).replace('.', ',') + ' km/s (dairesel yaklaşım)' })
      },
      perDomain: {
        space: 'Güneş Sistemi\'nin yapısı: 8 gezegen, cüce gezegenler, asteroit ve Kuiper kuşakları; uzay araçlarının yörünge tasarımı (Hohmann transferi, kütleçekim sapanı), ötegezegen yörüngeleri.',
        phys: 'Ters kare kütleçekim yasası, açısal momentumun korunumu (2. yasa), enerji korunumu (vis-viva) ve üç cisim probleminde kaos.'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod8', label: 'Canlı Güneş Sistemi & Kepler yasaları' },
        { lab: 'affeSpace', hash: '#mod4', label: 'Ötegezegen yörüngeleri' },
        { lab: 'affePhysics', hash: '#mod3', label: 'Mekanik & kaos' }
      ],
      related: ['kaos-cift-sarkac', 'kutlecekim-dalgalari-karanlik-madde', 'yildiz-evrimi-hr', 'ols-regresyon'],
      refs: ['Kepler, J. (1609). Astronomia Nova. Prag.', 'Newton, I. (1687). Philosophiæ Naturalis Principia Mathematica. Londra.', 'Standish, E. M. (1992). Keplerian Elements for Approximate Positions of the Major Planets. JPL/NASA.']
    },
    {
      id: 'planck-sabiti',
      title: 'Planck Sabiti, Karacisim Işıması ve Kuantumun Doğuşu',
      domain: 'space',
      bridges: ['space', 'phys', 'chem'],
      tags: ['Planck sabiti', 'karacisim', 'morötesi felaketi', 'kuantum', 'E = hν', 'Planck birimleri', 'Kibble terazisi', 'kilogram'],
      summary: 'Enerjinin kesintisiz değil paketler hâlinde alınıp verildiğini söyleyen ve kuantum fiziğini başlatan doğa sabiti: h = 6,62607015 × 10⁻³⁴ J·s.',
      intuitive: `Bir demir çubuğu ısıttıkça önce kızıl, sonra turuncu, sonra beyaz parlar. 19. yüzyıl fiziği bu rengi açıklamaya çalışınca absürt bir sonuca vardı: ısıtılmış her cisim kısa dalga boylarında <b>sonsuz enerji</b> yaymalıydı — buna sonradan "morötesi felaketi" dendi. <b>Max Planck</b>'ın çaresiz çözümü, enerjinin bir musluktan akan su gibi değil, <b>bozuk para gibi tanelerle</b> (kuantumlarla) alınıp verildiğini varsaymaktı. Her tanenin büyüklüğü frekansla orantılıdır: E = hν. Yüksek frekanslı (mor) tanecikler "pahalı" olduğu için az üretilir ve felaket önlenir.<br><br>h inanılmaz küçüktür; bu yüzden günlük hayatta enerjinin taneli yapısını fark etmeyiz. Ama atomlar, renkler, güneş pilleri, lazerler ve yıldızların ışığı tamamen bu sayıya bağlıdır. 2019'dan beri kilogram bile h'nin değeri <b>tam olarak</b> sabitlenerek tanımlanır.`,
      history: `<b>Gustav Kirchhoff</b> 1859'da karacisim ışımasının yalnızca sıcaklığa bağlı evrensel bir yasa izlediğini gösterdi ve bu "karacisim problemi" 40 yıl çözülemedi. <b>Wilhelm Wien</b> 1896'da kısa dalga boylarında işleyen bir formül buldu; <b>Rayleigh</b> 1900'de (ve Jeans 1905'te) klasik fizikle uzun dalgalarda işleyen ama kısa dalgalarda sonsuza giden bir formül türetti. <b>Max Planck</b> 14 Aralık 1900'de Berlin'de Alman Fizik Derneği'nde enerjiyi hν paketlerine bölen formülünü sundu; sonradan bunu "bir umutsuzluk eylemi" olarak nitelendirdi. Bu tarih kuantumun doğum günü sayılır. <b>Einstein</b> 1905'te ışığın kendisinin taneli olduğunu (foton) önerip fotoelektrik olayı açıkladı; <b>Millikan</b> 1916'da h'yi deneysel olarak ölçtü. Planck 1918'de Nobel aldı. Planck 1899'da h, G ve c'den doğal birimler (Planck birimleri) tanımlamıştı. <b>Bryan Kibble</b>'ın 1975'te önerdiği terazi sayesinde 20 Mayıs 2019'da kilogram, Paris'teki platin-iridyum silindir yerine h ile yeniden tanımlandı. ESA'nın <b>Planck uydusu</b> (2009–2013) kozmik mikrodalga arka planını haritaladı.`,
      scientists: [
        { name: 'Max Planck', year: 1900, note: 'Enerji kuantumu (1918 Nobel)' },
        { name: 'Gustav Kirchhoff', year: 1859, note: 'Karacisim problemi' },
        { name: 'Albert Einstein', year: 1905, note: 'Işık kuantumu, fotoelektrik' },
        { name: 'Robert Millikan', year: 1916, note: 'h\'nin deneysel ölçümü' },
        { name: 'Bryan Kibble', year: 1975, note: 'Watt (Kibble) terazisi' }
      ],
      formulas: [
        { tex: 'E = h\\nu = \\frac{hc}{\\lambda}', desc: 'Bir ışık kuantumunun enerjisi.', vars: [{ sym: 'E', name: 'Foton enerjisi', unit: 'J' }, { sym: 'h', name: 'Planck sabiti', unit: 'J·s', value: '6,62607015 × 10⁻³⁴ (tam)' }, { sym: '\\nu', name: 'Frekans', unit: 'Hz' }, { sym: '\\lambda', name: 'Dalga boyu', unit: 'm' }, { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '299 792 458 (tam)' }] },
        { tex: 'B_\\lambda(T) = \\frac{2hc^2}{\\lambda^5}\\,\\frac{1}{e^{hc/(\\lambda k_B T)} - 1}', desc: 'Planck yasası: karacismin spektral parlaklığı.', vars: [{ sym: 'B_\\lambda', name: 'Spektral parlaklık', unit: 'W sr⁻¹ m⁻³' }, { sym: 'k_B', name: 'Boltzmann sabiti', unit: 'J/K', value: '1,380649 × 10⁻²³ (tam)' }, { sym: 'T', name: 'Sıcaklık', unit: 'K' }] },
        { tex: '\\lambda_{max}\\,T = b \\approx 2{,}898 \\times 10^{-3}\\;\\text{m·K}', desc: 'Wien kayma yasası: sıcak cisimler daha kısa dalga boyunda tepe yapar.', vars: [{ sym: '\\lambda_{max}', name: 'Tepe dalga boyu', unit: 'm' }, { sym: 'b', name: 'Wien sabiti', unit: 'm·K', value: '2,898 × 10⁻³' }] },
        { tex: '\\ell_P = \\sqrt{\\frac{\\hbar G}{c^3}} \\approx 1{,}616 \\times 10^{-35}\\,\\text{m}', desc: 'Planck uzunluğu: bilinen fiziğin geçerliliğini yitirdiği ölçek.', vars: [{ sym: '\\hbar', name: 'İndirgenmiş Planck sabiti h/2π', unit: 'J·s', value: '1,0546 × 10⁻³⁴' }, { sym: 'G', name: 'Kütleçekim sabiti', unit: 'm³ kg⁻¹ s⁻²', value: '6,674 × 10⁻¹¹' }] }
      ],
      calc: {
        title: 'Foton enerjisi hesaplayıcı',
        inputs: [{ id: 'lam', label: 'Dalga boyu λ (nm)', value: 550, min: 0.0001, max: 1e10, step: 0.0001 }],
        compute: (v) => ({ label: 'Foton enerjisi', value: (h * c / (v.lam * 1e-9)) / 1.602176634e-19, unit: 'eV', note: 'E = ' + (h * c / (v.lam * 1e-9)).toExponential(3).replace('.', ',') + ' J · Frekans ≈ ' + (c / (v.lam * 1e-9) / 1e12).toPrecision(4).replace('.', ',') + ' THz' })
      },
      perDomain: {
        space: 'Yıldızların sıcaklığı tayflarının tepesinden okunur (Güneş ≈ 5772 K → ~500 nm). Kozmik mikrodalga arka plan, bilinen en kusursuz karacisim tayfıdır (2,725 K); ESA Planck uydusu onu haritaladı.',
        phys: 'Kuantum mekaniğinin temeli: enerji seviyeleri, Heisenberg belirsizliği (ΔxΔp ≥ ħ/2), fotoelektrik olay, Planck birimleri ve 2019 SI tanımları.',
        chem: 'Spektroskopi: atom ve moleküllerin soğurduğu/yaydığı ışığın enerjisi ΔE = hν; fotokimya, alev renkleri ve kimyasal bağların kuantumlu titreşim ve dönme seviyeleri.'
      },
      sim: [
        { lab: 'affeSpace', hash: '#mod9', label: 'Planck: karacisim, fotoelektrik, Planck birimleri, Kibble' },
        { lab: 'affeSpace', hash: '#mod6', label: 'Kozmik mikrodalga arka plan' },
        { lab: 'affePhysics', hash: '#mod1', label: 'Kuantum atom modeli' }
      ],
      related: ['foton', 'fotoelektrik-etki', 'kuantum-atom-orbitaller', 'yildiz-evrimi-hr', 'entropi', 'dalga'],
      refs: ['Planck, M. (1901). Ueber das Gesetz der Energieverteilung im Normalspectrum. Annalen der Physik 309(3), 553.', 'Einstein, A. (1905). Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt. Annalen der Physik 17, 132.', 'BIPM (2019). The International System of Units (SI), 9. baskı.']
    },

    /* ======================================================================
       KÖPRÜ KAVRAMLAR
       ====================================================================== */
    {
      id: 'entropi',
      title: 'Entropi: Termodinamikten Bilgiye, Yaşamdan Karadeliklere',
      domain: 'phys',
      bridges: ['phys', 'chem', 'bio', 'stats', 'space'],
      tags: ['entropi', 'termodinamiğin ikinci yasası', 'Boltzmann', 'Shannon', 'bilgi', 'Gibbs serbest enerjisi', 'zamanın oku', 'Bekenstein–Hawking'],
      summary: 'Bir sistemin kaç farklı mikroskobik düzenle aynı görünebileceğinin ölçüsü; zamanın yönünü, kimyasal tepkimelerin kendiliğindenliğini, bilginin miktarını ve karadeliklerin kuantum yapısını birbirine bağlar.',
      intuitive: `Odanızı toplamak emek ister ama dağılması kendiliğinden olur. Neden? Çünkü "dağınık" görünen düzenlerin sayısı, "derli toplu" düzenlerin sayısından <b>çok çok fazladır</b>. Rastgele değişimler sizi neredeyse kesinlikle daha olası olana, yani dağınıklığa götürür. Entropi tam olarak budur: bir durumun kaç farklı mikroskobik şekilde gerçekleşebileceğinin (logaritmik) sayısı. Termodinamiğin ikinci yasası yalıtılmış bir sistemde entropinin azalmadığını söyler — <b>zamanın oku</b> buradan gelir: kırılan yumurtanın kendiliğinden birleştiğini hiç görmeyiz.<br><br>Aynı fikir bilgide de karşımıza çıkar: bir mesajın içerdiği "sürpriz" miktarı Shannon entropisidir; hilesiz bir yazı-tura 1 bit bilgi taşır. Canlılar düzenli yapılarını, aldıkları enerjiyle çevrelerine daha fazla entropi atarak korur. Ve en şaşırtıcısı: bir karadeliğin entropisi hacmiyle değil, olay ufkunun <b>alanıyla</b> orantılıdır.`,
      history: `<b>Sadi Carnot</b> 1824'te buhar makinelerinin verim sınırını inceledi. <b>Rudolf Clausius</b> 1865'te Yunanca "dönüşüm" anlamına gelen <i>entropi</i> kelimesini türetti ve "evrenin entropisi bir maksimuma yönelir" dedi. <b>Ludwig Boltzmann</b> 1877'de entropiyi mikroskobik durumların sayısına bağladı; S = k log W formülü Viyana'daki mezar taşına kazındı. <b>J. Willard Gibbs</b> kimyasal termodinamiği ve serbest enerjiyi kurdu. <b>Claude Shannon</b> 1948'de iletişimin matematiksel kuramını yazdı; anlatılana göre <b>John von Neumann</b> ona "buna entropi de, çünkü kimse entropinin ne olduğunu gerçekten bilmiyor; tartışmalarda hep üstün gelirsin" demişti. <b>Erwin Schrödinger</b> 1944'te <i>Yaşam Nedir?</i>'de canlıların "negatif entropi ile beslendiğini" yazdı. <b>Jacob Bekenstein</b> 1972'de karadeliklerin ufuk alanıyla orantılı entropisi olması gerektiğini önerdi; <b>Hawking</b> 1974'te bunu karadeliklerin ışıdığını göstererek doğruladı.`,
      scientists: [
        { name: 'Rudolf Clausius', year: 1865, note: '"Entropi" kavramı ve adı' },
        { name: 'Ludwig Boltzmann', year: 1877, note: 'S = k log W' },
        { name: 'Claude Shannon', year: 1948, note: 'Bilgi entropisi' },
        { name: 'Jacob Bekenstein & Stephen Hawking', year: 1974, note: 'Karadelik entropisi' }
      ],
      formulas: [
        { tex: 'S = k_B \\ln W', desc: 'Boltzmann entropisi: W mikro durum sayısı.', vars: [{ sym: 'S', name: 'Entropi', unit: 'J/K' }, { sym: 'k_B', name: 'Boltzmann sabiti', unit: 'J/K', value: '1,380649 × 10⁻²³' }, { sym: 'W', name: 'Aynı makro durumu veren mikro durum sayısı', unit: '—' }] },
        { tex: 'H = -\\sum_i p_i \\log_2 p_i', desc: 'Shannon (bilgi) entropisi, bit cinsinden.', vars: [{ sym: 'H', name: 'Ortalama bilgi / belirsizlik', unit: 'bit' }, { sym: 'p_i', name: 'i. sonucun olasılığı', unit: '—' }] },
        { tex: '\\Delta G = \\Delta H - T\\Delta S', desc: 'Gibbs serbest enerjisi: ΔG < 0 ise tepkime kendiliğindendir.', vars: [{ sym: '\\Delta G', name: 'Serbest enerji değişimi', unit: 'J/mol' }, { sym: '\\Delta H', name: 'Entalpi değişimi', unit: 'J/mol' }, { sym: 'T', name: 'Mutlak sıcaklık', unit: 'K' }, { sym: '\\Delta S', name: 'Entropi değişimi', unit: 'J/(mol·K)' }] },
        { tex: 'S_{BH} = \\frac{k_B c^3 A}{4 G \\hbar}', desc: 'Bekenstein–Hawking karadelik entropisi: ufuk alanıyla orantılı.', vars: [{ sym: 'A', name: 'Olay ufkunun alanı', unit: 'm²' }, { sym: '\\hbar', name: 'İndirgenmiş Planck sabiti', unit: 'J·s', value: '1,0546 × 10⁻³⁴' }, { sym: 'G', name: 'Kütleçekim sabiti', unit: 'm³ kg⁻¹ s⁻²', value: '6,674 × 10⁻¹¹' }, { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '2,998 × 10⁸' }] }
      ],
      calc: {
        title: 'Shannon entropisi: hileli bir yazı-tura',
        inputs: [{ id: 'p', label: 'Yazı gelme olasılığı p', value: 0.5, min: 0, max: 1, step: 0.001 }],
        compute: (v) => {
          const p = v.p, q = 1 - p;
          const H = (p > 0 ? -p * Math.log2(p) : 0) + (q > 0 ? -q * Math.log2(q) : 0);
          return { label: 'Bir atışın bilgi miktarı', value: H, unit: 'bit', note: 'Hilesiz para (p = 0,5) en fazla belirsizliği taşır: 1 bit. p = 1 ise sonuç kesindir: 0 bit.' };
        }
      },
      perDomain: {
        phys: 'Termodinamiğin ikinci yasası, ısı makinelerinin Carnot verim sınırı, zamanın oku, istatistiksel mekanikte mikro durumlar ve evrenin "ısıl ölüm" senaryosu.',
        chem: 'Kendiliğindenlik ΔG = ΔH − TΔS ile belirlenir: tuzun suda çözünmesi (endotermik olduğu hâlde) entropi artışı sayesinde gerçekleşir; faz geçişleri ve denge sabitleri entropiyle ilişkilidir.',
        bio: 'Canlılar düşük entropili düzenlerini, besin ve güneş ışığından aldıkları enerjiyle çevreye ısı ve atık olarak entropi atarak sürdürür; protein katlanmasındaki hidrofobik etki su moleküllerinin entropisiyle yönlendirilir.',
        stats: 'Shannon entropisi ve bilgi kuramı, veri sıkıştırma sınırları, maksimum entropi ilkesi (sabit varyansla en yüksek entropili dağılım normal dağılımdır), karar ağaçlarında bilgi kazancı.',
        space: 'Karadelik entropisi ufuk alanıyla orantılıdır (holografik ilke); büyük patlamanın çok düşük entropili başlangıcı zamanın okunu belirler; evrenin uzak geleceği ısıl dengeye yönelir.'
      },
      sim: [
        { lab: 'affePhysics', hash: '#mod6', label: 'Termodinamik & akışkanlar' },
        { lab: 'affeStats', hash: '#mod8', label: 'Yazı-tura ve olasılık' },
        { lab: 'affeSpace', hash: '#mod1', label: 'Karadelik' },
        { lab: 'affeBio', hash: '#mod2', label: 'Hücre ve enerji' }
      ],
      related: ['termokimya-entalpi', 'karadelikler', 'bayes-teoremi', 'hucre-organelleri-atp', 'normal-dagilim', 'enzim-aktivasyon', 'monte-carlo-markov', 'kimyasal-denge'],
      refs: ['Clausius, R. (1865). Über verschiedene für die Anwendung bequeme Formen der Hauptgleichungen der mechanischen Wärmetheorie. Annalen der Physik 201(7).', 'Shannon, C. E. (1948). A Mathematical Theory of Communication. Bell System Technical Journal 27.', 'Bekenstein, J. D. (1973). Black Holes and Entropy. Phys. Rev. D 7, 2333.', 'Schrödinger, E. (1944). What Is Life? Cambridge University Press.']
    },
    {
      id: 'foton',
      title: 'Foton: Işığın Kuantumu',
      domain: 'phys',
      bridges: ['phys', 'chem', 'bio', 'space'],
      tags: ['foton', 'ışık', 'E = hν', 'Compton saçılması', 'fotosentez', 'görme', 'spektroskopi', 'kozmik mikrodalga arka plan'],
      summary: 'Elektromanyetik ışımanın taşıyıcısı olan, kütlesiz ve enerjisi frekansıyla orantılı kuantum parçacığı.',
      intuitive: `Işık hem dalga hem parçacıktır. Bir su dalgası gibi girişim yapar (iki yarıktan geçince çizgili desen oluşturur), ama bir dedektöre çarptığında her zaman <b>tek tek tanecikler</b> hâlinde varır: fotonlar. Her fotonun enerjisi rengine bağlıdır — mavi bir foton kırmızıdan daha fazla, X-ışını fotonu ise binlerce kat fazla enerji taşır. Bu yüzden güneş yanığına kızılötesi değil morötesi ışık yol açar: tek bir UV fotonu DNA'daki bir bağı kırabilecek kadar enerjiklidir.<br><br>Fotonlar her yerdedir: bitkiler klorofil molekülleriyle kırmızı ve mavi fotonları yakalayıp şekere dönüştürür; gözünüzdeki çubuk hücreleri tek bir fotonu algılayabilir; atomlar yalnızca belirli enerjideki fotonları soğurup yaydığı için yıldızların tayfı onların "parmak izini" verir. Ve gökyüzünün her yönünden gelen en eski fotonlar, evren yalnızca 380.000 yaşındayken yola çıkmıştır.`,
      history: `<b>Isaac Newton</b> 1704'teki <i>Opticks</i>'te ışığın taneciklerden oluştuğunu savundu. <b>Thomas Young</b> 1801'deki çift yarık deneyiyle girişimi gösterip dalga kuramını güçlendirdi; <b>James Clerk Maxwell</b> 1865'te ışığın elektromanyetik bir dalga olduğunu kanıtladı. <b>Max Planck</b> 1900'de enerjinin kuantumlu alınıp verildiğini varsaydı; <b>Einstein</b> 1905'te ışığın kendisinin "ışık kuantumlarından" oluştuğunu önerip fotoelektrik olayı açıkladı (1921 Nobel). <b>Arthur Compton</b> 1923'te X-ışınlarının elektronlardan bilardo topları gibi saçıldığını göstererek fotonun momentum taşıdığını kanıtladı (1927 Nobel). "Foton" adını kimyager <b>Gilbert N. Lewis</b> 1926'da verdi. <b>Penzias ve Wilson</b> 1964'te büyük patlamadan kalan fotonları (kozmik mikrodalga arka plan) keşfetti.`,
      scientists: [
        { name: 'Albert Einstein', year: 1905, note: 'Işık kuantumu hipotezi' },
        { name: 'Arthur Compton', year: 1923, note: 'Compton saçılması' },
        { name: 'Gilbert N. Lewis', year: 1926, note: '"Foton" adı' },
        { name: 'Arno Penzias & Robert Wilson', year: 1964, note: 'Kozmik mikrodalga arka plan' }
      ],
      formulas: [
        { tex: 'E = h\\nu = \\frac{hc}{\\lambda}', desc: 'Foton enerjisi.', vars: [{ sym: 'E', name: 'Enerji', unit: 'J' }, { sym: 'h', name: 'Planck sabiti', unit: 'J·s', value: '6,626 × 10⁻³⁴' }, { sym: '\\nu', name: 'Frekans', unit: 'Hz' }, { sym: '\\lambda', name: 'Dalga boyu', unit: 'm' }, { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '2,998 × 10⁸' }] },
        { tex: 'p = \\frac{h}{\\lambda} = \\frac{E}{c}', desc: 'Foton momentumu (kütlesiz olduğu hâlde).', vars: [{ sym: 'p', name: 'Momentum', unit: 'kg·m/s' }] },
        { tex: '\\Delta\\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)', desc: 'Compton saçılması: elektrona çarpan fotonun dalga boyu uzar.', vars: [{ sym: 'm_e', name: 'Elektron kütlesi', unit: 'kg', value: '9,109 × 10⁻³¹' }, { sym: '\\theta', name: 'Saçılma açısı', unit: 'radyan' }, { sym: '\\Delta\\lambda', name: 'Dalga boyu artışı', unit: 'm' }] },
        { tex: '\\dot{N} = \\frac{P\\lambda}{hc}', desc: 'P gücündeki bir kaynağın saniyede yaydığı foton sayısı.', vars: [{ sym: '\\dot{N}', name: 'Foton akısı', unit: '1/s' }, { sym: 'P', name: 'Işık gücü', unit: 'W' }] }
      ],
      calc: {
        title: 'Saniyede kaç foton?',
        inputs: [
          { id: 'P', label: 'Işık gücü P (W)', value: 0.001, min: 1e-15, max: 1e30, step: 0.000001 },
          { id: 'lam', label: 'Dalga boyu λ (nm)', value: 650, min: 0.001, max: 1e9, step: 0.1 }
        ],
        compute: (v) => ({ label: 'Saniyede yayılan foton sayısı', value: v.P * v.lam * 1e-9 / (h * c), unit: '1/s', note: '1 mW\'lık kırmızı lazer saniyede ~3 × 10¹⁵ foton yayar.' })
      },
      perDomain: {
        phys: 'Elektromanyetik etkileşimin taşıyıcısı (kuantum elektrodinamiği), dalga–parçacık ikiliği, fotoelektrik olay, lazerler ve kuantum dolanıklık deneyleri.',
        chem: 'Soğurma ve yayınım spektroskopisi (Beer–Lambert yasası), fotokimya (fotoliz, ozon tabakası), floresans; molekül bağlarının enerjisi uygun fotonlarla kırılabilir.',
        bio: 'Fotosentez: klorofilin P680 ve P700 merkezleri foton enerjisini kimyasal enerjiye çevirir; görme: retinadaki rodopsin tek fotonla yapısını değiştirir; UV fotonları DNA\'da timin dimerleri oluşturur.',
        space: 'Yıldız ışığının tayfı bileşim, sıcaklık ve hız bilgisi taşır; kozmik mikrodalga arka plan fotonları evrenin 380.000 yaşındaki fotoğrafıdır; genişleyen evrende fotonların dalga boyu uzar (kırmızıya kayma).'
      },
      sim: [
        { lab: 'affePhysics', hash: '#mod5', label: 'Optik & çift yarık' },
        { lab: 'affeSpace', hash: '#mod9', label: 'Foton enerjisi & fotoelektrik' },
        { lab: 'affeSpace', hash: '#mod3', label: 'Çok dalga boylu teleskoplar' },
        { lab: 'affeBio', hash: '#mod2', label: 'Bitki hücresi ve kloroplast' }
      ],
      related: ['planck-sabiti', 'fotoelektrik-etki', 'dalga', 'kuantum-atom-orbitaller', 'uzay-teleskoplari', 'hucre-organelleri-atp', 'maxwell-denklemleri', 'atom'],
      refs: ['Einstein, A. (1905). Annalen der Physik 17, 132.', 'Compton, A. H. (1923). A Quantum Theory of the Scattering of X-rays by Light Elements. Phys. Rev. 21, 483.', 'Lewis, G. N. (1926). The Conservation of Photons. Nature 118, 874.']
    },
    {
      id: 'atom',
      title: 'Atom: Maddenin Yapı Taşı',
      domain: 'chem',
      bridges: ['chem', 'phys', 'bio', 'space'],
      tags: ['atom', 'proton', 'nötron', 'elektron', 'çekirdek', 'Rutherford', 'Bohr modeli', 'element', 'nükleosentez'],
      summary: 'Pozitif yüklü minicik bir çekirdek ve etrafındaki elektron bulutundan oluşan, kimyasal elementlerin en küçük birimi.',
      intuitive: `Bir atomu bir futbol stadyumu büyüklüğüne büyütseniz, çekirdeği orta sahadaki <b>bir nohut</b> kadar olurdu; elektronlar ise tribünlerin en üstünde dolanan bulut gibi. Yani atom neredeyse tamamen boşluktur — ama elektronların elektrik itmesi sayesinde sandalyenize gömülmeden oturabilirsiniz. Çekirdekteki <b>proton sayısı</b> atomun kimliğini belirler: 1 proton hidrojen, 6 karbon, 79 altın. Nötron sayısı değişince aynı elementin izotopları oluşur (karbon-12, karbon-14).<br><br>Elektronlar rastgele değil, belirli enerji "katlarında" bulunur; bir kattan diğerine atlarken belirli renkte ışık yayar ya da soğururlar — her elementin kendine özgü bir ışık barkodu vardır. Ve vücudunuzdaki hidrojen büyük patlamada, karbon ve oksijen yıldızların içinde, demir ise patlayan yıldızlarda üretildi.`,
      history: `MÖ 5. yüzyılda <b>Leukippos ve Demokritos</b>, maddenin bölünemez (<i>atomos</i>) parçacıklardan oluştuğunu öne sürdü. <b>John Dalton</b> 1808'de kimyasal tepkimelerin sabit oranlarını atomlarla açıkladı. <b>Dmitri Mendeleev</b> 1869'da elementleri periyodik tabloda düzenledi. <b>J. J. Thomson</b> 1897'de elektronu buldu ve "üzümlü kek" modelini önerdi. <b>Ernest Rutherford</b>'un yönetiminde <b>Geiger ve Marsden</b> 1909'da altın varaktan alfa parçacıkları geçirdiğinde, bazılarının geri sektiğini gördüler; Rutherford "bir kâğıt mendile 15 inçlik bir top mermisi atıp geri sektiğini görmek kadar inanılmazdı" dedi ve 1911'de çekirdekli atom modelini kurdu. <b>Niels Bohr</b> 1913'te kuantumlu elektron yörüngelerini, <b>Erwin Schrödinger</b> 1926'da dalga denklemini getirdi; <b>James Chadwick</b> 1932'de nötronu keşfetti.`,
      scientists: [
        { name: 'John Dalton', year: 1808, note: 'Modern atom kuramı' },
        { name: 'J. J. Thomson', year: 1897, note: 'Elektronun keşfi' },
        { name: 'Ernest Rutherford', year: 1911, note: 'Çekirdekli atom modeli' },
        { name: 'Niels Bohr', year: 1913, note: 'Kuantumlu yörüngeler' },
        { name: 'James Chadwick', year: 1932, note: 'Nötronun keşfi' }
      ],
      formulas: [
        { tex: 'E_n = -\\frac{13{,}6\\,\\text{eV}}{n^2}', desc: 'Bohr modelinde hidrojenin enerji seviyeleri.', vars: [{ sym: 'E_n', name: 'n. seviyenin enerjisi', unit: 'eV' }, { sym: 'n', name: 'Baş kuantum sayısı', unit: '—' }] },
        { tex: '\\frac{1}{\\lambda} = R_\\infty\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)', desc: 'Rydberg formülü: hidrojenin tayf çizgileri.', vars: [{ sym: '\\lambda', name: 'Yayılan ışığın dalga boyu', unit: 'm' }, { sym: 'R_\\infty', name: 'Rydberg sabiti', unit: '1/m', value: '1,0974 × 10⁷' }, { sym: 'n_1, n_2', name: 'Alt ve üst seviye (n₂ > n₁)', unit: '—' }] },
        { tex: 'A = Z + N', desc: 'Kütle numarası = proton sayısı + nötron sayısı.', vars: [{ sym: 'A', name: 'Kütle numarası', unit: '—' }, { sym: 'Z', name: 'Atom numarası (proton sayısı)', unit: '—' }, { sym: 'N', name: 'Nötron sayısı', unit: '—' }] },
        { tex: 'r_n = n^2 a_0,\\quad a_0 \\approx 0{,}0529\\,\\text{nm}', desc: 'Bohr yarıçapları.', vars: [{ sym: 'r_n', name: 'n. yörüngenin yarıçapı', unit: 'm' }, { sym: 'a_0', name: 'Bohr yarıçapı', unit: 'm', value: '5,29 × 10⁻¹¹' }] }
      ],
      calc: {
        title: 'Hidrojen tayf çizgisi',
        inputs: [
          { id: 'n1', label: 'Alt seviye n₁', value: 2, min: 1, max: 20, step: 1 },
          { id: 'n2', label: 'Üst seviye n₂', value: 3, min: 2, max: 40, step: 1 }
        ],
        compute: (v) => {
          const n1 = Math.round(v.n1), n2 = Math.max(Math.round(v.n2), n1 + 1);
          const lam = 1 / (1.0973731568e7 * (1 / (n1 * n1) - 1 / (n2 * n2)));
          return { label: 'Yayılan ışığın dalga boyu', value: lam * 1e9, unit: 'nm', note: `${n2} → ${n1} geçişi · Foton enerjisi ${(1239.84 / (lam * 1e9)).toFixed(3).replace('.', ',')} eV (3→2: kırmızı Hα çizgisi, 656 nm)` };
        }
      },
      perDomain: {
        chem: 'Periyodik tablo, elektron dizilimi, değerlik elektronları ve kimyasal bağlar; atomların birleşerek molekülleri oluşturması kimyanın ta kendisidir.',
        phys: 'Kuantum mekaniğiyle elektron orbitalleri, çekirdeğin güçlü kuvvetle bir arada tutulması, radyoaktivite ve atom spektroskopisi.',
        bio: 'Yaşamın kütlesinin %96\'sı yalnızca dört elementtir (C, H, O, N) ve P ile S\'yle birlikte CHNOPS altılısı; insan vücudunda ~7 × 10²⁷ atom bulunur, büyük kısmı her birkaç yılda bir yenilenir.',
        space: 'Hidrojen ve helyum büyük patlamada, karbondan demire kadar elementler yıldızlarda, daha ağırları süpernovalarda ve nötron yıldızı çarpışmalarında üretildi; yıldız tayflarındaki atom çizgileri bileşimlerini gösterir.'
      },
      sim: [
        { lab: 'affePhysics', hash: '#mod1', label: '3B kuantum atom modeli & Build-an-Atom' },
        { lab: 'affeLab', hash: '', label: 'Periyodik tablo & moleküller' },
        { lab: 'affeSpace', hash: '#mod2', label: 'Yıldızlarda element üretimi' }
      ],
      related: ['periyodik-sistem', 'kuantum-atom-orbitaller', 'standart-model', 'kimyasal-bag-vsepr', 'yildiz-evrimi-hr', 'foton', 'karbon-14', 'radyoaktivite-bulut-odasi'],
      refs: ['Rutherford, E. (1911). The Scattering of α and β Particles by Matter and the Structure of the Atom. Phil. Mag. 21, 669.', 'Bohr, N. (1913). On the Constitution of Atoms and Molecules. Phil. Mag. 26, 1.', 'Chadwick, J. (1932). Possible Existence of a Neutron. Nature 129, 312.']
    },
    {
      id: 'enzim-aktivasyon',
      title: 'Enzimler, Aktivasyon Enerjisi ve Arrhenius Denklemi',
      domain: 'bio',
      bridges: ['bio', 'chem', 'phys', 'stats'],
      tags: ['enzim', 'aktivasyon enerjisi', 'Arrhenius', 'katalizör', 'Michaelis-Menten', 'geçiş durumu', 'Boltzmann dağılımı', 'ateş'],
      summary: 'Tepkimelerin aşması gereken enerji tepesi ve bu tepeyi alçaltarak yaşamın kimyasını milyonlarca kat hızlandıran protein katalizörler.',
      intuitive: `Bir kimyasal tepkimeyi, bir tepenin arkasındaki vadiye top yuvarlamaya benzetin. Vadi daha alçakta olsa bile (tepkime enerji açığa çıkarsa bile) top önce <b>tepeyi aşmalıdır</b>: bu tepenin yüksekliği <b>aktivasyon enerjisidir</b>. Moleküller sürekli çarpışır ama yalnızca yeterince enerjik olanlar tepeyi aşar. Sıcaklığı artırmak enerjik moleküllerin oranını artırır — bu yüzden yemek ısıtınca pişer, buzdolabında bozulma yavaşlar. Kural olarak her 10 °C artışta birçok tepkime yaklaşık <b>iki kat</b> hızlanır.<br><br><b>Enzimler</b> tepeyi alçaltan proteinlerdir: tepkimeye giren molekülleri (substrat) tam uyan bir cebe (aktif bölge) yerleştirip doğru konumda tutarlar. Böylece vücut sıcaklığında, milyonlarca yıl sürecek tepkimeler milisaniyelerde gerçekleşir. Ama enzimler hassastır: ateş çok yükselirse yapıları bozulur (denatürasyon) ve iş göremez olurlar.`,
      history: `<b>Svante Arrhenius</b> 1889'da tepkime hızının sıcaklıkla üstel arttığını formüle etti (1903 Nobel). <b>Emil Fischer</b> 1894'te enzim-substrat ilişkisi için "kilit ve anahtar" benzetmesini önerdi. <b>Eduard Buchner</b> 1897'de canlı hücre olmadan, yalnızca maya özütüyle fermantasyon yaptırarak enzimlerin kimyasal maddeler olduğunu gösterdi (1907 Nobel). <b>Leonor Michaelis ve Maud Menten</b> 1913'te enzim kinetiğinin temel denklemini yayımladı; Menten kadınların bilim insanı olarak tanınmadığı bir dönemde öncü bir biyokimyacıydı. <b>James Sumner</b> 1926'da üreaz enzimini kristalleştirerek enzimlerin protein olduğunu kanıtladı (1946 Nobel). <b>Henry Eyring</b> 1935'te geçiş durumu kuramını, <b>Daniel Koshland</b> 1958'de "uyarılmış uyum" modelini geliştirdi.`,
      scientists: [
        { name: 'Svante Arrhenius', year: 1889, note: 'Aktivasyon enerjisi ve hız denklemi' },
        { name: 'Eduard Buchner', year: 1897, note: 'Hücresiz fermantasyon' },
        { name: 'Leonor Michaelis & Maud Menten', year: 1913, note: 'Enzim kinetiği' },
        { name: 'James Sumner', year: 1926, note: 'Enzimlerin protein olduğunun kanıtı' }
      ],
      formulas: [
        { tex: 'k = A\\, e^{-E_a/(RT)}', desc: 'Arrhenius denklemi.', vars: [{ sym: 'k', name: 'Hız sabiti', unit: 'tepkimeye bağlı' }, { sym: 'A', name: 'Frekans (çarpışma) faktörü', unit: 'k ile aynı' }, { sym: 'E_a', name: 'Aktivasyon enerjisi', unit: 'J/mol' }, { sym: 'R', name: 'Gaz sabiti', unit: 'J/(mol·K)', value: '8,314' }, { sym: 'T', name: 'Mutlak sıcaklık', unit: 'K' }] },
        { tex: 'v = \\frac{V_{max}[S]}{K_m + [S]}', desc: 'Michaelis–Menten enzim kinetiği.', vars: [{ sym: 'v', name: 'Tepkime hızı', unit: 'M/s' }, { sym: 'V_{max}', name: 'En yüksek hız', unit: 'M/s' }, { sym: '[S]', name: 'Substrat derişimi', unit: 'M' }, { sym: 'K_m', name: 'Michaelis sabiti (yarı en yüksek hızdaki [S])', unit: 'M' }] },
        { tex: '\\frac{k_2}{k_1} = \\exp\\!\\left[\\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)\\right]', desc: 'İki sıcaklıkta hız sabitlerinin oranı.', vars: [{ sym: 'T_1, T_2', name: 'Başlangıç ve son sıcaklık', unit: 'K' }] },
        { tex: 'f(E > E_a) \\approx e^{-E_a/(k_B T)}', desc: 'Boltzmann dağılımında tepeyi aşacak kadar enerjik moleküllerin kesri.', vars: [{ sym: 'f', name: 'Enerjisi E_a\'yı aşan molekül kesri', unit: '—' }, { sym: 'k_B', name: 'Boltzmann sabiti', unit: 'J/K', value: '1,380649 × 10⁻²³' }] }
      ],
      calc: {
        title: 'Sıcaklık tepkimeyi ne kadar hızlandırır?',
        inputs: [
          { id: 'Ea', label: 'Aktivasyon enerjisi Eₐ (kJ/mol)', value: 50, min: 0, max: 500, step: 0.1 },
          { id: 'T1', label: 'Başlangıç sıcaklığı (°C)', value: 25, min: -200, max: 1000, step: 0.1 },
          { id: 'T2', label: 'Yeni sıcaklık (°C)', value: 35, min: -200, max: 1000, step: 0.1 }
        ],
        compute: (v) => {
          const T1 = v.T1 + 273.15, T2 = v.T2 + 273.15;
          return { label: 'Hız oranı k₂/k₁', value: Math.exp(v.Ea * 1000 / 8.314462618 * (1 / T1 - 1 / T2)), unit: '×', note: 'Eₐ ≈ 50 kJ/mol için 10 °C artış hızı yaklaşık 2 katına çıkarır.' };
        }
      },
      perDomain: {
        bio: 'Metabolizmanın tüm adımları enzimlerle yürür (DNA polimeraz, ATP sentaz, katalaz); sıcaklık ve pH optimumu, ateşin etkisi, ilaçların enzim inhibisyonuyla çalışması.',
        chem: 'Kataliz ve tepkime kinetiği: katalizörler denge konumunu değil, dengeye ulaşma hızını değiştirir; endüstriyel katalizörler (Haber–Bosch) ve otomobil katalitik konvertörleri.',
        phys: 'İstatistiksel mekanik: moleküllerin enerji dağılımı (Maxwell–Boltzmann), geçiş durumu kuramı ve hafif hidrojen aktarımlarında kuantum tünellemesi.',
        stats: 'Boltzmann dağılımının kuyruğu bir olasılık hesabıdır: tepkime, yeterli enerjiye ulaşan "nadir olayların" sayısıyla belirlenir; tek molekül enzim deneylerinde bekleme süreleri üstel dağılır.'
      },
      sim: [
        { lab: 'affeBio', hash: '#mod3', label: 'Gen → protein' },
        { lab: 'affeLab', hash: '', label: 'Tepkime kinetiği & termokimya' },
        { lab: 'affePhysics', hash: '#mod6', label: 'Termodinamik' },
        { lab: 'affeStats', hash: '#mod2', label: 'Üstel ve diğer dağılımlar' }
      ],
      related: ['termokimya-entalpi', 'kimyasal-denge', 'hucre-organelleri-atp', 'santral-dogma', 'entropi', 'kuantum-tunelleme', 'ustel-buyume-bozunma'],
      refs: ['Arrhenius, S. (1889). Über die Reaktionsgeschwindigkeit bei der Inversion von Rohrzucker durch Säuren. Z. Phys. Chem. 4, 226.', 'Michaelis, L. & Menten, M. L. (1913). Die Kinetik der Invertinwirkung. Biochem. Z. 49, 333.', 'Eyring, H. (1935). The Activated Complex in Chemical Reactions. J. Chem. Phys. 3, 107.']
    },
    {
      id: 'ustel-buyume-bozunma',
      title: 'Üstel Büyüme ve Bozunma: Bakterilerden Kozmik Genişlemeye',
      domain: 'stats',
      bridges: ['stats', 'phys', 'bio', 'chem', 'space'],
      tags: ['üstel büyüme', 'üstel bozunma', 'yarı ömür', 'ikiye katlanma süresi', 'Poisson', 'lojistik büyüme', 'birinci derece kinetik', 'enflasyon'],
      summary: 'Değişim hızının mevcut miktarla orantılı olduğu süreçler: bakteri kolonileri, radyoaktif bozunma, ilacın vücuttan atılması ve evrenin hızlanan genişlemesi.',
      intuitive: `Efsaneye göre satrancın mucidi, ödül olarak ilk kareye 1, ikinciye 2, üçüncüye 4 pirinç tanesi — her karede iki katı — istedi. Kral güldü; ama 64. karede gereken pirinç, insanlık tarihinde üretilen tüm pirinçten fazlaydı. <b>Üstel büyüme</b> budur: miktar arttıkça artış hızı da artar. Her 20 dakikada bölünen bir bakteri bir günde astronomik sayılara ulaşır — ta ki besin bitene kadar (bu sınırlamaya <b>lojistik büyüme</b> denir).<br><br>Tersi <b>üstel bozunmadır</b>: radyoaktif çekirdeklerin her biri bir zar atar gibi rastgele bozunur ama toplu davranış kusursuz bir eğri çizer: her yarı ömürde miktar yarıya iner. Pratik bir kural: yıllık %7 büyüyen bir şey yaklaşık 70/7 = <b>10 yılda</b> ikiye katlanır ("70 kuralı").`,
      history: `<b>Jacob Bernoulli</b> 1683'te bileşik faiz problemini incelerken e ≈ 2,718 sayısına ulaştı; <b>Leonhard Euler</b> 1748'de e'yi ve üstel fonksiyonu sistemleştirdi. <b>Thomas Malthus</b> 1798'de nüfusun üstel, besin üretiminin doğrusal arttığını öne sürdü; bu fikir Darwin'e doğal seçilim için ilham verdi. <b>Pierre-François Verhulst</b> 1838'de büyümenin bir taşıma kapasitesiyle sınırlandığı lojistik denklemi buldu. <b>Siméon Denis Poisson</b> 1837'de nadir rastgele olayların dağılımını tanımladı; <b>Ladislaus Bortkiewicz</b> 1898'de Prusya ordusunda attan düşerek ölen asker sayılarının bu dağılıma uyduğunu gösterdi. <b>Ernest Rutherford ve Frederick Soddy</b> 1902'de radyoaktif bozunmanın üstel yasasını kurdu. <b>Alan Guth</b> 1980'de evrenin ilk anında üstel genişlediği "kozmik şişme" kuramını önerdi; 1998'de iki ekip evrenin genişlemesinin bugün de hızlandığını (karanlık enerji) keşfetti.`,
      scientists: [
        { name: 'Leonhard Euler', year: 1748, note: 'e ve üstel fonksiyon' },
        { name: 'Thomas Malthus', year: 1798, note: 'Nüfus büyümesi' },
        { name: 'Siméon Denis Poisson', year: 1837, note: 'Poisson dağılımı' },
        { name: 'Ernest Rutherford & Frederick Soddy', year: 1902, note: 'Radyoaktif bozunma yasası' }
      ],
      formulas: [
        { tex: 'N(t) = N_0\\, e^{r t}', desc: 'Üstel büyüme (r > 0) ya da bozunma (r < 0).', vars: [{ sym: 'N_0', name: 'Başlangıç miktarı', unit: 'adet' }, { sym: 'r', name: 'Büyüme (bozunma) oranı', unit: '1/zaman' }, { sym: 't', name: 'Zaman', unit: 'zaman' }] },
        { tex: 't_2 = \\frac{\\ln 2}{r} \\approx \\frac{70}{r\\,(\\%)}', desc: 'İkiye katlanma süresi ("70 kuralı"); bozunmada yarı ömür.', vars: [{ sym: 't_2', name: 'İkiye katlanma süresi', unit: 'zaman' }] },
        { tex: 'P(k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}', desc: 'Poisson dağılımı: belli bir sürede k bozunma (veya nadir olay) gözleme olasılığı.', vars: [{ sym: '\\lambda', name: 'Beklenen olay sayısı', unit: '—' }, { sym: 'k', name: 'Gözlenen olay sayısı', unit: 'adet' }] },
        { tex: '\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)', desc: 'Lojistik büyüme: taşıma kapasitesi K\'ye yaklaşınca yavaşlar.', vars: [{ sym: 'K', name: 'Taşıma kapasitesi', unit: 'adet' }] }
      ],
      calc: {
        title: 'İkiye katlanma süresi',
        inputs: [{ id: 'r', label: 'Dönem başına büyüme (%)', value: 7, min: 0.001, max: 1000, step: 0.001 }],
        compute: (v) => ({ label: 'İkiye katlanma süresi', value: Math.log(2) / Math.log(1 + v.r / 100), unit: 'dönem', note: '70 kuralı tahmini: ' + (70 / v.r).toFixed(2).replace('.', ',') + ' dönem' })
      },
      perDomain: {
        stats: 'Poisson süreci ve üstel bekleme süreleri, sayım verisinin modellenmesi, log dönüşümüyle doğrusal regresyon, sağkalım analizi.',
        phys: 'Radyoaktif bozunma, kondansatörün boşalması (RC devresi), ışığın ortamda soğurulması (Beer–Lambert), Newton soğuma yasası.',
        bio: 'Bakteri kolonileri, salgınların başlangıç evresi (R₀ > 1), lojistik nüfus büyümesi, av–avcı döngüleri, ilaç dozlarının vücuttan yarı ömürle atılması.',
        chem: 'Birinci derece tepkime kinetiği: tepken derişimi üstel azalır; ilaçların plazma yarı ömrü ve tepkime hızı sabitleri.',
        space: 'Kozmik şişme (evrenin ilk 10⁻³² saniyede üstel genişlemesi), karanlık enerjinin hızlandırdığı genişleme (a ∝ e^{Ht}), radyoaktif elementlerle yıldız ve göktaşı yaşı tayini.'
      },
      sim: [
        { lab: 'affeStats', hash: '#mod2', label: 'Üstel ve Poisson dağılımları' },
        { lab: 'affeStats', hash: '#mod6', label: 'Rastgele süreçler' },
        { lab: 'affeBio', hash: '#mod4', label: 'Lotka–Volterra popülasyon dinamiği' },
        { lab: 'affeSpace', hash: '#mod6', label: 'Evrenin genişlemesi (Friedmann)' },
        { lab: 'affePhysics', hash: '#mod1', label: 'Radyoaktif bozunma' }
      ],
      related: ['karbon-14', 'radyoaktivite-bulut-odasi', 'lotka-volterra', 'kutlecekim-dalgalari-karanlik-madde', 'merkezi-limit-teoremi', 'enzim-aktivasyon', 'monte-carlo-markov'],
      refs: ['Malthus, T. R. (1798). An Essay on the Principle of Population. Londra.', 'Rutherford, E. & Soddy, F. (1902). The Cause and Nature of Radioactivity. Phil. Mag. 4, 370.', 'Guth, A. H. (1981). Inflationary universe. Phys. Rev. D 23, 347.']
    },
    {
      id: 'dalga',
      title: 'Dalgalar: Sesten Işığa, Kuantumdan Kütleçekime',
      domain: 'phys',
      bridges: ['phys', 'space', 'stats', 'bio'],
      tags: ['dalga', 'frekans', 'dalga boyu', 'girişim', 'Fourier', 'Doppler', 'de Broglie', 'elektromanyetik dalga', 'ses'],
      summary: 'Maddenin kendisini taşımadan enerji ve bilgi taşıyan titreşimler; ses, ışık, kuantum parçacıkları ve uzay-zamanın kendisi dalga gibi davranır.',
      intuitive: `Bir stadyumda "dalga" yapan seyirciler yerlerinden kalkıp oturur ama hiçbiri koltuğunu terk etmez; yine de bir hareket stadyumu dolaşır. <b>Dalga</b> budur: madde değil, <b>bozulma</b> yol alır. Her dalganın bir <b>frekansı</b> (saniyede kaç kez titrediği), bir <b>dalga boyu</b> (tepeler arası uzaklık) ve bir hızı vardır; üçü v = fλ ile bağlıdır.<br><br>İki dalga karşılaşınca toplanır: tepe tepeyle buluşunca güçlenir, tepe çukurla buluşunca söner (<b>girişim</b>) — gürültü önleyici kulaklıklar böyle çalışır. Fourier'nin büyük keşfi, <b>her</b> karmaşık sinyalin basit sinüs dalgalarının toplamı olarak yazılabileceğidir; kulağınızdaki salyangoz (koklea) sesi tam da böyle frekanslarına ayırır. 20. yüzyıl daha da şaşırtıcısını gösterdi: elektronlar da dalga gibi girişim yapar, ve kütleli cisimlerin hızlanması uzay-zamanın kendisinde dalgalar yaratır.`,
      history: `<b>Christiaan Huygens</b> 1678'de ışığın dalga olarak yayıldığını önerdi. <b>Thomas Young</b> 1801'de çift yarık deneyiyle ışığın girişimini gösterdi. <b>Joseph Fourier</b> ısı iletimini incelerken 1807'de (yayın 1822) her fonksiyonun sinüslerin toplamı olarak yazılabileceğini öne sürdü. <b>Christian Doppler</b> 1842'de hareketli kaynakların frekans kaymasını açıkladı. <b>James Clerk Maxwell</b> 1865'te elektromanyetik dalgaları öngördü, <b>Heinrich Hertz</b> 1887'de laboratuvarda üretti. <b>Louis de Broglie</b> 1924 doktora tezinde parçacıkların da dalga boyu olduğunu önerdi; Davisson ve Germer 1927'de elektron kırınımıyla doğruladı. <b>Schrödinger</b> 1926'da kuantum dalga denklemini yazdı. 2015'te LIGO, Einstein'ın 1916'da öngördüğü kütleçekim dalgalarını yakaladı.`,
      scientists: [
        { name: 'Thomas Young', year: 1801, note: 'Çift yarık girişimi' },
        { name: 'Joseph Fourier', year: 1822, note: 'Fourier serileri' },
        { name: 'Heinrich Hertz', year: 1887, note: 'Elektromanyetik dalgaların üretimi' },
        { name: 'Louis de Broglie', year: 1924, note: 'Madde dalgaları (1929 Nobel)' }
      ],
      formulas: [
        { tex: 'v = f\\lambda', desc: 'Dalga hızı, frekans ve dalga boyu ilişkisi.', vars: [{ sym: 'v', name: 'Dalga hızı', unit: 'm/s' }, { sym: 'f', name: 'Frekans', unit: 'Hz' }, { sym: '\\lambda', name: 'Dalga boyu', unit: 'm' }] },
        { tex: 'y(x,t) = A\\sin(kx - \\omega t)', desc: 'İlerleyen sinüs dalgası.', vars: [{ sym: 'A', name: 'Genlik', unit: 'm' }, { sym: 'k', name: 'Dalga sayısı 2π/λ', unit: '1/m' }, { sym: '\\omega', name: 'Açısal frekans 2πf', unit: 'rad/s' }] },
        { tex: 'f(t) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty}\\left[a_n\\cos(n\\omega t) + b_n\\sin(n\\omega t)\\right]', desc: 'Fourier serisi: periyodik her sinyal sinüs ve kosinüslerin toplamıdır.', vars: [{ sym: 'a_n, b_n', name: 'Fourier katsayıları', unit: 'sinyal birimi' }, { sym: 'n', name: 'Harmonik sırası', unit: '—' }] },
        { tex: '\\lambda = \\frac{h}{p}', desc: 'de Broglie dalga boyu: madde de dalgadır.', vars: [{ sym: 'h', name: 'Planck sabiti', unit: 'J·s', value: '6,626 × 10⁻³⁴' }, { sym: 'p', name: 'Momentum', unit: 'kg·m/s' }] }
      ],
      calc: {
        title: 'Elektronun de Broglie dalga boyu',
        inputs: [{ id: 'V', label: 'Hızlandırma gerilimi (V)', value: 100, min: 0.001, max: 1e6, step: 0.001 }],
        compute: (v) => {
          const me = 9.1093837015e-31, e = 1.602176634e-19;
          const lam = h / Math.sqrt(2 * me * e * v.V);
          return { label: 'Dalga boyu', value: lam * 1e9, unit: 'nm', note: 'Atomlar arası uzaklık (~0,1–0,3 nm) mertebesinde — bu yüzden elektron mikroskopları ve kırınım deneyleri mümkündür (göreli düzeltme ihmal edildi).' };
        }
      },
      perDomain: {
        phys: 'Mekanik dalgalar, elektromanyetik dalgalar (Maxwell), girişim ve kırınım, duran dalgalar, kuantum dalga fonksiyonu ve Schrödinger denklemi, tünelleme.',
        space: 'Tüm astronomi elektromanyetik dalgalarla yapılır; kırmızıya kayma ve Doppler ile hızlar ölçülür; LIGO kütleçekim dalgalarını, pulsar zamanlama dizileri nanohertz dalgaları dinler.',
        stats: 'Fourier analizi ve spektral analiz: zaman serilerinde periyodik bileşenlerin bulunması (periodogram), sinyal–gürültü ayrımı, dijital sinyal işleme ve görüntü sıkıştırma (JPEG).',
        bio: 'İşitme: koklea sesi frekanslarına ayıran biyolojik bir Fourier analizörüdür; beyin dalgaları (EEG), kalp ritmi (EKG), ultrason görüntüleme ve sinir sinyallerinin akson boyunca yayılması.'
      },
      sim: [
        { lab: 'affePhysics', hash: '#mod5', label: 'Optik & çift yarık girişimi' },
        { lab: 'affePhysics', hash: '#mod4', label: 'Elektromanyetizma (Maxwell)' },
        { lab: 'affeSpace', hash: '#mod5', label: 'Kütleçekim dalgaları' },
        { lab: 'affeBio', hash: '#mod4', label: 'Nöron aksiyon potansiyeli' }
      ],
      related: ['foton', 'maxwell-denklemleri', 'kutlecekim-dalgalari-karanlik-madde', 'kuantum-tunelleme', 'hodgkin-huxley-noron', 'uzay-teleskoplari', 'planck-sabiti'],
      refs: ['Young, T. (1804). Experiments and Calculations Relative to Physical Optics. Phil. Trans. R. Soc. 94.', 'Fourier, J. (1822). Théorie analytique de la chaleur. Paris.', 'de Broglie, L. (1925). Recherches sur la théorie des quanta. Annales de Physique 10(3).']
    }
  ]);
})();
