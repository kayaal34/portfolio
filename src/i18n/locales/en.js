/**
 * English copy.
 *
 * Facts (dates, institutions, technologies, responsibilities) come from the
 * CV. The prose around them is written for a senior engineering audience —
 * architecture and outcomes rather than adjectives.
 */
export default {
  code: 'en',
  htmlLang: 'en',

  meta: {
    title: 'Yahya Kayaal — Software Engineer',
    description:
      'Yahya Kayaal — Software Engineer. Dual diplomas in Software Engineering and Embedded Systems from Ural Federal University, MSc in Artificial Intelligence at ITMO. Scalable backends with Python (FastAPI), cross-platform apps with Flutter & Dart, AI/NLP pipelines and embedded Linux systems.',
  },

  name: { lineOne: 'Yahya', lineTwo: 'Kayaal', full: 'Yahya Kayaal', monogram: 'YK' },
  role: 'Software Engineer',
  location: 'Istanbul / St. Petersburg',

  nav: {
    home: 'Home',
    about: 'About',
    stack: 'Stack',
    experience: 'Experience',
    projects: 'Projects',
    clients: 'Clients',
    contact: 'Contact',
    cta: 'Get in touch',
  },

  a11y: {
    skip: 'Skip to content',
    primaryNav: 'Primary',
    backToTop: 'Back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toLightMode: 'Switch to light mode',
    toDarkMode: 'Switch to dark mode',
    language: 'Language',
    chooseLanguage: 'Choose a language',
    scrollToAbout: 'Scroll to the About section',
  },

  hero: {
    available: 'Open to backend, mobile & AI engineering roles',
    rotating: ['Backend', 'Mobile', 'AI / NLP', 'Embedded'],
    leadBefore: 'Software Engineer building ',
    leadAfter:
      ' systems — from FastAPI services and PostgreSQL schemas to Flutter clients and embedded Linux boards.',
    ctaPrimary: 'Explore the work',
    ctaSecondary: 'Start a conversation',
    scroll: 'Scroll',
    codeComment: '# ship it, then make it faster',
    stats: {
      diplomas: 'Bachelor diplomas',
      msc: 'MSc in AI · in progress',
      projects: 'Engineering projects',
      languages: 'Working languages',
    },
  },

  about: {
    eyebrow: 'About',
    title: 'From embedded boards to',
    accent: 'applied intelligence.',
    summary:
      'Software engineer with dual diplomas in Software Engineering and Embedded Systems from Ural Federal University, now reading for an MSc in Artificial Intelligence at ITMO. I architect scalable backend services in Python (FastAPI), model the relational systems underneath them (PostgreSQL, MySQL), and ship cross-platform clients with Flutter & Dart.',
    summaryTail:
      'My work sits where applied AI meets production engineering: language-model pipelines that have to answer reliably, data layers that have to stay consistent, and embedded systems that have to run unattended for months. Industry practice inside VK and Yandex shaped how I approach delivery — explicit interfaces, observable behaviour, and code the next engineer can take ownership of without a handover meeting. Working across Turkish, Russian and English, I move easily between international teams and the domain experts they build for.',
    educationLabel: 'Education',
    languagesLabel: 'Languages',
    howIWorkLabel: 'Engineering principles',
    interests: 'Licensed Taekwondo athlete — discipline that transfers well to code review.',
    inProgress: 'In progress',
    softSkills: [
      'Architecture before implementation',
      'Interfaces are contracts',
      'Readable beats clever',
      'Measure before optimising',
      'Design for failure',
      'Learn the domain, not just the stack',
    ],
    education: {
      itmoMsc: {
        degree: 'Master of Science: Artificial Intelligence',
        school: 'ITMO University',
        place: 'St. Petersburg, Russia',
        notes: [
          'Graduate specialisation in machine learning, deep learning and applied AI systems.',
          'Taking the NLP and recommendation work from my engineering practice to research depth.',
        ],
      },
      bscSoftwareEngineering: {
        degree: 'Bachelor of Science: Software Engineering',
        school: 'Ural Federal University',
        place: 'Yekaterinburg, Russia',
        notes: [
          'Russian Government Scholarship for International Students, awarded 2022 via Rossotrudnichestvo.',
        ],
      },
      embeddedSystems: {
        degree: 'Professional Diploma: Embedded Systems Programming',
        school: 'Ural Federal University',
        place: 'Yekaterinburg, Russia',
        notes: [
          'Second qualification alongside the software engineering degree — Linux on microprocessor systems.',
        ],
      },
      preparatoryFaculty: {
        degree: 'Preparatory Faculty: Russian as a Foreign Language',
        school: 'Ural Federal University',
        place: 'Yekaterinburg, Russia',
        notes: [],
      },
    },
    languages: {
      turkish: { name: 'Turkish', level: 'Native' },
      russian: { name: 'Russian', level: 'Professional' },
      english: { name: 'English', level: 'Professional' },
    },
  },

  stack: {
    eyebrow: 'Tech Stack',
    title: 'The tools I reach for',
    accent: 'every day.',
    lead: 'Backend architecture, mobile clients, data layers and bare-metal Linux — the full path from a request handler down to a microcontroller pin.',
    groups: {
      all: 'All',
      backend: 'Backend',
      mobile: 'Mobile',
      embedded: 'Embedded',
      cloud: 'Cloud',
      web: 'Web',
      core: 'Core',
    },
    details: {
      python: 'FastAPI · AI/NLP · Scraping',
      flutter: 'Cross-platform mobile UI',
      embedded: 'Linux programming',
      databases: 'Relational data architecture',
      algorithms: 'Complexity analysis',
      dotnet: 'Server-side services',
      yandexCloud: 'Serverless · DevOps automation',
      web: 'Web fundamentals',
      kotlin: 'Android SDK',
      git: 'Project management',
      linux: 'OS fundamentals',
    },
  },

  experience: {
    eyebrow: 'Experience',
    title: 'Where the discipline',
    accent: 'was forged.',
    lead: "Industry practice inside VK's ecosystem, and two years of high-pressure, trilingual operations work before it.",
    next: 'Next chapter — open to new roles',
    certificationsLabel: 'Certifications',
    entries: {
      vk: {
        role: 'VK Education Practice 2025',
        meta: 'VK Russian Company · Yekaterinburg (Remote)',
        kind: 'Internship',
        tags: ['Python', 'REST API', 'VK Mini Apps', 'VK Bridge'],
        bullets: [
          'Built and deployed a VK Mini App on modern web foundations, integrated end to end with the VKontakte platform.',
          'Designed the backend architecture and RESTful APIs in Python, with authentication handled through VK ID and VK Bridge.',
          'Cut perceived load time by moving the client to asynchronous data fetching and a responsive state-management model.',
        ],
      },
      sky: {
        role: 'International Student Consultant',
        meta: 'Sky Education · Yekaterinburg, Russia',
        kind: 'Full-time',
        tags: ['Crisis management', 'Stakeholder comms', 'Trilingual', 'Process design'],
        bullets: [
          'Owned end-to-end relocation, academic advisory and administrative onboarding for Turkish students moving to Russia.',
          'Resolved complex logistical, legal and bureaucratic escalations under time pressure, often with no precedent to follow.',
          'Acted as the communication bridge between university administrations, local authorities and international students.',
          'Used professional fluency in Turkish, Russian and English to remove language barriers from organisational workflows.',
          'Redesigned orientation and record-keeping so several client cases could run in parallel without dropping details.',
        ],
      },
    },
    certifications: {
      projectBasedLearning: {
        name: 'Project-Based Learning Certificates (AI & VR)',
        issuer: 'Ural Federal University',
      },
      cloudServicesEngineer: {
        name: 'Cloud Services Engineer',
        issuer: 'Yandex Practicum',
      },
      vkInternship: {
        name: 'VK Education Practice Internship',
        issuer: 'VK',
      },
      webFundamentals: {
        name: 'Web Technologies Fundamentals',
        issuer: 'HTML Academy',
      },
      itIntroduction: {
        name: 'Introduction to Information Technologies',
        issuer: 'Academy of BTK',
      },
    },
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Systems I designed,',
    accent: 'built and shipped.',
    lead: 'Seven systems across LLM and NLP pipelines, service backends, cross-platform mobile clients and embedded hardware.',
    note: 'Source code, architectural notes and further engineering work live in my GitHub repository.',
    categories: {
      all: 'All',
      ai: 'AI / NLP',
      backend: 'Backend',
      mobile: 'Mobile',
      iot: 'Embedded / IoT',
    },
    entries: {
      aiTravel: {
        role: 'Full-Stack Engineer',
        description:
          'A FastAPI service that turns free-form travel intent into a routed itinerary. I built the backend from scratch and orchestrated the language model through LangChain, then grounded every generated route in real geography via the Google Maps API so the output is navigable rather than plausible-sounding.',
      },
      libraryAi: {
        role: 'AI Engineer',
        description:
          'A neural recommendation engine for a university industry partner, built to surface the next book a reader will actually finish. Delivered as a working system rather than a notebook, and scored highly on evaluation by the partner.',
        highlight: 'Delivered for an industry partner',
      },
      sentiment: {
        role: 'NLP Engineer',
        description:
          'An end-to-end natural language processing pipeline in Python: text normalisation, feature extraction and machine-learning classification of sentiment. Structured as discrete, testable stages so models can be swapped without rewriting the pipeline around them.',
      },
      financeBot: {
        role: 'Backend Engineer',
        description:
          'A service that runs unattended around the clock, scraping exchange rates, gold prices and mutual fund quotes into PostgreSQL and publishing scheduled digests over the Telegram Bot API. Built defensively — upstream pages change without warning, so parsing failures degrade instead of taking the service down.',
      },
      commercePlatform: {
        role: 'Backend Engineer',
        description:
          'Server-side architecture for two production domains: online retail and workout tracking. I modelled the relational schema, drew the service boundaries and implemented the core business logic in Python, keeping domain rules out of the transport layer so the same logic serves web and mobile clients.',
      },
      subscriptions: {
        role: 'Mobile Engineer',
        description:
          'A cross-platform Flutter client that gives recurring subscriptions a single, honest view — renewal dates, cost per period and totals. Backed by a .NET Core service that owns the billing-cycle calculations, so both platforms read the same numbers.',
      },
      smartHome: {
        role: 'Embedded Systems Engineer',
        description:
          'IoT architecture and firmware for automated office lighting, running on embedded Linux microcontrollers. Designed to keep working when the network does not — control logic lives on the device, not in the cloud.',
      },
    },
  },

  clients: {
    eyebrow: 'Clients',
    title: 'Built for people',
    accent: 'who came back to say so.',
    lead: 'Commercial engineering delivered outside the university — the digital groundwork a working studio runs on.',
    visit: 'Visit website',
    badge: 'Client',
    entries: {
      otrajenie: {
        descriptor: 'Self-portrait photography studio',
        quote:
          "Yahya's technical vision and the speed at which he solves problems made our processes dramatically faster while we were building our digital infrastructure. We wanted a modern developer for a modern studio — and we are delighted with the result.",
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's build the next",
    accent: 'thing together.',
    lead: 'Open to backend, mobile and AI engineering roles across Istanbul, St. Petersburg and remote-first teams.',
    statement: 'Pick whichever channel you like —',
    statementAccent: 'all of them reach me.',
    formTitle: 'Send a message',
    formBadgeLive: 'Straight to my inbox',
    formBadgeMail: 'Opens your mail app',
    fields: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
    },
    submit: 'Send message',
    submitting: 'Sending…',
    successTitle: 'Message sent',
    successBody: 'Thank you — it landed in my inbox and I usually reply the same day.',
    errorTitle: "Couldn't send",
    errorBefore: 'Something went wrong on the way. Please write to ',
    errorAfter: ' directly and it will reach me.',
    fallbackTitle: 'Your mail app is opening',
    fallbackBefore: 'Your message has been composed for you. If nothing opened, write to ',
    fallbackAfter: ' instead.',
    mailSubject: 'New message from your portfolio',
    channels: {
      email: 'Email',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      telegram: 'Telegram',
    },
  },

  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Built with React · Tailwind CSS · Framer Motion',
    backToTop: 'Back to top',
  },
};
