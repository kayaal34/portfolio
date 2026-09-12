# Yahya Kayaal — CV sitesi

`kayaal.is-a.dev` — iki sayfa, üç dilli (English · Türkçe · Русский) serbest
çalışma sitesi: ana sayfada iş geçmişi, `/contact` sayfasında iletişim formu.
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
├── App.jsx                 Rotalar (/ ve /contact) + ortak yerleşim
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
│   ├── useTheme.js         Açık/koyu tema + localStorage
│   └── useActiveSection.js Header'daki aktif bölüm takibi
├── components/
│   ├── Intro.jsx           Açılış: kayaal.is-a.dev yerine oturur, bekler,
│   │                       katman sayfanın üstünde erir (tamamı CSS)
│   ├── Header.jsx          Üst satır: isim, bölüm linkleri, iletişim, dil, tema
│   ├── Section.jsx         Sayfanın tek yerleşimi: sol etiket + sağ içerik,
│   │                       ve tek bir CV satırını basan <Entry>
│   ├── Reveal.jsx          Görünüme girince bir kez soluk geçiş
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx            Ana sayfa: tüm bölümler sırayla
│   └── ContactPage.jsx     /contact: kanallar + çalışan form
└── sections/               Hero · Experience · Projects · Education ·
                            Skills · Extras (sertifika/dil/ilgi)
```

---

## Tasarım kararları

- **Tek yerleşim.** Her bölüm `Section` üzerinden basılır: solda mono küçük
  etiket, sağda içerik. Sayfadaki hizalama bundan gelir; bölüme özel yerleşim yok.
  Geniş ekranda etiket kendi bölümü kayarken sabit durur (`position: sticky`) —
  sayfa tek uzun kolon değil, bölüm bölüm okunuyor.
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
