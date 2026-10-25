# 🔭 scienceWiki — affeLab Bilim Ekosisteminin Merkez Üssü

**Kimya, fizik, biyoloji, istatistik ve uzay bilimlerini tek bir interaktif bilgi ağında birleştiren, tamamen Türkçe, açık kaynak bilim ansiklopedisi ve simülasyon portalı.**

👤 **Geliştirici:** Mehmet Aydın Mert · [github.com/mehmetmert](https://github.com/mehmetmert)

scienceWiki bir "kavramlar listesi" değil, bir **bilgi ağıdır**. Karbon-14'e tıkladığınızda kimyacının izotopunu, fizikçinin beta bozunumunu, biyoloğun fosil tarihlemesini, istatistikçinin Poisson sürecini ve astrofizikçinin kozmik ışınlarını aynı anda görürsünüz. Ardından tek tıkla ilgili **canlı simülasyonu** sayfadan çıkmadan çalıştırırsınız.

> 🌐 **Canlı demo:** [mehmetmert.github.io/sciencewiki](https://mehmetmert.github.io/sciencewiki/)

---

## 🧩 Beş modül

| Modül | Açıklama |
|---|---|
| 🕸️ **Disiplinlerarası Kavram Ağı** | Kuvvet yönelimli canlı bilgi grafiği. Her düğüm bir kavram ve bilim dalının neon rengiyle parlar. Birden fazla bilimi ilgilendiren **köprü kavramlar** çok halkalı yıldız düğümlerdir. Sürükleme, yakınlaştırma ve bilim dalı filtreleri var ("yalnızca Fizik ∩ Uzay"). Bir düğüme tıklayınca açılan **Köprü Paneli** kavramın beş bilimdeki karşılığını gösterir. |
| 📏 **Planck'tan Kozmosa Ölçek Cetveli** | 10⁻³⁵ m'den 10²⁷ m'ye kesintisiz logaritmik yolculuk: kuarklar, atomlar, DNA, hücreler, insan, Dünya, Güneş, nötron yıldızları, karadelikler, Samanyolu, kozmik ağ. Her ölçek aralığı ilgili laboratuvara bağlanır. |
| 📚 **İnteraktif Ansiklopedi** | Her madde 5 sekmeli akademik şablonla açılır: 💡 Sezgisel anlatım (Feynman tekniği) · 🏛️ Keşif tarihi · 📐 Matematik (KaTeX, **üzerine gelince açıklanan değişkenler**, canlı hesaplayıcı) · 🔬 **Canlı simülasyon** (sayfa içi iframe veya tam ekran) · 🔗 Disiplinlerarası bağlantılar & kaynakça. |
| 🕰️ **Bilim Tarihi Zaman Çizelgesi** | Antik Yunan ve İslam Altın Çağı'ndan (İbnü'l-Heysem, Harezmî) JWST'ye uzanır. Beş bilim dalı paralel şeritlerde akar; 1905'te fizikte, genetikte ve istatistikte neler olduğunu yan yana görürsünüz. |
| 🧮 **Sabitler, Birimler & 100 Denklem** | CODATA / SI-2019 evrensel sabitleri, birim ve boyut analizi dönüştürücüsü, beş bilimden 100 temel denklem (filtrelenebilir LaTeX kartları). |

Ayrıca:
- **⌨️ `Ctrl + K` Bilim Spotlight:** Kavram, bilim insanı, formül veya simülasyonu milisaniyeler içinde bulur.
- **🚀 Demo portalı:** Ana ekrandaki 5 laboratuvar kartı her laboratuvarı yeni sekmede açar ya da sayfa içinde önizler.

---

## 🔗 Bağlı laboratuvarlar

| | Laboratuvar | Renk | Demo |
|---|---|---|---|
| 🧪 | affeLab — Kimya | `#10b981` | [mehmetmert.github.io/affeLab](https://mehmetmert.github.io/affeLab/) |
| ⚛️ | affePhysics — Fizik & Atom | `#00f2fe` | [mehmetmert.github.io/affePhysics](https://mehmetmert.github.io/affePhysics/) |
| 🧬 | affeBio — Biyoloji & Anatomi | `#a855f7` | [mehmetmert.github.io/affeBio](https://mehmetmert.github.io/affeBio/) |
| 📊 | affeStats — İstatistik & Olasılık | `#f59e0b` | [mehmetmert.github.io/affeStats](https://mehmetmert.github.io/affeStats/) |
| 🌌 | affeSpace — Uzay & Astrofizik | `#f97316` | [mehmetmert.github.io/affeSpace](https://mehmetmert.github.io/affeSpace/) |

### ⭐ Demo linklerini değiştirmek

Tüm adresler **tek bir dosyada** tutulur: [`config/labs.js`](config/labs.js).

```js
window.SW_LINK_MODE = 'auto';   // 'auto' | 'remote' | 'local'
window.SW_LABS = {
  affeSpace: { url: 'https://KULLANICI.github.io/affeSpace/', local: '../space/', ... },
  ...
};
```

- **`auto`** (varsayılan): scienceWiki laboratuvarlarla aynı repoda yan yana duruyorsa (`../space/` erişilebilirse) yerel klasörleri, değilse `url` adreslerini kullanır.
- Derin bağlantılar `#modN` biçimindedir. Örneğin `affeSpace` + `#mod8` Güneş Sistemi'ni açar.

---

## ✍️ Yeni madde eklemek

Maddeler `data/articles-*.js` dosyalarındadır. Şema ve tam örnek (Karbon-14) için [`data/articles-0.js`](data/articles-0.js) dosyasına bakın:

```js
SW.addArticles([{
  id: 'entropi', title: 'Entropi', domain: 'phys', bridges: ['phys', 'chem', 'bio', 'stats', 'space'],
  summary: '…', intuitive: '…', history: '…',
  scientists: [{ name: 'Ludwig Boltzmann', year: 1877, note: '…' }],
  formulas: [{ tex: 'S = k_B \\ln W', desc: '…', vars: [{ sym: 'k_B', name: 'Boltzmann sabiti', unit: 'J/K' }] }],
  calc: { title: '…', inputs: [{ id: 'W', label: 'Mikrodurum sayısı', value: 1e6, min: 1, max: 1e12 }],
          compute: (v) => ({ label: 'Entropi', value: 1.380649e-23 * Math.log(v.W), unit: 'J/K' }) },
  perDomain: { phys: '…', chem: '…', bio: '…', stats: '…', space: '…' },
  sim: [{ lab: 'affePhysics', hash: '#mod6', label: 'Termodinamik' }],
  related: ['foton', 'karadelikler'], refs: ['…']
}]);
```

Yeni madde otomatik olarak kavram ağına, aramaya ve ansiklopedi listesine eklenir.

---

## 🚀 Yerelde çalıştırma

```bash
python -m http.server 8000      # klasörün içinde
# http://localhost:8000
```

> `index.html` dosyasına çift tıklamak (`file://`) yerine yerel sunucu kullanın; iframe önizlemeleri ve link algılama ancak böyle çalışır.

## 🛠️ Teknoloji

Saf HTML/CSS/JavaScript (derleme yok) · HTML5 Canvas (kavram ağı, ölçek cetveli, zaman çizelgesi; 60 FPS) · [KaTeX](https://katex.org) · Fontlar: Space Grotesk, Inter, JetBrains Mono.

---

## 📋 GitHub repo bilgileri (kopyala-yapıştır)

**About / Description:**
> Türkçe interaktif bilim ansiklopedisi ve affeLab ekosisteminin merkez üssü: 5 bilimi bağlayan kavram ağı, Planck'tan kozmosa ölçek cetveli, 5 sekmeli akademik maddeler, bilim tarihi, sabitler & 100 denklem ve kimya, fizik, biyoloji, istatistik ve uzay laboratuvarlarına canlı simülasyon bağlantıları.

**Website:** `https://mehmetmert.github.io/sciencewiki/`

**Topics:**
`science` `education` `turkish` `encyclopedia` `knowledge-graph` `interactive-learning` `physics` `chemistry` `biology` `statistics` `astronomy` `astrophysics` `simulation` `katex` `canvas` `github-pages` `open-source` `stem`

---

## 👤 Geliştirici

**Mehmet Aydın Mert** — affeLab bilim ekosisteminin ve scienceWiki'nin fikir sahibi ve geliştiricisi · [@mehmetmert](https://github.com/mehmetmert)

## 📜 Lisans

Kod: MIT © Mehmet Aydın Mert. Bağlı laboratuvarlardaki veri ve görsellerin atıfları ilgili repolarda yer alır.
