import { asset } from '../utils/asset.js'

export const profile = {
  name: 'Brandon Le',
  email: 'brandonle0824@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/BurntLettuce' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brandonle0824/' },
    { label: 'Spotify', href: 'https://open.spotify.com/user/316rchk3u7jcz6u453kegpnqvqwe?si=788b952bce164e3c' },
    { label: 'Last.fm', href: 'https://www.last.fm/user/LookItsGhostyy/listening-report/year' },
    { label: 'Resume', href: asset('le_resume.pdf') },
  ],
}

export const lastfm = {
  username: 'LookItsGhostyy',
  proxyUrl: 'https://lastfm-now-playing-proxy.burntlettuce.workers.dev',
}

export const about = {
  image: asset('images/rig-photo.jpg'),
  tag: 'Skills',
  title: 'Development Skills',
  skills: [
    'Front-end: JavaScript, HTML, CSS',
    'Wear OS: Kotlin, Jetpack Compose',
    'Backend/Cloud: Firebase (Firestore)',
    'Systems: NixOS, KDE Plasma',
  ],
}

export const projects = [
  {
    id: 'calendar',
    name: 'calendar',
    tag: 'Web app',
    image: asset('images/calendar-screenshot.jpg'),
    imgPosition: 'left',
    description: 'Basic calendar using JavaScript, HTML, CSS, and Firebase.',
    tastingNotes: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
    links: [
      { href: 'https://github.com/BurntLettuce/calendar', text: 'Source (GitHub)' },
    ],
  },
  {
    id: 'calendarwatch',
    name: 'calendarwatch',
    tag: 'Wear OS app',
    image: asset('images/calendarwatch-screenshot.jpg'),
    imgPosition: 'right',
    description: 'A Wear OS 7 application using Kotlin and Jetpack Compose that autonomously retrieves events from Firebase Firestore and schedules an alarm for each event.',
    tastingNotes: ['Kotlin', 'Jetpack Compose', 'Wear OS'],
    links: [
      { href: 'https://github.com/BurntLettuce/calendarwatch', text: 'Source (GitHub)' },
    ],
  },
  {
    id: 'yea',
    name: 'yea',
    tag: 'Dotfiles',
    image: asset('images/nixos-screenshot.jpg'),
    imgPosition: 'left',
    description: 'A NixOS + KDE Plasma configuration.',
    tastingNotes: ['NixOS', 'KDE Plasma'],
    links: [
      { href: 'https://github.com/BurntLettuce/yea', text: 'Source (GitHub)' },
    ],
  },
]

export const experience = [
  {
    id: 'harford-cc',
    role: 'Student Research Assistant & Curricular Co-Designer',
    place: 'Harford Community College',
    period: 'March 2025 — Current',
    image: null,
    detail: 'Contributing to FY25 curricular research development — AI and machine learning academic research, curricular design (credit and non-credit), and associated academic publications — under academic supervision from Professor Mark Dencler and Professor Nick Schoeb. Technologies explored: ChatGPT, Gemini, Claude, DeepSeek and other LLMs, Visual Studio, IntelliJ, VS Code, SQL, and Jupyter Notebooks.',
  },
  {
    id: 'starbucks',
    role: 'Barista',
    place: 'Starbucks — Bel Air, Baltimore Pike',
    period: 'August 2022 — Present',
    image: null,
    detail: 'Responsible for high-quality food and beverage preparation, EPOS operation, inventory audits, and customer service — executing multiple tasks concurrently with close attention to detail, training new baristas, and setting up seasonal decorations and merchandise.',
  },
  {
    id: 'nail-perfection',
    role: 'Cashier',
    place: 'Nail Perfection — Baltimore, Philadelphia Rd',
    period: 'September 2018 — August 2022',
    image: null,
    detail: 'Cash management and stock management, with a focus on excellent customer service and building connections with clients.',
  },
]
