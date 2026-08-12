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
    title: 'Yahya Kayaal — Yazılım Mühendisi',
    description:
      'Yahya Kayaal — Yazılım Mühendisi. Ural Federal Üniversitesi Yazılım Mühendisliği ve Gömülü Sistemler çift diploması, ITMO Üniversitesi Yapay Zeka yüksek lisansı. Python (FastAPI) ile ölçeklenebilir backend, Flutter & Dart ile çapraz platform istemciler, yapay zeka/NLP hatları ve gömülü Linux sistemleri.',
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
    available: 'Yeni rollere açığım',
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
      'Karmaşık algoritmalar ile kusursuz kullanıcı deneyimleri arasındaki köprüyü kuruyorum. Gömülü sistemlerin donanımsal sınırlarından yapay zekânın açık uçlu potansiyeline kadar geniş bir alanda kod yazıyorum.',
    intro2:
      'Lisans tezim MyAiTripPlanner oldu: kullanıcının serbest metinle anlattığı gezi niyetini, LangChain üzerinden kurduğum bir dil modeli hattıyla gerçek bir rotaya çeviren FastAPI tabanlı bir platform. Aynı dönemde Studio Otrajenie’nin web sitesini tasarlayıp geliştirdim — ilk taslaktan yayına kadar uçtan uca benim işimdi.',
    intro3:
      'Ekranın dışında ringde ve ağırlık odasındayım; lisanslı taekwondo geçmişim var, şimdi boks çalışıyorum. Buradan masa başına birebir geçen tek bir şey öğrendim: bir problem ilk denemede düşmediğinde tekrar kalkmak. Odak da sabır da orada şekilleniyor.',
    disciplines: ['Backend', 'Yapay Zeka & NLP', 'Mobil', 'Gömülü Sistemler', 'Front-end / React'],
    educationLabel: 'Eğitim',
    languagesLabel: 'Diller',
    howIWorkLabel: 'Mühendislik ilkelerim',
    inProgress: 'Devam ediyor',
    softSkills: [
      'Önce mimari, sonra kod',
      'Arayüz bir sözleşmedir',
      'Zekice değil, okunur olsun',
      'Optimize etmeden önce ölç',
      'Hataya dayanıklı tasarla',
      'Sadece stack’i değil, alanı öğren',
    ],
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
    accent: 'araçlar.',
    lead: 'Backend mimarisi, mobil istemciler, veri katmanları ve çıplak donanım üzerinde Linux — bir istek işleyicisinden mikrodenetleyici pinine kadar uzanan yolun tamamı.',
    groups: {
      all: 'Tümü',
      backend: 'Backend',
      mobile: 'Mobil',
      embedded: 'Gömülü',
      cloud: 'Bulut',
      web: 'Web',
      core: 'Temel',
    },
    details: {
      python: 'FastAPI · Yapay zeka/NLP · Veri kazıma',
      flutter: 'Çapraz platform mobil arayüz',
      embedded: 'Linux programlama',
      databases: 'İlişkisel veri mimarisi',
      algorithms: 'Karmaşıklık analizi',
      dotnet: 'Sunucu tarafı servisler',
      yandexCloud: 'Serverless · DevOps otomasyonu',
      web: 'Web temelleri',
      kotlin: 'Android SDK',
      git: 'Proje yönetimi',
      linux: 'İşletim sistemi temelleri',
    },
  },

  experience: {
    eyebrow: 'Deneyim',
    title: 'Disiplinin',
    accent: 'şekillendiği yer.',
    lead: 'VK ekosisteminde saha pratiği ve öncesinde iki yıl süren, üç dilli ve yüksek baskılı operasyon deneyimi.',
    next: 'Sıradaki bölüm — yeni rollere açığım',
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
    title: 'Tasarladığım ve',
    accent: 'kurduğum sistemler.',
    lead: 'Dil modeli ve NLP hatlarından servis backend’lerine, çapraz platform mobil istemcilerden gömülü donanıma uzanan yedi sistem.',
    note: 'Kaynak kodlar, mimari notlar ve diğer mühendislik çalışmaları GitHub profilimde.',
    categories: {
      all: 'Tümü',
      ai: 'Yapay Zeka / NLP',
      backend: 'Backend',
      mobile: 'Mobil',
      iot: 'Gömülü / IoT',
    },
    entries: {
      aiTravel: {
        role: 'Full-Stack Mühendis',
        description:
          'Serbest metinle ifade edilen seyahat niyetini rotalanmış bir gezi planına çeviren bir FastAPI servisi. Backend’i sıfırdan kurdum, dil modelini LangChain üzerinden orkestre ettim; ardından üretilen her rotayı Google Maps API ile gerçek coğrafyaya bağladım — böylece çıktı kulağa mantıklı gelen değil, gerçekten gidilebilir bir rota oluyor.',
      },
      libraryAi: {
        role: 'Yapay Zeka Mühendisi',
        description:
          'Üniversitenin sanayi ortağı için geliştirdiğim, okurun gerçekten bitireceği kitabı öne çıkarmayı hedefleyen sinir ağı tabanlı öneri motoru. Bir not defteri denemesi olarak değil, çalışan bir sistem olarak teslim edildi ve ortak tarafından yüksek puanla değerlendirildi.',
        highlight: 'Sanayi ortağına teslim edildi',
      },
      sentiment: {
        role: 'NLP Mühendisi',
        description:
          'Python’da uçtan uca bir doğal dil işleme hattı: metin normalizasyonu, öznitelik çıkarımı ve makine öğrenmesiyle duygu sınıflandırması. Ayrık ve test edilebilir aşamalar hâlinde kurgulandı; böylece modeller, etrafındaki hattı yeniden yazmadan değiştirilebiliyor.',
      },
      financeBot: {
        role: 'Backend Mühendisi',
        description:
          'Kendi başına 7/24 çalışan bir servis: döviz kurlarını, altın fiyatlarını ve fon değerlerini PostgreSQL’e yazıyor, zamanlanmış özetleri Telegram Bot API üzerinden yayınlıyor. Savunmacı tasarlandı — kaynak sayfalar habersiz değişir, bu yüzden ayrıştırma hataları servisi düşürmek yerine kontrollü biçimde geriliyor.',
      },
      commercePlatform: {
        role: 'Backend Mühendisi',
        description:
          'İki gerçek iş alanı için sunucu tarafı mimarisi: çevrim içi perakende ve antrenman takibi. İlişkisel şemayı modelledim, servis sınırlarını çizdim ve temel iş mantığını Python ile yazdım; alan kurallarını taşıma katmanının dışında tutarak aynı mantığın hem web hem mobil istemcilere hizmet etmesini sağladım.',
      },
      subscriptions: {
        role: 'Mobil Mühendis',
        description:
          'Düzenli abonelikleri tek ve dürüst bir görünümde toplayan çapraz platform Flutter istemcisi — yenilenme tarihleri, dönem başı maliyet ve toplamlar. Faturalama döngüsü hesaplarını üstlenen bir .NET Core servisiyle destekleniyor; böylece iki platform da aynı rakamı okuyor.',
      },
      smartHome: {
        role: 'Gömülü Sistem Mühendisi',
        description:
          'Gömülü Linux çalışan mikrodenetleyiciler üzerinde, ofis aydınlatmasını otomatikleştiren IoT mimarisi ve yazılımı. Ağ çöktüğünde de çalışmaya devam edecek şekilde tasarlandı — kontrol mantığı bulutta değil, cihazın kendisinde.',
      },
    },
  },

  clients: {
    eyebrow: 'Referanslar',
    title: 'Onlar için kurdum,',
    accent: 'geri dönüp anlattılar.',
    lead: 'Üniversite dışında teslim edilen ticari mühendislik işleri — çalışan bir stüdyonun üzerinde durduğu dijital altyapı.',
    visit: 'Web sitesini ziyaret et',
    badge: 'Müşteri',
    entries: {
      otrajenie: {
        descriptor: 'Otoportre fotoğraf stüdyosu',
        quote:
          'Basit ve şık bir arayüz arıyorduk, Yahya tam olarak onu verdi. Hızlı teslim, sorunsuz çalışan bir panel, komplike hiçbir şey yok. Tek kelimeyle muazzam.',
      },
    },
  },

  contact: {
    eyebrow: 'İletişim',
    title: 'Bir projeniz mi var?',
    accent: 'Konuşalım.',
    lead: 'İstanbul, St. Petersburg ve uzaktan çalışan ekiplerde backend, mobil ve yapay zeka mühendisliği rollerine açığım.',
    pageLead:
      'İş fırsatı, freelance bir proje ya da aklınıza takılan bir soru — hepsi yazmanız için yeterli sebep. Formu doldurun, genelde aynı gün dönüş yapıyorum.',
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
