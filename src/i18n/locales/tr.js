/**
 * Türkçe metinler.
 *
 * Olgular (tarihler, kurumlar, teknolojiler, sorumluluklar) CV'den gelir.
 * Etrafındaki anlatım kıdemli bir mühendislik okuyucusu için yazılmıştır —
 * sıfatlar değil, mimari ve sonuçlar.
 */
export default {
  code: 'tr',
  htmlLang: 'tr',

  meta: {
    title: 'Yahya Kayaal — Yazılım Mühendisi & Yapay Zeka Geliştiricisi',
    description:
      'Yahya Kayaal portfolyosu (kayaal.is-a.dev) — backend yazılım mühendisi ve yapay zeka geliştiricisi. Python ve FastAPI ile ölçeklenebilir servisler, yapay zeka/NLP hatları, Flutter ile mobil uygulamalar ve gömülü Linux sistemleri. ITMO Üniversitesi Yapay Zeka yüksek lisansı.',
  },

  name: { lineOne: 'Yahya', lineTwo: 'Kayaal', full: 'Yahya Kayaal', monogram: 'YK' },
  intro: { word: 'Portfolyo' },
  role: 'Yazılım Mühendisi',
  location: 'İstanbul / St. Petersburg',

  nav: {
    home: 'Ana Sayfa',
    about: 'Hakkımda',
    stack: 'Teknolojiler',
    experience: 'Deneyim',
    projects: 'Projeler',
    clients: 'Referanslar',
    contact: 'İletişim',
    cta: 'İletişime geç',
  },

  a11y: {
    skip: 'İçeriğe atla',
    primaryNav: 'Ana menü',
    backToTop: 'Başa dön',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    toLightMode: 'Açık moda geç',
    toDarkMode: 'Koyu moda geç',
    language: 'Dil',
    chooseLanguage: 'Dil seçin',
    scrollToAbout: 'Hakkımda bölümüne kaydır',
  },

  hero: {
    tagline: 'Yazılım Mühendisi · Yapay Zeka Araştırmacısı',
    ctaPrimary: 'Çalışmalarım',
    ctaSecondary: 'İletişime geç',
    scroll: 'Kaydır',
  },

  about: {
    eyebrow: 'Hakkımda',
    titleLead: 'Ben Yahya.',
    titleRest: 'Yazılım mühendisi ve yapay zeka araştırmacısı.',
    intro1:
      "Rusya'ya Rossotrudniçestvo bursuyla geldim; Ural Federal Üniversitesi'nde Yazılım Mühendisliği okudum. Ardından ITMO Üniversitesi'nden Yapay Zeka üzerine yüksek lisans teklifi aldım — şu an oradayım.",
    intro2:
      'Karmaşık algoritmalar ile kusursuz kullanıcı deneyimi arasındaki köprüyü kuruyorum; gömülü sistemlerin donanımsal sınırlarından yapay zekânın açık uçlu potansiyeline kadar. Lisans tezim MyAiTripPlanner oldu: LangChain ile kurduğum bir dil modeli hattı üzerinden serbest metinle anlatılan gezi niyetini gerçek bir rotaya çeviren FastAPI tabanlı bir platform. Aynı dönemde Studio Otrajenie’nin web sitesini tasarlayıp geliştirdim — ilk taslaktan yayına kadar uçtan uca.',
    intro3:
      'Ekranın dışında sporla içli dışlıyım; düzenli antrenmanın bıraktığı sabır ve odak masa başında da işe yarıyor. Diğer sabitim gezmek: yeni şehirler görmek, tanımadığım yerlerde yaşamak. Benim için tatilden çok, nasıl düşündüğümü değiştiren bir şey.',
    disciplines: ['Backend', 'Yapay Zeka & NLP', 'Mobil', 'Gömülü Sistemler', 'Front-end / React'],
    educationLabel: 'Eğitim',
    languagesLabel: 'Diller',
    howIWorkLabel: 'Hayat felsefem',
    inProgress: 'Devam ediyor',
    philosophy: 'Zorlandığım yerde öğreniyorum. Kolay olan hiçbir şey bana bir şey öğretmedi.',
    education: {
      itmoMsc: {
        degree: 'Yüksek Lisans: Yapay Zeka',
        school: 'ITMO Üniversitesi',
        place: 'St. Petersburg, Rusya',
        notes: [
          'Makine öğrenmesi, derin öğrenme ve uygulamalı yapay zeka sistemleri üzerine yüksek lisans uzmanlaşması.',
          'Mühendislik pratiğimdeki NLP ve öneri sistemi çalışmalarını araştırma derinliğine taşıyorum.',
        ],
      },
      bscSoftwareEngineering: {
        degree: 'Lisans: Yazılım Mühendisliği',
        school: 'Ural Federal Üniversitesi',
        place: 'Yekaterinburg, Rusya',
        notes: [
          'Rusya Federasyonu Hükümet Bursu — uluslararası öğrenciler için, 2022 (Rossotrudniçestvo).',
        ],
      },
      embeddedSystems: {
        degree: 'Mesleki Diploma: Gömülü Sistem Programlama',
        school: 'Ural Federal Üniversitesi',
        place: 'Yekaterinburg, Rusya',
        notes: [
          'Yazılım mühendisliği diplomasıyla eş zamanlı ikinci yeterlilik — mikroişlemci sistemleri üzerinde Linux.',
        ],
      },
      preparatoryFaculty: {
        degree: 'Hazırlık Fakültesi: Yabancı Dil Olarak Rusça',
        school: 'Ural Federal Üniversitesi',
        place: 'Yekaterinburg, Rusya',
        notes: [],
      },
    },
    languages: {
      turkish: { name: 'Türkçe', level: 'Ana dil' },
      russian: { name: 'Rusça', level: 'Profesyonel' },
      english: { name: 'İngilizce', level: 'Profesyonel' },
    },
  },

  stack: {
    eyebrow: 'Teknolojiler',
    title: 'Her gün elimin uzandığı',
    accent: 'altı araç.',
    lead: 'Mobil uygulamadan ölçeklenebilir backend’e, API tasarımından hareketli web arayüzlerine kadar işimi bunlarla yapıyorum.',
    details: {
      python: 'FastAPI, SQLAlchemy, REST API',
      react: 'Vite ve Tailwind ile arayüz',
      flutter: 'Android için mobil uygulama',
      databases: 'Şema tasarımı ve sorgular',
      ai: 'Dil modelleri ve CNN eğitimi',
      embedded: 'Mikrodenetleyici programlama',
    },
  },

  experience: {
    eyebrow: 'Deneyim',
    title: 'Disiplinin',
    accent: 'şekillendiği yer.',
    lead: 'VK ekosisteminde saha pratiği ve öncesinde iki yıl süren, üç dilli ve yüksek baskılı operasyon deneyimi.',
    certificationsLabel: 'Sertifikalar',
    entries: {
      vk: {
        role: 'VK Education Uygulamalı Program 2025',
        meta: 'VK Rusya · Yekaterinburg (Uzaktan)',
        kind: 'Staj',
        tags: ['Python', 'REST API', 'VK Mini Apps', 'VK Bridge'],
        bullets: [
          'Modern web temelleri üzerinde bir VK Mini App geliştirip yayına aldım; VKontakte platformuyla uçtan uca entegre ettim.',
          'Backend mimarisini ve RESTful API’leri Python ile tasarladım; kimlik doğrulamayı VK ID ve VK Bridge üzerinden kurguladım.',
          'İstemciyi asenkron veri çekme ve duyarlı bir durum yönetimi modeline taşıyarak algılanan yüklenme süresini kısalttım.',
        ],
      },
      sky: {
        role: 'Uluslararası Öğrenci Danışmanı',
        meta: 'Sky Education · Yekaterinburg, Rusya',
        kind: 'Tam zamanlı',
        tags: ['Kriz yönetimi', 'Paydaş iletişimi', 'Üç dilli', 'Süreç tasarımı'],
        bullets: [
          'Rusya’ya gelen Türk öğrenciler için relokasyon, akademik danışmanlık ve idari süreçleri uçtan uca sahiplendim.',
          'Zaman baskısı altında, çoğu zaman izlenecek bir emsal olmadan, karmaşık lojistik, hukuki ve bürokratik krizleri çözdüm.',
          'Üniversite yönetimleri, yerel makamlar ve uluslararası öğrenciler arasındaki iletişim köprüsü oldum.',
          'Türkçe, Rusça ve İngilizcedeki profesyonel hâkimiyetimi kullanarak dil bariyerlerini süreçlerin dışına çıkardım.',
          'Oryantasyon ve kayıt tutma akışlarını yeniden tasarlayarak birden fazla dosyanın detay kaybetmeden paralel yürümesini sağladım.',
        ],
      },
    },
    certifications: {
      projectBasedLearning: {
        name: 'Proje Tabanlı Öğrenim Sertifikaları (Yapay Zeka & VR)',
        issuer: 'Ural Federal Üniversitesi',
      },
      cloudServicesEngineer: {
        name: 'Bulut Servisleri Mühendisi',
        issuer: 'Yandex Practicum',
      },
      vkInternship: {
        name: 'VK Education Uygulamalı Staj Programı',
        issuer: 'VK',
      },
      webFundamentals: {
        name: 'Web Teknolojileri Temelleri',
        issuer: 'HTML Academy',
      },
      itIntroduction: {
        name: 'Bilgi Teknolojilerine Giriş',
        issuer: 'BTK Akademi',
      },
    },
  },

  projects: {
    eyebrow: 'Projeler',
    title: 'Yazdığım ve',
    accent: 'yayına aldığım işler.',
    lead: 'Beşi de GitHub’da açık kaynak — kaynak koda her karttan ulaşabilirsiniz.',
    note: 'Kaynak kodların tamamı ve diğer çalışmalarım GitHub profilimde.',
    repoLabel: 'Kaynak kod',
    entries: {
      aiTripPlanner: {
        role: 'Full-Stack Geliştirici',
        description:
          'Lisans bitirme projem. Kullanıcının seçtiği şehir, ilgi alanları, bütçe ve ulaşım tercihine göre gezi rotası üreten full-stack bir uygulama yazdım. Backend’i FastAPI, PostgreSQL ve async SQLAlchemy ile kurdum, kimlik doğrulamayı JWT ile çözdüm; rotaları OpenAI dil modeliyle üretip Google Maps Directions API ile gerçek yollara oturttum. Arayüzü React, TypeScript ve Tailwind ile yazdım.',
        highlight: 'Bitirme projesi',
      },
      subscriptionHunter: {
        role: 'Mobil Geliştirici',
        description:
          'Android için çevrimdışı çalışan bir abonelik takipçisi geliştirdim. Ödediğiniz servisleri ekliyor, aylık ve yıllık maliyeti gösteriyor, her yenilemeden önce hatırlatıyor. Flutter ve Dart ile yazdım; Material 3 arayüz, tam açık/koyu tema desteği ve marka renkleriyle hazır gelen 35 servis var — tek dokunuşla ekleniyor. Şu an Google Play’de kapalı testte.',
      },
      emotionDetection: {
        role: 'Yapay Zeka Geliştirici',
        description:
          'Ham görüntü verisinden duygu sınıflandırması yapan bir derin öğrenme hattı kurdum. Python ve TensorFlow ile evrişimli sinir ağı (CNN) eğittim; hat, ham piksel verisini otomatik olarak sınıflara ayırıp eğitime hazır hâle getiriyor. Veri hazırlıktan model eğitimine kadar her adım tekrarlanabilir.',
      },
      marketBot: {
        role: 'Backend Geliştirici',
        description:
          'Kendi başına çalışan bir Telegram botu yazdım. Döviz kurlarını, altın fiyatlarını ve fon değerlerini düzenli olarak toplayıp isteyen kullanıcıya anlık gönderiyor. Python ile yazdım; kaynak sayfalar habersiz değiştiği için ayrıştırmayı savunmacı kurdum — bir kaynak bozulduğunda bot düşmüyor, o kaydı atlıyor.',
      },
      stairLights: {
        role: 'Gömülü Sistem Geliştirici',
        description:
          'Akıllı ev sistemlerine entegre olabilen bir merdiven aydınlatma sistemi tasarladım ve programladım. Hareket algılandığında basamakları sırayla yakan kontrol mantığını C++ ile mikrodenetleyici üzerine yazdım; mantık cihazın kendisinde durduğu için sistem ağa bağlı olmadan da çalışıyor.',
      },
    },
  },

  clients: {
    eyebrow: 'Referanslar',
    title: 'Teslim ettiğim iş,',
    accent: 'müşterimin ağzından.',
    lead: 'Ticari olarak geliştirdiğim ve hâlen kullanılan bir iş.',
    visit: 'Siteyi ziyaret et',
    badge: 'Müşteri',
    entries: {
      otrajenie: {
        descriptor: 'Otoportre fotoğraf stüdyosu',
        quote:
          'Stüdyomuzun tanıtım ve rezervasyon sitesini Yahya geliştirdi. Talebimiz sade ve hızlı bir arayüzdü; teslim edilen sonuç bunu karşıladı. Yönetim paneli günlük işleyişimizde sorunsuz çalışıyor ve teslim, konuşulan takvimin içinde kaldı.',
      },
    },
  },

  contact: {
    eyebrow: 'İletişim',
    title: 'Bir fikir, bir proje',
    accent: 'ya da sadece merhaba.',
    lead: 'İstanbul, St. Petersburg ve uzaktan çalışan ekiplerde backend, mobil ve yapay zeka mühendisliği rollerine açığım.',
    pageLead: 'Hangisi olursa olsun yazın — en kısa zamanda dönüş yapacağım.',
    statement: 'Hangi kanalı tercih ederseniz edin —',
    statementAccent: 'hepsi bana ulaşır.',
    formTitle: 'Mesaj gönderin',
    formBadgeLive: 'Doğrudan gelen kutuma',
    formBadgeMail: 'E-posta uygulamanızı açar',
    fields: {
      name: 'Ad',
      email: 'E-posta',
      subject: 'Konu',
      message: 'Mesaj',
    },
    submit: 'Mesajı gönder',
    submitting: 'Gönderiliyor…',
    successTitle: 'Mesaj gönderildi',
    successBody: 'Teşekkürler — gelen kutuma ulaştı, genelde aynı gün dönüş yapıyorum.',
    errorTitle: 'Gönderilemedi',
    errorBefore: 'Yolda bir şeyler ters gitti. Lütfen doğrudan ',
    errorAfter: ' adresine yazın, bana mutlaka ulaşır.',
    fallbackTitle: 'E-posta uygulamanız açılıyor',
    fallbackBefore: 'Mesajınız sizin için hazırlandı. Bir şey açılmadıysa ',
    fallbackAfter: ' adresine yazabilirsiniz.',
    mailSubject: 'Portfolyo sitenizden yeni mesaj',
    channels: {
      email: 'E-posta',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      telegram: 'Telegram',
    },
  },

  footer: {
    rights: 'Tüm hakları saklıdır.',
    builtWith: 'React · Tailwind CSS · Framer Motion ile geliştirildi',
    backToTop: 'Başa dön',
  },
};
