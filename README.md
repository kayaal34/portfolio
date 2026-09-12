# Yahya Kayaal — CV sitesi

`kayaal.is-a.dev` — üç dilli (English · Türkçe · Русский) serbest çalışma
sitesi. Tek ekranlık bir açılış sayfası; CV'nin dört bölümü kendi sayfalarında
(`/experience`, `/projects`, `/education`, `/skills`); `/contact` sayfasında form.
Sayfadaki her bilgi Eylül 2026 CV'sinden alınmıştır; uydurma metin yoktur.

**Stack:** React 18 · Vite 6 · Tailwind CSS 4 · lucide-react

---

## Hızlı başlangıç

```bash
npm run dev
```

Site `http://localhost:5174` adresinde açılır. Production derlemesi için:

```bash
npm run build
```

Çıktıyı yerelde denemek için `npm run preview`.

---

## İçeriği güncellemek

CV değiştiğinde yapılacaklar, sırayla:

1. Tarihler, bağlantılar, teknoloji adları ve hangi girdinin listede olduğu
   [`src/data/profile.js`](src/data/profile.js) içindedir.
2. Cümlelerin kendisi üç dil dosyasında durur ve **üçü de aynı anahtar yapısına** sahiptir:
   [`en.js`](src/i18n/locales/en.js) · [`tr.js`](src/i18n/locales/tr.js) ·
   [`ru.js`](src/i18n/locales/ru.js). Bir girdi eklerken `profile.js` içindeki `id` ile
   üç dosyadaki anahtar aynı olmalı.
3. Son güncelleme tarihi (footer) `footer.updated` anahtarındadır.

Sitede CV indirme düğmesi yoktur — PDF yerine sayfanın kendisi özgeçmiş.

---

## Klasör yapısı

```
src/
├── App.jsx                 Rotalar (/, dört bölüm, /contact) + ortak yerleşim
├── main.jsx                React giriş noktası; router seçimi burada
├── index.css               Tasarım sistemi: renk değişkenleri, tipografi,
│                           .label / .btn / .field / .reveal yardımcıları
├── data/profile.js         DİLDEN BAĞIMSIZ VERİ — linkler, tarihler, teknoloji
│                           adları, bölüm sırası, rota yolu
├── i18n/
│   ├── index.jsx           Dil context'i: algılama, kalıcılık, <html lang> /
│   │                       <title> / meta senkronizasyonu
│   └── locales/            en.js · tr.js · ru.js
├── hooks/
│   └── useTheme.js         Açık/koyu tema + localStorage
├── components/
│   ├── Intro.jsx           Açılış: kayaal.is-a.dev yerine oturur, bekler,
│   │                       katman sayfanın üstünde erir (tamamı CSS)
│   ├── Header.jsx          Üst satır: dil, tema; ana sayfa dışında isim
│   │                       ve iletişim
│   ├── ChapterIndex.jsx    Açılış ekranının sağındaki büyük bölüm listesi
│   ├── TransitionLink.jsx  Sayfalar arası geçiş (View Transitions API)
│   ├── Entry.jsx           Tek bir CV satırı (deneyim, proje, eğitim)
│   ├── Reveal.jsx          Görünüme girince bir kez soluk geçiş
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx            Açılış ekranı: solda hero, sağda bölüm listesi
│   ├── ChapterPage.jsx     Bir bölümün sayfası: başlık, içerik, önceki/sonraki
│   └── ContactPage.jsx     /contact: yalnızca çalışan form
└── sections/               Bölümlerin içeriği: Hero · Experience · Projects ·
                            Education · Skills (sertifika/dil/ilgi dahil)
```

---

## Tasarım kararları

