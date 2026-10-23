/**
 * Single source of truth for portfolio content.
 * Everything here comes from the resume (Rohit_D_FullStack_Develop.pdf).
 * Edit this file to update the site; no UI code needs to change.
 * Optional fields (repo, demo, image) render only when they are filled in.
 */

const IMG = '/images/portfolio'

export type ResponsiveImage = {
  src: string
  srcSet?: string
  sizes?: string
  width: number
  height: number
  alt: string
}

export type Project = {
  id: string
  name: string
  kind: string
  summary: string
  highlights: string[]
  stack: string[]
  context?: string
  /** Real screenshot/photo. When absent the UI draws an illustrative cover instead. */
  image?: ResponsiveImage
  cover: 'grocery' | 'deepfake' | 'motion'
  repo?: string
  demo?: string
}

export const profile = {
  name: 'Rohit D',
  title: 'Full Stack Developer',
  degree: 'B.Tech Artificial Intelligence & Data Science',
  location: 'Tamil Nadu, India',
  email: 'rohitmanimegalai@gmail.com',
  phone: '8524066336',
  github: 'https://github.com/ROHIT05-CODER',
  githubLabel: 'github.com/ROHIT05-CODER',
  linkedin: 'https://linkedin.com/in/rohit-d-7244522b6',
  linkedinLabel: 'linkedin.com/in/rohit-d-7244522b6',
  resumeUrl: '/resume/Rohit_D_Resume.pdf',
  resumeFileName: 'Rohit_D_Resume.pdf',
  summary:
    'B.Tech Artificial Intelligence & Data Science student targeting entry-level Full Stack Developer roles, with hands-on experience building web applications using React, JavaScript, Python, Flask, REST APIs, and SQL. Built practical applications including a Grocery AI Assistant and a Deepfake Identifier, with experience in API integration and basic deployment using Vercel and Render. Strong problem-solving mindset with an interest in full-stack and AI-powered applications.',
  softSkills: ['Problem solving', 'Logical thinking', 'Teamwork', 'Communication', 'Fast learner'],
}

export const images = {
  heroPortrait: {
    src: `${IMG}/rohit-profile-portrait-hero.webp`,
    width: 800,
    height: 1000,
    alt: 'Rohit D standing in his workspace, holding a laptop',
  } as ResponsiveImage,
  aboutPortrait: {
    src: `${IMG}/rohit-profile-portrait-about.webp`,
    width: 720,
    height: 800,
    alt: 'Portrait of Rohit D, a Full Stack Developer, looking at the camera',
  } as ResponsiveImage,
  workspace: {
    src: `${IMG}/rohit-developer-workspace-showcase-1280w.webp`,
    srcSet: `${IMG}/rohit-developer-workspace-showcase-768w.webp 768w, ${IMG}/rohit-developer-workspace-showcase-1280w.webp 1280w, ${IMG}/rohit-developer-workspace-showcase-1536w.webp 1536w`,
    sizes: '(min-width: 1024px) 58vw, 100vw',
    width: 1536,
    height: 1024,
    alt: 'Rohit D at his desk with a laptop, code editor and a Flask API file open on monitors',
  } as ResponsiveImage,
  groceryCover: {
    src: `${IMG}/rohit-grocery-ai-project-cover-1280w.webp`,
    srcSet: `${IMG}/rohit-grocery-ai-project-cover-768w.webp 768w, ${IMG}/rohit-grocery-ai-project-cover-1280w.webp 1280w, ${IMG}/rohit-grocery-ai-project-cover-1536w.webp 1536w`,
    sizes: '(min-width: 1024px) 60vw, 100vw',
    width: 1536,
    height: 1024,
    alt: 'Rohit D typing at his desk with the Grocery AI Assistant interface on a monitor behind him',
  } as ResponsiveImage,
}

export type GalleryItem = { id: string; title: string; orientation: 'landscape' | 'portrait'; image: ResponsiveImage; full: ResponsiveImage }

const land = (name: string, alt: string): ResponsiveImage => ({
  src: `${IMG}/${name}-1280w.webp`,
  srcSet: `${IMG}/${name}-768w.webp 768w, ${IMG}/${name}-1280w.webp 1280w, ${IMG}/${name}-1536w.webp 1536w`,
  width: 1536,
  height: 1024,
  alt,
})
const tall = (name: string, alt: string): ResponsiveImage => ({
  src: `${IMG}/${name}-1024w.webp`,
  srcSet: `${IMG}/${name}-640w.webp 640w, ${IMG}/${name}-1024w.webp 1024w`,
  width: 1024,
  height: 1536,
  alt,
})

