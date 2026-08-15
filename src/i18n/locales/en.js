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
    howIWorkLabel: 'What I go by',
    inProgress: 'In progress',
    philosophy: 'I learn where it gets hard. Nothing easy has ever taught me anything.',
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
    title: 'The six tools I reach for',
    accent: 'every day.',
    lead: 'From mobile apps to scalable backends, from API design to interfaces that move — this is what I build with.',
    details: {
      python: 'FastAPI, SQLAlchemy, REST APIs',
      react: 'Interfaces with Vite and Tailwind',
      flutter: 'Mobile apps for Android',
      databases: 'Schema design and queries',
      ai: 'Language models and CNN training',
      embedded: 'Microcontroller programming',
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
    title: 'What I wrote',
    accent: 'and shipped.',
    lead: 'All five are open source on GitHub — the source is one click from every card.',
    note: 'Full source and the rest of my work live on my GitHub profile.',
    repoLabel: 'Source',
    entries: {
      aiTripPlanner: {
        role: 'Full-Stack Developer',
        description:
          'My final-year project. I built a full-stack application that generates a travel route from the city, interests, budget and transport preferences a user picks. The backend is FastAPI with PostgreSQL and async SQLAlchemy, authentication handled with JWT; routes are generated by an OpenAI language model and grounded in real roads through the Google Maps Directions API. I wrote the interface in React, TypeScript and Tailwind.',
        highlight: 'Final-year project',
      },
      subscriptionHunter: {
        role: 'Mobile Developer',
        description:
          'I built an offline-first subscription tracker for Android. You add what you pay for, see the cost per month and per year, and get reminded before each renewal. Written in Flutter and Dart, with a Material 3 interface, full light and dark support, and 35 services bundled in with their brand colours — one tap to add. Currently in closed testing on Google Play.',
      },
      emotionDetection: {
        role: 'AI Developer',
        description:
          'I built a deep-learning pipeline that classifies emotion from raw image data. Using Python and TensorFlow I trained a convolutional neural network; the pipeline sorts raw pixel data into categories and prepares it for training on its own. Every step from data preparation to model training is reproducible.',
      },
      marketBot: {
        role: 'Backend Developer',
        description:
          'I wrote a Telegram bot that runs unattended. It collects exchange rates, gold prices and fund quotes on a schedule and delivers them on request. Written in Python; upstream pages change without warning, so I built the parsing defensively — one broken source skips a record rather than taking the bot down.',
      },
      stairLights: {
        role: 'Embedded Systems Developer',
        description:
          'I designed and programmed a stair lighting system that integrates into smart-home setups. The control logic — lighting the steps in sequence once motion is detected — runs in C++ on a microcontroller. Because the logic lives on the device, the system works with no network at all.',
      },
    },
  },

  clients: {
    eyebrow: 'Clients',
    title: 'The work I delivered,',
    accent: 'in my client’s words.',
    lead: 'Commercial work I built that is still in use.',
    visit: 'Visit the site',
    badge: 'Client',
    entries: {
      otrajenie: {
        descriptor: 'Self-portrait photography studio',
        quote:
          'Yahya built the showcase and booking site for our studio. We asked for something simple and fast, and that is what was delivered. The admin panel runs without friction in our daily operations, and the work came in within the agreed timeline.',
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'An idea, a project',
    accent: 'or just hello.',
    lead: 'Open to backend, mobile and AI engineering roles across Istanbul, St. Petersburg and remote-first teams.',
    pageLead: 'Whichever it is, write — I will get back to you as soon as I can.',
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