- **Açılış bir başlık sayfası.** Ana sayfa tek ekran: solda isim, unvanlar,
  tek cümle, iletişim linki ve üç adres; sağda CV'nin dört bölümü, isimle aynı
  yazı tipinde büyük (44px'e kadar). Altında hiçbir şey yok, footer da yok.
  Telefonda iki yarı üst üste gelir.
- **Her bölüm kendi ekranı.** Bir bölüme basınca sayfa değişir ve bölümün adı
  listedeki yerinden kalkıp yeni sayfanın başlığına dönüşerek büyür (44→76px).
  Bunu tarayıcının View Transitions API'si yapıyor: iki sayfadaki başlık aynı
  `view-transition-name`'i taşıyor, gerisi solarak değişiyor, üst çubuk yerinde
  duruyor ([`TransitionLink.jsx`](src/components/TransitionLink.jsx)).
  API'yi desteklemeyen tarayıcıda (bugün Firefox) ya da "hareketi azalt" açıkken
  normal link gibi çalışır. Tarayıcı 400ms içinde geçişi başlatamazsa (çizim
  yapmayan arka plan sekmesi gibi) sayfa yine de değişir.
- **Geçişe giren başlıklar `<Reveal>` içinde değil.** Geçiş yeni sayfayı hemen
  yakalıyor; opaklığı 0'dan başlayan bir başlık hiçliğe dönüşürdü.
- **Bölüm sayfasının sonunda** önceki ve sonraki bölüm; son bölümden sonra
  İletişim. İndekse dönmeden okumaya devam edilebilir.
- **Okuma göstergesi.** Üst çubuğun kendi saç teli çizgisi, sayfada ne kadar
  ilerlediğinize göre soldan sağa doluyor ([`Header.jsx`](src/components/Header.jsx)).
  Ayrı bir ilerleme çubuğu eklenmedi; zaten orada olan çizgi kullanıldı.
- **Palet.** Renkler [`src/index.css`](src/index.css) başındaki `:root` (açık) ve
  `.dark` bloklarında. Nötrler hafif yeşil-mavi eğilimli soğuk gri; tek vurgu rengi
  `--c-accent` (koyu petrol) yalnızca bağlantı, odak halkası ve form hatasında kullanılır.
- **Tipografi.** Literata (yalnızca isim) · IBM Plex Sans (gövde) · JetBrains Mono
  (etiketler, tarihler). Üçünün de Kiril desteği var — Rusça sürüm bunu gerektiriyor.
- **Hareket.** İki yerde: açılış (adres yerine oturur, katman erir — ~1,9 s) ve
  içerik göründüğünde bir kez 8px + soluk geçiş. Ekranda zaten görünen içerik ilk
  boyamada tam görünür. "Hareketi azalt" ayarı açıkken açılış yalnızca solarak
  oynar, geri kalan hareket kapanır.
- **Varsayılan tema açık.** Seçim `localStorage`'da `yk-theme` anahtarında saklanır ve
  `index.html` içindeki küçük script ile ilk boyamadan önce uygulanır.

---

## İletişim formu

Form gerçekten mesaj gönderir; teslimatı **Web3Forms** yapar.

1. [web3forms.com](https://web3forms.com) → "Create your Access Key" alanına
   **Yahyaeren34@yandex.ru** yazın, gelen e-postayı onaylayın.
2. Anahtarı proje kökündeki `.env` dosyasına koyun:

   ```
   VITE_WEB3FORMS_KEY=buraya-access-key
   ```

3. `npm run dev` sunucusunu yeniden başlatın.

Anahtar yoksa form ölmez: gönder'e basıldığında mesaj ziyaretçinin kendi e-posta
uygulamasında hazır açılır. Web3Forms anahtarları herkese açık olacak şekilde
tasarlanmıştır (tek yönlü, yalnızca yazma, hız sınırlı) — derlenmiş JavaScript'te
görünmesi normaldir. Servisi değiştirmek isterseniz tek dokunacağınız yer
[`src/config/contactForm.js`](src/config/contactForm.js) ve
[`src/pages/ContactPage.jsx`](src/pages/ContactPage.jsx) içindeki `handleSubmit`.

**Canlıda:** Vercel panelinde aynı değişkeni (`VITE_WEB3FORMS_KEY`) ekleyip yeniden
deploy edin. Vite `VITE_` ile başlayan değişkenleri derleme anında koda gömer.

---

## Yayına alma

`git push` → Vercel otomatik derler ve `kayaal.is-a.dev` güncellenir.
Build komutu `npm run build`, çıktı klasörü `dist`.

`/contact` istemci tarafında bir rota olduğu için sunucunun **her URL'e
`index.html` döndürmesi** gerekir; Vercel kuralı depoda hazır:
[`vercel.json`](vercel.json). Başka bir sunucuda aynı "SPA fallback" ayarını
yapın — ya da rewrite yazamadığınız bir yere (paylaşımlı önizleme gibi)
koyacaksanız `VITE_HASH_ROUTER=true npm run build` ile hash rotalı derleyin.

---

## Notlar

- Rusça sürümde isim, Rusça kullanımına uygun olarak soyisim önce ve Kiril
  alfabesiyle yazılır: **Кайаал Яхья**.
- Proje adları (FlipRU, Değerix, AI Trip Planner…) çevrilmez — CV'nin hem
  İngilizce hem Rusça sürümünde İngilizce geçiyorlar.
- Subscription Hunter'ın Google Play bağlantısı bilinçli olarak verilmedi:
  mağaza sayfası herkese açık olmadığı sürece bağlantı 404 döner. Yayına
  çıktığında `profile.js` içindeki girdiye `store` alanı eklenebilir.
- Telefon numarası siteye konmadı; CV'de var. İstenirse `src/data/profile.js`
  içindeki `socials` dizisine eklenebilir.
