import web from './web.png';
import mob from './mob.png';
import ui from './ui.png';

// export const navLinks = [
//   { href: '#top', label: 'Home' },
//   { href: '#about', label: 'About' },
//   { href: '#services', label: 'Services' },
//   { href: '#projects', label: 'Projects' },
//   { href: '#contact', label: 'Contact' },
// ];
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/applications', label: 'Applications' },
  // { href: '/translate', label: 'Translate' },
  // { href: '/chat', label: 'Chat' },
];

export const TAB_DATA = [
  {
    title: 'Skills',
    id: 'skills',
    content: [
      'React.js',
      'Next.js',
      'React Native',
      'Flutter',
      'TypeScript',
      'UI/UX Design',
    ],
  },
  {
    title: 'Education',
    id: 'education',
    content: [
      "Bachelor's Degree in Computer Science",
      'Fullstack Development Bootcamp',
    ],
  },
  {
    title: 'Certifications',
    id: 'certifications',
    content: [
      'Meta Front-End Developer Certification',
      'Microsoft Certified: Azure Fundamentals',
    ],
  },
];

export const SERVICES_DATA = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Building responsive and modern websites with clean and efficient code.',
    icon: web,
  },
  {
    id: 2,
    title: 'Mobile Development',
    description:
      'Creating seamless mobile applications with React Native and Flutter.',
    icon: mob,
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description:
      'Designing intuitive user experiences with a focus on usability and aesthetics.',
    icon: ui,
  },
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: 'React Portfolio Website',
    description:
      'A React portfolio highlighting skills, projects, and experience with a dynamic design.',
    image: '/1.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    description:
      'An online store that allows users to browse, buy, and securely manage products or services.',
    image: '/2.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 3,
    title: 'Admin Dashboard Application',
    description:
      'A control panel that provides insights, management tools, and analytics to oversee and optimize a system or application.',
    image: '/3.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 4,
    title: 'Blog Website',
    description:
      'An online platform for publishing and sharing articles, insights, and stories on various topics.',
    image: '/4.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 5,
    title: 'Weather Application',
    description:
      'A weather app that provides real-time forecasts, temperature, and climate details for various locations.',
    image: '/5.png',
    tag: ['All', 'Mobile'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 6,
    title: 'Social Media Website',
    description:
      'A social media platform that enables users to connect, share, and interact through posts, messages, and multimedia content.',
    image: '/6.png',
    tag: ['All', 'Mobile'],
    gitUrl: '/',
    previewUrl: '/',
  },
];
