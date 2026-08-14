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
    title: 'Yahya Kayaal — Software Engineer & AI Developer',
    description:
      'Portfolio of Yahya Kayaal (kayaal.is-a.dev) — backend software engineer and AI developer. Scalable services with Python and FastAPI, AI/NLP pipelines, cross-platform apps with Flutter, and embedded Linux systems. MSc in Artificial Intelligence at ITMO.',
  },

  name: { lineOne: 'Yahya', lineTwo: 'Kayaal', full: 'Yahya Kayaal', monogram: 'YK' },
  intro: { word: 'Portfolio' },
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
    tagline: 'Software Engineer · AI Researcher',
    ctaPrimary: 'View work',
    ctaSecondary: 'Get in touch',
    scroll: 'Scroll',
  },

  about: {
    eyebrow: 'About',
    titleLead: "I'm Yahya.",
    titleRest: 'Software engineer and AI researcher.',
    intro1:
      'I came to Russia on a Rossotrudnichestvo scholarship and read Software Engineering at Ural Federal University. ITMO followed with an offer for a master’s in Artificial Intelligence — that is where I am now.',
    intro2:
      'I build the bridge between complex algorithms and effortless user experience, from the hardware limits of embedded systems to the open-ended potential of artificial intelligence. My bachelor thesis became MyAiTripPlanner: a FastAPI platform that turns free-form travel intent into a real, routed itinerary through a language-model pipeline I orchestrated with LangChain. In the same period I designed and built the website for Studio Otrajenie — end to end, from the first sketch to the live site.',
    intro3:
      'Away from the screen I train seriously; the patience and focus that builds are the same ones that get me through a problem which will not go down on the first attempt. The other constant is travel — new cities, living somewhere unfamiliar. Less a holiday than a way of changing how I think.',
    disciplines: ['Backend', 'AI & NLP', 'Mobile', 'Embedded', 'Front-end / React'],
    educationLabel: 'Education',
    languagesLabel: 'Languages',
    howIWorkLabel: 'Engineering principles',
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
    title: 'Systems I designed',
    accent: 'and built.',
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
          'Server-side architecture for two real-world domains: online retail and workout tracking. I modelled the relational schema, drew the service boundaries and implemented the core business logic in Python, keeping domain rules out of the transport layer so the same logic serves web and mobile clients.',
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
          'We were after a simple, elegant interface and Yahya delivered exactly that. Fast turnaround, an admin panel that just works, nothing overcomplicated. In a word: superb.',
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Got something in mind?',
    accent: "Let's talk.",
    lead: 'Open to backend, mobile and AI engineering roles across Istanbul, St. Petersburg and remote-first teams.',
    pageLead:
      'A role, a freelance project, or just a question — all of them are reason enough to write. Fill in the form and I usually reply the same day.',
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