export const gallery: GalleryItem[] = [
  {
    id: 'standing',
    title: 'Standing desk session',
    orientation: 'portrait',
    image: tall('rohit-standing-desk-laptop-night', 'Rohit D working on a laptop at a standing desk, with code and the Grocery AI Assistant on monitors behind him'),
    full: tall('rohit-standing-desk-laptop-night', 'Rohit D working on a laptop at a standing desk, with code and the Grocery AI Assistant on monitors behind him'),
  },
  {
    id: 'desk-lamp',
    title: 'Heads down at the desk',
    orientation: 'landscape',
    image: land('rohit-desk-coding-laptop-lamp', 'Rohit D typing on a laptop at his desk, with a code editor and the Grocery AI Assistant on monitors'),
    full: land('rohit-desk-coding-laptop-lamp', 'Rohit D typing on a laptop at his desk, with a code editor and the Grocery AI Assistant on monitors'),
  },
  {
    id: 'hologram-night',
    title: 'Grocery AI Assistant at night',
    orientation: 'landscape',
    image: land('rohit-grocery-ai-hologram-desk-night', 'Rohit D typing at night with the Grocery AI Assistant interface on a monitor beside him'),
    full: land('rohit-grocery-ai-hologram-desk-night', 'Rohit D typing at night with the Grocery AI Assistant interface on a monitor beside him'),
  },
]

export const skillGroups: { title: string; note: string; items: string[] }[] = [
  { title: 'Frontend', note: 'Interfaces and styling', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'] },
  { title: 'Backend and APIs', note: 'Servers and services', items: ['Python', 'Flask', 'REST APIs'] },
  { title: 'Database', note: 'Storing and querying data', items: ['SQL'] },
  {
    title: 'Tools and deployment',
    note: 'Shipping and version control',
    items: ['Git', 'GitHub', 'Vercel', 'Render', 'Linux (basic)', 'Wokwi'],
  },
  { title: 'Additional', note: 'Computer vision', items: ['OpenCV'] },
]

export const projects: Project[] = [
  {
    id: 'grocery-ai-assistant',
    name: 'Grocery AI Assistant',
    kind: 'Full-stack web application',
    summary:
      'A grocery assistant where a shopper searches products, adds items and reviews the final order, backed by a Flask API.',
    highlights: [
      'Handles approximately 180–200 grocery items.',
      'Flask REST APIs for product search and order processing.',
      'User flow covering product search, adding items, and final order review.',
      'React frontend connected to the Flask backend through Axios.',
    ],
    stack: ['React', 'Tailwind CSS', 'Python', 'Flask', 'REST API', 'Axios'],
    image: images.groceryCover,
    cover: 'grocery',
  },
  {
    id: 'deepfake-identifier',
    name: 'Deepfake Identifier',
    kind: 'Web application',
    context: 'Second-year academic project',
    summary:
      'A web application that analyzes images and videos that may be AI-generated or manipulated.',
    highlights: [
      'Media processing built with Python, Flask and OpenCV.',
      'Tested with approximately 75–80 image and video samples in JPG and MP4 formats.',
      'Deployed and tested using Vercel and Render.',
    ],
    stack: ['Python', 'Flask', 'OpenCV', 'REST API', 'Vercel', 'Render'],
    cover: 'deepfake',
  },
  {
    id: 'green-motion',
    name: 'Green Motion',
    kind: 'Sustainable mobility prototype',
    summary: 'A prototype electric vehicle built with Arduino and sensors for obstacle detection.',
    highlights: [
      'Obstacle detection using sensors.',
      'Focused on battery efficiency and sustainable mobility concepts.',
    ],
    stack: ['Arduino', 'Sensors', 'Embedded systems'],
    cover: 'motion',
  },
]

export const timeline: {
  id: string
  title: string
  place: string
  meta?: string
  points?: string[]
}[] = [
  {
    id: 'btech',
    title: 'Bachelor of Technology, Artificial Intelligence & Data Science',
    place: 'Adhi College of Engineering and Technology',
    meta: 'CGPA 7.74. Expected graduation 2026.',
  },
  {
    id: 'infinity',
    title: 'Data Science Intern',
    place: 'Infinity Cosmos',
    points: [
      'Gained foundational exposure to Python applications in Data Science.',
      'Learned introductory data analysis concepts and workflows.',
      'Explored practical applications of Python-based technologies.',
    ],
  },
]

export const achievements = [
  "1st Prize, Intellista'25 Department-Level Project Expo",
  '1st Prize, Circuit Debugging Contest (College Level)',
]

export const learning = ['Java & SQL', 'Prompt Engineering', 'Embedded Systems & Software Development (self-learning)']

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#experience', label: 'Experience' },
  { href: '#workspace', label: 'Workspace' },
  { href: '#contact', label: 'Contact' },
]
