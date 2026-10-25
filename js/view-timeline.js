/* ============================================================================
   scienceWiki — Modül 4: Bilim Tarihi Zaman Çizelgesi & "Büyük Deneyler" Müzesi
   5 paralel bilim şeridi (Kimya · Fizik · Biyoloji · İstatistik · Uzay); dönem
   bantları; tekerlekle yakınlaştırma, sürükleyerek kaydırma; olaya tıklayınca
   ayrıntı kartı + aynı dönemde diğer bilimlerde neler olduğu.
   Rota: #/timeline/<olay-id>. Dar ekranda dikey liste görünümüne geçer.
   ============================================================================ */
(function () {
  'use strict';
  const SW = window.SW;

  // y: yıl (MÖ için negatif) · d: alan · t: başlık · p: kişi · desc · exp: büyük deney · art/lab/hash: bağlantılar
  const EVENTS = [
    // ---------------- ANTİK ÇAĞ ----------------
    { id: 'thales-tutulma', y: -585, d: 'space', t: 'Güneş tutulmasının öngörüsü', p: 'Thales', desc: 'Herodot\'a göre Thales, MÖ 585\'teki Güneş tutulmasını önceden bildirdi; gök olaylarının doğal nedenlerle açıklanabileceği fikrinin simgesi.' },
    { id: 'pisagor-harmoni', y: -530, d: 'phys', t: 'Tellerin matematiksel uyumu', p: 'Pisagor', desc: 'Telin uzunluğu yarıya inince sesin bir oktav yükseldiğini fark etti: doğanın sayılarla ifade edilebileceğinin ilk örneklerinden.' },
    { id: 'demokritos-atom', y: -400, d: 'chem', t: '"Atomos": bölünemeyen parçacık', p: 'Demokritos', desc: 'Maddenin boşlukta hareket eden bölünemez parçacıklardan oluştuğunu öne sürdü — 2.200 yıl sonra Dalton bu fikri bilimsel kuram yapacaktı.', art: 'atom' },
    { id: 'aristoteles-biyoloji', y: -350, d: 'bio', t: 'Canlıların sınıflandırılması', p: 'Aristoteles', desc: 'Yüzlerce hayvanı gözlemleyip "doğa merdiveni" sınıflandırmasını yaptı; deniz canlılarının üremesi üzerine ilk sistematik gözlemler.' },
    { id: 'arsimet', y: -250, d: 'phys', t: 'Kaldırma kuvveti ilkesi', p: 'Arşimet', desc: 'Sıvıya batırılan cisme, yerini değiştirdiği sıvının ağırlığı kadar kaldırma kuvveti etki eder.', exp: 'Kral Hieron\'un tacının saf altın olup olmadığını, tacın ve eşit kütleli altının taşırdığı su hacimlerini karşılaştırarak bulduğu anlatılır — "Evreka!"' },
    { id: 'eratosthenes', y: -240, d: 'space', t: 'Dünya\'nın çevresinin ölçülmesi', p: 'Eratosthenes', desc: 'Dünya\'nın çevresini ~40.000 km olarak, yüzde birkaçlık hatayla hesapladı.', exp: 'Yaz gündönümü öğlesinde Siene\'de kuyuya dik düşen güneş ışığının İskenderiye\'de 7,2° (bir çemberin 1/50\'si) açıyla geldiğini ölçtü; iki şehir arası uzaklığı 50 ile çarptı.', art: 'gunes-sistemi-kepler' },
    { id: 'hipparkos', y: -130, d: 'space', t: 'Yıldız kataloğu ve presesyon', p: 'Hipparkos', desc: '~850 yıldızlık katalog hazırladı, parlaklık (kadir) ölçeğini tanımladı ve ekinoksların kaymasını (presesyon) keşfetti.' },
    { id: 'batlamyus', y: 150, d: 'space', t: 'Almagest', p: 'Batlamyus', desc: 'Yer merkezli evren modelini episikllerle matematikleştirdi; 1.400 yıl boyunca standart astronomi kitabı oldu.' },
    { id: 'galen', y: 170, d: 'bio', t: 'Deneysel fizyoloji', p: 'Galen', desc: 'Hayvan disseksiyonlarıyla sinirlerin ve atardamarların işlevini inceledi; tıbbı yüzyıllarca etkiledi.' },
    // ---------------- İSLAM ALTIN ÇAĞI & ORTA ÇAĞ ----------------
    { id: 'cabir-damitma', y: 800, d: 'chem', t: 'Damıtma ve kristalleştirme', p: 'Câbir bin Hayyân', desc: 'Damıtma, süblimleşme, kristalleştirme gibi laboratuvar yöntemlerini sistemleştirdi; kimyanın "babası" olarak anılır.' },
    { id: 'harezmi-cebir', y: 820, d: 'stats', t: 'Cebir (el-Cebr)', p: 'Harezmî', desc: '"el-Kitâbü\'l-Muhtasar fî Hisâbi\'l-Cebr ve\'l-Mukâbele" ile denklemlerin sistematik çözümünü kurdu; "algoritma" kelimesi onun adından gelir.' },
    { id: 'kindi-frekans', y: 850, d: 'stats', t: 'Frekans analizi', p: 'El-Kindî', desc: 'Şifreli metinleri harf sıklıklarını sayarak çözdü — istatistiksel çıkarımın bilinen ilk uygulamalarından.' },
    { id: 'ibnulheysem-optik', y: 1021, d: 'phys', t: 'Kitâbü\'l-Menâzır (Optik)', p: 'İbnü\'l-Heysem', desc: 'Görmenin gözden çıkan ışınlarla değil, cisimlerden göze gelen ışıkla olduğunu deneyle gösterdi; bilimsel yöntemin öncülerinden.', exp: 'Karanlık bir odada (camera obscura) küçük delikten giren ışığın ters görüntü oluşturduğunu ve ışığın doğrusal yayıldığını mumlarla gösterdi.', lab: 'affePhysics', hash: '#mod1' },
    { id: 'ibnsina-kanun', y: 1025, d: 'bio', t: 'El-Kânûn fi\'t-Tıb', p: 'İbn Sînâ', desc: 'Tıp Kanunu, Avrupa üniversitelerinde 600 yıl ders kitabı oldu; klinik deneyler ve bulaşıcı hastalıklar üzerine ilkeler içerir.', lab: 'affeBio', hash: '#mod1' },
    { id: 'biruni-yaricap', y: 1037, d: 'space', t: 'Dünya yarıçapının ölçümü', p: 'Bîrûnî', desc: 'Bir dağın tepesinden ufka bakış açısını ölçerek Dünya\'nın yarıçapını ~6.340 km olarak buldu (gerçek: 6.371 km).' },
    { id: 'hayyam-takvim', y: 1079, d: 'space', t: 'Celâlî takvimi', p: 'Ömer Hayyam', desc: 'Yıl uzunluğunu 365,24219858 gün olarak hesapladı; Gregoryen takviminden daha hassas bir takvim.' },
    { id: 'ibnunnefis', y: 1242, d: 'bio', t: 'Küçük (akciğer) dolaşım', p: 'İbnü\'n-Nefîs', desc: 'Kanın kalbin sağından akciğerlere gidip sol tarafa döndüğünü, Harvey\'den 400 yıl önce tanımladı.' },
    { id: 'ulugbey-zic', y: 1437, d: 'space', t: 'Zîc-i Sultânî', p: 'Uluğ Bey', desc: 'Semerkant rasathanesinde 1.018 yıldızın konumunu ölçtü; Tycho öncesinin en hassas kataloğu.' },
    // ---------------- RÖNESANS & BİLİMSEL DEVRİM ----------------
    { id: 'kopernik', y: 1543, d: 'space', t: 'Güneş merkezli evren', p: 'Nikolaus Kopernik', desc: '"De revolutionibus orbium coelestium" Dünya\'yı evrenin merkezinden çıkardı.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'vesalius', y: 1543, d: 'bio', t: 'De humani corporis fabrica', p: 'Andreas Vesalius', desc: 'İnsan kadavralarını bizzat inceleyerek modern anatominin temelini attı ve Galen\'in hatalarını düzeltti.', art: 'insan-anatomisi', lab: 'affeBio', hash: '#mod1' },
    { id: 'cardano', y: 1564, d: 'stats', t: 'Şans oyunları üzerine kitap', p: 'Gerolamo Cardano', desc: '"Liber de Ludo Aleae" ile zar olasılıklarını ilk kez sistematik hesapladı.', lab: 'affeStats', hash: '#mod8' },
    { id: 'takiyuddin', y: 1577, d: 'space', t: 'İstanbul Rasathanesi', p: 'Takiyüddin', desc: 'Dönemin en gelişmiş gözlemevlerinden birini kurdu; mekanik saatlerle astronomik zaman ölçümü yaptı.' },
    { id: 'tycho-supernova', y: 1572, d: 'space', t: 'Yeni yıldız (SN 1572)', p: 'Tycho Brahe', desc: 'Paralaks ölçmeye çalışıp bulamayınca "yeni yıldızın" Ay\'ın ötesinde olduğunu gösterdi: gökler değişmez değildi.', art: 'yildiz-evrimi-hr' },
    { id: 'galileo-egik', y: 1604, d: 'phys', t: 'Serbest düşme yasası', p: 'Galileo Galilei', desc: 'Düşen cisimlerin aldığı yolun zamanın karesiyle arttığını gösterdi.', exp: 'Eğik düzlemden yuvarlanan topların aldığı yolu su saatiyle ölçerek hareketi "yavaşlattı" — mesafeler 1:4:9:16 oranında arttı.' },
    { id: 'kepler-yasalari', y: 1609, d: 'space', t: 'Gezegen hareketi yasaları', p: 'Johannes Kepler', desc: 'Tycho\'nun Mars verilerinden yörüngelerin elips olduğunu buldu (1. ve 2. yasa; 3. yasa 1619).', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'galileo-teleskop', y: 1610, d: 'space', t: 'Teleskopla ilk gözlemler', p: 'Galileo Galilei', desc: 'Jüpiter\'in 4 uydusunu, Venüs\'ün evrelerini ve Ay\'ın dağlarını gördü — Kopernik modelinin güçlü kanıtları.', lab: 'affeSpace', hash: '#mod3' },
    { id: 'harvey-dolasim', y: 1628, d: 'bio', t: 'Kan dolaşımı', p: 'William Harvey', desc: 'Kalbin pompaladığı kan miktarını hesaplayarak kanın vücutta sürekli dolaştığını kanıtladı.', exp: 'Kolu bağlayıp damarlardaki kapakçıkların kanı yalnızca kalbe doğru akıttığını gösterdi; kalbin saatte vücut ağırlığından fazla kan pompaladığını hesapladı.', lab: 'affeBio', hash: '#mod1' },
    { id: 'pascal-fermat', y: 1654, d: 'stats', t: 'Olasılık kuramının doğuşu', p: 'Blaise Pascal & Pierre de Fermat', desc: 'Yarıda kalan bir oyunda bahsin adil paylaşımı ("puanlar problemi") üzerine mektuplaşmalarıyla olasılık kuramını kurdular.', lab: 'affeStats', hash: '#mod8' },
    { id: 'graunt', y: 1662, d: 'stats', t: 'Ölüm tabloları', p: 'John Graunt', desc: 'Londra\'nın haftalık ölüm kayıtlarını analiz ederek demografi ve istatistiğin ilk örneklerini verdi.' },
    { id: 'boyle', y: 1662, d: 'chem', t: 'Boyle yasası (PV = sabit)', p: 'Robert Boyle', desc: 'Sabit sıcaklıkta gazın basıncıyla hacminin ters orantılı olduğunu J biçimli tüple gösterdi; "Kuşkucu Kimyager" ile simyadan kimyaya geçiş.' },
    { id: 'hooke-hucre', y: 1665, d: 'bio', t: 'Micrographia: "hücre"', p: 'Robert Hooke', desc: 'Mantar kesitinde gördüğü odacıklara "cell" (hücre) adını verdi.', art: 'hucre-organelleri-atp', lab: 'affeBio', hash: '#mod2' },
    { id: 'newton-prizma', y: 1672, d: 'phys', t: 'Beyaz ışık renklerin karışımıdır', p: 'Isaac Newton', desc: 'Prizmayla ayrışan renklerin ikinci prizmada yeniden beyaz ışık oluşturduğunu gösterdi.', exp: '"Experimentum crucis": tek bir rengi ikinci prizmadan geçirdi; renk değişmedi — renkler ışığın kendisinde vardı.' },
    { id: 'leeuwenhoek', y: 1676, d: 'bio', t: 'Mikroorganizmaların keşfi', p: 'Antonie van Leeuwenhoek', desc: 'Kendi yaptığı tek mercekli mikroskopla bakterileri ve protistleri ("hayvancıklar") ilk gören kişi oldu.', lab: 'affeBio', hash: '#mod2' },
    { id: 'newton-principia', y: 1687, d: 'phys', t: 'Principia: hareket ve kütleçekim', p: 'Isaac Newton', desc: 'Üç hareket yasası ve evrensel kütleçekim yasası — gökle yeryüzünün aynı fizikle işlediğini gösterdi.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    // ---------------- AYDINLANMA ----------------
    { id: 'halley', y: 1705, d: 'space', t: 'Kuyruklu yıldızın dönüşü', p: 'Edmond Halley', desc: 'Newton\'un yasalarıyla 1531, 1607 ve 1682 kuyrukluyıldızlarının aynı cisim olduğunu ve 1758\'de döneceğini öngördü — ve döndü.', lab: 'affeSpace', hash: '#mod8' },
    { id: 'bernoulli-bsy', y: 1713, d: 'stats', t: 'Büyük Sayılar Yasası', p: 'Jacob Bernoulli', desc: '"Ars Conjectandi": deneme sayısı arttıkça gözlenen oranın gerçek olasılığa yakınsadığını kanıtladı.', lab: 'affeStats', hash: '#mod1' },
    { id: 'demoivre-normal', y: 1733, d: 'stats', t: 'Normal eğrinin ilk biçimi', p: 'Abraham de Moivre', desc: 'Binom dağılımına çan biçimli eğriyle yaklaştı — Merkezi Limit Teoremi\'nin ilk hali.', lab: 'affeStats', hash: '#mod1' },
    { id: 'linnaeus', y: 1735, d: 'bio', t: 'Systema Naturae', p: 'Carl Linnaeus', desc: 'İki adlı adlandırma (Homo sapiens gibi) ve hiyerarşik sınıflandırma sistemi.' },
    { id: 'franklin-ucurtma', y: 1752, d: 'phys', t: 'Şimşek elektriktir', p: 'Benjamin Franklin', desc: 'Şimşeğin elektriksel bir boşalma olduğunu gösterdi ve paratoneri icat etti.', exp: 'Fırtınada uçurtma ipine bağlı anahtardan kıvılcım alarak Leyden şişesini doldurdu (tehlikeli bir deney!).' },
    { id: 'bayes', y: 1763, d: 'stats', t: 'Bayes teoremi', p: 'Thomas Bayes', desc: 'Ölümünden sonra Richard Price tarafından yayımlanan makale: yeni kanıtla inançların nasıl güncelleneceği.', lab: 'affeStats', hash: '#mod4' },
    { id: 'lavoisier', y: 1789, d: 'chem', t: 'Kütlenin korunumu & modern kimya', p: 'Antoine Lavoisier', desc: '"Hiçbir şey yoktan var olmaz, var olan yok olmaz"; oksijenin yanmadaki rolünü ve elementlerin modern listesini verdi.', exp: 'Kapalı kaplarda kalayı ve cıvayı ısıtıp hassas terazilerle tartarak, tepkimeden önce ve sonra toplam kütlenin değişmediğini gösterdi.', lab: 'affeLab' },
    { id: 'herschel-uranus', y: 1781, d: 'space', t: 'Uranüs\'ün keşfi', p: 'William Herschel', desc: 'Teleskopla keşfedilen ilk gezegen; Güneş Sistemi\'nin bilinen boyutunu iki katına çıkardı.', lab: 'affeSpace', hash: '#mod8' },
    { id: 'coulomb', y: 1785, d: 'phys', t: 'Elektrik kuvveti yasası', p: 'Charles-Augustin de Coulomb', desc: 'Yükler arasındaki kuvvetin uzaklığın karesiyle azaldığını burulma terazisiyle ölçtü.' },
    { id: 'jenner-asi', y: 1796, d: 'bio', t: 'İlk aşı (çiçek)', p: 'Edward Jenner', desc: 'İnek çiçeği aşısıyla çiçek hastalığına karşı bağışıklık sağladı; 1980\'de çiçek dünyadan silindi.' },
    { id: 'cavendish-g', y: 1798, d: 'phys', t: 'Dünya\'yı tartmak', p: 'Henry Cavendish', desc: 'Kütleçekim sabiti G\'yi dolaylı olarak ölçerek Dünya\'nın yoğunluğunu (~5,45 g/cm³) buldu.', exp: 'Burulma terazisinde küçük kurşun küreleri büyük kürelerin çekimiyle döndürüp milimetrik sapmayı dürbünle ölçtü — dışarıdan, ayrı bir odadan.', lab: 'affeSpace', hash: '#mod8' },
    // ---------------- 19. YÜZYIL ----------------
    { id: 'young-cift-yarik', y: 1801, d: 'phys', t: 'Işığın dalga doğası', p: 'Thomas Young', desc: 'Işığın girişim yaptığını göstererek dalga kuramını destekledi.', exp: 'Çift yarık deneyi: iki dar yarıktan geçen ışık perdede aydınlık-karanlık saçaklar oluşturdu.', art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' },
    { id: 'dalton-atom', y: 1803, d: 'chem', t: 'Atom kuramı', p: 'John Dalton', desc: 'Elementlerin belirli kütleli atomlardan oluştuğunu ve sabit oranlarla birleştiğini öne sürdü.', art: 'atom', lab: 'affeLab' },
    { id: 'gauss-ekk', y: 1809, d: 'stats', t: 'En küçük kareler & normal dağılım', p: 'Carl Friedrich Gauss', desc: 'Ölçüm hatalarının normal dağıldığını varsayarak en küçük kareler yöntemini gerekçelendirdi; Ceres\'in yerini böyle öngörmüştü.', lab: 'affeStats', hash: '#mod5' },
    { id: 'avogadro', y: 1811, d: 'chem', t: 'Avogadro hipotezi', p: 'Amedeo Avogadro', desc: 'Eşit hacimli gazlar aynı koşullarda eşit sayıda molekül içerir.', lab: 'affeLab' },
    { id: 'fraunhofer', y: 1814, d: 'space', t: 'Güneş tayfındaki karanlık çizgiler', p: 'Joseph von Fraunhofer', desc: 'Güneş ışığı tayfında yüzlerce karanlık çizgi saydı — yıldızların kimyasını okumanın anahtarı.', lab: 'affeSpace', hash: '#mod2' },
    { id: 'wohler-ure', y: 1828, d: 'chem', t: 'Üre sentezi', p: 'Friedrich Wöhler', desc: 'Organik bir maddenin (üre) inorganik maddelerden sentezlenebileceğini gösterdi; "yaşam gücü" (vitalizm) fikrini sarstı.' },
    { id: 'faraday-induksiyon', y: 1831, d: 'phys', t: 'Elektromanyetik indüksiyon', p: 'Michael Faraday', desc: 'Değişen manyetik alanın elektrik akımı ürettiğini buldu — jeneratörlerin ve transformatörlerin temeli.', exp: 'Demir halkaya sarılı iki bobinden birinin akımı açılıp kapandığında diğerinde anlık akım oluştuğunu galvanometreyle gördü.' },
    { id: 'quetelet', y: 1835, d: 'stats', t: '"Ortalama insan"', p: 'Adolphe Quetelet', desc: 'Göğüs çevresi gibi insan özelliklerinin normal dağıldığını gösterip istatistiği toplum bilimine taşıdı.', lab: 'affeStats', hash: '#mod2' },
    { id: 'hucre-kurami', y: 1839, d: 'bio', t: 'Hücre kuramı', p: 'Matthias Schleiden & Theodor Schwann', desc: 'Tüm bitki ve hayvanların hücrelerden oluştuğunu öne sürdüler (Virchow 1855: her hücre bir hücreden gelir).', art: 'hucre-organelleri-atp', lab: 'affeBio', hash: '#mod2' },
    { id: 'joule', y: 1845, d: 'phys', t: 'Isının mekanik eşdeğeri', p: 'James Prescott Joule', desc: 'İşin ısıya dönüştüğünü ölçerek enerjinin korunumu ilkesine yol açtı.', exp: 'Düşen ağırlıkların döndürdüğü kanatlı çarkın sudaki sıcaklığı yükselttiğini hassas termometreyle ölçtü.' },
    { id: 'neptun', y: 1846, d: 'space', t: 'Neptün: kalemle bulunan gezegen', p: 'Urbain Le Verrier & Johann Galle', desc: 'Uranüs\'ün yörüngesindeki sapmalardan Neptün\'ün yerini hesapla öngördüler; Galle ilk gece buldu.', art: 'gunes-sistemi-kepler', lab: 'affeSpace', hash: '#mod8' },
    { id: 'nightingale', y: 1858, d: 'stats', t: 'Kutup alanı diyagramı', p: 'Florence Nightingale', desc: 'Kırım Savaşı\'nda askerlerin çoğunun yaralardan değil önlenebilir hastalıklardan öldüğünü grafikle gösterdi; veri görselleştirmenin öncüsü.' },
    { id: 'darwin', y: 1859, d: 'bio', t: 'Türlerin Kökeni', p: 'Charles Darwin', desc: 'Doğal seçilimle evrim kuramı (Alfred Russel Wallace ile bağımsız).', lab: 'affeBio', hash: '#mod4' },
    { id: 'kirchhoff-bunsen', y: 1859, d: 'chem', t: 'Spektroskopi', p: 'Gustav Kirchhoff & Robert Bunsen', desc: 'Her elementin kendine özgü tayf çizgileri olduğunu buldular; Güneş\'teki elementleri tanımladılar, sezyum ve rubidyumu keşfettiler.', lab: 'affeSpace', hash: '#mod9' },
    { id: 'pasteur', y: 1862, d: 'bio', t: 'Kendiliğinden oluşumun çürütülmesi', p: 'Louis Pasteur', desc: 'Mikropların havadan geldiğini gösterdi; pastörizasyon ve mikrop kuramı.', exp: 'Kuğu boyunlu şişelerde kaynatılmış et suyu, havayla temas etse de toz giremediği için bozulmadı; boynu kırılınca hemen bozuldu.' },
    { id: 'maxwell', y: 1865, d: 'phys', t: 'Elektromanyetizmanın denklemleri', p: 'James Clerk Maxwell', desc: 'Elektrik ve manyetizmayı birleştirdi; ışığın elektromanyetik dalga olduğunu öngördü.', lab: 'affeSpace', hash: '#mod9' },
    { id: 'mendel', y: 1866, d: 'bio', t: 'Kalıtım yasaları', p: 'Gregor Mendel', desc: 'Özelliklerin "faktörler" (genler) hâlinde, belirli oranlarla aktarıldığını gösterdi; 1900\'e kadar fark edilmedi.', exp: '~28.000 bezelye bitkisinde tohum rengi ve şekli gibi özellikleri sayarak 3:1 oranını buldu — biyolojide istatistiğin ilk büyük zaferi.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'mendeleyev', y: 1869, d: 'chem', t: 'Periyodik tablo', p: 'Dmitri Mendeleyev', desc: 'Elementleri atom kütlesine ve özelliklerine göre dizdi; galyum ve germanyum gibi henüz bilinmeyen elementlerin özelliklerini öngördü.', art: 'atom', lab: 'affeLab' },
    { id: 'galton-kutusu', y: 1873, d: 'stats', t: 'Galton kutusu (quincunx)', p: 'Francis Galton', desc: 'Çivilerden sekerek düşen bilyelerin çan eğrisi oluşturduğunu gösteren düzenek.', exp: 'Bilyeler her çivide sağa ya da sola rastgele saparak alttaki bölmelerde binom → normal dağılımı oluşturur.', lab: 'affeStats', hash: '#mod1' },
    { id: 'boltzmann-entropi', y: 1877, d: 'phys', t: 'Entropinin istatistiksel tanımı', p: 'Ludwig Boltzmann', desc: 'S = k log W: entropi, bir makro durumu oluşturan mikro durumların sayısının logaritmasıdır.' },
    { id: 'galton-regresyon', y: 1886, d: 'stats', t: 'Ortalamaya gerileme & korelasyon', p: 'Francis Galton', desc: 'Uzun boylu ebeveynlerin çocuklarının ortalamaya daha yakın olduğunu buldu ("regresyon"); korelasyon kavramını tanımladı (1888).', lab: 'affeStats', hash: '#mod5' },
    { id: 'michelson-morley', y: 1887, d: 'phys', t: 'Esir yok!', p: 'Albert Michelson & Edward Morley', desc: 'Işık hızının Dünya\'nın hareketinden bağımsız olduğunu buldular; özel göreliliğe zemin hazırladı.', exp: 'Cıva üzerinde dönen taş levhadaki interferometreyle iki dik yöndeki ışık hızını karşılaştırdılar — beklenen saçak kayması çıkmadı.' },
    { id: 'hertz', y: 1887, d: 'phys', t: 'Radyo dalgaları', p: 'Heinrich Hertz', desc: 'Maxwell\'in öngördüğü elektromanyetik dalgaları laboratuvarda üretip algıladı.' },
    { id: 'arrhenius', y: 1887, d: 'chem', t: 'İyonlaşma kuramı', p: 'Svante Arrhenius', desc: 'Asit ve bazları sudaki iyonlarla tanımladı; tepkime hızının sıcaklık bağımlılığını (Arrhenius denklemi) verdi.', lab: 'affeLab' },
    { id: 'rontgen', y: 1895, d: 'phys', t: 'X-ışınları', p: 'Wilhelm Röntgen', desc: 'Katot ışını tüpü yakınındaki floresan ekranın parladığını fark etti; eşinin elinin ilk röntgen filmi.', lab: 'affeSpace', hash: '#mod3' },
    { id: 'becquerel', y: 1896, d: 'phys', t: 'Radyoaktivite', p: 'Henri Becquerel', desc: 'Uranyum tuzlarının ışık olmadan fotoğraf plakasını kararttığını buldu.', art: 'karbon-14', lab: 'affePhysics', hash: '#mod1' },
    { id: 'thomson-elektron', y: 1897, d: 'phys', t: 'Elektronun keşfi', p: 'J. J. Thomson', desc: 'Katot ışınlarının atomdan ~1.800 kat hafif negatif parçacıklar olduğunu gösterdi.', art: 'atom', lab: 'affePhysics', hash: '#mod1' },
    { id: 'curie', y: 1898, d: 'chem', t: 'Polonyum ve radyum', p: 'Marie & Pierre Curie', desc: 'Tonlarca uranyum cevherinden iki yeni radyoaktif element ayırdılar; Marie Curie iki farklı bilimde (fizik 1903, kimya 1911) Nobel alan tek kişi.', art: 'karbon-14', lab: 'affePhysics', hash: '#mod1' },
    { id: 'pearson-kikare', y: 1900, d: 'stats', t: 'Ki-kare uyum testi', p: 'Karl Pearson', desc: 'Gözlenen ve beklenen frekansları karşılaştıran χ² testi — modern hipotez testinin başlangıcı.', lab: 'affeStats', hash: '#mod3' },
    // ---------------- 20. YÜZYIL ----------------
    { id: 'planck-kuantum', y: 1900, d: 'phys', t: 'Kuantum hipotezi', p: 'Max Planck', desc: '14 Aralık 1900: karacisim ışımasını açıklamak için enerjinin E = hν paketleriyle yayıldığını varsaydı — kuantumun doğum günü.', art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' },
    { id: 'mendel-yeniden', y: 1900, d: 'bio', t: 'Mendel\'in yeniden keşfi', p: 'de Vries, Correns & Tschermak', desc: 'Üç botanikçi bağımsız olarak Mendel\'in yasalarını yeniden buldu; genetik çağı başladı.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'einstein-1905', y: 1905, d: 'phys', t: 'Mucize yıl: foton, görelilik, E = mc²', p: 'Albert Einstein', desc: 'Fotoelektrik olay (ışık kuantumları), Brown hareketi, özel görelilik ve kütle–enerji eşdeğerliği — tek yılda dört devrim.', art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' },
    { id: 'bateson-genetik', y: 1905, d: 'bio', t: '"Genetik" adı', p: 'William Bateson', desc: 'Kalıtım bilimine "genetik" adını verdi — Einstein\'ın mucize yılıyla aynı yıl!', art: 'santral-dogma' },
    { id: 'gosset-t', y: 1908, d: 'stats', t: 'Student t-testi', p: 'William Sealy Gosset ("Student")', desc: 'Guinness bira fabrikasında küçük örneklemlerle çalışırken t dağılımını buldu; şirket adını kullanmasına izin vermediği için "Student" takma adıyla yayımladı.', lab: 'affeStats', hash: '#mod3' },
    { id: 'millikan-yag', y: 1909, d: 'phys', t: 'Elektronun yükü', p: 'Robert Millikan', desc: 'Temel yük e\'yi ölçtü; 1916\'da fotoelektrik olayla Planck sabitini doğruladı.', exp: 'Elektrik alanda asılı kalan minik yağ damlacıklarının hızlarını mikroskopla izleyerek yüklerin hep e\'nin tam katları olduğunu buldu.', art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' },
    { id: 'morgan-kromozom', y: 1910, d: 'bio', t: 'Genler kromozomlar üzerindedir', p: 'Thomas Hunt Morgan', desc: 'Meyve sineği (Drosophila) çaprazlamalarıyla beyaz göz geninin X kromozomuna bağlı olduğunu gösterdi.' },
    { id: 'rutherford', y: 1911, d: 'phys', t: 'Atom çekirdeği', p: 'Ernest Rutherford', desc: 'Atomun kütlesinin küçücük, pozitif yüklü bir çekirdekte toplandığını gösterdi.', exp: 'Geiger ve Marsden altın varağa alfa parçacıkları gönderdi; parçacıkların çoğu geçti ama ~8.000\'de biri geri sekti: "Kâğıda attığınız mermi geri dönüp size çarpmış gibi."', art: 'atom', lab: 'affePhysics', hash: '#mod1' },
    { id: 'hr-diyagrami', y: 1911, d: 'space', t: 'Hertzsprung–Russell diyagramı', p: 'Ejnar Hertzsprung & Henry Norris Russell', desc: 'Yıldızların parlaklığını sıcaklığına göre çizince anakol, devler ve beyaz cüceler ortaya çıktı (1911–1913).', art: 'yildiz-evrimi-hr', lab: 'affeSpace', hash: '#mod2' },
    { id: 'bohr-atom', y: 1913, d: 'phys', t: 'Bohr atom modeli', p: 'Niels Bohr', desc: 'Elektronların kuantumlu yörüngelerde dolaştığını varsayarak hidrojen tayfını açıkladı.', art: 'atom', lab: 'affePhysics', hash: '#mod1' },
    { id: 'genel-gorelilik', y: 1915, d: 'space', t: 'Genel görelilik', p: 'Albert Einstein', desc: 'Kütleçekim, kütle-enerjinin uzay-zamanı bükmesidir; Merkür\'ün yörünge kaymasını açıkladı.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' },
    { id: 'schwarzschild', y: 1916, d: 'space', t: 'Karadelik çözümü', p: 'Karl Schwarzschild', desc: 'Rus cephesinde topçu subayıyken Einstein denklemlerinin ilk tam çözümünü buldu; olay ufku yarıçapı R_s = 2GM/c².', art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' },
    { id: 'eddington-tutulma', y: 1919, d: 'space', t: 'Işığın bükülmesi doğrulandı', p: 'Arthur Eddington', desc: 'Güneş tutulmasında yıldızların konumlarının Einstein\'ın öngördüğü kadar (1,75") kaydığını ölçtü.', exp: 'Príncipe adasında ve Brezilya\'da tutulma sırasında çekilen fotoğraf plakaları, aynı yıldızların gece çekilmiş konumlarıyla karşılaştırıldı.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' },
    { id: 'heisenberg', y: 1925, d: 'phys', t: 'Matris mekaniği & belirsizlik', p: 'Werner Heisenberg', desc: 'Kuantum mekaniğinin ilk tam biçimi (1925); belirsizlik ilkesi (1927).', art: 'atom' },
    { id: 'fisher-anova', y: 1925, d: 'stats', t: 'Araştırmacılar için istatistik yöntemler', p: 'Ronald Fisher', desc: 'ANOVA, p-değeri, rastgele atama ve deney tasarımı; modern istatistiğin kurucusu.', exp: '"Çay tadan hanım" (1935): sütün mü çayın mı önce konduğunu anladığını iddia eden birini 8 fincanlı rastgele bir deneyle test etti — hipotez testinin klasik örneği.', lab: 'affeStats', hash: '#mod5' },
    { id: 'schrodinger', y: 1926, d: 'phys', t: 'Dalga denklemi', p: 'Erwin Schrödinger', desc: 'Elektronu dalga fonksiyonu ψ ile tanımlayan denklem; orbitallerin matematiği.', art: 'atom', lab: 'affePhysics', hash: '#mod1' },
    { id: 'fleming', y: 1928, d: 'bio', t: 'Penisilin', p: 'Alexander Fleming', desc: 'Küf mantarının bakteri üremesini durdurduğunu fark etti; antibiyotik çağının başlangıcı.' },
    { id: 'hubble', y: 1929, d: 'space', t: 'Evren genişliyor', p: 'Edwin Hubble', desc: 'Galaksilerin uzaklıkları arttıkça daha hızlı uzaklaştığını buldu (v = H₀d; Lemaître 1927).', exp: 'Mount Wilson\'daki 2,5 m\'lik teleskopla Cepheid değişken yıldızlardan galaksi uzaklıklarını, tayflardan kırmızıya kaymayı ölçtü.', lab: 'affeSpace', hash: '#mod6' },
    { id: 'chandrasekhar', y: 1930, d: 'space', t: 'Beyaz cüce kütle limiti', p: 'Subrahmanyan Chandrasekhar', desc: '19 yaşında İngiltere\'ye giden gemide beyaz cücelerin 1,44 M☉\'yu aşamayacağını hesapladı.', art: 'notron-yildizlari-chandrasekhar', lab: 'affeSpace', hash: '#mod2' },
    { id: 'pauling', y: 1931, d: 'chem', t: 'Kimyasal bağın doğası', p: 'Linus Pauling', desc: 'Kuantum mekaniğini kimyasal bağa uyguladı; hibritleşme ve elektronegatiflik kavramları.', art: 'atom', lab: 'affeLab' },
    { id: 'chadwick-notron', y: 1932, d: 'phys', t: 'Nötronun keşfi', p: 'James Chadwick', desc: 'Çekirdekteki yüksüz parçacığı buldu; izotopların ve nükleer fiziğin anahtarı.', art: 'karbon-14', lab: 'affePhysics', hash: '#mod1' },
    { id: 'zwicky', y: 1933, d: 'space', t: 'Karanlık madde', p: 'Fritz Zwicky', desc: 'Coma kümesindeki galaksilerin, görünür kütlenin tutamayacağı kadar hızlı hareket ettiğini fark etti: "dunkle Materie".', lab: 'affeSpace', hash: '#mod6' },
    { id: 'neyman-pearson', y: 1933, d: 'stats', t: 'Hipotez testi kuramı', p: 'Jerzy Neyman & Egon Pearson', desc: 'H₀/H₁, I. ve II. tip hata, test gücü ve güven aralıkları.', lab: 'affeStats', hash: '#mod3' },
    { id: 'fermi-reaktor', y: 1942, d: 'phys', t: 'İlk nükleer reaktör', p: 'Enrico Fermi', desc: 'Chicago Pile-1 ile ilk kontrollü zincirleme fisyon tepkimesi.', lab: 'affePhysics', hash: '#mod1' },
    { id: 'avery', y: 1944, d: 'bio', t: 'Kalıtım maddesi DNA\'dır', p: 'Oswald Avery, Colin MacLeod & Maclyn McCarty', desc: 'Bakteri dönüşümünü sağlayanın protein değil DNA olduğunu gösterdiler.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'monte-carlo', y: 1946, d: 'stats', t: 'Monte Carlo yöntemi', p: 'Stanisław Ulam & John von Neumann', desc: 'Rastgele örneklemeyle nötron difüzyonu gibi çözülemeyen problemleri bilgisayarda çözdüler (adı Monako\'daki kumarhaneden).', lab: 'affeStats', hash: '#mod6' },
    { id: 'shannon', y: 1948, d: 'stats', t: 'Bilgi kuramı', p: 'Claude Shannon', desc: 'Bilgiyi bit ve entropi ile ölçtü; tüm dijital iletişimin temeli.' },
    { id: 'libby-c14', y: 1949, d: 'chem', t: 'Radyokarbon tarihleme', p: 'Willard Libby', desc: '¹⁴C ile organik kalıntıların yaşını ölçme yöntemi (1960 Nobel Kimya).', art: 'karbon-14' },
    { id: 'miller-urey', y: 1952, d: 'chem', t: 'Yaşamın yapı taşlarının sentezi', p: 'Stanley Miller & Harold Urey', desc: 'İlkel atmosfer koşullarında amino asitlerin kendiliğinden oluşabildiğini gösterdiler.', exp: 'Su, metan, amonyak ve hidrojenden oluşan kapalı düzenekte elektrik kıvılcımları (şimşek benzetimi) bir hafta sonra amino asitler üretti.', lab: 'affeBio', hash: '#mod3' },
    { id: 'franklin-foto51', y: 1952, d: 'bio', t: 'Fotoğraf 51', p: 'Rosalind Franklin', desc: 'DNA\'nın X-ışını kırınım görüntüsü sarmal yapıyı açıkça ortaya koydu.', exp: 'Raymond Gosling ile birlikte nemli DNA liflerini ~100 saat X-ışınına tutarak "X" desenli kırınım fotoğrafını çekti.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'watson-crick', y: 1953, d: 'bio', t: 'DNA çift sarmalı', p: 'James Watson & Francis Crick', desc: 'Franklin ve Wilkins\'in verilerinden DNA\'nın çift sarmal modelini kurdular; baz eşleşmesi kopyalamayı açıklıyordu.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'sputnik', y: 1957, d: 'space', t: 'Sputnik 1', p: 'Sovyet uzay programı (Sergey Korolyov)', desc: 'İlk yapay uydu; uzay çağının başlangıcı.' },
    { id: 'meselson-stahl', y: 1958, d: 'bio', t: 'DNA yarı korunumlu kopyalanır', p: 'Matthew Meselson & Franklin Stahl', desc: '"Biyolojideki en güzel deney": DNA kopyalanırken her yeni sarmalın bir eski bir yeni iplikten oluştuğunu gösterdiler.', exp: 'Bakterileri ağır ¹⁵N\'de büyütüp hafif ¹⁴N\'ye aktardılar; DNA\'yı yoğunluk gradyanında santrifüjleyince ara yoğunlukta tek bant çıktı.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'penzias-wilson', y: 1964, d: 'space', t: 'Kozmik mikrodalga arka plan', p: 'Arno Penzias & Robert Wilson', desc: 'Büyük Patlama\'dan kalan 2,7 K\'lik ışımayı tesadüfen buldular (1978 Nobel).', exp: 'Bell Labs\'ın boynuz antenindeki açıklanamayan gürültüden kurtulmak için anteni güvercin pisliğinden bile temizlediler; gürültü her yönden geliyordu — evrenin "bebeklik fotoğrafı".', lab: 'affeSpace', hash: '#mod6' },
    { id: 'higgs-oneri', y: 1964, d: 'phys', t: 'Higgs mekanizması', p: 'Peter Higgs, François Englert & Robert Brout', desc: 'Temel parçacıkların kütlesini bir alanla etkileşimden alması önerildi.', art: 'standart-model' },
    { id: 'bell-pulsar', y: 1967, d: 'space', t: 'Pulsarların keşfi', p: 'Jocelyn Bell Burnell', desc: 'Radyo teleskop kâğıt çıktılarında 1,33 saniyede bir atan sinyali fark etti; şaka yollu "LGM-1" (Küçük Yeşil Adamlar) dendi.', art: 'notron-yildizlari-chandrasekhar', lab: 'affeSpace', hash: '#mod2' },
    { id: 'apollo-11', y: 1969, d: 'space', t: 'Ay\'a ilk iniş', p: 'Apollo 11 (Armstrong, Aldrin, Collins)', desc: '20 Temmuz 1969: insan ilk kez başka bir gök cismine ayak bastı.', lab: 'affeSpace', hash: '#mod8' },
    { id: 'hawking-isimasi', y: 1974, d: 'space', t: 'Hawking ışıması', p: 'Stephen Hawking', desc: 'Kuantum etkiler nedeniyle karadeliklerin ışıma yapıp yavaşça buharlaştığını gösterdi.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod1' },
    { id: 'efron-bootstrap', y: 1979, d: 'stats', t: 'Bootstrap', p: 'Bradley Efron', desc: 'Veriden yerine koyarak yeniden örnekleme ile belirsizlik tahmini — bilgisayar çağının istatistiği.', lab: 'affeStats', hash: '#mod3' },
    { id: 'mullis-pcr', y: 1983, d: 'bio', t: 'PCR (polimeraz zincir tepkimesi)', p: 'Kary Mullis', desc: 'Bir DNA parçasını saatler içinde milyarlarca kez çoğaltan yöntem (1993 Nobel Kimya).', lab: 'affeBio', hash: '#mod3' },
    { id: 'hubble-teleskop', y: 1990, d: 'space', t: 'Hubble Uzay Teleskobu', p: 'NASA & ESA', desc: 'Atmosferin üstünden net görüntüler; evrenin yaşı ve genişleme hızı ölçümleri.', lab: 'affeSpace', hash: '#mod3' },
    { id: 'mayor-queloz', y: 1995, d: 'space', t: 'İlk ötegezegen (51 Pegasi b)', p: 'Michel Mayor & Didier Queloz', desc: 'Güneş benzeri bir yıldızın etrafında dönen ilk gezegeni radyal hız yöntemiyle buldular (2019 Nobel).', lab: 'affeSpace', hash: '#mod4' },
    { id: 'dolly', y: 1996, d: 'bio', t: 'Koyun Dolly', p: 'Ian Wilmut & Keith Campbell', desc: 'Yetişkin bir hücreden klonlanan ilk memeli.' },
    { id: 'hizlanan-evren', y: 1998, d: 'space', t: 'Evrenin genişlemesi hızlanıyor', p: 'Perlmutter, Schmidt & Riess', desc: 'Tip Ia süpernovalar uzak evrenin beklenenden sönük olduğunu gösterdi: karanlık enerji (2011 Nobel).', art: 'notron-yildizlari-chandrasekhar', lab: 'affeSpace', hash: '#mod6' },
    // ---------------- 21. YÜZYIL ----------------
    { id: 'insan-genomu', y: 2003, d: 'bio', t: 'İnsan Genom Projesi', p: 'Uluslararası konsorsiyum', desc: '~3 milyar baz çiftinin dizilenmesi tamamlandı; ~20.000 protein kodlayan gen.', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'crispr', y: 2012, d: 'bio', t: 'CRISPR-Cas9 gen düzenleme', p: 'Jennifer Doudna & Emmanuelle Charpentier', desc: 'Bakteri bağışıklık sistemini programlanabilir "moleküler makas"a dönüştürdüler (2020 Nobel Kimya).', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'higgs-kesif', y: 2012, d: 'phys', t: 'Higgs bozonu bulundu', p: 'CERN (ATLAS & CMS)', desc: 'LHC\'de ~125 GeV kütleli Higgs bozonu 5σ istatistiksel anlamlılıkla keşfedildi.', exp: 'Trilyonlarca proton çarpışmasında, foton çiftlerinin kütle dağılımındaki küçük bir "tümsek" — keşif, istatistiğin 5 sigma ölçütüyle ilan edildi.', art: 'standart-model' },
    { id: 'ligo', y: 2015, d: 'space', t: 'Kütleçekim dalgaları (GW150914)', p: 'LIGO (Weiss, Barish, Thorne)', desc: '14 Eylül 2015: 1,3 milyar ışık yılı ötedeki iki karadeliğin birleşmesinden gelen dalga algılandı (2017 Nobel).', exp: '4 km\'lik dik kollardaki lazer interferometresi, bir protonun binde biri kadar uzunluk değişimini ölçtü; iki ayrı dedektör 7 ms arayla aynı "cıvıltıyı" duydu.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod5' },
    { id: 'eht', y: 2019, d: 'space', t: 'Karadeliğin ilk fotoğrafı (M87*)', p: 'Event Horizon Telescope', desc: 'Dünya çapındaki radyo teleskoplarının birleşimiyle bir karadeliğin gölgesi görüntülendi.', exp: 'Çok uzun temel hatlı interferometri (VLBI): 8 gözlemevinin verisi hard disklerle taşınıp süper bilgisayarda birleştirildi — Dünya büyüklüğünde sanal bir çanak.', art: 'karadelikler', lab: 'affeSpace', hash: '#mod3' },
    { id: 'si-2019', y: 2019, d: 'phys', t: 'Kilogram artık Planck sabitiyle tanımlı', p: 'Uluslararası Ağırlıklar ve Ölçüler Bürosu (BIPM)', desc: '20 Mayıs 2019: h, e, k_B ve N_A tam değerlere sabitlendi; Paris\'teki metal kilogram prototipi emekli oldu.', exp: 'Kibble (watt) terazisi, bir kütleyi elektromanyetik kuvvetle dengeleyip kuantum standartlarıyla ölçerek kilogramı h\'ye bağlar.', art: 'planck-sabiti', lab: 'affeSpace', hash: '#mod9' },
    { id: 'alphafold', y: 2020, d: 'bio', t: 'AlphaFold protein katlanması', p: 'DeepMind (Hassabis & Jumper)', desc: 'Yapay zekâ ile proteinlerin 3B yapısını deneysel doğruluğa yakın tahmin etti (2024 Nobel Kimya).', art: 'santral-dogma' },
    { id: 'mrna-asi', y: 2020, d: 'bio', t: 'mRNA aşıları', p: 'Katalin Karikó & Drew Weissman', desc: 'Modifiye nükleozitli mRNA ile COVID-19 aşıları rekor sürede geliştirildi (2023 Nobel Tıp).', art: 'santral-dogma', lab: 'affeBio', hash: '#mod3' },
    { id: 'jwst', y: 2021, d: 'space', t: 'James Webb Uzay Teleskobu', p: 'NASA, ESA & CSA', desc: '25 Aralık 2021\'de fırlatıldı; 6,5 m altın kaplı aynasıyla kızılötesinde ilk galaksileri ve ötegezegen atmosferlerini inceliyor.', lab: 'affeSpace', hash: '#mod3' }
  ];
  EVENTS.sort((a, b) => a.y - b.y);
  const LANES = ['chem', 'phys', 'bio', 'stats', 'space'];
  const ERAS = [
    { from: -650, to: 500, name: 'Antik Çağ', color: '#64748b' },
    { from: 500, to: 1450, name: 'Orta Çağ & İslam Altın Çağı', color: '#10b981' },
    { from: 1450, to: 1700, name: 'Rönesans & Bilimsel Devrim', color: '#38bdf8' },
    { from: 1700, to: 1800, name: 'Aydınlanma', color: '#a855f7' },
    { from: 1800, to: 1900, name: '19. Yüzyıl', color: '#f59e0b' },
    { from: 1900, to: 2000, name: 'Modern Bilim', color: '#f97316' },
    { from: 2000, to: 2030, name: '21. Yüzyıl', color: '#ef4444' }
  ];
  const WEIGHTS = [0.11, 0.13, 0.13, 0.1, 0.18, 0.26, 0.09];
  const TICK = [200, 100, 50, 20, 10, 10, 5];

  function warp(y) {
    let acc = 0;
    for (let i = 0; i < ERAS.length; i++) {
      const e = ERAS[i];
      if (y <= e.to || i === ERAS.length - 1) return acc + WEIGHTS[i] * Math.max(0, Math.min(1, (y - e.from) / (e.to - e.from)));
      acc += WEIGHTS[i];
    }
    return acc;
  }
  const yearStr = (y) => (y < 0 ? `MÖ ${-y}` : String(y));

  /* --------------------------------------------------------------------------
     GÖRÜNÜM
     -------------------------------------------------------------------------- */
  const st = { zoom: 1, lanes: new Set(LANES), expOnly: false, sel: null };
  let root, scroller, track, mobile = false;

  function render(rootEl) {
    root = rootEl;
    root.innerHTML = `
      <div class="lab-grid tl-grid">
        <aside class="hud-panel">
          <div class="hud-section">
            <div class="hud-title"><span>Bilim Dalları</span></div>
            <div class="tl-lanechips" id="tlLaneChips"></div>
            <label class="tl-check"><input type="checkbox" id="tlExpOnly" /> Yalnızca büyük deneyler</label>
          </div>
          <div class="hud-section">
            <div class="hud-title"><span>Dönemler</span></div>
            <div class="lab-chip-wrap" id="tlEras"></div>
          </div>
          <div class="hud-section">
            <div class="hud-title"><span>🔬 Büyük Deneyler Müzesi</span></div>
            <div class="tl-museum" id="tlMuseum"></div>
          </div>
        </aside>

        <section class="stage-panel tl-stage">
          <div class="lab-toolbar">
            <button class="lab-tool-btn" id="tlZoomOut">−</button>
            <button class="lab-tool-btn" id="tlZoomIn">+</button>
            <button class="lab-tool-btn" id="tlZoomAll">⤢ Tümü</button>
            <span class="lab-tool-btn" style="pointer-events:none;color:var(--muted);">Tekerlek: yakınlaştır · Sürükle: kaydır · Olaya tıkla</span>
          </div>
          <div class="tl-body">
            <div class="tl-lanelabels" id="tlLaneLabels"></div>
            <div class="tl-scroller" id="tlScroller"><div class="tl-track" id="tlTrack"></div></div>
            <div class="tl-vertical" id="tlVertical" hidden></div>
          </div>
        </section>

        <aside class="hud-panel">
          <div class="hud-section" id="tlDetail"><p class="tl-empty">Bir olaya tıklayın: kim, ne zaman, nasıl buldu?</p></div>
          <div class="hud-section" id="tlParallel"></div>
        </aside>
      </div>`;
    scroller = root.querySelector('#tlScroller');
    track = root.querySelector('#tlTrack');
    renderSide();
    wire();
    new ResizeObserver(() => layout()).observe(root.querySelector('.tl-body'));
  }

  function renderSide() {
    root.querySelector('#tlLaneChips').innerHTML = LANES.map((d) => {
      const dm = SW.domain(d);
      return `<button class="dom-chip tl-lanechip${st.lanes.has(d) ? '' : ' off'}" data-lane="${d}" style="--c:${dm.color}">${dm.icon} ${dm.name}</button>`;
    }).join('');
    root.querySelector('#tlEras').innerHTML = ERAS.map((e, i) => `<button class="lab-chip" data-era="${i}" style="color:${e.color}">${e.name}</button>`).join('');
    root.querySelector('#tlMuseum').innerHTML = EVENTS.filter((e) => e.exp).map((e) => `
      <button class="tl-museum-item" data-ev="${e.id}" style="--c:${SW.domain(e.d).color}"><b>${yearStr(e.y)}</b><span>${SW.esc(e.p)}</span><small>${SW.esc(e.t)}</small></button>`).join('');
    root.querySelector('#tlLaneLabels').innerHTML = LANES.map((d) => {
      const dm = SW.domain(d);
      return `<div class="tl-lanelabel${st.lanes.has(d) ? '' : ' off'}" style="--c:${dm.color}">${dm.icon}<span>${dm.name}</span></div>`;
    }).join('');
  }

  function visibleEvents() { return EVENTS.filter((e) => st.lanes.has(e.d) && (!st.expOnly || e.exp)); }

  function layout() {
    if (!root) return;
    const body = root.querySelector('.tl-body');
    mobile = body.clientWidth < 640;
    root.querySelector('#tlVertical').hidden = !mobile;
    scroller.hidden = mobile;
    root.querySelector('#tlLaneLabels').hidden = mobile;
    if (mobile) { renderVertical(); return; }
    const width = Math.max(scroller.clientWidth, 1500) * st.zoom;
    const laneH = Math.max(96, Math.floor((scroller.clientHeight - 34) / LANES.length));
    track.style.width = width + 'px';
    track.style.height = (34 + laneH * LANES.length) + 'px';
    root.querySelectorAll('.tl-lanelabel').forEach((el) => { el.style.height = laneH + 'px'; });
    const parts = [];
    // dönem bantları
    ERAS.forEach((e) => {
      const x0 = warp(e.from) * width, x1 = warp(e.to) * width;
      parts.push(`<div class="tl-era" style="left:${x0}px;width:${x1 - x0}px;--c:${e.color}"><span>${e.name}</span></div>`);
    });
    // yıl işaretleri (dönem sınırlarında çakışmasın diye ortak son konum)
    let lastX = -1e9;
    ERAS.forEach((e, i) => {
      const step = TICK[i];
      const start = Math.ceil(e.from / step) * step;
      for (let y = start; y < e.to; y += step) {
        const x = warp(y) * width;
        if (x - lastX < 44) continue;
        lastX = x;
        parts.push(`<div class="tl-tick" style="left:${x}px"><span>${yearStr(y)}</span></div>`);
      }
    });
    // şeritler
    LANES.forEach((d, li) => {
      const dm = SW.domain(d);
      parts.push(`<div class="tl-lane${st.lanes.has(d) ? '' : ' off'}" style="top:${34 + li * laneH}px;height:${laneH}px;--c:${dm.color}"></div>`);
    });
    // olaylar: her şeritte açgözlü alt satır yerleşimi
    const rows = Math.max(2, Math.floor((laneH - 22) / 30));
    const ev = visibleEvents();
    LANES.forEach((d, li) => {
      const lastEnd = new Array(rows).fill(-1e9);
      ev.filter((e) => e.d === d).forEach((e) => {
        const x = warp(e.y) * width;
        const first = e.p.split(' & ')[0].split(',')[0];
        const label = `${yearStr(e.y)} · ${first.includes(' ') ? first : e.p}`;
        const w = Math.min(210, 18 + label.length * 6.3);
        let r = lastEnd.findIndex((end) => end < x - 4);
        const compact = r < 0;
        if (compact) r = rows - 1; else lastEnd[r] = x + w;
        const top = 34 + li * laneH + 6 + r * 30;
        const dm = SW.domain(d);
        parts.push(compact
          ? `<button class="tl-dot${st.sel === e ? ' sel' : ''}" data-ev="${e.id}" title="${SW.esc(yearStr(e.y) + ' · ' + e.t + ' — ' + e.p)}" style="left:${x - 5}px;top:${34 + (li + 1) * laneH - 15}px;--c:${dm.color}"></button>`
          : `<button class="tl-ev${e.exp ? ' exp' : ''}${st.sel === e ? ' sel' : ''}" data-ev="${e.id}" title="${SW.esc(e.t)}" style="left:${x}px;top:${top}px;max-width:${w}px;--c:${dm.color}">${e.exp ? '🔬 ' : ''}${SW.esc(label)}</button>`);
      });
    });
    track.innerHTML = parts.join('');
  }

  function renderVertical() {
    const box = root.querySelector('#tlVertical');
    const ev = visibleEvents();
    box.innerHTML = ERAS.map((era) => {
      const items = ev.filter((e) => e.y >= era.from && e.y < era.to);
      if (!items.length) return '';
      return `<h4 class="tl-vera" style="color:${era.color}">${era.name}</h4>` + items.map((e) => `
        <button class="tl-vitem${st.sel === e ? ' sel' : ''}" data-ev="${e.id}" style="--c:${SW.domain(e.d).color}">
          <b>${yearStr(e.y)}</b><span>${SW.domain(e.d).icon} ${SW.esc(e.t)}</span><small>${SW.esc(e.p)}</small>
        </button>`).join('');
    }).join('');
  }

  function select(e, scroll) {
    st.sel = e;
    layout();
    renderDetail();
    if (scroll && !mobile) {
      const width = parseFloat(track.style.width) || scroller.clientWidth;
      scroller.scrollLeft = Math.max(0, warp(e.y) * width - scroller.clientWidth / 2);
    } else if (scroll && mobile) {
      const el = root.querySelector(`.tl-vitem[data-ev="${e.id}"]`);
      if (el) el.scrollIntoView({ block: 'center' });
    }
  }

  function renderDetail() {
    const e = st.sel;
    const box = root.querySelector('#tlDetail');
    const par = root.querySelector('#tlParallel');
    if (!e) return;
    const dm = SW.domain(e.d);
    const art = e.art && SW.getArticle(e.art);
    const lab = e.lab && SW.lab(e.lab);
    box.innerHTML = `
      <div class="hud-title"><span>${yearStr(e.y)}</span><span class="dom-chip" style="--c:${dm.color}">${dm.icon} ${dm.name}</span></div>
      <h3 class="tl-title">${SW.esc(e.t)}</h3>
      <p class="tl-person">👤 ${SW.esc(e.p)}</p>
      <p class="tl-desc">${SW.esc(e.desc)}</p>
      ${e.exp ? `<div class="tl-exp"><b>🔬 Büyük Deney</b><p>${SW.esc(e.exp)}</p></div>` : ''}
      <div class="tl-actions">
        ${art ? `<button class="lp-btn" style="--c:${dm.color}" data-article="${e.art}">📖 ${SW.esc(art.title)}</button>` : ''}
        ${lab ? `<button class="lp-btn primary" style="--c:${lab.color}" data-embed="${e.lab}" data-hash="${e.hash || ''}">▶ ${SW.esc(lab.name)} simülasyonu</button>` : ''}
      </div>`;
    const near = EVENTS.filter((x) => x !== e && x.d !== e.d && Math.abs(x.y - e.y) <= (e.y < 1500 ? 60 : 7)).sort((a, b) => Math.abs(a.y - e.y) - Math.abs(b.y - e.y)).slice(0, 7);
    par.innerHTML = `<div class="hud-title"><span>Aynı Dönemde Diğer Bilimlerde</span></div>` + (near.length ? near.map((x) => `
      <button class="tl-museum-item" data-ev="${x.id}" style="--c:${SW.domain(x.d).color}"><b>${yearStr(x.y)}</b><span>${SW.domain(x.d).icon} ${SW.esc(x.t)}</span><small>${SW.esc(x.p)}</small></button>`).join('') : '<p class="tl-empty">Bu yıllarda başka bir dalda kayıtlı olay yok.</p>');
  }

  function zoomAt(f, clientX) {
    const rect = scroller.getBoundingClientRect();
    const mx = (clientX != null ? clientX - rect.left : scroller.clientWidth / 2);
    const oldW = parseFloat(track.style.width) || scroller.clientWidth;
    const pos = (scroller.scrollLeft + mx) / oldW;
    st.zoom = Math.max(1, Math.min(12, st.zoom * f));
    layout();
    const newW = parseFloat(track.style.width);
    scroller.scrollLeft = pos * newW - mx;
  }

  function wire() {
    root.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-ev]');
      if (b) { const e = EVENTS.find((x) => x.id === b.dataset.ev); if (e) select(e, !b.closest('.tl-track')); return; }
      const lane = ev.target.closest('[data-lane]');
      if (lane) { const d = lane.dataset.lane; if (st.lanes.has(d) && st.lanes.size > 1) st.lanes.delete(d); else st.lanes.add(d); renderSide(); layout(); return; }
      const era = ev.target.closest('[data-era]');
      if (era && !mobile) {
        const e = ERAS[+era.dataset.era];
        if (st.zoom < 2.5) { st.zoom = 2.5; layout(); }
        scroller.scrollTo({ left: warp(e.from) * parseFloat(track.style.width) - 20, behavior: 'smooth' });
      }
    });
    root.querySelector('#tlExpOnly').addEventListener('change', (e) => { st.expOnly = e.target.checked; layout(); });
    root.querySelector('#tlZoomIn').addEventListener('click', () => zoomAt(1.5));
    root.querySelector('#tlZoomOut').addEventListener('click', () => zoomAt(1 / 1.5));
    root.querySelector('#tlZoomAll').addEventListener('click', () => { st.zoom = 1; layout(); scroller.scrollLeft = 0; });
    scroller.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX);
    }, { passive: false });
    let drag = null;
    scroller.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; drag = { x: e.clientX, s: scroller.scrollLeft }; scroller.classList.add('dragging'); });
    window.addEventListener('pointermove', (e) => { if (drag) scroller.scrollLeft = drag.s - (e.clientX - drag.x); });
    window.addEventListener('pointerup', () => { drag = null; scroller && scroller.classList.remove('dragging'); });
    window.addEventListener('sw:articles', () => { if (st.sel) renderDetail(); });
  }

  // Arama: olaylar + bilim insanları
  const people = new Map();
  EVENTS.forEach((e) => {
    e.p.split(/\s*(?:&|,)\s*/).forEach((name) => {
      const n = name.replace(/\(.*?\)/g, '').trim();
      if (!n || n.length < 3) return;
      if (!people.has(n)) people.set(n, []);
      people.get(n).push(e);
    });
  });
  SW.addSearchItems(EVENTS.map((e) => ({
    type: 'Bilim tarihi', title: `🕰️ ${yearStr(e.y)} · ${e.t}`, subtitle: `${e.p} — ${e.desc}`,
    keywords: `${e.p} ${SW.domain(e.d).name} ${e.exp ? 'büyük deney deney' : ''}`,
    action: () => SW.go('#/timeline/' + e.id)
  })));
  SW.addSearchItems([...people.entries()].map(([name, evs]) => ({
    type: 'Bilim insanı', title: `👤 ${name}`, subtitle: evs.map((e) => `${yearStr(e.y)} · ${e.t}`).join(' · '),
    keywords: evs.map((e) => e.t).join(' '),
    action: () => SW.go('#/timeline/' + evs[0].id)
  })));

  SW.registerView('timeline', {
    init(rootEl) { render(rootEl); layout(); },
    show(params) {
      layout();
      const id = params && params.sub;
      const e = id && EVENTS.find((x) => x.id === id);
      if (e) { st.lanes.add(e.d); if (st.expOnly && !e.exp) { st.expOnly = false; root.querySelector('#tlExpOnly').checked = false; } renderSide(); if (st.zoom < 3) st.zoom = 3; select(e, true); }
      else if (!st.sel) select(EVENTS.find((x) => x.id === 'einstein-1905'), true);
    },
    hide() {}
  });

  window.SW_TIMELINE = { EVENTS, ERAS };
})();
