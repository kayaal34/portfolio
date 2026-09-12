/**
 * English copy. Facts and wording follow the CV (Kayaal_Yahya_Resume_EN);
 * nothing here is invented, and the two intro paragraphs are the only prose
 * written for the page rather than lifted from the document.
 */
export default {
  code: 'en',
  htmlLang: 'en',

  meta: {
    title: 'Yahya Kayaal — Full Stack Developer & LLM Engineer',
    description:
      'Yahya Kayaal — freelance full stack developer and LLM engineer. Websites, mobile apps and LLM systems: React, Flutter, Python, FastAPI, OpenAI API and LangChain. MSc in Artificial Intelligence at ITMO University, St. Petersburg.',
  },

  name: { full: 'Yahya Kayaal', first: 'Yahya', last: 'Kayaal', monogram: 'YK' },
  roles: ['Full Stack Developer', 'LLM Engineer'],
  location: 'St. Petersburg / Istanbul',
  present: 'Present',

  nav: {
    contact: 'Contact',
  },

  a11y: {
    skip: 'Skip to content',
    primaryNav: 'Primary',
    language: 'Language',
    chooseLanguage: 'Choose a language',
    toLightMode: 'Switch to light mode',
    toDarkMode: 'Switch to dark mode',
    backToTop: 'Back to top',
    openMenu: 'Menu',
    closeMenu: 'Close',
  },

  hero: {
    lede: 'Websites, mobile apps, LLM systems — whatever technical solution you need, I am the one who builds it with you.',
    cta: 'Get in touch',
  },

  sections: {
    experience: 'Experience',
    projects: 'Selected work',
    education: 'Education',
    skills: 'Skills',
    contact: 'Contact',
  },

  chapter: {
    back: 'Home',
    previous: 'Previous',
    next: 'Next',
  },

  experience: {
    freelance: {
      role: 'Web Developer',
      org: 'Freelance',
      bullets: [
        'Developed and shipped a booking site with an admin panel for the Otrazhenie photo studio on Supabase, replacing manual scheduling with online client registration.',
        'Delivered a portfolio site with an admin panel for an Ozon marketplace store manager, letting the client manage content without developer involvement.',
      ],
    },
    vk: {
      role: 'Software Engineering Intern',
      org: 'VK Education Practice, VK · Remote',
      bullets: [
        'Developed a VK Mini App during the internship, covering the client interface and the server side.',
        'Implemented authentication via VK ID and VK Bridge, and persistence of user data through VK Storage.',
        'Refactored state management and added asynchronous data fetching to keep the interface responsive.',
      ],
    },
    sky: {
      role: 'Student Consultant',
      org: 'Sky Education',
      bullets: [
        'Supported Turkish students relocating to Russia across documents, admissions and university communication in Turkish and Russian.',
      ],
    },
  },

  projects: {
    repo: 'Repository',
    count: '{n} projects',
    inProgress: 'in progress',
    flipru: {
      summary: 'Turkish and Russian vocabulary app',
      bullets: [
        'Developed a dictionary of 8,000+ words across five CEFR levels (A1–C1) with stress marks, transcription and usage examples, for Turkish speakers learning Russian and Russian speakers learning Turkish.',
        'Added a practice section with quizzes and exercises, plus a companion dictionary editor that flags duplicates, missing stress marks and empty fields; currently in closed testing on Google Play.',
      ],
    },
    subscriptionHunter: {
      summary: 'Subscription tracker, shipped to Google Play',
      bullets: [
        'Charge dates, total spend and renewal reminders per tracked subscription.',
      ],
    },
    aiTripPlanner: {
      summary: 'Graduation project, Ural Federal University',
      bullets: [
        'Owned the backend and LLM integration in a two-person team: a FastAPI service generating travel itineraries through the OpenAI API, orchestrated with LangChain.',
        'Implemented route rendering via the Google Maps Directions API, returning a visual itinerary per request.',
      ],
    },
    tzReviewer: {
      summary: 'AI Product Hack, MTS case',
      bullets: [
        'Developed a specification-review tool in a team of two: parses a technical spec into sections and returns findings at three severity levels (blocker / major / minor).',
        'Cut LLM dependency by moving deterministic checks into rule-based logic, reducing token cost per review.',
      ],
    },
    emotionDetection: {
      summary: 'Facial emotion recognition',
      bullets: [
        'Trained a model recognising emotional expressions from images: data preparation and labelling, training loop and evaluation of classification quality.',
        'Implemented the full pipeline from raw images to prediction, comparing results across training runs to select the final model.',
      ],
    },
    degerix: {
      summary: 'Land valuation for Turkey',
      bullets: [
        'Building a FastAPI service that locates a land parcel on the map through the Turkish cadastre (TKGM) API and estimates its value for three sale scenarios — urgent, market, patient seller — with a range and a confidence level.',
        'Integrated the cadastre, OpenStreetMap Nominatim and Central Bank (EVDS) housing statistics behind the backend: response normalisation, caching, rate-limit compliance, API keys kept off the client; the pytest suite runs in GitHub Actions.',
      ],
    },
    projectBasedLearning: {
      summary: 'Ural Federal University, client: UrFU',
      bullets: [
        'Developed a neural-network book recommendation assistant for a personal library system.',
        'Built a VR simulation of historic Yekaterinburg buildings in a project team.',
      ],
    },
    other: {
      name: 'Other projects',
      summary: null,
      bullets: [
        'Shipped a Telegram market bot on Python and PostgreSQL sending morning and evening summaries of daily risers and fallers, replacing manual rate checks; a book-sharing app in .NET MAUI; a document-to-PDF converter; and a microcontroller stair-lighting system.',
      ],
    },
  },

  education: {
    itmo: {
      degree: 'MSc, Artificial Intelligence',
      org: 'ITMO University',
      city: 'St. Petersburg',
      notes: [
        'Two-year programme, state-funded place under the Russian Government Scholarship (Rossotrudnichestvo).',
      ],
    },
    urfu: {
      degree: 'BSc, Software Engineering (09.03.04)',
      org: 'Ural Federal University',
      city: 'Yekaterinburg',
      notes: [
        'GPA 3.87 / 5.00. Coursework: algorithms and data structures, databases, operating systems, OOP.',
        'Completed a 288-hour professional retraining programme in Embedded Systems Programming (2025).',
        'State-funded place under the Russian Government Scholarship (Rossotrudnichestvo). Studied five years in Russian, including the preparatory faculty (2021–2022).',
      ],
    },
  },

  skills: {
    languages: 'Languages',
    backend: 'Backend',
    data: 'Data',
    infra: 'Infra / DevOps',
    mobile: 'Mobile',
    frontend: 'Frontend',
    ai: 'AI',
    familiar: 'Familiar with',
  },

  extras: {
    certificationsLabel: 'Certifications',
    languagesLabel: 'Languages',
    interestsLabel: 'Interests',
    certs: {
      yandex: { name: 'Cloud Services Engineer', org: 'Yandex Practicum · 43 h' },
      vk: { name: 'VK Education Practice', org: 'VK' },
      htmlAcademy: { name: 'Web Technologies Fundamentals', org: 'HTML Academy' },
    },
    spoken: {
      turkish: { name: 'Turkish', level: 'Native' },
      russian: { name: 'Russian', level: 'C1' },
      english: { name: 'English', level: 'B2' },
    },
    interests: 'Licensed taekwondo athlete, medals at city-level competitions.',
  },

  contact: {
    title: 'Get in touch',
    lede: 'Tell me what you need built — a site, an app, an LLM system, or a piece of one — and I will come back with a scope and a price.',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@company.com',
      messagePlaceholder: 'What are you working on?',
      send: 'Send',
      sending: 'Sending…',
      sent: 'Thank you — the message has arrived. I answer within a day or two.',
      error: 'The message could not be sent. Email me at {email} instead.',
      required: 'Please fill in every field.',
      invalidEmail: 'Please check the email address.',
      fallbackNote: 'This opens your mail client.',
    },
  },

  footer: {
    updated: 'Updated September 2026',
  },
};
