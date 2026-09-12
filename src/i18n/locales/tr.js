/**
 * Türkçe metin. Bilgiler CV'den (Kayaal_Yahya_Resume_EN / _RU) birebir alındı;
 * yalnızca giriş paragrafları bu sayfa için yazıldı.
 */
export default {
  code: 'tr',
  htmlLang: 'tr',

  meta: {
    title: 'Yahya Kayaal — Serbest Yazılım Geliştirici',
    description:
      'Yahya Kayaal — serbest yazılım geliştirici. Web siteleri, mobil uygulamalar ve arkalarındaki backend: React, Flutter, Python ve FastAPI. St. Petersburg merkezli, uzaktan çalışıyor. ITMO Üniversitesi’nde Yapay Zekâ yüksek lisansı.',
  },

  name: { full: 'Yahya Kayaal', first: 'Yahya', last: 'Kayaal', monogram: 'YK' },
  role: 'Serbest yazılım geliştirici',
  location: 'St. Petersburg / İstanbul',
  present: 'devam ediyor',

  nav: {
    experience: 'Deneyim',
    projects: 'Projeler',
    education: 'Eğitim',
    skills: 'Yetkinlikler',
    contact: 'İletişim',
  },

  a11y: {
    skip: 'İçeriğe geç',
    primaryNav: 'Ana menü',
    language: 'Dil',
    chooseLanguage: 'Dil seçin',
    toLightMode: 'Açık temaya geç',
    toDarkMode: 'Koyu temaya geç',
    backToTop: 'Başa dön',
    openMenu: 'Menü',
    closeMenu: 'Kapat',
  },

  hero: {
    lede: 'Web siteleri, mobil uygulamalar, LLM sistemleri — hangi teknolojik çözüme ihtiyacınız varsa yanınızdayım.',
    cta: 'İletişime geçin',
  },

  sections: {
    experience: 'Deneyim',
    projects: 'Seçili projeler',
    education: 'Eğitim',
    skills: 'Yetkinlikler',
    contact: 'İletişim',
  },

  experience: {
    freelance: {
      role: 'Web Geliştirici',
      org: 'Serbest',
      bullets: [
        'Otrazhenie fotoğraf stüdyosu için Supabase üzerinde yönetim panelli bir randevu sitesi geliştirip yayına aldım; elle tutulan randevu defterinin yerini çevrimiçi kayıt aldı.',
        'Ozon pazar yeri mağaza yöneticisi için yönetim panelli bir portfolyo sitesi teslim ettim; içeriği geliştirici olmadan kendisi yönetiyor.',
      ],
    },
    vk: {
      role: 'Yazılım Geliştirme Stajyeri',
      org: 'VK Education Practice, VK · uzaktan',
      bullets: [
        'Staj kapsamında bir VK Mini App geliştirdim: istemci arayüzü ve sunucu tarafı.',
        'VK ID ve VK Bridge ile kimlik doğrulamayı, VK Storage üzerinden kullanıcı verisinin saklanmasını uyguladım.',
        'Durum yönetimini yeniden düzenledim ve arayüzün akıcı kalması için veriyi asenkron çekmeye geçirdim.',
      ],
    },
    sky: {
      role: 'Öğrenci Danışmanı',
      org: 'Sky Education',
      bullets: [
        'Rusya’ya gelen Türk öğrencilere evrak, kayıt ve üniversite yazışmalarında Türkçe ve Rusça destek verdim.',
      ],
    },
  },

  projects: {
    repo: 'Depo',
    inProgress: 'geliştiriliyor',
    flipru: {
      summary: 'Türkçe ve Rusça kelime uygulaması',
      bullets: [
        'Rusça öğrenen Türkler ve Türkçe öğrenen Ruslar için beş seviyeye (A1–C1) yayılmış 8.000+ kelimelik bir sözlük geliştirdim: vurgu işaretleri, transkripsiyon ve kullanım örnekleriyle.',
        'Testler ve alıştırmalardan oluşan bir pratik bölümü ile yinelenen kayıtları, eksik vurguları ve boş alanları işaretleyen bir sözlük editörü ekledim; uygulama şu anda Google Play’de kapalı testte.',
      ],
    },
    subscriptionHunter: {
      summary: 'Abonelik takibi, Google Play’de yayında',
      bullets: [
        'Her abonelik için çekim tarihleri, toplam harcama ve yenileme hatırlatmaları.',
      ],
    },
    aiTripPlanner: {
      summary: 'Bitirme projesi, Ural Federal Üniversitesi',
      bullets: [
        'İki kişilik ekipte backend ve LLM entegrasyonundan sorumluydum: OpenAI API üzerinden gezi planı üreten, LangChain ile orkestre edilen bir FastAPI servisi.',
        'Google Maps Directions API ile rota çizimini uyguladım; her istek görsel bir güzergâhla dönüyor.',
      ],
    },
    tzReviewer: {
      summary: 'AI Product Hack, MTS vakası',
      bullets: [
        'İki kişilik ekipte teknik şartname inceleme aracı geliştirdim: şartnameyi bölümlere ayırıyor ve bulguları üç kritiklik seviyesinde (blocker / major / minor) döndürüyor.',
        'Belirlenimci kontrolleri kural tabanlı mantığa taşıyarak LLM bağımlılığını azalttım; inceleme başına token maliyeti düştü.',
      ],
    },
    emotionDetection: {
      summary: 'Görüntüden duygu tanıma',
      bullets: [
        'Görüntülerden duygu ifadelerini tanıyan bir model eğittim: veri hazırlığı ve etiketleme, eğitim döngüsü ve sınıflandırma kalitesinin değerlendirilmesi.',
        'Ham görüntüden tahmine kadar tüm hattı kurdum; nihai modeli seçmek için eğitim koşularının sonuçlarını karşılaştırdım.',
      ],
    },
    degerix: {
      summary: 'Türkiye için arsa değerleme',
      bullets: [
        'TKGM API’si üzerinden parseli haritada bulan ve üç satış senaryosu — acil, piyasa, acelesi olmayan satıcı — için değerini aralık ve güven düzeyiyle tahmin eden bir FastAPI servisi geliştiriyorum.',
        'Kadastro, OpenStreetMap Nominatim ve TCMB (EVDS) konut istatistiklerini backend arkasında birleştirdim: yanıt normalizasyonu, önbellek, istek limitlerine uyum, API anahtarları istemciye çıkmıyor; pytest test takımı GitHub Actions’ta koşuyor.',
      ],
    },
    projectBasedLearning: {
      summary: 'Proje tabanlı öğrenim, Ural Federal Üniversitesi (müşteri: UrFU)',
      bullets: [
        'Kişisel kütüphane sistemi için sinir ağı tabanlı bir kitap öneri asistanı geliştirdim.',
        'Proje ekibinde, eski Yekaterinburg binalarının VR simülasyonunu hazırladım.',
      ],
    },
    other: {
      name: 'Diğer projeler',
      summary: null,
      bullets: [
        'Python ve PostgreSQL ile günün yükselen ve düşen hisselerini sabah-akşam özetleyen bir Telegram borsa botu yayına aldım; ayrıca .NET MAUI ile kitap takas uygulaması, belgeden PDF’e dönüştürücü ve mikrodenetleyicili merdiven aydınlatma sistemi.',
      ],
    },
  },

  education: {
    itmo: {
      degree: 'Yüksek lisans, Yapay Zekâ',
      org: 'ITMO Üniversitesi',
      city: 'St. Petersburg',
      notes: [
        'İki yıllık program; Rusya Devlet bursu (Rossotrudnichestvo) kapsamında devlet kontenjanı.',
      ],
    },
    urfu: {
      degree: 'Lisans, Yazılım Mühendisliği (09.03.04)',
      org: 'Ural Federal Üniversitesi',
      city: 'Yekaterinburg',
      notes: [
        'Ortalama 3,87 / 5,00. Dersler: algoritmalar ve veri yapıları, veritabanları, işletim sistemleri, nesne yönelimli programlama.',
        '288 saatlik “Gömülü Sistem Programlama” mesleki yeniden eğitim programını tamamladım (2025).',
        'Rusya Devlet bursu (Rossotrudnichestvo) kapsamında devlet kontenjanı. Hazırlık fakültesi dahil (2021–2022) beş yıl Rusça eğitim.',
      ],
    },
  },

  skills: {
    languages: 'Diller',
    backend: 'Backend',
    data: 'Veri',
    infra: 'Altyapı / DevOps',
    mobile: 'Mobil',
    frontend: 'Frontend',
    ai: 'AI',
    familiar: 'Aşinalık',
  },

  extras: {
    certificationsLabel: 'Sertifikalar',
    languagesLabel: 'Diller',
    interestsLabel: 'İlgi alanları',
    certs: {
      yandex: { name: 'Bulut Servisleri Mühendisi', org: 'Yandex Practicum · 43 saat' },
      vk: { name: 'VK Education Practice', org: 'VK' },
      htmlAcademy: { name: 'Web Teknolojilerinin Temelleri', org: 'HTML Academy' },
    },
    spoken: {
      turkish: { name: 'Türkçe', level: 'ana dil' },
      russian: { name: 'Rusça', level: 'C1' },
      english: { name: 'İngilizce', level: 'B2' },
    },
    interests: 'Lisanslı tekvando sporcusu; şehir çapındaki müsabakalarda madalyalar.',
  },

  contact: {
    title: 'İletişime geçin',
    lede: 'Neye ihtiyacınız olduğunu yazın — bir site, bir uygulama ya da onun bir parçası; kapsam ve fiyatla dönerim. En hızlısı e-posta veya Telegram; aşağıdaki form da aynı adrese düşüyor.',
    labels: {
      email: 'E-posta',
      telegram: 'Telegram',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    form: {
      name: 'Ad',
      email: 'E-posta',
      message: 'Mesaj',
      namePlaceholder: 'Adınız',
      emailPlaceholder: 'siz@sirket.com',
      messagePlaceholder: 'Ne üzerinde çalışıyorsunuz?',
      send: 'Gönder',
      sending: 'Gönderiliyor…',
      sent: 'Teşekkürler — mesaj ulaştı. Bir iki gün içinde dönüyorum.',
      error: 'Mesaj gönderilemedi. Bunun yerine {email} adresine yazabilirsiniz.',
      required: 'Lütfen tüm alanları doldurun.',
      invalidEmail: 'Lütfen e-posta adresini kontrol edin.',
      fallbackNote: 'Kendi e-posta uygulamanız açılır.',
    },
  },

  footer: {
    updated: 'Eylül 2026’da güncellendi',
  },
};
