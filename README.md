# Yahya Kayaal — CV sitesi

`kayaal.is-a.dev` — tek sayfa, üç dilli (English · Türkçe · Русский) özgeçmiş sitesi.
Sayfadaki her bilgi, depodaki CV'lerden (`public/Kayaal_Yahya_Resume_EN.pdf` ve
`_RU.pdf`) alınmıştır; uydurma metin yoktur.

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

## CV'yi güncellemek

CV değiştiğinde yapılacaklar, sırayla:

1. Yeni PDF'leri `public/Kayaal_Yahya_Resume_EN.pdf` ve `..._RU.pdf` olarak değiştirin —
   hero'daki "Özgeçmiş (PDF)" düğmesi bu dosyaları indirir, dil seçimine göre.
2. Tarihler, bağlantılar, teknoloji adları ve hangi girdinin listede olduğu
   [`src/data/profile.js`](src/data/profile.js) içindedir.
3. Cümlelerin kendisi üç dil dosyasında durur ve **üçü de aynı anahtar yapısına** sahiptir:
   [`en.js`](src/i18n/locales/en.js) · [`tr.js`](src/i18n/locales/tr.js) ·
   [`ru.js`](src/i18n/locales/ru.js). Bir girdi eklerken `profile.js` içindeki `id` ile
   üç dosyadaki anahtar aynı olmalı.
4. Son güncelleme tarihi (footer) `footer.updated` anahtarındadır.

---

## Klasör yapısı

```
src/
├── App.jsx                 Sayfa iskeleti: header, bölümler, footer
├── main.jsx                React giriş noktası
├── index.css               Tasarım sistemi: renk değişkenleri, tipografi,
│                           .label / .btn / .field / .reveal yardımcıları
├── data/profile.js         DİLDEN BAĞIMSIZ VERİ — linkler, tarihler, teknoloji
│                           adları, bölüm sırası, CV dosya yolları
├── i18n/
│   ├── index.jsx           Dil context'i: algılama, kalıcılık, <html lang> /
│   │                       <title> / meta senkronizasyonu
│   └── locales/            en.js · tr.js · ru.js
├── hooks/
│   ├── useTheme.js         Açık/koyu tema + localStorage
│   └── useActiveSection.js Header'daki aktif bölüm takibi
├── components/
│   ├── Header.jsx          Üst satır: isim, bölüm linkleri, dil, tema
│   ├── Section.jsx         Sayfanın tek yerleşimi: sol etiket + sağ içerik,
│   │                       ve tek bir CV satırını basan <Entry>
│   ├── Reveal.jsx          Görünüme girince bir kez soluk geçiş
│   └── Footer.jsx
└── sections/               Hero · Experience · Projects · Education · Skills ·
                            Extras (sertifika/dil/ilgi) · Contact
```

---

## Tasarım kararları

- **Tek yerleşim.** Her bölüm `Section` üzerinden basılır: solda mono küçük
  etiket, sağda içerik. Sayfadaki hizalama bundan gelir; bölüme özel yerleşim yok.
- **Palet.** Renkler [`src/index.css`](src/index.css) başındaki `:root` (açık) ve
  `.dark` bloklarında. Nötrler hafif yeşil-mavi eğilimli soğuk gri; tek vurgu rengi
  `--c-accent` (koyu petrol) yalnızca bağlantı, odak halkası ve form hatasında kullanılır.
- **Tipografi.** Literata (yalnızca isim) · IBM Plex Sans (gövde) · JetBrains Mono
  (etiketler, tarihler). Üçünün de Kiril desteği var — Rusça sürüm bunu gerektiriyor.
- **Hareket.** Tek animasyon: içerik göründüğünde 8px + soluk geçiş, bir kez.
  Ekranda zaten görünen içerik ilk boyamada tam görünür. "Hareketi azalt" ayarı
  açıkken hiç hareket olmaz.
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
[`src/sections/Contact.jsx`](src/sections/Contact.jsx) içindeki `handleSubmit`.

**Canlıda:** Vercel panelinde aynı değişkeni (`VITE_WEB3FORMS_KEY`) ekleyip yeniden
deploy edin. Vite `VITE_` ile başlayan değişkenleri derleme anında koda gömer.

---

## Yayına alma

`git push` → Vercel otomatik derler ve `kayaal.is-a.dev` güncellenir.
Build komutu `npm run build`, çıktı klasörü `dist`.

Site artık tek sayfa olduğu için SPA fallback kuralına gerek yok;
[`vercel.json`](vercel.json) yalnızca eski `/contact` adresini `/#contact`
bölümüne kalıcı olarak yönlendirir.

---

## Notlar

- Rusça sürümde isim, Rusça kullanımına uygun olarak soyisim önce ve Kiril
  alfabesiyle yazılır: **Кайаал Яхья**.
- Proje adları (FlipRU, Değerix, AI Trip Planner…) çevrilmez — CV'nin hem
  İngilizce hem Rusça sürümünde İngilizce geçiyorlar.
- Subscription Hunter'ın Google Play bağlantısı bilinçli olarak verilmedi:
  mağaza sayfası herkese açık olmadığı sürece bağlantı 404 döner. Yayına
  çıktığında `profile.js` içindeki girdiye `store` alanı eklenebilir.
- Telefon numarası siteye konmadı; CV PDF'inde var. İstenirse
  `src/data/profile.js` ve iletişim bölümüne eklenebilir.
