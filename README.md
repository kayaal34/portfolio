# Yahya Kayaal — Kişisel Portfolyo

Tek sayfalık (SPA), premium hissiyatlı, **üç dilli (Türkçe · English · Русский)** kişisel portfolyo sitesi.
Tüm metin, tarih ve proje içerikleri doğrudan CV'den alınmıştır — hiçbir yer tutucu (placeholder) metin yoktur.

**Stack:** React 18 · Vite 6 · Tailwind CSS 4 · Framer Motion 11 · Lenis · lucide-react

---

## Hızlı başlangıç

Bağımlılıklar zaten kurulu. Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Site `http://localhost:5174` adresinde açılır.

Production build:

```bash
npm run build
```

Build çıktısını yerelde önizlemek için:

```bash
npm run preview
```

---

## İletişim formunu çalışır hâle getirme

Form gerçekten mesaj gönderir. Teslimatı **Web3Forms** yapar: hesap açmanız gerekmez,
tek ihtiyacınız olan bir erişim anahtarıdır.

1. [web3forms.com](https://web3forms.com) adresine girin.
2. "Create your Access Key" alanına **Yahyaeren34@yandex.ru** yazın.
3. Gelen doğrulama e-postasındaki bağlantıya tıklayın; size bir **Access Key** verilir.
4. Proje kök dizinindeki `.env.example` dosyasını `.env` adıyla kopyalayın ve anahtarı yapıştırın:

   ```
   VITE_WEB3FORMS_KEY=buraya-access-key
   ```

5. Geliştirme sunucusunu yeniden başlatın (`npm run dev`). Formdaki rozet
   "Doğrudan gelen kutuma" olarak değişir; artık gönderilen her mesaj e-postanıza düşer.

**Canlıda:** Vercel veya Netlify panelinde aynı değişkeni ekleyin —
`VITE_WEB3FORMS_KEY` — ve projeyi yeniden deploy edin. Vite, `VITE_` ile başlayan
değişkenleri build sırasında koda gömer; bu yüzden anahtarı ekledikten sonra
**yeniden build almanız** gerekir.

**Anahtar yoksa ne olur?** Form ölü kalmaz: gönder'e basıldığında mesaj, ziyaretçinin
kendi e-posta uygulamasında hazır hâlde açılır. Yani anahtarı eklemeden de site
yayına alınabilir.

**Güvenlik notu:** Web3Forms erişim anahtarları herkese açık olacak şekilde tasarlanmıştır
(tek yönlü, yalnızca yazma, hız sınırlı). Tarayıcıya inen kodda görünmesi normaldir ve
kimse bu anahtarla e-postalarınızı okuyamaz. Ayrıca formda görünmez bir "honeypot"
alanı var — botların çoğu buraya takılır.

Başka bir servis kullanmak isterseniz tek değiştirmeniz gereken yer
[`src/config/contactForm.js`](src/config/contactForm.js) ile
`src/components/sections/Contact.jsx` içindeki `handleSubmit` fonksiyonudur.

---

## Yayına alma (deploy)

`npm run build` komutu statik dosyaları `dist/` klasörüne üretir. Bu klasör olduğu gibi
herhangi bir statik hosting servisine yüklenebilir.

### Vercel ile (önerilen)

1. Projeyi GitHub'a gönderin:

   ```bash
   git init && git add -A && git commit -m "Portfolio" && git branch -M main
   ```

   Ardından GitHub'da boş bir repo açıp `git remote add origin <repo-url>` ve `git push -u origin main`.

2. [vercel.com](https://vercel.com) → GitHub ile giriş yapın → **Add New → Project** →
   repoyu seçin.
3. Vercel, Vite'ı otomatik tanır. Ayarları doğrulayın:
   Framework = **Vite**, Build Command = `npm run build`, Output Directory = `dist`.
4. **Environment Variables** bölümüne `VITE_WEB3FORMS_KEY` ekleyin.
5. **Deploy**. Birkaç saniye içinde `proje-adi.vercel.app` adresi hazır olur.

**Kendi alan adınızı bağlama:** Vercel'de proje → **Settings → Domains** →
alan adınızı yazın. Vercel size iki kayıt verir; bunları alan adını aldığınız firmanın
(GoDaddy, Namecheap, Turhost, İsimtescil…) DNS paneline girin:

| Kayıt | Ad    | Değer                   |
| ----- | ----- | ----------------------- |
| A     | `@`   | `76.76.21.21`           |
| CNAME | `www` | `cname.vercel-dns.com.` |

> Vercel panelinde gösterilen değerler önceliklidir — değişebildikleri için oradaki
> değerleri kopyalayın. DNS yayılması genelde 10 dakika ile 1 saat sürer; sonrasında
> HTTPS sertifikası otomatik kurulur.

Bundan sonra `git push` yaptığınız her seferde site kendiliğinden güncellenir.

### Netlify ile

1. [netlify.com](https://netlify.com) → **Add new site → Import an existing project** →
   GitHub reposunu seçin.
2. Build command `npm run build`, Publish directory `dist`.
3. **Site settings → Environment variables** → `VITE_WEB3FORMS_KEY`.
4. Alan adı için **Domain settings → Add a domain**; Netlify'ın verdiği
   `xxx.netlify.app` adresini `www` için CNAME, kök alan adı için de kendi
   verdiği A kaydını DNS paneline girin.

### Diğer seçenekler

- **GitHub Pages:** `dist/` içeriğini `gh-pages` dalına gönderin. Site bir alt dizinde
  yayınlanacaksa `vite.config.js` içine `base: '/repo-adi/'` ekleyin.
- **Kendi sunucunuz:** `dist/` klasörünü nginx / Apache kök dizinine kopyalayın.

---

## Klasör yapısı

```
src/
├── App.jsx                     Route iskeleti + ortak yerleşim (nav, footer, arka plan)
├── main.jsx                    React giriş noktası (BrowserRouter burada)
├── index.css                   Tasarım sistemi: renk değişkenleri, cam efekti,
│                               gradient yardımcıları, keyframe'ler, reduced-motion
├── data/
│   └── profile.js              DİLDEN BAĞIMSIZ VERİ — linkler, tarihler, ikon
│                               adları, teknoloji isimleri, yapısal anahtarlar
├── i18n/
│   ├── index.jsx               Dil context'i, otomatik algılama, kalıcılık,
│   │                           <html lang> / <title> / meta senkronizasyonu
│   └── locales/
│       ├── tr.js               Türkçe metinlerin tamamı
│       ├── en.js               İngilizce metinlerin tamamı
│       └── ru.js               Rusça metinlerin tamamı
├── hooks/
│   ├── useTheme.js             Dark/Light mod + localStorage kalıcılığı
│   ├── useSmoothScroll.js      Lenis momentum scroll + bölüme kaydırma
│   ├── useActiveSection.js     Navbar'daki aktif bölüm takibi
│   └── useMediaQuery.js        Pointer / ekran genişliği sorguları
├── pages/
│   ├── Home.jsx                Ana sayfa — tüm bölümler sırayla
│   └── ContactPage.jsx         /contact rotası: karşılama + form + kanallar
└── components/
    ├── Preloader.jsx           Açılış sahnesi: isim + Portfolyo, dikey perde
    ├── AuroraBackground.jsx    Statik yumuşak ışık, ince grid, film grain
    ├── ScrollProgress.jsx      Üstteki okuma ilerleme çubuğu
    ├── Navbar.jsx              Sağ kenar dikey ray + mobil üst bar/sheet
    ├── LanguageSwitcher.jsx    TR/EN/RU açılır menüsü (klavye destekli)
    ├── ThemeToggle.jsx         Gündüz/gece anahtarı
    ├── Reveal.jsx              Scroll-reveal sarmalayıcıları
    ├── TiltCard.jsx            Fareyi takip eden 3D tilt + parlama
    ├── SpotlightCard.jsx       İmleci takip eden ışık huzmesi
    ├── MagneticButton.jsx      İmlece çekilen manyetik buton
    ├── SectionHeading.jsx      Ortak bölüm başlığı
    ├── Footer.jsx              Dev wordmark + sosyal ikonlar
    └── sections/
        ├── Hero.jsx            Siyah sahne, serif isim, scroll ile dağılan harfler
        ├── About.jsx           Serif manşet, iki paragraf, sayılar, eğitim, diller
        ├── TechStack.jsx       Filtrelenebilir, parlayan teknoloji rozetleri
        ├── Experience.jsx      Çizilen dikey zaman çizelgesi + sertifikalar
        ├── Projects.jsx        7 proje, 3D dönen kartlar, kategori filtresi
        └── Clients.jsx         Referans / müşteri yorumu kartı
```

Bir de `src/config/contactForm.js` var — formun hangi servise gittiğini tanımlar.

---

## Çok dillilik (i18n)

Site Türkçe, İngilizce ve Rusça'yı tam olarak destekler. Dil değiştirme
navigasyon çubuğunun sağ üst köşesindeki açılır menüdedir; seçim **sayfa
yenilenmeden**, kısa bir çapraz geçişle anında uygulanır ve kaydırma konumu korunur.

- **İlk ziyaret:** tarayıcı dili TR/EN/RU'dan biriyse o dil seçilir, değilse İngilizce açılır.
- **Kalıcılık:** seçim `localStorage` içinde `yk-lang` anahtarıyla saklanır.
- Dil değiştiğinde `<html lang>`, sayfa başlığı, meta açıklaması ve Open Graph
  etiketleri de otomatik güncellenir.
- Klavye ile tam kullanılabilir: Yön tuşları, Home/End, Enter ve Escape.

### Metinleri düzenleme

Her dilin metinleri kendi dosyasındadır ve **üçü de birebir aynı anahtar yapısına** sahiptir:

- [`src/i18n/locales/tr.js`](src/i18n/locales/tr.js)
- [`src/i18n/locales/en.js`](src/i18n/locales/en.js)
- [`src/i18n/locales/ru.js`](src/i18n/locales/ru.js)

Bir cümleyi değiştirmek için ilgili anahtarı üç dosyada da güncelleyin.

Linkler, tarihler, teknoloji isimleri ve proje adları çevrilmez; bunlar
[`src/data/profile.js`](src/data/profile.js) içinde tek bir yerde durur.
Proje adlarının İngilizce kalması bilinçli bir tercihtir — CV'nin hem İngilizce
hem Rusça sürümünde bu adlar İngilizce geçiyor.

### Yeni dil eklemek

1. `src/i18n/locales/` altına mevcut bir dosyayı kopyalayıp çevirin.
2. `src/i18n/index.jsx` içindeki `DICTIONARIES` ve `LANGUAGES` listelerine ekleyin.

Yeni bir proje eklerken `profile.js` içine `icon` alanına bir
[lucide-react](https://lucide.dev) ikon adı yazın, aynı adı
`src/components/sections/Projects.jsx` içindeki `ICONS` haritasına ekleyin ve
üç dil dosyasına da `projects.entries` altında karşılığını girin.

## Tasarım sistemini değiştirme

Renkler [`src/index.css`](src/index.css) dosyasının en üstündeki `:root` (light) ve `.dark`
bloklarında tanımlıdır. Örneğin vurgu rengini değiştirmek için `--c-accent`,
`--c-accent-2`, `--c-accent-3` değerlerini güncellemeniz yeterlidir; gradientler,
parlamalar ve rozetler otomatik olarak yeni renge uyar.

## Tipografi ve avatar

Site iki yazı tipi ailesi üzerine kurulu:

- **Playfair Display (serif)** — yalnızca bölüm manşetlerinde. Gövde metninde
  asla kullanılmaz. Tailwind'de `font-serif`, CSS değişkeni `--font-serif`.
- **Inter (sans-serif)** — gövde metni, arayüz, hero'daki isim (ince, 300 ağırlık).
- **JetBrains Mono** — küçük etiketler, tarihler, sayısal meta bilgiler.

Manşet kalıbı her bölümde aynı: mono göz kırpma satırı → serif düz cümle →
devam eden kısım italik ve soluk. Değiştirmek isterseniz tek yer:
[`src/components/SectionHeading.jsx`](src/components/SectionHeading.jsx).

**Avatar:** Hero'daki yuvarlak portre `/public/avatar.png` dosyasını arar.
Dosyayı bu isimle `public/` klasörüne bırakmanız yeterli, kodda değişiklik
gerekmez. Dosya yokken veya yüklenemezse yerine sessizce monogram (YK / КЯ)
görünür — hiçbir zaman kırık resim çıkmaz. Kare ve en az 256×256 px bir görsel
kullanın; `object-cover` ile kırpılır.

---

## Hareket politikası

Hareketin **iki seviyesi** var, açık/kapalı değil —
[`src/hooks/useMotionLevel.js`](src/hooks/useMotionLevel.js):

- **`full`** — tüm koreografi: yer değiştirme, bulanıklık, kademeli giriş,
  scroll'a bağlı dağılma.
- **`gentle`** — yalnızca opaklık. Hiçbir şey hareket etmez, bulanıklaşmaz.

İşletim sistemi "hareketi azalt" dediğinde `gentle` devreye girer. Bu ayar
*hareketi* durdurmayı ister; sayfayı çıplak bırakmayı değil. Bu yüzden site
sönümlenerek yine canlı kalır.

> **Efektleri hiç göremiyorsanız** büyük ihtimalle Windows'ta animasyonlar
> kapalıdır. Kontrol: **Ayarlar → Erişilebilirlik → Görsel efektler →
> Animasyon efektleri**. Açtığınızda `full` seviye devreye girer ve giriş
> perdesi, harf dağılması, scroll efektleri görünür hâle gelir.

Arka plan her koşulda statiktir: sürüklenen ışık lekesi, fare paralaksı veya
kayan şerit yoktur. Sürekli dönen tek hareket, hero'nun altındaki scroll
göstergesindeki ince ışık çizgisidir.

---

## Rotalar

Site iki sayfadan oluşur:

| URL        | İçerik                                                        |
| ---------- | ------------------------------------------------------------- |
| `/`        | Hero, Hakkımda, Teknolojiler, Deneyim, Referanslar, Projeler   |
| `/contact` | Karşılama metni + çalışan iletişim formu + kanallar            |

İletişim bilinçli olarak ana sayfadan çıkarıldı: sayfa, formun en altta
kaybolacağı kadar uzamıştı.

Yönlendirme `react-router-dom` ile istemci tarafında yapılır. Bu yüzden
sunucunun **her URL için `index.html` döndürmesi** gerekir — aksi hâlde
`/contact` adresine doğrudan girmek veya sayfayı yenilemek 404 verir.
Vercel için gereken kural depoda hazır: [`vercel.json`](vercel.json).
Başka bir sunucu kullanacaksanız aynı "SPA fallback" ayarını orada da yapın.

---

## Navigasyon düzeni

1024px üstünde **üst menü yoktur**. Yerine:

- **Sol üst:** monogram (tıklayınca başa döner)
- **Sağ kenar, dikey ortada:** bölüm rayı — etiketin yanındaki çizgi hover'da
  uzar, aktif bölümde uzun kalır. Sonunda "İletişime geç" butonu.
- **Sol alt:** dil değiştirici + tema anahtarı

Sağdaki ray için `.shell` yardımcı sınıfı 1024px üstünde sağdan
`clamp(8rem, 11vw, 11rem)` boşluk bırakır — içerik hiçbir zaman rayın altına
girmez. 1024px altında ray gizlenir, kompakt bir üst bar ve tam ekran menü
devreye girer.

---

## Notlar

- Rusça'da isim, Rusça kullanımına uygun olarak **soyisim önce** ve Kiril alfabesiyle
  yazılır: **Кайаал Яхья**, monogram **КЯ**. TR/EN'de Yahya Kayaal / YK.
- Referans kartındaki logo ve bağlantı yer tutucudur:
  [`src/data/profile.js`](src/data/profile.js) içindeki `clients` dizisinde
  `url` alanını gerçek adresle, `logo` alanını da `/public` klasörüne koyacağınız
  dosyanın yoluyla (`'/otrajenie-logo.svg'` gibi) değiştirin. `url` `'#'` kaldığı sürece
  buton sayfayı en başa atmaz, pasif kalır.
- Varsayılan tema **Dark**'tır; seçim `localStorage` içinde `yk-theme` anahtarıyla saklanır.
  Tema, ilk boyamadan önce `index.html` içindeki küçük bir script ile uygulanır — bu yüzden
  sayfa açılırken yanlış temanın "yanıp sönmesi" yaşanmaz.
- İletişim formu **gerçekten çalışır**. Kurulumu için yukarıdaki
  "İletişim formunu çalışır hâle getirme" bölümüne bakın.
- İşletim sisteminde "hareketi azalt" (reduced motion) açıksa tüm animasyonlar devre dışı
  kalır ve içerik statik olarak görüntülenir.
