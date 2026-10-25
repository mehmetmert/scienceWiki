/* ============================================================================
   scienceWiki — Ansiklopedi maddeleri: KİMYA · FİZİK · BİYOLOJİ
   Şema: data/articles-0.js başlığına bakın.
   ============================================================================ */
window.SW.addArticles([

  /* ==========================================================================
     KİMYA (affeLab)
     ========================================================================== */
  {
    id: 'periyodik-sistem',
    title: 'Periyodik Sistem ve Elektron İlgisi',
    domain: 'chem',
    bridges: ['chem', 'phys'],
    tags: ['periyodik tablo', 'Mendeleyev', 'Moseley', 'atom numarası', 'elektron ilgisi', 'elektronegatiflik', 'etkin çekirdek yükü', 'grup', 'periyot'],
    summary: 'Elementleri atom numarasına göre dizen ve kimyasal "kişiliklerini" (tepkime eğilimi, boyut, elektron ilgisi) tek bakışta okutan tablo.',
    intuitive: `Periyodik tabloyu bir <b>apartmanın kat planı</b> gibi düşünün. Her yeni <b>satır (periyot)</b>, atoma yeni bir elektron katı (kabuk) eklendiği anlamına gelir. Her <b>sütun (grup)</b> ise en dış kattaki elektron sayısını, yani atomun kimyasal kişiliğini belirler: aynı sütundakiler "akrabadır" ve benzer davranır (Li, Na, K suyla hepsi köpürerek tepkir). Sağa doğru gittikçe çekirdekteki proton sayısı artar ama yeni kat eklenmez; dış elektronlar daha güçlü çekilir, atom <b>küçülür</b>. <b>Elektron ilgisi</b>, atomun dışarıdan bir elektronu "misafir" ederken ne kadar enerji açığa çıkardığıdır: klor gibi halojenlerin dış katında tek bir boş koltuk vardır, bu yüzden bir elektronu büyük bir istekle kabul ederler (Cl için ≈ 349 kJ/mol). Soy gazların katları ise tamamen dolu; kimseyle uğraşmazlar.`,
    history: `<b>Johann Döbereiner</b> 1829'da benzer elementlerin üçlüler (Ca–Sr–Ba gibi) oluşturduğunu fark etti. <b>John Newlands</b> 1865'te elementleri kütleye göre dizip her sekizincisinin benzediğini söyleyince ("oktavlar yasası") Londra Kimya Derneği onunla alay etti. <b>Dmitri Mendeleyev</b> 1869'da her elementi bir karta yazıp masasında iskambil açar gibi dizdi; asıl dehası, sığmayan yerlere <b>boşluk bırakıp</b> henüz bulunmamış elementleri öngörmesiydi. "Eka-silisyum" için yoğunluğu 5,5 g/cm³ diye tahmin etti; 1886'da bulunan germanyumun yoğunluğu 5,35 g/cm³ çıktı. Asıl sıralama ilkesini ise <b>Henry Moseley</b> 1913'te buldu: elementlerin yaydığı X-ışınlarının frekansının karekökü atom numarasıyla doğrusal artıyordu. Böylece tablo kütleye değil <b>proton sayısına</b> oturdu ve Ar/K, Te/I gibi "ters" sıralamalar açıklandı. Moseley 1915'te 27 yaşında Gelibolu'da (Çanakkale Cephesi) hayatını kaybetti.`,
    scientists: [
      { name: 'Dmitri Mendeleyev', year: 1869, note: 'Periyodik tablo ve boşluklarla element öngörüsü' },
      { name: 'Henry Moseley', year: 1913, note: 'X-ışını spektrumlarıyla atom numarası (Moseley yasası)' },
      { name: 'Johann Döbereiner', year: 1829, note: 'Element üçlüleri' }
    ],
    formulas: [
      { tex: '\\sqrt{\\nu} = a\\,(Z - b)', desc: `Moseley yasası: karakteristik X-ışını frekansının karekökü atom numarasıyla doğrusal artar.`, vars: [
        { sym: '\\nu', name: 'X-ışını frekansı', unit: 'Hz' },
        { sym: 'Z', name: 'Atom numarası (proton sayısı)', unit: '—' },
        { sym: 'a', name: 'Çizgiye özgü orantı sabiti', unit: 'Hz^{1/2}' },
        { sym: 'b', name: 'Perdeleme sabiti (Kα için ≈ 1)', unit: '—', value: '≈ 1' }
      ] },
      { tex: 'E_{K\\alpha} \\approx \\tfrac{3}{4}\\,R_\\infty h c\\,(Z-1)^2', desc: `Kα çizgisinin enerjisi: hidrojen benzeri n = 2 → 1 geçişi, bir elektronun çekirdeği perdelemesiyle (Z − 1).`, vars: [
        { sym: 'E_{K\\alpha}', name: 'Kα foton enerjisi', unit: 'eV' },
        { sym: 'R_\\infty h c', name: 'Rydberg enerjisi', unit: 'eV', value: '13,606' },
        { sym: 'Z', name: 'Atom numarası', unit: '—' }
      ] },
      { tex: 'Z_{\\text{eff}} = Z - S', desc: `Etkin çekirdek yükü (Slater): dış elektronun "hissettiği" yük, iç elektronların perdelemesi kadar azalır.`, vars: [
        { sym: 'Z_{\\text{eff}}', name: 'Etkin çekirdek yükü', unit: '—' },
        { sym: 'S', name: 'Perdeleme sabiti', unit: '—' }
      ] },
      { tex: '\\mathrm{X(g)} + e^- \\rightarrow \\mathrm{X^-(g)}, \\qquad \\Delta E = -E_{\\text{ea}}', desc: `Elektron ilgisi: gaz hâlindeki atom bir elektron alırken açığa çıkan enerji.`, vars: [
        { sym: 'E_{\\text{ea}}', name: 'Elektron ilgisi (Cl için)', unit: 'kJ/mol', value: '349' },
        { sym: 'e^-', name: 'Elektron', unit: '—' }
      ] }
    ],
    calc: {
      title: 'Moseley: Kα X-ışını enerjisi',
      inputs: [{ id: 'Z', label: 'Atom numarası Z', value: 29, min: 3, max: 100, step: 1 }],
      compute: (v) => ({ label: 'Kα foton enerjisi', value: 13.606 * 0.75 * Math.pow(v.Z - 1, 2) / 1000, unit: 'keV', note: 'Bakır (Z = 29) için ölçülen Kα ≈ 8,05 keV — röntgen kırınım cihazlarının standart ışını.' })
    },
    perDomain: {
      chem: 'Grup = dış kabuk elektron sayısı = kimyasal kişilik. Elektron ilgisi ve elektronegatiflik sağa ve yukarı doğru artar; bu yüzden F en elektronegatif, Cs en "cömert" elementtir.',
      phys: 'Tablonun şekli kuantum mekaniğinden doğar: orbitallerin dolma sırası (Aufbau, Pauli dışlama ilkesi, Hund kuralı) s, p, d, f bloklarını oluşturur. Moseley yasası, sıranın çekirdekteki proton sayısı olduğunu X-ışını fiziğiyle kanıtladı.'
    },
    sim: [
      { lab: 'affeLab', hash: '', label: 'Periyodik tablo & elementler' },
      { lab: 'affePhysics', hash: '#mod1', label: 'Atom kur & orbitaller' }
    ],
    related: ['kuantum-atom-orbitaller', 'kimyasal-bag-vsepr', 'atom', 'standart-model'],
    refs: [
      'Mendeleev, D. (1869). Über die Beziehungen der Eigenschaften zu den Atomgewichten der Elemente. Zeitschrift für Chemie 12, 405–406.',
      'Moseley, H. G. J. (1913). The high-frequency spectra of the elements. Philosophical Magazine 26, 1024–1034.',
      'Scerri, E. (2019). The Periodic Table: Its Story and Its Significance (2. bs.). Oxford University Press.'
    ]
  },

  {
    id: 'kimyasal-bag-vsepr',
    title: 'Kovalent ve İyonik Bağlar, VSEPR Geometrisi',
    domain: 'chem',
    bridges: ['chem', 'phys', 'bio'],
    tags: ['kovalent bağ', 'iyonik bağ', 'elektronegatiflik', 'VSEPR', 'molekül geometrisi', 'Lewis', 'Pauling', 'hidrojen bağı', 'polarlık'],
    summary: 'Atomların elektron paylaşarak ya da alıp vererek bağlanmasını ve elektron çiftlerinin birbirini itmesiyle molekül şeklinin nasıl ortaya çıktığını anlatır.',
    intuitive: `İki atom arasındaki bağı bir <b>halat çekme</b> oyunu gibi düşünün; halat, aradaki elektronlardır. İki taraf eşit güçteyse (H–H, C–C) halat ortada kalır: <b>kovalent bağ</b>, elektronlar adil paylaşılır. Bir taraf çok daha güçlüyse (Na ile Cl) halatı tamamen kendine çeker: <b>iyonik bağ</b>, elektron el değiştirir ve zıt yüklü iyonlar birbirine yapışır. Bu "güç" <b>elektronegatifliktir</b>. Molekülün şeklini ise <b>VSEPR</b> belirler: bir düğüme bağlanmış balonlar birbirini iterek mümkün olduğunca uzaklaşır. İki balon düz bir çizgi (CO₂, 180°), üç balon üçgen (BF₃, 120°), dört balon dört yüzlü (CH₄, 109,5°) oluşturur. Su molekülünde iki "görünmez balon" (ortaklanmamış elektron çifti) bağları sıkıştırır ve açı 104,5°'ye iner. Bu kıvrık şekil suyu polar yapar; suyun yüksek kaynama noktası, tuzu çözmesi ve <b>hayatın kendisi</b> bu küçük açıdan doğar.`,
    history: `<b>Walther Kossel</b> ve <b>Gilbert N. Lewis</b> 1916'da birbirinden bağımsız olarak bağları elektronlarla açıkladı: Kossel iyonik aktarımı, Lewis ise "küp atom" modeli ve bugün de kullanılan <b>nokta yapılarıyla</b> elektron çifti paylaşımını önerdi. <b>Irving Langmuir</b> 1919'da oktet kuralını yaygınlaştırdı. 1927'de <b>Walter Heitler ve Fritz London</b>, H₂ molekülünün bağ enerjisini Schrödinger denklemiyle hesaplayarak kimyasal bağın kuantum mekaniksel bir olay olduğunu gösterdi. <b>Linus Pauling</b> 1931'de hibritleşmeyi, 1932'de elektronegatiflik ölçeğini ortaya koydu; 1939 tarihli <i>The Nature of the Chemical Bond</i> kitabı ona 1954 Nobel Kimya Ödülü'nü getirdi. Molekül şekillerini basit bir itme kuralıyla öngören VSEPR modeli <b>Sidgwick ve Powell</b> (1940) ile başlayıp <b>Ronald Gillespie ve Ronald Nyholm</b> (1957) tarafından sistemleştirildi.`,
    scientists: [
      { name: 'Gilbert N. Lewis', year: 1916, note: 'Elektron çifti bağı ve nokta yapıları' },
      { name: 'Linus Pauling', year: 1932, note: 'Elektronegatiflik ölçeği, hibritleşme (1954 Nobel)' },
      { name: 'Ronald Gillespie', year: 1957, note: 'VSEPR modeli (Nyholm ile)' }
    ],
    formulas: [
      { tex: 'P_{\\text{iyonik}} = \\left(1 - e^{-(\\Delta\\chi)^2/4}\\right)\\times 100\\%', desc: `Pauling'in yarı ampirik bağıntısı: elektronegatiflik farkı arttıkça bağın iyonik karakteri artar.`, vars: [
        { sym: 'P_{\\text{iyonik}}', name: 'Yüzde iyonik karakter', unit: '%' },
        { sym: '\\Delta\\chi', name: 'Elektronegatiflik farkı (Pauling ölçeği)', unit: '—' }
      ] },
      { tex: 'U = -\\frac{N_A M z^+ z^- e^2}{4\\pi\\varepsilon_0 r_0}\\left(1 - \\frac{1}{n}\\right)', desc: `Born–Landé örgü enerjisi: iyonik kristali bir arada tutan elektrostatik enerji.`, vars: [
        { sym: 'N_A', name: 'Avogadro sayısı', unit: 'mol⁻¹', value: '6,022 × 10²³' },
        { sym: 'M', name: 'Madelung sabiti (NaCl)', unit: '—', value: '1,748' },
        { sym: 'z^+, z^-', name: 'İyon yükleri', unit: '—' },
        { sym: 'e', name: 'Temel yük', unit: 'C', value: '1,602 × 10⁻¹⁹' },
        { sym: '\\varepsilon_0', name: 'Boşluğun elektrik geçirgenliği', unit: 'F/m', value: '8,854 × 10⁻¹²' },
        { sym: 'r_0', name: 'İyonlar arası denge uzaklığı', unit: 'm' },
        { sym: 'n', name: 'Born itme üssü', unit: '—', value: '≈ 8' }
      ] },
      { tex: '\\text{SN} = n_\\sigma + n_{\\text{LP}}', desc: `VSEPR sterik sayı: 2 → doğrusal, 3 → üçgen düzlem, 4 → dört yüzlü, 5 → üçgen çift piramit, 6 → sekiz yüzlü.`, vars: [
        { sym: '\\text{SN}', name: 'Sterik sayı (elektron bölgesi)', unit: '—' },
        { sym: 'n_\\sigma', name: 'Merkez atomdaki sigma bağı sayısı', unit: '—' },
        { sym: 'n_{\\text{LP}}', name: 'Ortaklanmamış (yalın) elektron çifti sayısı', unit: '—' }
      ] }
    ],
    calc: {
      title: 'Bağın iyonik karakteri',
      inputs: [
        { id: 'xa', label: 'χ (A atomu)', value: 0.93, min: 0.7, max: 4.0, step: 0.01 },
        { id: 'xb', label: 'χ (B atomu)', value: 3.16, min: 0.7, max: 4.0, step: 0.01 }
      ],
      compute: (v) => {
        const d = Math.abs(v.xa - v.xb);
        const p = (1 - Math.exp(-d * d / 4)) * 100;
        return { label: 'İyonik karakter', value: p, unit: '%', note: d < 0.4 ? 'Apolar kovalent bağ.' : d < 1.7 ? 'Polar kovalent bağ.' : 'Ağırlıklı iyonik bağ (Na–Cl: ≈ %71).' };
      }
    },
    perDomain: {
      chem: 'Bağ türü (iyonik/kovalent/metalik) erime noktası, çözünürlük ve iletkenliği belirler; VSEPR şekli polarlığı ve tepkime yönünü belirler.',
      phys: 'Bağ, elektrostatik çekim ile kuantum mekaniksel orbital örtüşmesinin dengesidir. Heitler–London hesabı, iki çekirdek arasında elektron yoğunluğu biriktiğinde enerjinin düştüğünü gösterir.',
      bio: 'DNA\'nın iki ipliği baz çiftleri arasındaki hidrojen bağlarıyla (A=T: 2, G≡C: 3) tutunur; proteinlerin katlanması ve enzimlerin substrat tanıması da zayıf bağlara ve molekül geometrisine dayanır.'
    },
    sim: [
      { lab: 'affeLab', hash: '', label: 'Molekül çizici & VSEPR' },
      { lab: 'affePhysics', hash: '#mod1', label: 'Molekül galerisi (3B)' }
    ],
    related: ['periyodik-sistem', 'kuantum-atom-orbitaller', 'organik-fonksiyonel-gruplar', 'santral-dogma'],
    refs: [
      'Lewis, G. N. (1916). The atom and the molecule. Journal of the American Chemical Society 38, 762–785.',
      'Pauling, L. (1939). The Nature of the Chemical Bond. Cornell University Press.',
      'Gillespie, R. J. & Nyholm, R. S. (1957). Inorganic stereochemistry. Quarterly Reviews, Chemical Society 11, 339–380.'
    ]
  },

  {
    id: 'kimyasal-denge',
    title: 'Kimyasal Denge ve Le Chatelier İlkesi',
    domain: 'chem',
    bridges: ['chem', 'phys', 'bio'],
    tags: ['denge sabiti', 'Le Chatelier', 'kütlelerin etkisi yasası', 'Gibbs serbest enerjisi', 'Haber-Bosch', 'amonyak', 'van \'t Hoff'],
    summary: 'İleri ve geri tepkimelerin aynı hızda ilerlediği dinamik denge durumu ve bu dengenin dış etkilere karşı kendini nasıl yeniden ayarladığı.',
    intuitive: `Kalabalık bir alışveriş merkezinin iki katını düşünün: yürüyen merdivenle yukarı çıkanlar ve aşağı inenler. Bir süre sonra her katta aynı sayıda insan kalır; insanlar hâlâ hareket ediyordur ama <b>sayılar değişmez</b>. Kimyasal denge budur: tepkime durmamıştır, ileri ve geri yön aynı hızda işler. <b>Le Chatelier ilkesi</b> ise sistemin "inatçı" olduğunu söyler: üst kata birden çok insan eklerseniz aşağı inenler artar ve fazlalık kısmen dengelenir. Tepkimeye madde eklerseniz o maddeyi tüketen yöne kayar; basıncı artırırsanız daha az gaz molekülü olan tarafa geçer; ısıtırsanız ısıyı soğuran yöne kayar. Dünya nüfusunun yaklaşık yarısını besleyen gübre (amonyak) üretimi tam olarak bu oyunun ustaca oynanmasıdır.`,
    history: `<b>Claude-Louis Berthollet</b>, Napolyon'un Mısır seferinde (1798–1801) tuz göllerinin kıyısında sodyum karbonat birikmesini gördü. Laboratuvarda tersi yönde ilerleyen bir tepkimenin, çok yoğun tuz varlığında geri dönebildiğini anladı ve 1803'te tepkimelerin miktara bağlı olarak <b>iki yönlü</b> olabileceğini yazdı. Norveçli bacanaklar <b>Cato Guldberg ve Peter Waage</b> 1864'te bunu <b>kütlelerin etkisi yasası</b> olarak matematikleştirdi. <b>Henri Le Chatelier</b> 1884'te dengenin bozulmaya karşı tepkisini genel bir ilke olarak açıkladı; aynı yıl <b>Jacobus van 't Hoff</b> denge sabitinin sıcaklıkla değişimini termodinamikten türetti. <b>Fritz Haber</b> 1909'da masaüstü bir düzenekte havadaki azotu amonyağa çevirdi; <b>Carl Bosch</b> 1913'te bunu BASF'ta yüksek basınç ve demir katalizörüyle sanayi ölçeğine taşıdı. Haber 1918, Bosch 1931'de Nobel aldı.`,
    scientists: [
      { name: 'Cato Guldberg & Peter Waage', year: 1864, note: 'Kütlelerin etkisi yasası' },
      { name: 'Henri Le Chatelier', year: 1884, note: 'Denge kayması ilkesi' },
      { name: 'Fritz Haber', year: 1909, note: 'Amonyak sentezi (1918 Nobel)' }
    ],
    formulas: [
      { tex: 'K_c = \\frac{[\\mathrm{C}]^c\\,[\\mathrm{D}]^d}{[\\mathrm{A}]^a\\,[\\mathrm{B}]^b}', desc: `aA + bB ⇌ cC + dD tepkimesi için denge sabiti (derişimler dengedeki değerlerdir).`, vars: [
        { sym: 'K_c', name: 'Derişim cinsinden denge sabiti', unit: '—' },
        { sym: '[\\mathrm{X}]', name: 'X türünün denge derişimi', unit: 'mol/L' },
        { sym: 'a, b, c, d', name: 'Stokiyometrik katsayılar', unit: '—' }
      ] },
      { tex: '\\Delta G^\\circ = -RT\\ln K', desc: `Standart serbest enerji değişimi ile denge sabiti arasındaki köprü: ΔG° negatifse K > 1, ürünler baskındır.`, vars: [
        { sym: '\\Delta G^\\circ', name: 'Standart Gibbs serbest enerjisi değişimi', unit: 'J/mol' },
        { sym: 'R', name: 'İdeal gaz sabiti', unit: 'J/(mol·K)', value: '8,314' },
        { sym: 'T', name: 'Mutlak sıcaklık', unit: 'K' },
        { sym: 'K', name: 'Denge sabiti', unit: '—' }
      ] },
      { tex: '\\ln\\frac{K_2}{K_1} = -\\frac{\\Delta H^\\circ}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)', desc: `van 't Hoff denklemi: ekzotermik (ΔH° < 0) tepkimelerde sıcaklık artınca K küçülür — Le Chatelier'nin nicel hâli.`, vars: [
        { sym: 'K_1, K_2', name: 'T₁ ve T₂ sıcaklıklarındaki denge sabitleri', unit: '—' },
        { sym: '\\Delta H^\\circ', name: 'Standart tepkime entalpisi', unit: 'J/mol' },
        { sym: 'T_1, T_2', name: 'Sıcaklıklar', unit: 'K' }
      ] }
    ],
    calc: {
      title: 'ΔG° → denge sabiti K',
      inputs: [
        { id: 'dg', label: 'ΔG° (kJ/mol)', value: -32.9, min: -100, max: 100, step: 0.1 },
        { id: 'T', label: 'Sıcaklık T (K)', value: 298, min: 200, max: 1500, step: 1 }
      ],
      compute: (v) => ({ label: 'Denge sabiti K', value: Math.exp(-v.dg * 1000 / (8.314 * v.T)), unit: '', note: 'Varsayılan değer: N₂ + 3H₂ ⇌ 2NH₃ (25 °C). Sıcaklığı artırınca K\'nın nasıl düştüğünü görün — Haber-Bosch bu yüzden katalizörle ~450 °C\'de uzlaşır.' })
    },
    perDomain: {
      chem: 'Denge sabiti bir tepkimenin "ne kadar ileri gideceğini", Le Chatelier ilkesi ise koşullar değişince hangi yöne kayacağını söyler. Endüstriyel verim (amonyak, sülfürik asit, metanol) bu ayarlarla optimize edilir.',
      phys: 'Denge, sabit sıcaklık ve basınçta Gibbs serbest enerjisinin minimum olduğu durumdur. İstatistiksel mekanikte K, ürün ve girenlerin bölüşüm fonksiyonlarının oranıdır.',
      bio: 'Hemoglobin–oksijen bağlanması, kandaki CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ tamponu ve yüksek irtifaya uyum, Le Chatelier\'nin vücuttaki örnekleridir. Karbonmonoksit, oksijenden ~200 kat sıkı bağlanarak dengeyi zehirli biçimde kaydırır.'
    },
    sim: [
      { lab: 'affeLab', hash: '', label: 'Kimyasal tepkimeler & denge' },
      { lab: 'affePhysics', hash: '#mod6', label: 'Termodinamik' }
    ],
    related: ['termokimya-entalpi', 'asit-baz-ph', 'entropi', 'enzim-aktivasyon'],
    refs: [
      'Guldberg, C. M. & Waage, P. (1864). Studier over Affiniteten. Forhandlinger i Videnskabs-Selskabet i Christiania.',
      'Le Chatelier, H. (1884). Sur un énoncé général des lois des équilibres chimiques. Comptes Rendus 99, 786–789.',
      'Atkins, P. & de Paula, J. (2018). Physical Chemistry (11. bs.). Oxford University Press.'
    ]
  },

  {
    id: 'asit-baz-ph',
    title: 'Asitler, Bazlar, pH ve Titrasyon',
    domain: 'chem',
    bridges: ['chem', 'bio'],
    tags: ['pH', 'asit', 'baz', 'Brønsted-Lowry', 'tampon', 'Henderson-Hasselbalch', 'titrasyon', 'eşdeğerlik noktası', 'pKa'],
    summary: 'Proton (H⁺) alışverişi olarak asit-baz kimyası, logaritmik pH ölçeği, tampon çözeltiler ve derişim belirlemede titrasyon.',
    intuitive: `Asit, <b>proton (H⁺) veren</b>; baz, <b>proton alan</b> maddedir — bir top paslaşması gibi. Çözeltideki proton miktarı inanılmaz geniş bir aralıkta değişir: mide asidinde, saf suya göre on milyon kat daha fazla proton vardır. Bu yüzden kimyacılar sayıları değil üsleri konuşur: <b>pH</b>, proton derişiminin "kaç sıfır" ettiğini söyler. pH 3 ile pH 4 arasında küçük bir fark var gibi görünür ama asitlik tam <b>10 kat</b> değişmiştir. <b>Tampon</b> çözeltiler bir amortisör gibidir: içlerindeki zayıf asit ve eşlenik baz çifti, dışarıdan gelen asit ya da bazı yutar ve pH'ı neredeyse sabit tutar. Kanınız bu sayede pH 7,35–7,45 aralığında kalır; 7,0'ın altı ya da 7,8'in üstü hayatı tehdit eder. <b>Titrasyon</b> ise derişimi bilinmeyen bir asidi, derişimi bilinen bir bazla damla damla "nötrleyip" tam sayılan damladan derişimi bulmaktır.`,
    history: `<b>Svante Arrhenius</b> 1884'teki doktora tezinde tuzların suda iyonlara ayrıldığını ve asitlerin H⁺, bazların OH⁻ verdiğini öne sürdü; tez en düşük geçer notla kabul edildi ama 1903'te Nobel Kimya Ödülü'nü getirdi. Kopenhag'daki Carlsberg Laboratuvarı'nda bira mayalanmasında enzimleri inceleyen <b>Søren Sørensen</b>, 1909'da asitliği kolayca ifade etmek için <b>pH ölçeğini</b> tanımladı. 1923'te <b>Johannes Brønsted</b> (Danimarka) ve <b>Thomas Lowry</b> (İngiltere) birbirinden bağımsız olarak asit-bazı proton aktarımı olarak yeniden tanımladı; aynı yıl <b>G. N. Lewis</b> elektron çifti tanımını getirdi. Tampon denklemi <b>Lawrence Henderson</b> (1908) ve <b>Karl Hasselbalch</b> (1916) tarafından kuruldu. 1934'te <b>Arnold Beckman</b>, limon üreticilerinin meyve suyu asitliğini ölçebilmesi için ilk ticari pH metreyi icat etti.`,
    scientists: [
      { name: 'Svante Arrhenius', year: 1884, note: 'İyonlaşma kuramı (1903 Nobel)' },
      { name: 'Søren Sørensen', year: 1909, note: 'pH ölçeği (Carlsberg Laboratuvarı)' },
      { name: 'Johannes Brønsted & Thomas Lowry', year: 1923, note: 'Proton aktarımı asit-baz tanımı' }
    ],
    formulas: [
      { tex: '\\mathrm{pH} = -\\log_{10}[\\mathrm{H_3O^+}]', desc: `pH tanımı: proton derişiminin negatif logaritması.`, vars: [
        { sym: '[\\mathrm{H_3O^+}]', name: 'Hidronyum iyonu derişimi', unit: 'mol/L' }
      ] },
      { tex: 'K_w = [\\mathrm{H_3O^+}][\\mathrm{OH^-}] = 1{,}0\\times10^{-14}', desc: `Suyun iyonlaşma sabiti (25 °C): pH + pOH = 14.`, vars: [
        { sym: 'K_w', name: 'Suyun iyonlar çarpımı sabiti', unit: '(mol/L)²', value: '1,0 × 10⁻¹⁴' },
        { sym: '[\\mathrm{OH^-}]', name: 'Hidroksit derişimi', unit: 'mol/L' }
      ] },
      { tex: '\\mathrm{pH} = \\mathrm{p}K_a + \\log_{10}\\frac{[\\mathrm{A^-}]}{[\\mathrm{HA}]}', desc: `Henderson–Hasselbalch: tampon çözeltinin pH'ı, zayıf asit ve eşlenik bazının oranına bağlıdır.`, vars: [
        { sym: '\\mathrm{p}K_a', name: 'Asitlik sabitinin eksi logaritması', unit: '—' },
        { sym: '[\\mathrm{A^-}]', name: 'Eşlenik baz derişimi', unit: 'mol/L' },
        { sym: '[\\mathrm{HA}]', name: 'Zayıf asit derişimi', unit: 'mol/L' }
      ] },
      { tex: 'C_a V_a = C_b V_b', desc: `Tek protonlu asit-baz titrasyonunda eşdeğerlik noktası koşulu.`, vars: [
        { sym: 'C_a, C_b', name: 'Asit ve baz derişimleri', unit: 'mol/L' },
        { sym: 'V_a, V_b', name: 'Asit ve baz hacimleri', unit: 'L' }
      ] }
    ],
    calc: {
      title: 'Tampon pH\'ı (Henderson–Hasselbalch)',
      inputs: [
        { id: 'pka', label: 'pKa', value: 6.1, min: 1, max: 13, step: 0.05 },
        { id: 'ratio', label: '[A⁻] / [HA] oranı', value: 20, min: 0.01, max: 100, step: 0.01 }
      ],
      compute: (v) => ({ label: 'Tamponun pH\'ı', value: v.pka + Math.log10(v.ratio), unit: '', note: 'Varsayılan: kandaki bikarbonat tamponu (pKa 6,1; HCO₃⁻/CO₂ ≈ 20) → pH ≈ 7,40.' })
    },
    perDomain: {
      chem: 'Güçlü asitler tamamen, zayıf asitler kısmen iyonlaşır (Ka). Titrasyon eğrisindeki ani sıçrama eşdeğerlik noktasını, yarı eşdeğerlik noktası ise pH = pKa\'yı verir; göstergeler bu sıçramada renk değiştirir.',
      bio: 'Kan pH\'ı bikarbonat tamponu ve böbrekler/akciğerler tarafından 7,35–7,45 aralığında tutulur. Mide pH\'ı ~1,5–3,5\'tir (pepsin çalışır), ince bağırsak bazik ortamdır. Her enzimin bir optimum pH\'ı vardır; dışına çıkılınca proteinin yükleri ve şekli bozulur.'
    },
    sim: [
      { lab: 'affeLab', hash: '', label: 'Asit-baz titrasyonu' },
      { lab: 'affeBio', hash: '#mod2', label: 'Hücre ortamı & organeller' }
    ],
    related: ['kimyasal-denge', 'enzim-aktivasyon', 'hucre-organelleri-atp', 'insan-anatomisi'],
    refs: [
      'Sørensen, S. P. L. (1909). Enzymstudien II. Biochemische Zeitschrift 21, 131–304.',
      'Brønsted, J. N. (1923). Einige Bemerkungen über den Begriff der Säuren und Basen. Recueil des Travaux Chimiques des Pays-Bas 42, 718–728.',
      'Po, H. N. & Senozan, N. M. (2001). The Henderson–Hasselbalch equation: its history and limitations. Journal of Chemical Education 78, 1499.'
    ]
  },

  {
    id: 'termokimya-entalpi',
    title: 'Termokimya: Entalpi, Hess Yasası ve Kalorimetri',
    domain: 'chem',
    bridges: ['chem', 'phys', 'bio'],
    tags: ['entalpi', 'Hess yasası', 'kalorimetre', 'ekzotermik', 'endotermik', 'öz ısı', 'Gibbs', 'termodinamiğin birinci yasası', 'kalori'],
    summary: 'Kimyasal tepkimelerde alınan ya da verilen ısıyı ölçme ve hesaplama bilimi: entalpi, Hess yasası, kalorimetri ve serbest enerji.',
    intuitive: `Kimyasal bağları birer <b>sıkıştırılmış yay</b> gibi düşünün. Bir tepkimede eski yaylar açılır (bağ kırmak enerji ister), yeni yaylar kurulur (bağ oluşmak enerji salar). Yeni bağlar eskilerden daha "rahatsa", aradaki fark ısı olarak dışarı çıkar: <b>ekzotermik</b> tepkime (odun yanması, hazır sıcak paketler). Tersi olursa ortamdan ısı çekilir: <b>endotermik</b> (soğuk kompres). <b>Entalpi değişimi (ΔH)</b> bu ısı alışverişinin muhasebesidir. <b>Hess yasası</b> bir dağa tırmanmaya benzer: hangi patikadan çıkarsanız çıkın, zirve ile vadi arasındaki yükseklik farkı aynıdır. Bu yüzden ölçmesi zor tepkimelerin ısısını, kolay tepkimeleri toplayarak hesaplayabiliriz. Yediğiniz besinin "kalorisi" de tam olarak bir kalorimetrede yakıldığında açığa çıkan entalpidir.`,
    history: `<b>Joseph Black</b> 1760'larda ısı ile sıcaklığın farklı şeyler olduğunu, buzun erirken sıcaklığı değişmeden ısı yuttuğunu (gizli ısı) gösterdi. <b>Antoine Lavoisier ve Pierre-Simon Laplace</b> 1782–83'te bir kobayı buz kalorimetresine koydu: hayvanın ürettiği ısıyı eriyen buzdan, solunan havayı da ürettiği CO₂'den ölçerek <b>solunumun yavaş bir yanma</b> olduğunu kanıtladılar. St. Petersburg'da çalışan İsviçre doğumlu <b>Germain Hess</b> 1840'ta tepkime ısılarının toplanabildiğini gösterdi. <b>James Joule</b> 1845'te düşen ağırlıkların döndürdüğü kanatlarla suyu ısıtıp ısının bir enerji biçimi olduğunu (mekanik eşdeğer) ölçtü. <b>Marcellin Berthelot</b> bomba kalorimetresini geliştirdi; <b>Josiah Willard Gibbs</b> 1876–78'de serbest enerji kavramıyla bir tepkimenin kendiliğinden olup olmayacağını ısı ve entropiden hesaplamayı mümkün kıldı.`,
    scientists: [
      { name: 'Germain Hess', year: 1840, note: 'Isı toplamı sabitliği yasası' },
      { name: 'Antoine Lavoisier', year: 1783, note: 'Buz kalorimetresi, solunum = yavaş yanma (Laplace ile)' },
      { name: 'James Joule', year: 1845, note: 'Isının mekanik eşdeğeri' },
      { name: 'J. Willard Gibbs', year: 1876, note: 'Serbest enerji' }
    ],
    formulas: [
      { tex: '\\Delta H^\\circ_{\\text{rxn}} = \\sum n\\,\\Delta H^\\circ_f(\\mathrm{P}) - \\sum n\\,\\Delta H^\\circ_f(\\mathrm{R})', desc: `Oluşum entalpileriyle tepkime entalpisi (P: ürünler, R: girenler) — Hess yasasının uygulaması.`, vars: [
        { sym: '\\Delta H^\\circ_f', name: 'Standart oluşum entalpisi', unit: 'kJ/mol' },
        { sym: 'n', name: 'Stokiyometrik katsayı', unit: 'mol' }
      ] },
      { tex: 'q = m\\,c\\,\\Delta T', desc: `Kalorimetri: kütlesi m, öz ısısı c olan maddenin sıcaklığı ΔT kadar değişince alınan/verilen ısı.`, vars: [
        { sym: 'q', name: 'Isı', unit: 'J' },
        { sym: 'm', name: 'Kütle', unit: 'g' },
        { sym: 'c', name: 'Öz ısı (su)', unit: 'J/(g·°C)', value: '4,184' },
        { sym: '\\Delta T', name: 'Sıcaklık değişimi', unit: '°C' }
      ] },
      { tex: '\\Delta G = \\Delta H - T\\,\\Delta S', desc: `Gibbs serbest enerjisi: ΔG < 0 ise tepkime kendiliğinden yürür. Entalpi ile entropi arasındaki yarış.`, vars: [
        { sym: '\\Delta G', name: 'Gibbs serbest enerjisi değişimi', unit: 'kJ/mol' },
        { sym: '\\Delta H', name: 'Entalpi değişimi', unit: 'kJ/mol' },
        { sym: 'T', name: 'Mutlak sıcaklık', unit: 'K' },
        { sym: '\\Delta S', name: 'Entropi değişimi', unit: 'kJ/(mol·K)' }
      ] },
      { tex: '\\Delta U = q + w', desc: `Termodinamiğin birinci yasası: iç enerji değişimi = sisteme verilen ısı + yapılan iş (enerji korunur).`, vars: [
        { sym: '\\Delta U', name: 'İç enerji değişimi', unit: 'J' },
        { sym: 'q', name: 'Isı', unit: 'J' },
        { sym: 'w', name: 'Sisteme yapılan iş', unit: 'J' }
      ] }
    ],
    calc: {
      title: 'Kahve fincanı kalorimetresi',
      inputs: [
        { id: 'm', label: 'Su kütlesi m (g)', value: 200, min: 10, max: 2000, step: 1 },
        { id: 'dT', label: 'Sıcaklık artışı ΔT (°C)', value: 15, min: -50, max: 80, step: 0.1 }
      ],
      compute: (v) => ({ label: 'Açığa çıkan ısı q', value: v.m * 4.184 * v.dT / 1000, unit: 'kJ', note: 'q > 0 → tepkime ısı verdi (ekzotermik). 1 besin kalorisi (kcal) = 4,184 kJ.' })
    },
    perDomain: {
      chem: 'Oluşum entalpileri tablosu ve Hess yasasıyla her tepkimenin ısısı hesaplanabilir; ΔG = ΔH − TΔS ise kendiliğindenliği belirler (buzun 0 °C üstünde erimesi entropiyle kazanılır).',
      phys: 'Termokimya, termodinamiğin birinci yasasının (enerji korunumu) kimyaya uygulanmasıdır. Entalpi H = U + PV, sabit basınçta ölçülen ısıya eşittir.',
      bio: 'Metabolizma kontrollü bir yanmadır: glikozun tamamen oksitlenmesi −2870 kJ/mol serbest enerji verir; hücre bunu ATP hidrolizinin (−30,5 kJ/mol) küçük "bozuk paralarına" çevirir. Vücut ısısı da bu tepkimelerin atık ısısıdır.'
    },
    sim: [
      { lab: 'affeLab', hash: '', label: 'Termokimya & kalorimetri' },
      { lab: 'affePhysics', hash: '#mod6', label: 'Termodinamik & akışkanlar' }
    ],
    related: ['kimyasal-denge', 'entropi', 'hucre-organelleri-atp', 'organik-fonksiyonel-gruplar'],
    refs: [
      'Hess, G. H. (1840). Thermochemische Untersuchungen. Annalen der Physik und Chemie 50, 385–404.',
      'Lavoisier, A. & Laplace, P.-S. (1783). Mémoire sur la chaleur. Mémoires de l\'Académie Royale des Sciences.',
      'Gibbs, J. W. (1876–1878). On the Equilibrium of Heterogeneous Substances. Transactions of the Connecticut Academy 3.'
    ]
  },

  {
    id: 'organik-fonksiyonel-gruplar',
    title: 'Organik Kimya ve Fonksiyonel Gruplar',
    domain: 'chem',
    bridges: ['chem', 'bio'],
    tags: ['organik kimya', 'fonksiyonel grup', 'karbon', 'benzen', 'Kekulé', 'Wöhler', 'alkol', 'karboksilik asit', 'amin', 'ester', 'doymamışlık'],
    summary: 'Karbon iskeletli moleküllerin kimyası; molekülün davranışını belirleyen atom grupları (–OH, –COOH, –NH₂, C=O, ester…) ve canlı molekülleriyle bağlantısı.',
    intuitive: `Karbon, kimyanın <b>LEGO parçasıdır</b>: dört bağ yapabilir ve kendisiyle zincirler, halkalar, dallar kurabilir. Bu yüzden bilinen kimyasal bileşiklerin büyük çoğunluğu karbon içerir. Ama bir molekülün "ne iş yaptığını" iskelet değil, üzerine takılan <b>aksesuarlar</b> belirler: <b>fonksiyonel gruplar</b>. –OH takılırsa alkol olur (etanol), –COOH takılırsa asit olur (sirke), –NH₂ takılırsa amin olur (balık kokusu). İskeleti farklı ama aynı gruba sahip moleküller benzer tepkimeler verir; bu sayede milyonlarca molekülü birkaç düzine "karakter" ile anlayabiliriz. Hayatın molekülleri de bu karakterlerin birleşimidir: bir amino asit, aynı molekülde hem amin hem karboksilik asit taşır; ikisi el sıkışınca (peptit bağı) proteinler örülür.`,
    history: `<b>Jöns Jacob Berzelius</b> 1807'de "organik" terimini canlılardan elde edilen maddeler için kullandı; bunların ancak gizemli bir "yaşam gücü" ile yapılabileceğine inanılıyordu. 1828'de <b>Friedrich Wöhler</b> amonyum siyanattan üre sentezledi ve hocası Berzelius'a "Böbreğe ihtiyaç duymadan üre yapabiliyorum" diye yazdı — vitalizmin sonunun başlangıcı. <b>August Kekulé</b> ve <b>Archibald Couper</b> 1858'de karbonun dört değerli olduğunu ve zincir kurduğunu öne sürdü. Kekulé, 1865'te benzenin halka yapısını, kendi kuyruğunu ısıran bir yılan gördüğü bir rüyadan sonra bulduğunu anlatır. 1874'te <b>van 't Hoff ve Le Bel</b> karbonun dört bağının bir dört yüzlüye yöneldiğini gösterdi. 18 yaşındaki <b>William Perkin</b> 1856'da kinin sentezlemeye çalışırken ilk sentetik boya olan leylak rengi "mauveine"i buldu ve sentetik kimya sanayisini başlattı.`,
    scientists: [
      { name: 'Friedrich Wöhler', year: 1828, note: 'Üre sentezi — vitalizme darbe' },
      { name: 'August Kekulé', year: 1865, note: 'Dört değerli karbon ve benzen halkası' },
      { name: 'William Perkin', year: 1856, note: 'İlk sentetik boya (mauveine)' }
    ],
    formulas: [
      { tex: '\\text{DBE} = C - \\frac{H + X}{2} + \\frac{N}{2} + 1', desc: `Doymamışlık derecesi (halka + π bağı sayısı): kapalı formülden molekülün kaç halka/çift bağ içerdiğini söyler.`, vars: [
        { sym: '\\text{DBE}', name: 'Doymamışlık derecesi (halka + π bağı)', unit: '—' },
        { sym: 'C', name: 'Karbon atomu sayısı', unit: '—' },
        { sym: 'H', name: 'Hidrojen atomu sayısı', unit: '—' },
        { sym: 'X', name: 'Halojen atomu sayısı', unit: '—' },
        { sym: 'N', name: 'Azot atomu sayısı', unit: '—' }
      ] },
      { tex: '\\mathrm{RCOOH} + \\mathrm{R}^{\\prime}\\mathrm{OH} \\rightleftharpoons \\mathrm{RCOOR}^{\\prime} + \\mathrm{H_2O}', desc: `Esterleşme (Fischer): karboksilik asit + alkol → ester + su. Meyve kokuları ve yağlar esterdir.`, vars: [
        { sym: '\\mathrm{R}, \\mathrm{R}^{\\prime}', name: 'Karbon iskeletleri (alkil grupları)', unit: '—' }
      ] },
      { tex: 'C_nH_{2n+2}', desc: `Alkanların genel formülü (doymuş, halkasız hidrokarbonlar): metan (n=1), propan (n=3), oktan (n=8)…`, vars: [
        { sym: 'n', name: 'Karbon sayısı', unit: '—' }
      ] }
    ],
    calc: {
      title: 'Doymamışlık derecesi',
      inputs: [
        { id: 'C', label: 'C sayısı', value: 6, min: 1, max: 60, step: 1 },
        { id: 'H', label: 'H sayısı', value: 6, min: 0, max: 122, step: 1 },
        { id: 'N', label: 'N sayısı', value: 0, min: 0, max: 20, step: 1 },
        { id: 'X', label: 'Halojen (F, Cl, Br, I) sayısı', value: 0, min: 0, max: 20, step: 1 }
      ],
      compute: (v) => ({ label: 'Halka + π bağı sayısı', value: v.C - (v.H + v.X) / 2 + v.N / 2 + 1, unit: '', note: 'Benzen C₆H₆ → 4 (1 halka + 3 çift bağ). Kafein C₈H₁₀N₄O₂ → 6.' })
    },
    perDomain: {
      chem: 'Fonksiyonel grup, tepkime türünü belirler: alkoller oksitlenir, karbonil grupları nükleofil saldırısına uğrar, asitler ve aminler tuz/amid oluşturur. Sentez planlaması bu grupların dönüşümüdür.',
      bio: 'Amino asitler (amin + karboksilik asit), şekerler (hidroksil + karbonil), yağlar (gliserol esterleri), nükleotitler (fosfat esterleri) — biyomoleküllerin tamamı fonksiyonel grupların birleşimidir. Enzimler belirli grupları tanıyarak çalışır.'
    },
    sim: [
      { lab: 'affeLab', hash: '', label: 'Organik molekül çizici' },
      { lab: 'affeBio', hash: '#mod3', label: 'Amino asit → protein zinciri' }
    ],
    related: ['kimyasal-bag-vsepr', 'santral-dogma', 'enzim-aktivasyon', 'karbon-14', 'termokimya-entalpi'],
    refs: [
      'Wöhler, F. (1828). Ueber künstliche Bildung des Harnstoffs. Annalen der Physik und Chemie 88, 253–256.',
      'Kekulé, A. (1865). Sur la constitution des substances aromatiques. Bulletin de la Société Chimique de Paris 3, 98–110.',
      'Clayden, J., Greeves, N. & Warren, S. (2012). Organic Chemistry (2. bs.). Oxford University Press.'
    ]
  },

  /* ==========================================================================
     FİZİK (affePhysics)
     ========================================================================== */
  {
    id: 'kuantum-atom-orbitaller',
    title: 'Kuantum Atom Modelleri ve Orbitaller',
    domain: 'phys',
    bridges: ['phys', 'chem', 'space'],
    tags: ['Bohr modeli', 'Schrödinger', 'orbital', 'kuantum sayıları', 'Rutherford', 'enerji seviyesi', 'Balmer', 'Heisenberg', 'dalga fonksiyonu', 'tayf'],
    summary: 'Atomun gezegen modelinden olasılık bulutlarına uzanan hikâyesi: kuantlanmış enerji seviyeleri, orbitaller ve atomların ışık tayfı.',
    intuitive: `Atomu Güneş sistemi gibi düşünmek cazip ama yanlıştır. Elektron bir gezegen gibi belirli bir yörüngede dönmez; daha çok bir <b>gitar telinin titreşimi</b> gibidir. Bir gitar teli yalnızca belirli notaları (temel ses ve harmonikler) çalabilir; elektron da çekirdeğin etrafında yalnızca belirli <b>enerji seviyelerinde</b> "titreşebilir". Bu titreşim desenlerine <b>orbital</b> denir: elektronun bulunma olasılığının üç boyutlu haritası. s orbitali bir top, p orbitali bir halter, d orbitalleri yonca yaprakları gibidir. Elektron bir seviyeden aşağıya "atladığında" aradaki enerji farkı kadar bir foton yayar. Bu yüzden her elementin bir <b>ışık parmak izi</b> vardır: hidrojen lambasındaki kırmızı Hα çizgisi (656 nm) n = 3'ten n = 2'ye düşüşün imzasıdır. Astronomlar milyarlarca ışık yılı uzaktaki yıldızların içinde ne olduğunu bu parmak izleriyle okur.`,
    history: `<b>J. J. Thomson</b> 1897'de elektronu keşfedip atomu "üzümlü kek" gibi hayal etti. <b>Rutherford</b>'un öğrencileri <b>Geiger ve Marsden</b> 1909'da ince altın levhaya alfa parçacıkları gönderdiğinde, bazılarının geri sekmesi Rutherford'u şaşkına çevirdi: "Bir kâğıt mendile 15 inçlik mermi attınız ve size geri döndü." 1911'de atomun minicik, yoğun bir çekirdeği olduğu sonucuna vardı. <b>Niels Bohr</b> 1913'te elektronun yalnızca belirli yörüngelerde ışımadan dönebildiğini varsayarak hidrojenin tayf çizgilerini mükemmel açıkladı. <b>Louis de Broglie</b> 1924'te elektronların da dalga gibi davrandığını önerdi; <b>Werner Heisenberg</b> (1925, matris mekaniği) ve <b>Erwin Schrödinger</b> (1926, dalga denklemi) modern kuantum mekaniğini kurdu. <b>Max Born</b> dalga fonksiyonunun karesinin olasılık olduğunu, <b>Wolfgang Pauli</b> iki elektronun aynı kuantum durumunda olamayacağını gösterdi; kimyanın periyodik yapısı buradan doğdu.`,
    scientists: [
      { name: 'Ernest Rutherford', year: 1911, note: 'Çekirdekli atom modeli' },
      { name: 'Niels Bohr', year: 1913, note: 'Kuantlanmış yörüngeler (1922 Nobel)' },
      { name: 'Erwin Schrödinger', year: 1926, note: 'Dalga denklemi (1933 Nobel)' },
      { name: 'Werner Heisenberg', year: 1927, note: 'Belirsizlik ilkesi (1932 Nobel)' }
    ],
    formulas: [
      { tex: 'E_n = -\\frac{13{,}6\\ \\mathrm{eV}\\cdot Z^2}{n^2}', desc: `Hidrojen benzeri atomlarda enerji seviyeleri (Bohr modeli ve Schrödinger çözümü aynı sonucu verir).`, vars: [
        { sym: 'E_n', name: 'n. seviyenin enerjisi', unit: 'eV' },
        { sym: 'Z', name: 'Çekirdek yükü (hidrojen: 1)', unit: '—' },
        { sym: 'n', name: 'Baş kuantum sayısı', unit: '—', value: '1, 2, 3, …' }
      ] },
      { tex: '\\frac{1}{\\lambda} = R_H\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)', desc: `Rydberg formülü: hidrojenin tayf çizgilerinin dalga boyları (n₁ = 2 → görünür Balmer serisi).`, vars: [
        { sym: '\\lambda', name: 'Yayılan ışığın dalga boyu', unit: 'm' },
        { sym: 'R_H', name: 'Hidrojen için Rydberg sabiti', unit: 'm⁻¹', value: '1,0968 × 10⁷' },
        { sym: 'n_1, n_2', name: 'Alt ve üst enerji seviyeleri', unit: '—' }
      ] },
      { tex: '-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi = E\\psi', desc: `Zamandan bağımsız Schrödinger denklemi; çözümleri ψ orbitallerdir, |ψ|² bulunma olasılığıdır.`, vars: [
        { sym: '\\hbar', name: 'İndirgenmiş Planck sabiti', unit: 'J·s', value: '1,0546 × 10⁻³⁴' },
        { sym: 'm', name: 'Elektron kütlesi', unit: 'kg', value: '9,109 × 10⁻³¹' },
        { sym: '\\psi', name: 'Dalga fonksiyonu', unit: '—' },
        { sym: 'V', name: 'Potansiyel enerji (Coulomb)', unit: 'J' },
        { sym: 'E', name: 'Enerji özdeğeri', unit: 'J' }
      ] },
      { tex: '\\Delta x\\,\\Delta p \\ge \\frac{\\hbar}{2}', desc: `Heisenberg belirsizlik ilkesi: konum ve momentum aynı anda keyfi kesinlikte bilinemez.`, vars: [
        { sym: '\\Delta x', name: 'Konum belirsizliği', unit: 'm' },
        { sym: '\\Delta p', name: 'Momentum belirsizliği', unit: 'kg·m/s' }
      ] }
    ],
    calc: {
      title: 'Hidrojen tayf çizgisi',
      inputs: [
        { id: 'n1', label: 'Alt seviye n₁', value: 2, min: 1, max: 6, step: 1 },
        { id: 'n2', label: 'Üst seviye n₂', value: 3, min: 2, max: 12, step: 1 }
      ],
      compute: (v) => {
        const lo = Math.min(v.n1, v.n2);
        let hi = Math.max(v.n1, v.n2);
        if (hi === lo) hi = lo + 1;
        const lam = 1 / (1.09678e7 * (1 / (lo * lo) - 1 / (hi * hi))) * 1e9;
        const band = lam < 380 ? 'morötesi' : lam <= 750 ? 'görünür ışık' : 'kızılötesi';
        return { label: `λ (n = ${hi} → ${lo})`, value: lam, unit: 'nm', note: `Bölge: ${band}. 3 → 2 = Hα (656 nm, kırmızı), 4 → 2 = Hβ (486 nm, camgöbeği).` };
      }
    },
    perDomain: {
      phys: 'Enerji kuantlanması, dalga–parçacık ikiliği ve belirsizlik ilkesi kuantum mekaniğinin temelidir. Atom, Schrödinger denkleminin tam çözülebildiği nadir sistemlerdendir (hidrojen).',
      chem: 'Orbitallerin dolma sırası periyodik tabloyu, orbitallerin örtüşmesi kimyasal bağları ve molekül geometrisini belirler. Valans elektronları kimyanın "para birimidir".',
      space: 'Yıldız tayflarındaki soğurma çizgileri bileşimi, Doppler kaymaları hızı, hidrojenin 21 cm radyo çizgisi ise galaksimizin sarmal kollarının haritasını verir.'
    },
    sim: [
      { lab: 'affePhysics', hash: '#mod1', label: 'Kuantum atom & orbital bulutu' },
      { lab: 'affeSpace', hash: '#mod2', label: 'Yıldız tayfları & H-R' }
    ],
    related: ['periyodik-sistem', 'standart-model', 'fotoelektrik-etki', 'kuantum-tunelleme', 'atom', 'foton', 'planck-sabiti'],
    refs: [
      'Bohr, N. (1913). On the constitution of atoms and molecules. Philosophical Magazine 26, 1–25.',
      'Schrödinger, E. (1926). Quantisierung als Eigenwertproblem. Annalen der Physik 384, 361–376.',
      'Griffiths, D. J. & Schroeter, D. F. (2018). Introduction to Quantum Mechanics (3. bs.). Cambridge University Press.'
    ]
  },

  {
    id: 'standart-model',
    title: 'Standart Model: Kuarklar, Leptonlar ve Gluonlar',
    domain: 'phys',
    bridges: ['phys', 'space'],
    tags: ['kuark', 'gluon', 'lepton', 'Higgs bozonu', 'güçlü kuvvet', 'zayıf kuvvet', 'CERN', 'asimptotik özgürlük', 'renk yükü', 'hadron'],
    summary: 'Maddenin bilinen 17 temel parçacığını ve kütleçekim dışındaki üç temel kuvveti açıklayan, deneylerle en hassas doğrulanmış fizik kuramı.',
    intuitive: `Bir proton tek bir parça değil, içinde <b>üç kuark</b> (iki "yukarı", bir "aşağı") barındıran kaynayan bir çorbadır. Kuarkları bir arada tutan yapıştırıcının adı bile buradan gelir: <b>gluon</b> (glue = yapıştırıcı). Tuhaf bir lastik bant gibi davranır: kuarklar birbirine yakınken neredeyse serbesttir, uzaklaşmaya çalıştıkça çekim artar. Lastiği o kadar gerersiniz ki kopacağı anda enerjiden yeni bir kuark–antikuark çifti doğar; bu yüzden tek başına bir kuark hiç görülmez. Standart Model maddenin "periyodik tablosudur": 6 kuark, 6 lepton (elektron ve akrabaları, nötrinolar), kuvvet taşıyıcı 4 bozon (foton, gluon, W, Z) ve hepsine kütle veren <b>Higgs bozonu</b>. Karşılaştığınız her şey (siz, Dünya, yıldızlar) aslında sadece yukarı ve aşağı kuarklar ile elektronlardan yapılmıştır.`,
    history: `1950'lerde hızlandırıcılar o kadar çok yeni parçacık buldu ki fizikçiler buna "parçacık hayvanat bahçesi" dedi. <b>Murray Gell-Mann</b> 1961'de bunları "sekizli yol" ile düzene soktu ve henüz görülmemiş Ω⁻ parçacığını öngördü (1964'te Brookhaven'da bulundu). 1964'te Gell-Mann ve bağımsız olarak <b>George Zweig</b>, hadronların daha temel bileşenlerden oluştuğunu önerdi; Gell-Mann adı James Joyce'un "Three quarks for Muster Mark!" dizesinden aldı. 1968'de SLAC'ta elektronlar protonlara çarptırılınca içeride noktasal saçıcılar görüldü (1990 Nobel). <b>Glashow, Weinberg ve Salam</b> elektromanyetik ve zayıf kuvvetleri birleştirdi (1979 Nobel); <b>Gross, Wilczek ve Politzer</b> 1973'te asimptotik özgürlüğü buldu (2004 Nobel). W ve Z bozonları 1983'te CERN'de (Rubbia & van der Meer), top kuark 1995'te Fermilab'da, Higgs bozonu ise 4 Temmuz 2012'de CERN'deki ATLAS ve CMS deneylerinde keşfedildi; <b>Peter Higgs ve François Englert</b> 2013 Nobel'ini aldı.`,
    scientists: [
      { name: 'Murray Gell-Mann', year: 1964, note: 'Kuark modeli (1969 Nobel)' },
      { name: 'Steven Weinberg', year: 1967, note: 'Elektrozayıf birleşme (1979 Nobel)' },
      { name: 'Peter Higgs', year: 1964, note: 'Higgs mekanizması; bozon 2012\'de bulundu (2013 Nobel)' }
    ],
    formulas: [
      { tex: 'p = uud:\\quad Q = \\tfrac{2}{3} + \\tfrac{2}{3} - \\tfrac{1}{3} = +1', desc: `Protonun yükü kuark yüklerinin toplamıdır (nötron udd → 0).`, vars: [
        { sym: 'u', name: 'Yukarı kuark (yük +2/3)', unit: 'e' },
        { sym: 'd', name: 'Aşağı kuark (yük −1/3)', unit: 'e' },
        { sym: 'Q', name: 'Elektrik yükü', unit: 'e' }
      ] },
      { tex: '\\alpha_s(Q^2) = \\frac{12\\pi}{(33 - 2n_f)\\,\\ln(Q^2/\\Lambda^2)}', desc: `Güçlü kuvvetin "koşan" bağlaşım sabiti: yüksek enerjide (kısa mesafede) zayıflar — asimptotik özgürlük.`, vars: [
        { sym: '\\alpha_s', name: 'Güçlü bağlaşım sabiti', unit: '—', value: '≈ 0,118 (Z kütlesinde)' },
        { sym: 'Q', name: 'Çarpışma enerji ölçeği', unit: 'GeV' },
        { sym: 'n_f', name: 'Etkin kuark çeşidi sayısı', unit: '—' },
        { sym: '\\Lambda', name: 'QCD ölçeği', unit: 'GeV', value: '≈ 0,2' }
      ] },
      { tex: 'E^2 = (pc)^2 + (mc^2)^2', desc: `Göreli enerji–momentum ilişkisi: hızlandırıcılarda çarpışma enerjisi yeni parçacıkların kütlesine dönüşür.`, vars: [
        { sym: 'E', name: 'Toplam enerji', unit: 'GeV' },
        { sym: 'p', name: 'Momentum', unit: 'GeV/c' },
        { sym: 'm', name: 'Durgun kütle', unit: 'GeV/c²' },
        { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '2,998 × 10⁸' }
      ] }
    ],
    calc: {
      title: 'Hadronun elektrik yükü',
      inputs: [
        { id: 'u', label: 'Yukarı (u) kuark sayısı', value: 2, min: 0, max: 3, step: 1 },
        { id: 'd', label: 'Aşağı (d) kuark sayısı', value: 1, min: 0, max: 3, step: 1 },
        { id: 's', label: 'Garip (s) kuark sayısı', value: 0, min: 0, max: 3, step: 1 }
      ],
      compute: (v) => {
        const q = (2 / 3) * v.u - (1 / 3) * (v.d + v.s);
        return { label: 'Toplam yük Q', value: q, unit: 'e', note: (v.u + v.d + v.s === 3) ? 'Üç kuark → baryon. uud = proton, udd = nötron, sss = Ω⁻.' : 'Gerçek baryonlar tam 3 kuarktan oluşur; mezonlar ise kuark + antikuarktır.' };
      }
    },
    perDomain: {
      phys: 'Kuantum alan kuramı: SU(3)×SU(2)×U(1) ayar simetrisi. Elektron g-faktörü gibi öngörüleri 12 basamağa kadar doğrulanmıştır; ama kütleçekimi, karanlık maddeyi ve nötrino kütlelerini açıklamaz.',
      space: 'Büyük Patlama\'dan sonraki ilk mikrosaniyelerde evren kuark-gluon plazmasıydı; ilk üç dakikada hafif çekirdekler (H, He, Li) oluştu. Nötron yıldızlarının çekirdeğinde kuark maddesi olabilir; kozmik ışınlar LHC\'den bile yüksek enerjilidir.'
    },
    sim: [
      { lab: 'affePhysics', hash: '#mod1', label: 'Çekirdek & nükleer fizik' },
      { lab: 'affeSpace', hash: '#mod6', label: 'Kozmoloji & Büyük Patlama' }
    ],
    related: ['kuantum-atom-orbitaller', 'radyoaktivite-bulut-odasi', 'notron-yildizlari-chandrasekhar', 'atom', 'foton'],
    refs: [
      'Gell-Mann, M. (1964). A schematic model of baryons and mesons. Physics Letters 8, 214–215.',
      'ATLAS Collaboration (2012). Observation of a new particle in the search for the Standard Model Higgs boson. Physics Letters B 716, 1–29.',
      'Griffiths, D. (2008). Introduction to Elementary Particles (2. bs.). Wiley-VCH.'
    ]
  },

  {
    id: 'radyoaktivite-bulut-odasi',
    title: 'Radyoaktivite ve Wilson Bulut Odası',
    domain: 'phys',
    bridges: ['phys', 'chem', 'stats', 'space'],
    tags: ['radyoaktivite', 'alfa', 'beta', 'gama', 'yarı ömür', 'Curie', 'Becquerel', 'bulut odası', 'kozmik ışın', 'müon', 'pozitron'],
    summary: 'Kararsız çekirdeklerin kendiliğinden ışıma yapması ve görünmez parçacıkların yollarını yoğuşan sis izleriyle görünür kılan bulut odası.',
    intuitive: `Bazı atom çekirdekleri <b>aşırı kalabalık bir otobüs</b> gibidir: içindeki proton ve nötron dengesi bozuktur ve er ya da geç biri "iner". Çekirdek bir alfa parçacığı (iki proton + iki nötron), bir beta parçacığı (elektron ya da pozitron) veya yüksek enerjili bir gama fotonu fırlatarak daha kararlı hâle gelir. Bunun ne zaman olacağını <b>tek bir çekirdek için asla bilemeyiz</b>; patlamış mısır tenceresindeki tek bir tanenin ne zaman patlayacağını bilemediğimiz gibi. Ama milyarlarcasının yarısının ne kadar sürede bozunacağı (yarı ömür) şaşmaz bir saattir. Bu parçacıklar görünmezdir; <b>bulut odası</b> onları görünür kılar: aşırı doymuş alkol buharının içinden geçen hızlı bir parçacık, tıpkı bir jet uçağının gökyüzünde iz bırakması gibi, arkasında yoğuşan damlacıklardan bir çizgi bırakır. Kalın kısa izler alfa, ince kıvrık izler beta, uzun düz izler ise uzaydan gelen müonlardır.`,
    history: `<b>Henri Becquerel</b> 1896'nın Şubat ayında uranyum tuzlarının güneş ışığıyla parladığını test edecekti ama Paris bulutluydu; numuneleri fotoğraf plakalarıyla bir çekmeceye kaldırdı. Birkaç gün sonra plakalar yine kararmıştı: uranyum kendiliğinden ışıma yapıyordu. <b>Marie ve Pierre Curie</b> tonlarca uranit cevherini elle işleyerek 1898'de polonyum ve radyumu keşfetti; Marie "radyoaktivite" terimini buldu ve iki farklı dalda (fizik 1903, kimya 1911) Nobel alan ilk insan oldu. <b>Rutherford</b> ışınları alfa ve beta diye ayırdı (1899), <b>Paul Villard</b> gamayı buldu (1900); Rutherford ve <b>Frederick Soddy</b> 1902'de radyoaktivitenin bir elementin başka bir elemente dönüşmesi olduğunu gösterdi. İskoç fizikçi <b>C. T. R. Wilson</b>, 1894'te Ben Nevis zirvesindeki rasathanede gördüğü bulutlardan ilham alıp laboratuvarda bulut oluşturmaya çalıştı ve 1911'de ilk parçacık izlerini fotoğrafladı (1927 Nobel). <b>Carl Anderson</b> 1932'de bulut odasında antimaddenin ilk örneği olan pozitronu, 1936'da müonu buldu.`,
    scientists: [
      { name: 'Henri Becquerel', year: 1896, note: 'Radyoaktivitenin keşfi (1903 Nobel)' },
      { name: 'Marie Curie', year: 1898, note: 'Polonyum ve radyum (1903 & 1911 Nobel)' },
      { name: 'C. T. R. Wilson', year: 1911, note: 'Bulut odası (1927 Nobel)' },
      { name: 'Carl Anderson', year: 1932, note: 'Pozitron (1936 Nobel)' }
    ],
    formulas: [
      { tex: 'N(t) = N_0\\,e^{-\\lambda t} = N_0\\,2^{-t/t_{1/2}}', desc: `Radyoaktif bozunma yasası.`, vars: [
        { sym: 'N_0', name: 'Başlangıçtaki çekirdek sayısı', unit: 'adet' },
        { sym: '\\lambda', name: 'Bozunma sabiti', unit: '1/s' },
        { sym: 't_{1/2}', name: 'Yarı ömür', unit: 's' }
      ] },
      { tex: 'A = \\lambda N, \\qquad 1\\ \\mathrm{Bq} = 1\\ \\mathrm{s}^{-1}', desc: `Aktivite: birim zamandaki bozunma sayısı (becquerel). Eski birim: 1 Ci = 3,7 × 10¹⁰ Bq (1 g radyum).`, vars: [
        { sym: 'A', name: 'Aktivite', unit: 'Bq' },
        { sym: 'N', name: 'Mevcut kararsız çekirdek sayısı', unit: 'adet' }
      ] },
      { tex: '{}^{226}_{\\;88}\\mathrm{Ra} \\rightarrow {}^{222}_{\\;86}\\mathrm{Rn} + {}^{4}_{2}\\alpha', desc: `Alfa bozunumu: radyum, radon gazına dönüşür (kütle numarası 4, atom numarası 2 azalır).`, vars: [
        { sym: '\\alpha', name: 'Alfa parçacığı (He-4 çekirdeği)', unit: '—' }
      ] },
      { tex: 'P(k) = \\frac{\\mu^k e^{-\\mu}}{k!}', desc: `Bir sayaçta belirli sürede k bozunma görme olasılığı — Poisson dağılımı.`, vars: [
        { sym: '\\mu', name: 'Beklenen ortalama sayım', unit: 'adet' },
        { sym: 'k', name: 'Gözlenen sayım', unit: 'adet' }
      ] }
    ],
    calc: {
      title: 'Kalan radyoaktif madde',
      inputs: [
        { id: 'th', label: 'Yarı ömür t½ (yıl)', value: 1600, min: 0.01, max: 10000, step: 0.01 },
        { id: 't', label: 'Geçen süre t (yıl)', value: 100, min: 0, max: 50000, step: 1 }
      ],
      compute: (v) => ({ label: 'Kalan oran', value: 100 * Math.pow(2, -v.t / v.th), unit: '%', note: 'Varsayılan: radyum-226 (t½ = 1600 yıl). Curie\'lerin 1898 numunesinin bugün hâlâ ~%95\'i duruyor.' })
    },
    perDomain: {
      phys: 'Alfa bozunumu güçlü kuvvet ve kuantum tünellemeyle, beta bozunumu zayıf kuvvetle, gama ise çekirdeğin uyarılmış seviyeden inmesiyle olur. Bulut odası ve manyetik alan, parçacıkların yükünü ve momentumunu iz eğriliğinden okutur.',
      chem: 'Curie\'ler radyumu kimyasal ayırma (fraksiyonel kristallendirme) ile izole etti; radyokimya, izotop izleyiciler ve nükleer tıp (Tc-99m, F-18 PET) bu alanın uzantısıdır.',
      stats: 'Bozunma Poisson sürecidir: olaylar bağımsız ve rastgeledir; sayım belirsizliği √N\'dir. Bekleme süreleri üstel dağılıma uyar.',
      space: 'Bulut odasındaki uzun düz izlerin çoğu, kozmik ışınların atmosferde ürettiği müonlardır; ömürleri 2,2 µs olmasına rağmen yere ulaşmaları özel göreliliğin (zaman genişlemesi) kanıtıdır.'
    },
    sim: [
      { lab: 'affePhysics', hash: '#mod1', label: 'Nükleer fizik & bozunum' },
      { lab: 'affeStats', hash: '#mod2', label: 'Poisson & üstel dağılım' }
    ],
    related: ['karbon-14', 'standart-model', 'ustel-buyume-bozunma', 'monte-carlo-markov', 'kuantum-tunelleme'],
    refs: [
      'Becquerel, H. (1896). Sur les radiations émises par phosphorescence. Comptes Rendus 122, 420–421.',
      'Curie, P., Curie, M. & Bémont, G. (1898). Sur une nouvelle substance fortement radio-active contenue dans la pechblende. Comptes Rendus 127, 1215–1217.',
      'Wilson, C. T. R. (1911). On a method of making visible the paths of ionising particles through a gas. Proceedings of the Royal Society A 85, 285–288.'
    ]
  },

  {
    id: 'fotoelektrik-etki',
    title: 'Fotoelektrik Etki',
    domain: 'phys',
    bridges: ['phys', 'chem', 'space'],
    tags: ['foton', 'Einstein', 'iş fonksiyonu', 'eşik frekansı', 'Millikan', 'Planck sabiti', 'güneş paneli', 'kuantum'],
    summary: 'Işık bir metal yüzeye çarptığında elektron koparması; ışığın enerjisinin hν büyüklüğünde paketler (fotonlar) hâlinde geldiğinin kanıtı.',
    intuitive: `Bir metal yüzeyi, elektronların hapsolduğu bir <b>havuz</b> gibi düşünün; havuzdan çıkmak için belli bir yükseklikte duvarı (iş fonksiyonu) aşmak gerekir. Klasik fiziğe göre ışık bir dalgadır; parlaklığı artırırsanız dalgalar büyür ve sonunda elektronlar dışarı savrulur. Ama deney bunu söylemez: kırmızı ışık ne kadar parlak olursa olsun tek bir elektron koparamaz, sönük bir morötesi ışık ise hemen koparır. Einstein'ın açıklaması şuydu: ışık <b>yağmur damlaları gibi tek tek paketler</b> (fotonlar) hâlinde gelir ve her paketin enerjisi rengine (frekansına) bağlıdır, E = hν. Bir elektron bir fotonla karşılaşır; foton duvarı aşacak kadar enerjiliyse elektron çıkar, değilse binlerce zayıf foton bile işe yaramaz — tıpkı bir duvarı bin pinpon topuyla değil tek bir güllelik darbeyle yıkabilmeniz gibi. Parlaklık sadece foton <b>sayısını</b> artırır: daha çok elektron çıkar ama her birinin hızı aynı kalır.`,
    history: `<b>Heinrich Hertz</b> 1887'de radyo dalgalarını incelerken, morötesi ışık alan kıvılcım aralığının daha kolay kıvılcım attığını fark etti. <b>Philipp Lenard</b> 1902'de koparılan elektronların enerjisinin ışık şiddetine değil frekansına bağlı olduğunu ölçtü — klasik dalga kuramı bunu açıklayamıyordu. 1905'te, patent ofisinde çalışan 26 yaşındaki <b>Albert Einstein</b>, Planck'ın 1900'deki enerji paketleri fikrini ciddiye alıp ışığın kendisinin kuantlı olduğunu önerdi. Fikir o kadar radikaldi ki <b>Robert Millikan</b> on yıl boyunca onu çürütmeye çalıştı; 1916'da yaptığı titiz ölçümler ise Einstein'ın denklemini doğruladı ve Planck sabitini %0,5 hassasiyetle verdi. Einstein 1921 Nobel Fizik Ödülü'nü görelilik için değil, <b>fotoelektrik etki</b> için aldı; Millikan da 1923'te Nobel'e layık görüldü.`,
    scientists: [
      { name: 'Albert Einstein', year: 1905, note: 'Işık kuantumu hipotezi (1921 Nobel)' },
      { name: 'Robert Millikan', year: 1916, note: 'Deneysel doğrulama ve h ölçümü (1923 Nobel)' },
      { name: 'Philipp Lenard', year: 1902, note: 'Enerjinin frekansa bağlılığı (1905 Nobel)' }
    ],
    formulas: [
      { tex: 'K_{\\max} = h\\nu - \\varphi', desc: `Einstein'ın fotoelektrik denklemi: kopan elektronun en büyük kinetik enerjisi.`, vars: [
        { sym: 'K_{\\max}', name: 'Elektronun en büyük kinetik enerjisi', unit: 'eV' },
        { sym: 'h', name: 'Planck sabiti', unit: 'J·s', value: '6,626 × 10⁻³⁴' },
        { sym: '\\nu', name: 'Işığın frekansı', unit: 'Hz' },
        { sym: '\\varphi', name: 'Metalin iş fonksiyonu', unit: 'eV' }
      ] },
      { tex: 'V_0 = \\frac{h}{e}\\,\\nu - \\frac{\\varphi}{e}', desc: `Durdurma gerilimi frekansla doğrusal artar; eğim h/e — Millikan h'yi böyle ölçtü.`, vars: [
        { sym: 'V_0', name: 'Durdurma (kesme) gerilimi', unit: 'V' },
        { sym: 'e', name: 'Temel yük', unit: 'C', value: '1,602 × 10⁻¹⁹' },
        { sym: 'h/e', name: 'Eğim', unit: 'V·s', value: '4,136 × 10⁻¹⁵' }
      ] },
      { tex: '\\nu_0 = \\frac{\\varphi}{h}, \\qquad E = \\frac{hc}{\\lambda} \\approx \\frac{1240\\ \\mathrm{eV\\cdot nm}}{\\lambda}', desc: `Eşik frekansı ve dalga boyundan foton enerjisi.`, vars: [
        { sym: '\\nu_0', name: 'Eşik frekansı', unit: 'Hz' },
        { sym: '\\lambda', name: 'Dalga boyu', unit: 'nm' },
        { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '2,998 × 10⁸' }
      ] }
    ],
    calc: {
      title: 'Kopan elektronun enerjisi',
      inputs: [
        { id: 'lam', label: 'Dalga boyu λ (nm)', value: 400, min: 100, max: 1100, step: 1 },
        { id: 'phi', label: 'İş fonksiyonu φ (eV) — Na 2,28 · Zn 4,33', value: 2.28, min: 1.5, max: 6, step: 0.01 }
      ],
      compute: (v) => {
        const E = 1239.84 / v.lam;
        const K = E - v.phi;
        return { label: 'K_max', value: Math.max(0, K), unit: 'eV', note: K > 0 ? `Foton enerjisi ${E.toFixed(2)} eV > φ: elektron kopar.` : `Foton enerjisi ${E.toFixed(2)} eV < φ: ışık ne kadar parlak olursa olsun elektron kopmaz! Eşik λ₀ = ${(1239.84 / v.phi).toFixed(0)} nm.` };
      }
    },
    perDomain: {
      phys: 'Işığın parçacık doğasının ilk doğrudan kanıtı ve kuantum mekaniğinin kurucu deneyidir. Fotoçoğaltıcı tüpler, gece görüş cihazları ve CCD/CMOS kameralar bu ilkeyle çalışır.',
      chem: 'Fotoelektron spektroskopisi (XPS/UPS), koparılan elektronların enerjisinden atomların bağlanma enerjilerini ölçer; yüzey kimyası ve malzeme analizinin temel aracıdır. İş fonksiyonu, metallerin iyonlaşma eğilimiyle ilişkilidir.',
      space: 'Güneş panelleri (fotovoltaik etki) uzay araçlarına enerji sağlar; Güneş ışığı uzay araçlarını fotoelektrik yolla pozitif yükler. Yıldızlararası toz da UV ışığıyla elektron kaybederek gazı ısıtır.'
    },
    sim: [
      { lab: 'affeSpace', hash: '#mod9', label: 'Planck · Fotoelektrik lab & Millikan grafiği' },
      { lab: 'affePhysics', hash: '#mod5', label: 'Optik & ışık' }
    ],
    related: ['planck-sabiti', 'foton', 'kuantum-atom-orbitaller', 'dalga', 'maxwell-denklemleri'],
    refs: [
      'Einstein, A. (1905). Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt. Annalen der Physik 17, 132–148.',
      'Millikan, R. A. (1916). A direct photoelectric determination of Planck\'s "h". Physical Review 7, 355–388.',
      'Lenard, P. (1902). Über die lichtelektrische Wirkung. Annalen der Physik 8, 149–198.'
    ]
  },

  {
    id: 'kaos-cift-sarkac',
    title: 'Kaos Teorisi ve Çift Sarkaç',
    domain: 'phys',
    bridges: ['phys', 'stats', 'space'],
    tags: ['kaos', 'kelebek etkisi', 'Lorenz', 'çift sarkaç', 'Lyapunov üssü', 'lojistik harita', 'Poincaré', 'üç cisim problemi', 'deterministik', 'Feigenbaum'],
    summary: 'Kuralları tamamen belirli (deterministik) olduğu hâlde başlangıçtaki minicik farkları üstel olarak büyüten ve uzun vadede öngörülemeyen sistemler.',
    intuitive: `Bir sarkaç tek başına çok sıkıcıdır: ileri, geri, ileri, geri — yıllar sonra nerede olacağını söyleyebilirsiniz. Ucuna ikinci bir sarkaç takın: <b>çift sarkaç</b> çılgınca dönmeye, takla atmaya başlar. İki çift sarkacı neredeyse aynı açıdan (bir saç teli kadar farkla) bırakın; birkaç saniye sonra tamamen farklı hareketler yaparlar. İşte <b>kaos</b>: kurallar kesin, rastgelelik yok, ama başlangıçtaki minicik fark her saniye katlanarak büyür. Hava durumu da böyledir; bu yüzden en güçlü süper bilgisayarlar bile iki haftadan uzun güvenilir tahmin yapamaz. "Brezilya'da bir kelebeğin kanat çırpışı Teksas'ta kasırgaya yol açabilir mi?" sorusu buradan gelir. Kaos "düzensizlik" değildir; arkasında fraktal desenler ve evrensel sabitler saklıdır.`,
    history: `<b>Henri Poincaré</b> 1889'da İsveç Kralı II. Oscar'ın açtığı yarışmada üç cismin kütleçekimiyle hareketini inceledi ve yörüngelerin akıl almaz karmaşıklıkta olabileceğini fark etti; ilk gönderdiği çözümde hata bulunca basılmış nüshaları kendi parasıyla toplattı. 1961'de MIT'de meteorolog <b>Edward Lorenz</b>, bir hava simülasyonunu yeniden çalıştırırken zaman kazanmak için 0,506127 sayısını 0,506 olarak girdi; kahvesini içip döndüğünde tahminin tamamen değiştiğini gördü. 1963 makalesi kaos kuramının doğuşudur; 1972'deki konuşmasının başlığı "kelebek etkisi" adını verdi. <b>Robert May</b> 1976'da basit bir nüfus denkleminin (lojistik harita) kaosa sürüklenebildiğini gösterdi; <b>Mitchell Feigenbaum</b> 1975'te periyot ikilenmesinin evrensel bir sabitle (δ ≈ 4,669) gerçekleştiğini keşfetti.`,
    scientists: [
      { name: 'Henri Poincaré', year: 1890, note: 'Üç cisim problemi ve kaosun ilk görülmesi' },
      { name: 'Edward Lorenz', year: 1963, note: 'Deterministik periyodik olmayan akış — kelebek etkisi' },
      { name: 'Mitchell Feigenbaum', year: 1975, note: 'Periyot ikilenmesinin evrensel sabiti' }
    ],
    formulas: [
      { tex: '|\\delta(t)| \\approx |\\delta_0|\\, e^{\\lambda t}', desc: `Kaotik sistemde iki yakın yörünge arasındaki fark üstel büyür; λ > 0 Lyapunov üssü kaosun imzasıdır.`, vars: [
        { sym: '\\delta_0', name: 'Başlangıçtaki küçük fark', unit: '—' },
        { sym: '\\lambda', name: 'En büyük Lyapunov üssü', unit: '1/s' },
        { sym: 't', name: 'Zaman', unit: 's' }
      ] },
      { tex: 'x_{n+1} = r\\,x_n\\,(1 - x_n)', desc: `Lojistik harita: r ≈ 3,57'nin üstünde kaotik davranır; en basit kaos laboratuvarı.`, vars: [
        { sym: 'x_n', name: 'n. kuşakta nüfus oranı (0–1)', unit: '—' },
        { sym: 'r', name: 'Büyüme parametresi (0–4)', unit: '—' }
      ] },
      { tex: 'T \\approx 2\\pi\\sqrt{\\frac{L}{g}}', desc: `Tek sarkacın küçük açılı periyodu — çift sarkaçta böyle kapalı bir formül yoktur.`, vars: [
        { sym: 'T', name: 'Periyot', unit: 's' },
        { sym: 'L', name: 'Sarkaç uzunluğu', unit: 'm' },
        { sym: 'g', name: 'Yerçekimi ivmesi', unit: 'm/s²', value: '9,81' }
      ] },
      { tex: '\\delta = \\lim_{n\\to\\infty}\\frac{r_n - r_{n-1}}{r_{n+1} - r_n} \\approx 4{,}669', desc: `Feigenbaum sabiti: periyot ikilenmeleri arasındaki aralıklar hep aynı oranla küçülür.`, vars: [
        { sym: 'r_n', name: 'n. periyot ikilenmesinin parametre değeri', unit: '—' }
      ] }
    ],
    calc: {
      title: 'Öngörülebilirlik ufku',
      inputs: [
        { id: 'd0', label: 'Başlangıç ölçüm hatası δ₀ (log₁₀)', value: -6, min: -15, max: -1, step: 0.5 },
        { id: 'tol', label: 'Kabul edilebilir hata Δ (log₁₀)', value: -1, min: -5, max: 0, step: 0.5 },
        { id: 'lam', label: 'Lyapunov üssü λ (1/s)', value: 2, min: 0.01, max: 10, step: 0.01 }
      ],
      compute: (v) => {
        const t = Math.max(0, (Math.log(Math.pow(10, v.tol)) - Math.log(Math.pow(10, v.d0))) / v.lam);
        return { label: 'Tahmin süresi', value: t, unit: 's', note: 'Ölçümü 1000 kat iyileştirmek ufku yalnızca ln(1000)/λ ≈ 6,9/λ kadar uzatır — kaosun acı gerçeği.' };
      }
    },
    perDomain: {
      phys: 'Doğrusal olmayan hareket denklemleri (çift sarkaç, türbülans, plazma) faz uzayında "garip çekiciler" oluşturur. Kaos, deterministik yasalar ile pratik öngörülemezlik arasındaki köprüdür.',
      stats: 'Kaotik sistemlerin uzun vadeli davranışı istatistikle tanımlanır (ergodik ölçüler, değişmez dağılımlar). Hava tahmini tek bir sonuç yerine "topluluk" (ensemble) simülasyonlarıyla olasılık verir.',
      space: 'Üç cisim problemi genelde kaotiktir; Plüton\'un yörüngesi ~20 milyon yıl ölçeğinde, Satürn\'ün uydusu Hyperion\'un dönüşü ise günler içinde öngörülemez. Asteroit kuşağındaki Kirkwood boşlukları kaotik rezonanslardır.'
    },
    sim: [
      { lab: 'affePhysics', hash: '#mod3', label: 'Mekanik & kaos — çift sarkaç' },
      { lab: 'affeStats', hash: '#mod6', label: 'Monte Carlo & rastgele yürüyüş' },
      { lab: 'affeSpace', hash: '#mod8', label: 'Güneş Sistemi yörüngeleri' }
    ],
    related: ['monte-carlo-markov', 'gunes-sistemi-kepler', 'entropi', 'dalga', 'lotka-volterra'],
    refs: [
      'Lorenz, E. N. (1963). Deterministic nonperiodic flow. Journal of the Atmospheric Sciences 20, 130–141.',
      'May, R. M. (1976). Simple mathematical models with very complicated dynamics. Nature 261, 459–467.',
      'Strogatz, S. H. (2015). Nonlinear Dynamics and Chaos (2. bs.). Westview Press.'
    ]
  },

  {
    id: 'maxwell-denklemleri',
    title: 'Maxwell Denklemleri ve Elektromanyetik Dalgalar',
    domain: 'phys',
    bridges: ['phys', 'space'],
    tags: ['elektromanyetizma', 'Maxwell', 'Faraday', 'ışık', 'elektromanyetik dalga', 'radyo', 'yer değiştirme akımı', 'ışık hızı', 'Hertz'],
    summary: 'Elektrik, manyetizma ve ışığı tek bir kuramda birleştiren dört denklem; radyodan gama ışınlarına tüm elektromanyetik tayfın kaynağı.',
    intuitive: `Bir mıknatısı bir tel bobinin içinde hareket ettirin: telde akım oluşur. Bir telden akım geçirin: etrafında manyetik alan oluşur. Elektrik ve manyetizma birbirini <b>doğuran ikizlerdir</b>. Maxwell'in dahiyane katkısı, bu ikizlerin birbirini boş uzayda bile sonsuza kadar besleyebileceğini görmekti: değişen elektrik alan manyetik alan doğurur, değişen manyetik alan elektrik alan doğurur; ikisi el ele tutuşup uzayda <b>dalga</b> olarak ilerler. Maxwell bu dalganın hızını hesapladığında ışık hızını buldu ve şu cümleyi kurdu: ışık bir elektromanyetik dalgadır. Radyo, mikrodalga fırın, Wi-Fi, gördüğünüz renkler, röntgen ve gama ışınları aynı dalganın farklı boylarıdır. Bir gitarın kalın ve ince telleri gibi: aynı tel, farklı nota.`,
    history: `<b>Charles-Augustin de Coulomb</b> 1785'te elektrik yükleri arasındaki kuvveti ölçtü. 1820'de Kopenhag'da bir derste <b>Hans Christian Ørsted</b>, akım geçen telin yanındaki pusula iğnesinin saptığını gördü; elektrik ile manyetizma arasındaki ilk bağ. <b>André-Marie Ampère</b> aynı yıl akımlar arasındaki kuvveti formüle etti. Kendi kendini yetiştirmiş ciltçi çırağı <b>Michael Faraday</b> 1831'de elektromanyetik indüksiyonu buldu ve "alan çizgileri" kavramını icat etti. <b>James Clerk Maxwell</b> 1861–1865 arasında bu bilgileri birleştirip eksik bir terim (yer değiştirme akımı) ekledi ve 1865'te ışığın elektromanyetik dalga olduğunu öngördü. Orijinal 20 denklemini <b>Oliver Heaviside</b> 1884'te bugünkü dört vektör denkleme indirdi. 1887'de <b>Heinrich Hertz</b> laboratuvarında radyo dalgaları üretip algılayarak Maxwell'i doğruladı.`,
    scientists: [
      { name: 'Michael Faraday', year: 1831, note: 'Elektromanyetik indüksiyon, alan kavramı' },
      { name: 'James Clerk Maxwell', year: 1865, note: 'Elektromanyetizmanın birleşik kuramı' },
      { name: 'Heinrich Hertz', year: 1887, note: 'Radyo dalgalarının deneysel kanıtı' }
    ],
    formulas: [
      { tex: '\\begin{aligned} \\nabla\\cdot\\mathbf{E} &= \\frac{\\rho}{\\varepsilon_0} & \\nabla\\cdot\\mathbf{B} &= 0 \\\\ \\nabla\\times\\mathbf{E} &= -\\frac{\\partial\\mathbf{B}}{\\partial t} & \\nabla\\times\\mathbf{B} &= \\mu_0\\mathbf{J} + \\mu_0\\varepsilon_0\\frac{\\partial\\mathbf{E}}{\\partial t} \\end{aligned}', desc: `Maxwell'in dört denklemi: Gauss (elektrik), manyetik tek kutup yokluğu, Faraday indüksiyonu ve Ampère–Maxwell yasası.`, vars: [
        { sym: '\\mathbf{E}', name: 'Elektrik alan', unit: 'V/m' },
        { sym: '\\mathbf{B}', name: 'Manyetik alan', unit: 'T' },
        { sym: '\\rho', name: 'Yük yoğunluğu', unit: 'C/m³' },
        { sym: '\\mathbf{J}', name: 'Akım yoğunluğu', unit: 'A/m²' },
        { sym: '\\varepsilon_0', name: 'Boşluğun elektrik geçirgenliği', unit: 'F/m', value: '8,854 × 10⁻¹²' },
        { sym: '\\mu_0', name: 'Boşluğun manyetik geçirgenliği', unit: 'H/m', value: '1,2566 × 10⁻⁶' }
      ] },
      { tex: 'c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}', desc: `Denklemlerden çıkan dalga hızı tam olarak ışık hızıdır — ışık elektromanyetik bir dalgadır.`, vars: [
        { sym: 'c', name: 'Işık hızı', unit: 'm/s', value: '299 792 458' }
      ] },
      { tex: '\\lambda = \\frac{c}{f}', desc: `Dalga boyu, frekans ve hız ilişkisi.`, vars: [
        { sym: '\\lambda', name: 'Dalga boyu', unit: 'm' },
        { sym: 'f', name: 'Frekans', unit: 'Hz' }
      ] }
    ],
    calc: {
      title: 'Frekanstan dalga boyu',
      inputs: [{ id: 'f', label: 'Frekans f (MHz)', value: 100, min: 0.01, max: 1000000, step: 0.01 }],
      compute: (v) => ({ label: 'Dalga boyu λ', value: 299.792458 / v.f, unit: 'm', note: 'FM radyo (100 MHz) ≈ 3 m · Wi-Fi (2400 MHz) ≈ 12,5 cm · mikrodalga fırın (2450 MHz) ≈ 12,2 cm.' })
    },
    perDomain: {
      phys: 'Maxwell denklemleri klasik fiziğin zirvesidir; Lorentz dönüşümlerine uymaları Einstein\'ı özel göreliliğe götürdü. Elektrik motorları, jeneratörler, antenler ve fiber optik bu dört denklemin mühendisliğidir.',
      space: 'Evreni farklı dalga boylarında görmek (radyo, kızılötesi, görünür, X-ışını) farklı fiziksel süreçleri açığa çıkarır: JWST kızılötesiyle tozun içini, Chandra X-ışınıyla milyonlarca derecelik gazı görür. Pulsarlar ve kuasarlar dev doğal antenlerdir.'
    },
    sim: [
      { lab: 'affePhysics', hash: '#mod4', label: 'Elektromanyetizma (Maxwell)' },
      { lab: 'affeSpace', hash: '#mod3', label: 'Çoklu dalga boyu gözlemevi' },
      { lab: 'affePhysics', hash: '#mod5', label: 'Optik & çift yarık' }
    ],
    related: ['fotoelektrik-etki', 'foton', 'dalga', 'uzay-teleskoplari'],
    refs: [
      'Maxwell, J. C. (1865). A dynamical theory of the electromagnetic field. Philosophical Transactions of the Royal Society 155, 459–512.',
      'Faraday, M. (1832). Experimental researches in electricity. Philosophical Transactions of the Royal Society 122, 125–162.',
      'Griffiths, D. J. (2017). Introduction to Electrodynamics (4. bs.). Cambridge University Press.'
    ]
  },

  {
    id: 'kuantum-tunelleme',
    title: 'Kuantum Tünelleme',
    domain: 'phys',
    bridges: ['phys', 'chem', 'space', 'bio'],
    tags: ['tünelleme', 'potansiyel bariyeri', 'Gamow', 'alfa bozunumu', 'taramalı tünelleme mikroskobu', 'nükleer füzyon', 'dalga fonksiyonu', 'tünel diyot'],
    summary: 'Bir parçacığın, klasik olarak aşamayacağı bir enerji bariyerinin "içinden" geçebilmesi; yıldızları yakan, atomları görüntüleyen kuantum olayı.',
    intuitive: `Bir topu tepeye doğru yuvarlarsanız ve enerjisi yetmezse, top geri döner — asla diğer tarafa geçmez. Kuantum dünyasında ise parçacık aynı zamanda bir <b>dalgadır</b> ve dalgalar duvarlarda aniden durmaz; içine sızar, hızla sönümlenir. Duvar yeterince inceyse, dalganın küçük bir kuyruğu öbür tarafa çıkar: parçacığın bariyerin ardında belirme olasılığı sıfır değildir. Bu, sanki duvardan geçen bir hayalet gibidir. Olasılık bariyer kalınlığıyla <b>üstel</b> düşer: duvarı biraz kalınlaştırmak geçişi milyon kat azaltabilir. Bu tuhaflık olmasaydı Güneş parlamazdı: çekirdeğindeki protonların itme duvarını klasik olarak aşacak enerjisi yoktur, tünelleyerek kaynaşırlar. Bilgisayarınızdaki flash bellek de bilgiyi elektronları ince bir yalıtkandan tünelleterek yazar.`,
    history: `1927'de <b>Friedrich Hund</b> moleküllerde bariyer geçişini hesapladı. 1928'de <b>George Gamow</b> ve bağımsız olarak <b>Ronald Gurney ile Edward Condon</b>, alfa bozunumunu tünellemeyle açıkladı: alfa parçacığı çekirdekten "kaçacak" enerjiye sahip değildir ama tünelleyerek çıkar; yarı ömürlerin neden saniyelerden milyar yıllara kadar değiştiğini bu açıkladı. Aynı yıl <b>Fowler ve Nordheim</b> soğuk alan emisyonunu açıkladı. 1929'da <b>Atkinson ve Houtermans</b>, Gamow'un formülünü yıldızların içine uygulayarak Güneş'in füzyonla nasıl yanabildiğini gösterdi. <b>Leo Esaki</b> 1957'de tünel diyotunu icat etti (1973 Nobel). 1981'de IBM Zürih'te <b>Gerd Binnig ve Heinrich Rohrer</b>, ucu tek atomluk bir iğneyle yüzeyden tünelleyen akımı ölçerek tek tek atomları gören taramalı tünelleme mikroskobunu (STM) geliştirdi (1986 Nobel).`,
    scientists: [
      { name: 'George Gamow', year: 1928, note: 'Alfa bozunumunun tünelleme kuramı' },
      { name: 'Leo Esaki', year: 1957, note: 'Tünel diyotu (1973 Nobel)' },
      { name: 'Gerd Binnig & Heinrich Rohrer', year: 1981, note: 'Taramalı tünelleme mikroskobu (1986 Nobel)' }
    ],
    formulas: [
      { tex: 'T \\approx e^{-2\\kappa L}, \\qquad \\kappa = \\frac{\\sqrt{2m(V - E)}}{\\hbar}', desc: `Dikdörtgen bariyerden geçiş olasılığı (geniş bariyer yaklaşımı).`, vars: [
        { sym: 'T', name: 'Geçiş (iletim) olasılığı', unit: '—' },
        { sym: '\\kappa', name: 'Bariyer içindeki sönüm sabiti', unit: '1/m' },
        { sym: 'L', name: 'Bariyer genişliği', unit: 'm' },
        { sym: 'm', name: 'Parçacık kütlesi (elektron)', unit: 'kg', value: '9,109 × 10⁻³¹' },
        { sym: 'V - E', name: 'Bariyer yüksekliği ile parçacık enerjisi farkı', unit: 'J' },
        { sym: '\\hbar', name: 'İndirgenmiş Planck sabiti', unit: 'J·s', value: '1,0546 × 10⁻³⁴' }
      ] },
      { tex: 'P_{\\text{G}} \\approx \\exp\\!\\left(-\\sqrt{E_G / E}\\right), \\qquad E_G = 2 m_r c^2\\,(\\pi\\alpha Z_1 Z_2)^2', desc: `Gamow faktörü: yıldızlarda iki çekirdeğin Coulomb bariyerini tünelleyerek kaynaşma olasılığı.`, vars: [
        { sym: 'E_G', name: 'Gamow enerjisi (p + p için ≈ 493 keV)', unit: 'keV' },
        { sym: 'E', name: 'Çarpışma enerjisi (Güneş çekirdeği ≈ 1,3 keV)', unit: 'keV' },
        { sym: 'm_r', name: 'İndirgenmiş kütle', unit: 'kg' },
        { sym: '\\alpha', name: 'İnce yapı sabiti', unit: '—', value: '1/137' },
        { sym: 'Z_1, Z_2', name: 'Çekirdeklerin atom numaraları', unit: '—' }
      ] },
      { tex: 'I_{\\text{STM}} \\propto V\\,e^{-2\\kappa d}', desc: `STM akımı uç–yüzey mesafesiyle üstel değişir: 1 Å yaklaşmak akımı ~10 kat artırır — atomik çözünürlüğün sırrı.`, vars: [
        { sym: 'I_{\\text{STM}}', name: 'Tünelleme akımı', unit: 'A' },
        { sym: 'V', name: 'Uygulanan gerilim', unit: 'V' },
        { sym: 'd', name: 'Uç–yüzey mesafesi', unit: 'm' }
      ] }
    ],
    calc: {
      title: 'Elektronun bariyerden geçme olasılığı',
      inputs: [
        { id: 'dV', label: 'Bariyer yüksekliği farkı V − E (eV)', value: 1, min: 0.05, max: 10, step: 0.05 },
        { id: 'L', label: 'Bariyer genişliği L (nm)', value: 0.5, min: 0.05, max: 3, step: 0.01 }
      ],
      compute: (v) => {
        const kappa = Math.sqrt(2 * 9.109e-31 * v.dV * 1.602e-19) / 1.0546e-34;
        const T = Math.exp(-2 * kappa * v.L * 1e-9);
        return { label: 'Geçiş olasılığı', value: T * 100, unit: '%', note: `κ = ${(kappa / 1e9).toFixed(2)} nm⁻¹. Genişliği 0,1 nm artırmak olasılığı ~${Math.exp(2 * kappa * 1e-10).toFixed(1)} kat azaltır.` };
      }
    },
    perDomain: {
      phys: 'Dalga fonksiyonunun klasik olarak yasak bölgeye sızmasıdır. Alfa bozunumu, tünel diyotları, Josephson eklemleri (süperiletken kübitler) ve STM\'nin temelidir.',
      chem: 'Hafif atomların (özellikle H⁺) tünellemesi bazı tepkimeleri klasik Arrhenius tahmininden çok daha hızlı yapar; amonyağın "şemsiye ters dönmesi" (inversiyon) tünellemedir. STM ile tek tek moleküller görüntülenir ve itilir.',
      space: 'Güneş\'in çekirdeğinde protonların ortalama enerjisi Coulomb bariyerinin ~1/1000\'i kadardır; yine de tünelleme sayesinde saniyede ~4 milyon ton kütle enerjiye dönüşür. Tünelleme olmasaydı yıldızlar yanmazdı.',
      bio: 'Enzim tepkimelerinde (ör. alkol dehidrogenaz) protonlar ve elektronlar tünelleyebilir; solunum zincirinde elektronlar proteinler arasında tünelleyerek akar. DNA baz çiftlerinde proton tünellemesinin nadir mutasyonlara katkısı tartışılmaktadır.'
    },
    sim: [
      { lab: 'affePhysics', hash: '#mod7', label: 'Görelilik & kuantum tünelleme' },
      { lab: 'affeSpace', hash: '#mod2', label: 'Yıldız çekirdeğinde füzyon' }
    ],
    related: ['kuantum-atom-orbitaller', 'radyoaktivite-bulut-odasi', 'yildiz-evrimi-hr', 'enzim-aktivasyon', 'dalga'],
    refs: [
      'Gamow, G. (1928). Zur Quantentheorie des Atomkernes. Zeitschrift für Physik 51, 204–212.',
      'Binnig, G., Rohrer, H., Gerber, C. & Weibel, E. (1982). Surface studies by scanning tunneling microscopy. Physical Review Letters 49, 57–61.',
      'Atkinson, R. d\'E. & Houtermans, F. G. (1929). Zur Frage der Aufbaumöglichkeit der Elemente in Sternen. Zeitschrift für Physik 54, 656–665.'
    ]
  },

  /* ==========================================================================
     BİYOLOJİ (affeBio)
     ========================================================================== */
  {
    id: 'insan-anatomisi',
    title: 'İnsan Anatomisi ve Organ Sistemleri',
    domain: 'bio',
    bridges: ['bio', 'phys'],
    tags: ['anatomi', 'organ sistemleri', 'dolaşım', 'kalp debisi', 'Vesalius', 'Harvey', 'İbnü\'n-Nefis', 'biyomekanik', 'Poiseuille', 'BodyParts3D'],
    summary: 'İnsan vücudunun yapısı ve 11 organ sistemi; kalbin pompa, kemiklerin kaldıraç, damarların boru gibi çalıştığı canlı bir fizik makinesi.',
    intuitive: `Vücudunuzu iş birliği yapan bir <b>şehir</b> gibi düşünün. Kemikler binaların çelik iskeleti, kaslar vinçler ve motorlar, kalp şehrin su pompası, damarlar boru hattı, sinirler telefon ağı, beyin belediye başkanlığı, böbrekler arıtma tesisi, bağışıklık sistemi ise polis teşkilatıdır. Kalbiniz dakikada yaklaşık 70 kez atarak her atımda ~70 mL kan pompalar; günde ~7000 litre — küçük bir yüzme havuzunu iki üç günde doldurmaya yeter. Kollarınız fizik dersindeki <b>kaldıraçlardır</b>: dirsek destek noktası, pazı kası kuvvet, elinizdeki bardak yük. Damarlarınız boru gibidir ama sürpriz bir kurala uyar: damarın yarıçapı yarıya inerse kan akışı <b>16 kat</b> azalır. Damar sertliğinin bu kadar tehlikeli olmasının nedeni budur.`,
    history: `Bergamalı <b>Galenos</b> (MS 2. yy) hayvan diseksiyonlarına dayanan ve 1300 yıl sorgulanmayan bir anatomi kurdu. 1242'de Şamlı hekim <b>İbnü'n-Nefis</b>, kanın kalbin sağından soluna gözeneklerden değil akciğerlerden geçerek ulaştığını (küçük dolaşım) yazdı; Avrupa bunu ancak 16. yüzyılda yeniden keşfetti. 1543'te 28 yaşındaki <b>Andreas Vesalius</b>, kendi insan diseksiyonlarına dayanan <i>De humani corporis fabrica</i>'yı yayımlayıp Galenos'un 200'den fazla hatasını düzeltti — aynı yıl Kopernik'in kitabı da çıktı. <b>William Harvey</b> 1628'de kalbin pompaladığı kan miktarını hesaplayarak kanın sürekli yeniden üretilemeyeceğini, bir döngü içinde dolaştığını kanıtladı. <b>Marcello Malpighi</b> 1661'de mikroskopla kılcal damarları görüp döngüyü tamamladı. <b>Röntgen</b> 1895'te X-ışınlarıyla canlı iskeleti gösterdi; 1971'de <b>Hounsfield</b> BT'yi geliştirdi. 1994'te Visible Human Project, 2009'da Japonya'da BodyParts3D yayımlandı — affeBio'daki 3B modelin kaynağı.`,
    scientists: [
      { name: 'İbnü\'n-Nefis', year: 1242, note: 'Akciğer (küçük) dolaşımı' },
      { name: 'Andreas Vesalius', year: 1543, note: 'Modern anatominin kurucusu — Fabrica' },
      { name: 'William Harvey', year: 1628, note: 'Kan dolaşımının kanıtı' }
    ],
    formulas: [
      { tex: '\\text{CO} = \\text{HR}\\times\\text{SV}', desc: `Kalp debisi: dakikada pompalanan kan hacmi (dinlenmede ≈ 5 L/dk, sporcuda efor sırasında 30 L/dk'ya çıkabilir).`, vars: [
        { sym: '\\text{CO}', name: 'Kalp debisi', unit: 'L/dk' },
        { sym: '\\text{HR}', name: 'Kalp atım hızı', unit: 'atım/dk', value: '≈ 70' },
        { sym: '\\text{SV}', name: 'Atım hacmi', unit: 'mL', value: '≈ 70' }
      ] },
      { tex: 'Q = \\frac{\\pi r^4\\,\\Delta P}{8\\eta L}', desc: `Hagen–Poiseuille yasası: borudaki akış yarıçapın 4. kuvvetiyle orantılıdır.`, vars: [
        { sym: 'Q', name: 'Hacimsel akış hızı', unit: 'm³/s' },
        { sym: 'r', name: 'Damar yarıçapı', unit: 'm' },
        { sym: '\\Delta P', name: 'Basınç farkı', unit: 'Pa' },
        { sym: '\\eta', name: 'Kanın viskozitesi', unit: 'Pa·s', value: '≈ 3,5 × 10⁻³' },
        { sym: 'L', name: 'Damar uzunluğu', unit: 'm' }
      ] },
      { tex: '\\text{BMI} = \\frac{m}{h^2}', desc: `Beden kitle indeksi (kaba bir nüfus ölçüsü; kas/yağ ayrımı yapmaz).`, vars: [
        { sym: 'm', name: 'Vücut kütlesi', unit: 'kg' },
        { sym: 'h', name: 'Boy', unit: 'm' }
      ] }
    ],
    calc: {
      title: 'Kalp debisi',
      inputs: [
        { id: 'hr', label: 'Kalp atım hızı (atım/dk)', value: 70, min: 30, max: 220, step: 1 },
        { id: 'sv', label: 'Atım hacmi (mL)', value: 70, min: 20, max: 200, step: 1 }
      ],
      compute: (v) => ({ label: 'Kalp debisi', value: v.hr * v.sv / 1000, unit: 'L/dk', note: `Günde ≈ ${(v.hr * v.sv * 1440 / 1000).toFixed(0)} litre kan pompalanır.` })
    },
    perDomain: {
      bio: 'Vücut 11 organ sisteminden oluşur (iskelet, kas, dolaşım, solunum, sindirim, boşaltım, sinir, endokrin, bağışıklık/lenf, üreme, deri). Homeostaz, bu sistemlerin iç ortamı (sıcaklık, pH, şeker) sabit tutmak için koordinasyonudur.',
      phys: 'Biyomekanik: eklemler kaldıraç, kemikler gerilmeye dayanıklı kompozit malzeme, kalp basınç pompası, damarlar elastik borulardır. Kan akışı Poiseuille yasası, işitme dalga mekaniği, görme optik yasalarıyla açıklanır.'
    },
    sim: [
      { lab: 'affeBio', hash: '#mod1', label: '3B insan anatomisi (BodyParts3D)' },
      { lab: 'affePhysics', hash: '#mod6', label: 'Akışkanlar & termodinamik' }
    ],
    related: ['hucre-organelleri-atp', 'hodgkin-huxley-noron', 'asit-baz-ph', 'termokimya-entalpi'],
    refs: [
      'Vesalius, A. (1543). De humani corporis fabrica libri septem. Basel: Oporinus.',
      'Harvey, W. (1628). Exercitatio anatomica de motu cordis et sanguinis in animalibus. Frankfurt.',
      'Mitsuhashi, N. ve ark. (2009). BodyParts3D: 3D structure database for anatomical concepts. Nucleic Acids Research 37, D782–D785.'
    ]
  },

  {
    id: 'hucre-organelleri-atp',
    title: 'Hücre Organelleri ve ATP Sentezi',
    domain: 'bio',
    bridges: ['bio', 'chem', 'phys'],
    tags: ['hücre', 'organel', 'mitokondri', 'ATP', 'ATP sentaz', 'kemiozmoz', 'endosimbiyoz', 'hücre kuramı', 'proton gradyanı'],
    summary: 'Hücrenin uzmanlaşmış bölmeleri ve tüm canlıların enerji para birimi ATP\'nin mitokondrideki dönen moleküler motorla üretilmesi.',
    intuitive: `Hücre minicik bir <b>fabrikadır</b>: çekirdek yönetim ofisi (DNA arşivi), ribozomlar montaj hatları, endoplazmik retikulum ve Golgi paketleme-kargo bölümü, lizozomlar geri dönüşüm tesisi, mitokondri ise <b>enerji santralidir</b>. Santralin ürettiği "elektrik" ATP'dir; hücrenin her işi (kas kasılması, sinir sinyali, protein üretimi) ATP harcar. Vücudunuz her gün kendi ağırlığı kadar ATP üretip tüketir! Üretimin sırrı şaşırtıcıdır: mitokondri iç zarının bir tarafına protonlar pompalanır, tıpkı bir barajın arkasında su biriktirilmesi gibi. Bu protonlar geri akarken <b>ATP sentaz</b> adlı protein türbininden geçer ve onu saniyede ~100 tur döndürür; her turda 3 ATP üretilir. Yani hücrelerinizde gerçek, dönen milyarlarca moleküler motor çalışıyor.`,
    history: `<b>Robert Hooke</b> 1665'te mantar kesitinde gördüğü odacıklara manastır hücrelerine benzediği için "cell" dedi. <b>Antonie van Leeuwenhoek</b> 1670'lerde kendi mercekleriyle canlı mikropları ilk gören kişi oldu. <b>Schleiden ve Schwann</b> (1838–39) tüm canlıların hücrelerden yapıldığını, <b>Rudolf Virchow</b> (1855) her hücrenin bir hücreden geldiğini söyledi. ATP 1929'da <b>Karl Lohmann</b> tarafından bulundu; <b>Fritz Lipmann</b> 1941'de onu hücrenin enerji para birimi olarak tanımladı. İngiliz biyokimyacı <b>Peter Mitchell</b> 1961'de, enerjinin bir kimyasal ara üründe değil zar boyunca proton gradyanında depolandığını öne sürdü; fikri yıllarca reddedildi, Mitchell kendi özel laboratuvarında çalışmaya devam etti ve 1978'de Nobel aldı. <b>Paul Boyer</b> ATP sentazın dönerek çalıştığını öngördü, <b>John Walker</b> 1994'te yapısını çözdü (1997 Nobel); 1997'de Japonya'da mikroskop altında dönüşü bizzat izlendi. <b>Lynn Margulis</b> 1967'de mitokondrilerin bir zamanlar bağımsız bakteriler olduğunu (endosimbiyoz) savundu.`,
    scientists: [
      { name: 'Robert Hooke', year: 1665, note: '"Hücre" adı (Micrographia)' },
      { name: 'Peter Mitchell', year: 1961, note: 'Kemiozmotik kuram (1978 Nobel)' },
      { name: 'Lynn Margulis', year: 1967, note: 'Endosimbiyoz kuramı' },
      { name: 'Paul Boyer & John Walker', year: 1994, note: 'ATP sentazın dönen motor mekanizması (1997 Nobel)' }
    ],
    formulas: [
      { tex: '\\mathrm{ATP} + \\mathrm{H_2O} \\rightarrow \\mathrm{ADP} + \\mathrm{P_i}, \\quad \\Delta G^{\\circ\\prime} \\approx -30{,}5\\ \\mathrm{kJ/mol}', desc: `ATP hidrolizi: hücre işlerinin ödendiği enerji "bozuk parası" (hücre içi koşullarda ≈ −50 kJ/mol).`, vars: [
        { sym: '\\mathrm{P_i}', name: 'İnorganik fosfat', unit: '—' },
        { sym: '\\Delta G^{\\circ\\prime}', name: 'Biyokimyasal standart serbest enerji (pH 7)', unit: 'kJ/mol' }
      ] },
      { tex: '\\mathrm{C_6H_{12}O_6} + 6\\,\\mathrm{O_2} \\rightarrow 6\\,\\mathrm{CO_2} + 6\\,\\mathrm{H_2O}, \\quad \\Delta G^{\\circ\\prime} \\approx -2870\\ \\mathrm{kJ/mol}', desc: `Hücresel solunum: bir glikozdan ~30–32 ATP elde edilir (verim ≈ %34).`, vars: [
        { sym: '\\mathrm{C_6H_{12}O_6}', name: 'Glikoz', unit: '—' }
      ] },
      { tex: '\\Delta p = \\Delta\\psi - \\frac{2{,}303\\,RT}{F}\\,\\Delta\\mathrm{pH}', desc: `Proton itici kuvvet (Mitchell): zar potansiyeli + pH farkının oluşturduğu "baraj yüksekliği".`, vars: [
        { sym: '\\Delta p', name: 'Proton itici kuvvet', unit: 'mV' },
        { sym: '\\Delta\\psi', name: 'Zar potansiyeli', unit: 'mV' },
        { sym: 'R', name: 'Gaz sabiti', unit: 'J/(mol·K)', value: '8,314' },
        { sym: 'F', name: 'Faraday sabiti', unit: 'C/mol', value: '96 485' },
        { sym: '\\Delta\\mathrm{pH}', name: 'Zarın iki tarafı arasındaki pH farkı (iç − dış)', unit: '—' }
      ] }
    ],
    calc: {
      title: 'Mitokondride proton itici kuvvet',
      inputs: [
        { id: 'psi', label: 'Zar potansiyeli |Δψ| (mV)', value: 150, min: 0, max: 250, step: 1 },
        { id: 'dph', label: 'pH farkı (matriks − zarlar arası)', value: 0.75, min: 0, max: 2, step: 0.05 },
        { id: 'T', label: 'Sıcaklık (°C)', value: 37, min: 0, max: 45, step: 0.5 }
      ],
      compute: (v) => {
        const k = 2.303 * 8.314 * (v.T + 273.15) / 96485 * 1000;
        return { label: 'Toplam |Δp|', value: v.psi + k * v.dph, unit: 'mV', note: `pH farkının katkısı: ${(k * v.dph).toFixed(1)} mV (37 °C'de 2,303RT/F ≈ ${k.toFixed(1)} mV). ATP sentaz ~180–200 mV ile çalışır.` };
      }
    },
    perDomain: {
      bio: 'Ökaryot hücreler zarla çevrili organellerle iş bölümü yapar; prokaryotlarda bu bölmeler yoktur. Mitokondri ve kloroplastların kendi DNA\'sı ve ribozomları vardır — endosimbiyozun kanıtı.',
      chem: 'ATP\'nin fosfoanhidrit bağları hidrolizde büyük serbest enerji verir; enerjinin kaynağı glikozun redoks tepkimeleridir (NADH → O₂ elektron aktarımı). Enzimler bu tepkimeleri birbirine bağlar (eşleşme).',
      phys: 'ATP sentaz, protonların elektrokimyasal potansiyel enerjisini mekanik dönmeye, sonra kimyasal bağ enerjisine çeviren ~10 nm\'lik bir motordur; verimi %100\'e yakındır. Zar, iki yanında yük biriken bir kapasitördür.'
    },
    sim: [
      { lab: 'affeBio', hash: '#mod2', label: '7 hücre tipi & organeller (3B)' }
    ],
    related: ['termokimya-entalpi', 'santral-dogma', 'enzim-aktivasyon', 'asit-baz-ph', 'entropi'],
    refs: [
      'Mitchell, P. (1961). Coupling of phosphorylation to electron and hydrogen transfer by a chemi-osmotic type of mechanism. Nature 191, 144–148.',
      'Abrahams, J. P., Leslie, A. G. W., Lutter, R. & Walker, J. E. (1994). Structure at 2.8 Å resolution of F1-ATPase from bovine heart mitochondria. Nature 370, 621–628.',
      'Noji, H., Yasuda, R., Yoshida, M. & Kinosita, K. (1997). Direct observation of the rotation of F1-ATPase. Nature 386, 299–302.'
    ]
  },

  {
    id: 'santral-dogma',
    title: 'Santral Dogma: DNA → mRNA → Protein',
    domain: 'bio',
    bridges: ['bio', 'chem', 'stats'],
    tags: ['DNA', 'RNA', 'protein', 'transkripsiyon', 'translasyon', 'genetik kod', 'kodon', 'Watson-Crick', 'Rosalind Franklin', 'çift sarmal'],
    summary: 'Genetik bilginin DNA\'dan RNA\'ya kopyalanması ve RNA\'daki üçlü kodonlara göre amino asitlerin dizilip proteinlerin üretilmesi.',
    intuitive: `DNA'yı bir kütüphanede saklanan, dışarı çıkarılması yasak <b>ana yemek kitabı</b> gibi düşünün. Hücre bir tarif lazım olduğunda kitabı değil, sadece o sayfanın bir <b>fotokopisini</b> (mRNA) çıkarır: buna transkripsiyon denir. Fotokopi mutfağa (ribozoma) götürülür ve tarif okunarak yemek, yani protein yapılır: translasyon. Tarif dili sadece dört harften oluşur (A, U, G, C) ve her <b>üç harf bir kelimedir</b> (kodon); her kelime bir malzemeyi (amino asit) söyler. AUG "başla", UAA "bitir" demektir. 4 harften 3'lü kelimeler 64 farklı kodon eder ama sadece 20 amino asit vardır; bu yüzden çoğu amino asidin birden fazla eş anlamlı kodonu vardır ve bu fazlalık bazı yazım hatalarını zararsız kılar. Tek bir harf hatası ise orak hücre anemisindeki gibi bütün proteini bozabilir.`,
    history: `<b>Friedrich Miescher</b> 1869'da sargı bezlerindeki iltihaptan "nüklein" (DNA) izole etti. <b>Frederick Griffith</b> 1928'de ölü bakterilerden canlılara geçen bir "dönüştürücü ilke" buldu; <b>Avery, MacLeod ve McCarty</b> 1944'te bunun DNA olduğunu gösterdi. <b>Erwin Chargaff</b> 1950'de DNA'da A = T ve G = C olduğunu ölçtü. King's College'da <b>Rosalind Franklin</b>'in 1952'de çektiği X-ışını kırınım görüntüsü "Fotoğraf 51", sarmal yapının en güçlü kanıtıydı. <b>James Watson ve Francis Crick</b> bu verilerle 1953'te çift sarmal modelini kurdu (Watson, Crick ve Wilkins 1962 Nobel; Franklin 1958'de 37 yaşında ölmüştü). Crick 1958'de bilginin DNA → RNA → protein yönünde aktığını "santral dogma" olarak ifade etti. <b>Marshall Nirenberg ve Heinrich Matthaei</b> 1961'de yapay UUU zincirinin fenilalanin zinciri ürettiğini görüp ilk kodonu çözdü; genetik kod 1966'da tamamlandı.`,
    scientists: [
      { name: 'Rosalind Franklin', year: 1952, note: 'Fotoğraf 51 — DNA\'nın X-ışını kırınımı' },
      { name: 'James Watson & Francis Crick', year: 1953, note: 'Çift sarmal modeli (1962 Nobel)' },
      { name: 'Marshall Nirenberg', year: 1961, note: 'Genetik kodun çözülmesi (1968 Nobel)' }
    ],
    formulas: [
      { tex: '\\mathrm{DNA} \\xrightarrow{\\text{transkripsiyon}} \\mathrm{mRNA} \\xrightarrow{\\text{translasyon}} \\text{protein}', desc: `Santral dogmanın bilgi akışı (retrovirüslerde ters transkripsiyon RNA → DNA da olur).`, vars: [
        { sym: '\\mathrm{mRNA}', name: 'Mesajcı RNA (genin geçici kopyası)', unit: '—' }
      ] },
      { tex: '4^3 = 64\\ \\text{kodon} \\;\\rightarrow\\; 20\\ \\text{amino asit} + 3\\ \\text{stop}', desc: `Genetik kodun kombinatoriği: üçlü kodonlar 20 amino asidi kodlamaya yeten en kısa sözcük uzunluğudur (4² = 16 yetmez).`, vars: [
        { sym: '4', name: 'Baz alfabesi (A, U/T, G, C)', unit: '—' },
        { sym: '3', name: 'Kodon uzunluğu', unit: 'nükleotit' }
      ] },
      { tex: '[\\mathrm{A}] = [\\mathrm{T}], \\qquad [\\mathrm{G}] = [\\mathrm{C}]', desc: `Chargaff kuralları: baz eşleşmesi A–T (2 hidrojen bağı) ve G–C (3 hidrojen bağı).`, vars: [
        { sym: '[\\mathrm{A}]', name: 'Adenin oranı', unit: '%' },
        { sym: '[\\mathrm{G}]', name: 'Guanin oranı', unit: '%' }
      ] },
      { tex: 'I = \\log_2 4 = 2\\ \\text{bit / baz}', desc: `Her DNA bazı en fazla 2 bit bilgi taşır.`, vars: [
        { sym: 'I', name: 'Bilgi miktarı', unit: 'bit' }
      ] }
    ],
    calc: {
      title: 'Genomun bilgi kapasitesi',
      inputs: [{ id: 'bp', label: 'Genom büyüklüğü (milyon baz çifti)', value: 3100, min: 0.5, max: 150000, step: 0.5 }],
      compute: (v) => ({ label: 'Ham bilgi', value: v.bp * 1e6 * 2 / 8 / 1e6, unit: 'MB', note: 'İnsan (~3100 Mbp) ≈ 775 MB — bir CD kadar. E. coli (4,6 Mbp) ≈ 1,2 MB. Bilgi, her hücrenin 2 metrelik DNA\'sına sığdırılmıştır.' })
    },
    perDomain: {
      bio: 'Genlerin ifade edilip edilmeyeceği (gen regülasyonu) hücre tipini belirler: aynı DNA\'ya sahip nöron ve karaciğer hücresi farklı genleri okur. Mutasyonlar evrimin ham maddesidir.',
      chem: 'DNA şeker-fosfat omurgalı bir polimerdir; bazlar hidrojen bağlarıyla eşleşir. Protein sentezi, amino asitlerin kondensasyon tepkimesiyle (peptit bağı, su çıkışı) birleşmesidir.',
      stats: 'Genetik kod bir bilgi kodlamasıdır: fazlalığı (dejenerasyon) hata toleransı sağlar. İnsanda mutasyon hızı kuşak başına baz başına ~10⁻⁸\'dir; her bebek ~70 yeni mutasyonla doğar.'
    },
    sim: [
      { lab: 'affeBio', hash: '#mod3', label: 'Gen → mRNA → protein (ribozom animasyonu)' }
    ],
    related: ['crispr-cas9', 'kimyasal-bag-vsepr', 'organik-fonksiyonel-gruplar', 'hucre-organelleri-atp', 'enzim-aktivasyon'],
    refs: [
      'Watson, J. D. & Crick, F. H. C. (1953). Molecular structure of nucleic acids. Nature 171, 737–738.',
      'Franklin, R. E. & Gosling, R. G. (1953). Molecular configuration in sodium thymonucleate. Nature 171, 740–741.',
      'Crick, F. (1970). Central dogma of molecular biology. Nature 227, 561–563.'
    ]
  },

  {
    id: 'crispr-cas9',
    title: 'CRISPR-Cas9 Gen Düzenleme',
    domain: 'bio',
    bridges: ['bio', 'chem', 'stats'],
    tags: ['CRISPR', 'Cas9', 'gen düzenleme', 'rehber RNA', 'PAM', 'Doudna', 'Charpentier', 'NHEJ', 'HDR', 'orak hücre'],
    summary: 'Bakterilerin virüslere karşı geliştirdiği bağışıklık sisteminden uyarlanan, DNA\'yı istenen noktadan kesip düzenlemeye yarayan "moleküler makas".',
    intuitive: `Bir metin editöründeki <b>"bul ve değiştir"</b> komutunu düşünün. CRISPR-Cas9 bunun DNA için olanıdır. <b>Rehber RNA</b>, aranacak 20 harflik kelimedir; <b>Cas9</b> proteini ise makastır. Cas9, rehber RNA'yı taşıyarak 3 milyar harflik genomu tarar, eşleşen yeri bulunca DNA'nın iki ipliğini birden keser. Hücre bu kesiği hemen onarmaya çalışır: aceleyle yapıştırırsa genelde birkaç harf eksik ya da fazla kalır ve gen bozulur (genin "kapatılması"); yanına doğru bir şablon verilirse onu kopyalayarak hatayı düzeltir. Bu sistemi aslında bakteriler icat etti: virüslerden kestikleri DNA parçalarını kendi genomlarında bir "sabıka kaydı" olarak saklar, aynı virüs tekrar gelince tanıyıp keserler. Doğanın 3 milyar yıllık buluşu, bugün orak hücre anemisini tedavi eden ilaçlara dönüştü.`,
    history: `1987'de Japon araştırmacı <b>Yoshizumi Ishino</b>, E. coli'de anlamı bilinmeyen tekrar eden diziler fark etti. İspanyol mikrobiyolog <b>Francisco Mojica</b> 1990'lardan 2005'e kadar bu dizileri inceledi, "CRISPR" adını verdi ve aralarındaki parçaların virüslerden geldiğini, yani bir bağışıklık hafızası olduğunu öne sürdü. 2007'de yoğurt şirketi Danisco'da <b>Rodolphe Barrangou ve Philippe Horvath</b>, yoğurt bakterisinin (Streptococcus thermophilus) faj virüslerine bu yolla direnç kazandığını deneyle kanıtladı. <b>Emmanuelle Charpentier</b> 2011'de tracrRNA'yı buldu; 2012'de <b>Jennifer Doudna</b> ile birlikte Science dergisinde Cas9'un programlanabilir bir DNA makası olarak kullanılabileceğini gösterdiler ve 2020 Nobel Kimya Ödülü'nü aldılar. 2013'te <b>Feng Zhang</b> ve <b>George Church</b> insan hücrelerinde düzenleme yaptı. 2023'te orak hücre anemisi ve β-talasemi için ilk CRISPR tedavisi (Casgevy) onaylandı.`,
    scientists: [
      { name: 'Francisco Mojica', year: 2005, note: 'CRISPR\'ın bakteriyel bağışıklık olduğunu öne sürdü' },
      { name: 'Jennifer Doudna & Emmanuelle Charpentier', year: 2012, note: 'Programlanabilir Cas9 makası (2020 Nobel)' },
      { name: 'Feng Zhang', year: 2013, note: 'Memeli hücrelerinde CRISPR düzenleme' }
    ],
    formulas: [
      { tex: 'E[\\text{rastgele}] \\approx 2G\\cdot 4^{-(L+2)}', desc: `L harflik rehber + NGG PAM dizisinin, G büyüklüğündeki genomda (iki iplik) rastlantısal tam eşleşme beklentisi.`, vars: [
        { sym: 'G', name: 'Genom büyüklüğü', unit: 'baz çifti', value: '3,1 × 10⁹ (insan)' },
        { sym: 'L', name: 'Rehber RNA uzunluğu', unit: 'nükleotit', value: '20' },
        { sym: '2', name: 'PAM\'deki sabit GG bazları (+2) ve iki iplik (×2)', unit: '—' }
      ] },
      { tex: 'P(\\text{frameshift}) \\approx \\tfrac{2}{3}', desc: `NHEJ onarımında oluşan rastgele ekleme/silmenin 3'ün katı olmama olasılığı — okuma çerçevesi kayar, gen genellikle işlevsizleşir.`, vars: [
        { sym: 'P', name: 'Çerçeve kayması olasılığı', unit: '—' }
      ] },
      { tex: '\\text{kesim} = \\text{PAM} - 3\\ \\mathrm{bp}', desc: `Cas9, PAM (5′-NGG-3′) dizisinin 3 baz yukarısından küt uçlu çift iplik kesiği yapar.`, vars: [
        { sym: '\\text{PAM}', name: 'Protospacer komşu motifi (NGG)', unit: '—' }
      ] }
    ],
    calc: {
      title: 'Rehber RNA özgüllüğü',
      inputs: [
        { id: 'L', label: 'Rehber uzunluğu L (nt)', value: 20, min: 8, max: 24, step: 1 },
        { id: 'G', label: 'Genom (milyon bp)', value: 3100, min: 1, max: 20000, step: 1 }
      ],
      compute: (v) => ({ label: 'Beklenen rastgele tam eşleşme', value: 2 * v.G * 1e6 * Math.pow(4, -(v.L + 2)), unit: 'adet', note: '1\'in çok altındaysa rehber genomda tek hedeflidir. 12 nt\'lik bir rehber insanda yüzlerce yerde keserdi! (Gerçekte uyumsuzluklu hedef dışı kesimler de olur.)' })
    },
    perDomain: {
      bio: 'Genlerin işlevini araştırmak (knock-out), hastalık modelleri kurmak, kuraklığa dayanıklı bitkiler ve gen tedavileri (orak hücre, β-talasemi) için kullanılır. Embriyo düzenlemesi ciddi etik tartışmalara yol açmıştır (2018 He Jiankui vakası).',
      chem: 'Rehber RNA ile hedef DNA arasında Watson–Crick baz eşleşmesi, Cas9\'un iki nükleaz bölgesi (HNH ve RuvC) ise her bir ipliğin fosfodiester bağını hidrolizle keser.',
      stats: 'Hedef seçimi olasılık hesabıdır: rehber uzunluğu ve uyumsuzluk toleransı hedef dışı riskini belirler. Düzenleme verimi ve mozaiklik, hücre popülasyonunda dağılımlarla ölçülür.'
    },
    sim: [
      { lab: 'affeBio', hash: '#mod3', label: 'CRISPR-Cas9 lab (orak hücre senaryosu)' }
    ],
    related: ['santral-dogma', 'enzim-aktivasyon', 'hucre-organelleri-atp'],
    refs: [
      'Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A. & Charpentier, E. (2012). A programmable dual-RNA–guided DNA endonuclease in adaptive bacterial immunity. Science 337, 816–821.',
      'Barrangou, R. ve ark. (2007). CRISPR provides acquired resistance against viruses in prokaryotes. Science 315, 1709–1712.',
      'Mojica, F. J. M. ve ark. (2005). Intervening sequences of regularly spaced prokaryotic repeats derive from foreign genetic elements. Journal of Molecular Evolution 60, 174–182.'
    ]
  },

  {
    id: 'hodgkin-huxley-noron',
    title: 'Hodgkin–Huxley Modeli ve Nöron Aksiyon Potansiyeli',
    domain: 'bio',
    bridges: ['bio', 'phys', 'chem'],
    tags: ['nöron', 'aksiyon potansiyeli', 'iyon kanalı', 'Nernst', 'Hodgkin-Huxley', 'mürekkep balığı aksonu', 'voltaj kenetleme', 'sodyum', 'potasyum'],
    summary: 'Sinir hücrelerinin, iyon kanallarının açılıp kapanmasıyla oluşan milisaniyelik elektrik darbeleriyle (aksiyon potansiyeli) nasıl haberleştiği.',
    intuitive: `Bir nöron, zarının iki yanında farklı iyon yoğunlukları tutan minicik bir <b>pildir</b>: içerisi dışarıya göre ~−70 mV negatiftir. Zarın üzerinde kapıları olan kanallar vardır. Bir uyarı gelip voltaj belli bir eşiği aşınca önce <b>sodyum kapıları</b> açılır; Na⁺ iyonları içeri hücum eder ve içerisi bir anda pozitifleşir (+40 mV). Hemen ardından sodyum kapıları kilitlenir, <b>potasyum kapıları</b> açılır; K⁺ dışarı çıkar ve voltaj eski hâline, hatta biraz altına iner. Bütün bu inip çıkış ~1–2 milisaniye sürer. Bu darbe aksonu boyunca bir <b>domino dizisi</b> gibi yayılır: her bölge komşusunu tetikler. Ya hep ya hiç kuralı geçerlidir: eşik aşılırsa tam boy bir darbe olur, aşılmazsa hiç olmaz. Beyninizin "dili", bu darbelerin zamanlaması ve sıklığıdır.`,
    history: `<b>Luigi Galvani</b> 1791'de ölü kurbağa bacaklarının metal temasıyla seğirdiğini gördü ve "hayvansal elektrik" kavramını ortaya attı. <b>Emil du Bois-Reymond</b> 1843'te sinirde ilerleyen elektrik dalgasını (aksiyon potansiyeli) ölçtü. <b>Julius Bernstein</b> 1902'de dinlenim potansiyelinin potasyum geçirgen bir zardan kaynaklandığını öne sürdü. <b>Alan Hodgkin ve Andrew Huxley</b>, 1 mm çapındaki dev <b>mürekkep balığı aksonunun</b> içine ince bir tel sokarak voltajı ölçebildiler (1939). II. Dünya Savaşı ara verdirdi; 1949–52'de Cole ve Marmont'un geliştirdiği <b>voltaj kenetleme</b> tekniğiyle Na⁺ ve K⁺ akımlarını ayrı ayrı ölçtüler. Hesapları mekanik bir el hesap makinesiyle haftalar sürdü; ama modelleri gerçek aksiyon potansiyelinin şeklini ve hızını kusursuz öngördü (1963 Nobel, Eccles ile). <b>Neher ve Sakmann</b> 1976'da tek bir iyon kanalının akımını ölçen patch clamp'i (1991 Nobel), <b>Roderick MacKinnon</b> 1998'de potasyum kanalının atomik yapısını (2003 Nobel) ortaya koydu.`,
    scientists: [
      { name: 'Alan Hodgkin & Andrew Huxley', year: 1952, note: 'Aksiyon potansiyelinin iyonik modeli (1963 Nobel)' },
      { name: 'Luigi Galvani', year: 1791, note: 'Hayvansal elektrik' },
      { name: 'Erwin Neher & Bert Sakmann', year: 1976, note: 'Tek kanal ölçümü — patch clamp (1991 Nobel)' }
    ],
    formulas: [
      { tex: 'E_{\\text{ion}} = \\frac{RT}{zF}\\ln\\frac{[\\text{ion}]_{\\text{out}}}{[\\text{ion}]_{\\text{in}}}', desc: `Nernst denklemi: bir iyonun zar boyunca dengede olduğu gerilim (K⁺ ≈ −90 mV, Na⁺ ≈ +60 mV).`, vars: [
        { sym: 'E_{\\text{ion}}', name: 'Denge (Nernst) potansiyeli', unit: 'mV' },
        { sym: 'R', name: 'Gaz sabiti', unit: 'J/(mol·K)', value: '8,314' },
        { sym: 'T', name: 'Mutlak sıcaklık', unit: 'K' },
        { sym: 'z', name: 'İyon değerliği (K⁺: +1)', unit: '—' },
        { sym: 'F', name: 'Faraday sabiti', unit: 'C/mol', value: '96 485' },
        { sym: '[\\text{ion}]', name: 'Hücre dışı/içi iyon derişimi', unit: 'mM' }
      ] },
      { tex: 'C_m\\frac{dV}{dt} = I - \\bar g_{\\mathrm{Na}} m^3 h\\,(V - E_{\\mathrm{Na}}) - \\bar g_{\\mathrm{K}} n^4 (V - E_{\\mathrm{K}}) - g_L (V - E_L)', desc: `Hodgkin–Huxley zar denklemi: zar bir kapasitör, iyon kanalları değişken iletkenliklerdir; m, h, n kapı değişkenleridir.`, vars: [
        { sym: 'C_m', name: 'Zar kapasitansı', unit: 'µF/cm²', value: '1' },
        { sym: 'V', name: 'Zar gerilimi', unit: 'mV' },
        { sym: '\\bar g_{\\mathrm{Na}}, \\bar g_{\\mathrm{K}}', name: 'En büyük Na⁺ ve K⁺ iletkenlikleri', unit: 'mS/cm²', value: '120 ve 36' },
        { sym: 'm, h, n', name: 'Kanal kapısı açık olma olasılıkları', unit: '—' },
        { sym: 'I', name: 'Uygulanan akım', unit: 'µA/cm²' }
      ] },
      { tex: 'V_m = \\frac{RT}{F}\\ln\\frac{P_K[\\mathrm{K^+}]_o + P_{Na}[\\mathrm{Na^+}]_o + P_{Cl}[\\mathrm{Cl^-}]_i}{P_K[\\mathrm{K^+}]_i + P_{Na}[\\mathrm{Na^+}]_i + P_{Cl}[\\mathrm{Cl^-}]_o}', desc: `Goldman–Hodgkin–Katz denklemi: birden çok iyona geçirgen zarın dinlenim potansiyeli (≈ −70 mV).`, vars: [
        { sym: 'P_K, P_{Na}, P_{Cl}', name: 'İyon geçirgenlikleri (dinlenimde 1 : 0,04 : 0,45)', unit: '—' }
      ] }
    ],
    calc: {
      title: 'Nernst potansiyeli',
      inputs: [
        { id: 'out', label: 'Hücre dışı derişim (mM)', value: 5, min: 0.1, max: 500, step: 0.1 },
        { id: 'inn', label: 'Hücre içi derişim (mM)', value: 140, min: 0.1, max: 500, step: 0.1 },
        { id: 'z', label: 'Değerlik z', value: 1, min: -2, max: 2, step: 1 },
        { id: 'T', label: 'Sıcaklık (°C)', value: 37, min: 0, max: 45, step: 0.5 }
      ],
      compute: (v) => {
        const z = v.z === 0 ? 1 : v.z;
        return { label: 'Denge potansiyeli E', value: 8.314 * (v.T + 273.15) / (z * 96485) * Math.log(v.out / v.inn) * 1000, unit: 'mV', note: 'K⁺: 5/140 mM → ≈ −89 mV. Na⁺ için 145/12 mM girin → ≈ +67 mV.' };
      }
    },
    perDomain: {
      bio: 'Aksiyon potansiyelleri duyu, hareket ve düşüncenin taşıyıcısıdır. Miyelin kılıfı iletimi 100 m/s\'ye çıkarır; multipl skleroz bu kılıfı bozar. Lokal anestezikler ve bazı zehirler (tetrodotoksin) sodyum kanallarını tıkar.',
      phys: 'Nöron zarı paralel bağlı bir RC devresidir: zar kapasitör, kanallar değişken dirençler, iyon gradyanları pillerdir. Kablo denklemi, sinyalin akson boyunca yayılmasını açıklar.',
      chem: 'Na⁺/K⁺ pompası her döngüde ATP harcayarak 3 Na⁺\'yi dışarı, 2 K⁺\'yi içeri taşır ve gradyanı korur; beyin enerjisinin büyük kısmı buna gider. Nernst potansiyeli elektrokimyasal dengenin ifadesidir.'
    },
    sim: [
      { lab: 'affeBio', hash: '#mod4', label: 'Nöron aksiyon potansiyeli (osiloskop)' },
      { lab: 'affePhysics', hash: '#mod4', label: 'Elektromanyetizma & devreler' }
    ],
    related: ['insan-anatomisi', 'hucre-organelleri-atp', 'kimyasal-denge', 'lotka-volterra'],
    refs: [
      'Hodgkin, A. L. & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. Journal of Physiology 117, 500–544.',
      'Neher, E. & Sakmann, B. (1976). Single-channel currents recorded from membrane of denervated frog muscle fibres. Nature 260, 799–802.',
      'Doyle, D. A. ve ark. (1998). The structure of the potassium channel. Science 280, 69–77.'
    ]
  },

  {
    id: 'lotka-volterra',
    title: 'Lotka–Volterra Av–Avcı Dinamiği',
    domain: 'bio',
    bridges: ['bio', 'stats'],
    tags: ['av-avcı', 'popülasyon dinamiği', 'ekoloji', 'diferansiyel denklem', 'Volterra', 'vaşak-tavşan', 'salınım', 'denge noktası', 'RK4'],
    summary: 'Av ve avcı nüfuslarının birbirini besleyip sınırlayarak döngüsel olarak inip çıktığını gösteren ekolojinin ilk matematiksel modeli.',
    intuitive: `Bir ormanda tavşanlar ve vaşaklar yaşasın. Tavşan çok olunca vaşaklar bol yemek bulur, çoğalır. Ama çok vaşak çok tavşan yer; tavşanlar azalır. Yemek azalınca vaşaklar aç kalır, sayıları düşer. Avcı azalınca tavşanlar yeniden çoğalır… ve döngü baştan başlar. İki nüfus bir <b>salıncakta oturan iki çocuk</b> gibi birbirini iter çeker: av zirve yaptıktan bir süre sonra avcı zirve yapar. Lotka–Volterra denklemleri bu hikâyeyi iki basit cümleye çevirir: "Av kendi kendine çoğalır ama avcıyla karşılaştıkça azalır" ve "Avcı ancak av yedikçe çoğalır, yoksa ölür." Şaşırtıcı bir sonuç: avcıları biraz avlamak (ya da bir ilaçla her iki türü de azaltmak) uzun vadede <b>avın ortalamasını artırabilir</b> — Volterra'nın balıkçılık bulmacasının çözümü budur.`,
    history: `Amerikalı matematikçi-kimyager <b>Alfred Lotka</b> 1910'da bu denklemleri ilk kez salınımlı kimyasal tepkimeler için yazdı, 1925'te kitabı <i>Elements of Physical Biology</i>'de biyolojiye uyguladı. İtalyan matematikçi <b>Vito Volterra</b>'ya damadı, deniz biyoloğu <b>Umberto D'Ancona</b> bir bulmaca getirmişti: I. Dünya Savaşı sırasında Adriyatik'te balıkçılık azaldığında Trieste ve Fiume balık hallerinde köpekbalığı gibi avcı balıkların oranı artmıştı. Volterra 1926'da aynı denklemleri bağımsız olarak türetip olayı açıkladı. Rus ekolojist <b>Georgy Gause</b> 1934'te Paramecium ve Didinium ile laboratuvarda av-avcı döngülerini test etti. En ünlü veri seti, <b>Hudson's Bay Company</b>'nin 1845–1935 arasında satın aldığı vaşak ve kar tavşanı kürk kayıtlarıdır; ~10 yıllık döngüler <b>Charles Elton</b> (1924) ve MacLulich (1937) tarafından incelendi.`,
    scientists: [
      { name: 'Alfred Lotka', year: 1925, note: 'Elements of Physical Biology' },
      { name: 'Vito Volterra', year: 1926, note: 'Adriyatik balıkçılık bulmacası' },
      { name: 'Georgy Gause', year: 1934, note: 'Laboratuvarda rekabet ve av-avcı deneyleri' }
    ],
    formulas: [
      { tex: '\\frac{dx}{dt} = \\alpha x - \\beta xy, \\qquad \\frac{dy}{dt} = \\delta xy - \\gamma y', desc: `Av (x) ve avcı (y) nüfuslarının değişim hızları.`, vars: [
        { sym: 'x', name: 'Av nüfusu', unit: 'birey' },
        { sym: 'y', name: 'Avcı nüfusu', unit: 'birey' },
        { sym: '\\alpha', name: 'Avın doğal artış hızı', unit: '1/yıl' },
        { sym: '\\beta', name: 'Avlanma (karşılaşma) katsayısı', unit: '1/(birey·yıl)' },
        { sym: '\\delta', name: 'Avın avcı üremesine dönüşüm katsayısı', unit: '1/(birey·yıl)' },
        { sym: '\\gamma', name: 'Avcının ölüm hızı', unit: '1/yıl' }
      ] },
      { tex: 'x^* = \\frac{\\gamma}{\\delta}, \\qquad y^* = \\frac{\\alpha}{\\beta}', desc: `Denge (sabit) noktası: döngüler bu noktanın etrafında döner; ortalama nüfuslar tam bu değerlerdir.`, vars: [
        { sym: 'x^*', name: 'Denge av sayısı', unit: 'birey' },
        { sym: 'y^*', name: 'Denge avcı sayısı', unit: 'birey' }
      ] },
      { tex: 'V(x,y) = \\delta x - \\gamma\\ln x + \\beta y - \\alpha\\ln y = \\text{sabit}', desc: `Korunan nicelik: her başlangıç durumu kapalı bir yörünge (sonsuz tekrar eden döngü) çizer.`, vars: [
        { sym: 'V', name: 'Lyapunov / korunan fonksiyon', unit: '—' }
      ] },
      { tex: 'T \\approx \\frac{2\\pi}{\\sqrt{\\alpha\\gamma}}', desc: `Denge yakınındaki küçük salınımların periyodu.`, vars: [
        { sym: 'T', name: 'Döngü periyodu', unit: 'yıl' }
      ] }
    ],
    calc: {
      title: 'Denge noktası ve döngü periyodu',
      inputs: [
        { id: 'a', label: 'α — av artış hızı', value: 1.1, min: 0.05, max: 3, step: 0.05 },
        { id: 'b', label: 'β — avlanma katsayısı', value: 0.4, min: 0.01, max: 2, step: 0.01 },
        { id: 'g', label: 'γ — avcı ölüm hızı', value: 0.4, min: 0.05, max: 3, step: 0.05 },
        { id: 'd', label: 'δ — dönüşüm katsayısı', value: 0.1, min: 0.01, max: 2, step: 0.01 }
      ],
      compute: (v) => ({ label: 'Denge av sayısı x*', value: v.g / v.d, unit: 'birey', note: `Denge avcı sayısı y* = ${(v.a / v.b).toFixed(2)} · küçük salınım periyodu T ≈ ${(2 * Math.PI / Math.sqrt(v.a * v.g)).toFixed(2)} zaman birimi. γ'yı artırın (avcıları avlayın): x* artar!` })
    },
    perDomain: {
      bio: 'Model, besin ağlarının, salgınların (SIR modelleri) ve konak–parazit ilişkilerinin atasıdır. Gerçek ekosistemlerde taşıma kapasitesi, sığınaklar ve rastlantı döngüleri sönümler ya da bozar.',
      stats: 'Gerçek nüfus sayımları gürültülüdür; parametreler veriden (ör. vaşak-tavşan kürk kayıtları) en küçük kareler veya Bayesçi yöntemlerle kestirilir. Küçük nüfuslarda rastlantısal (stokastik) modeller tükenme olasılığını verir.'
    },
    sim: [
      { lab: 'affeBio', hash: '#mod4', label: 'Av–avcı (RK4) simülasyonu' },
      { lab: 'affeStats', hash: '#mod6', label: 'Monte Carlo & stokastik süreçler' }
    ],
    related: ['ustel-buyume-bozunma', 'kaos-cift-sarkac', 'monte-carlo-markov', 'hodgkin-huxley-noron'],
    refs: [
      'Lotka, A. J. (1925). Elements of Physical Biology. Baltimore: Williams & Wilkins.',
      'Volterra, V. (1926). Fluctuations in the abundance of a species considered mathematically. Nature 118, 558–560.',
      'Gause, G. F. (1934). The Struggle for Existence. Baltimore: Williams & Wilkins.'
    ]
  }
]);
