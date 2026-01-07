import { ResumeData, TemplateType } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personal: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    website: 'github.com/alexmorgan',
    summary: 'Experienced software engineer with a strong background in developing scalable web applications using React and TypeScript. Committed to writing clean, maintainable code and fostering a collaborative team environment.',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      startDate: '2021-01',
      endDate: 'Present',
      description: '• Led a team of 5 developers in rebuilding the core customer dashboard.\n• Improved site performance by 40% through code splitting and lazy loading.\n• Mentored junior developers and established code quality standards.',
    },
    {
      id: '2',
      company: 'Creative Web Agency',
      position: 'Web Developer',
      startDate: '2018-06',
      endDate: '2020-12',
      description: '• Developed responsive websites for over 20 diverse clients.\n• Collaborated with designers to implement pixel-perfect user interfaces.\n• Integrated third-party APIs for payment processing and data visualization.',
    }
  ],
  education: [
    {
      id: '1',
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      description: 'Graduated with Honors. Member of the ACM Student Chapter.',
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 'Expert' },
    { id: '2', name: 'TypeScript', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Intermediate' },
    { id: '4', name: 'Tailwind CSS', level: 'Expert' },
    { id: '5', name: 'GraphQL', level: 'Intermediate' },
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      link: 'github.com/alexmorgan/shop',
      description: 'A full-stack e-commerce application built with Next.js and Stripe integration.',
    }
  ]
};

export const TEMPLATE_OPTIONS = [
  { id: TemplateType.ATS_STANDARD, name: 'ATS Optimized', color: 'bg-green-600', premium: false, ats: true },
  { id: TemplateType.MODERN, name: 'Modern', color: 'bg-blue-500', premium: false, ats: false },
  { id: TemplateType.CLASSIC, name: 'Classic', color: 'bg-gray-700', premium: false, ats: true },
  { id: TemplateType.MINIMAL, name: 'Minimal', color: 'bg-white border', premium: false, ats: true },
  { id: TemplateType.ACADEMIC, name: 'Academic / CV', color: 'bg-indigo-900', premium: true, ats: true },
  { id: TemplateType.EXECUTIVE, name: 'Executive', color: 'bg-slate-900', premium: true, ats: false },
  { id: TemplateType.CREATIVE, name: 'Creative', color: 'bg-emerald-500', premium: true, ats: false },
];