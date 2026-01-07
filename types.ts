export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
  jobTitle: string;
}

export interface ResumeData {
  personal: PersonalDetails;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}

export enum TemplateType {
  MODERN = 'modern',
  CLASSIC = 'classic',
  MINIMAL = 'minimal',
  EXECUTIVE = 'executive',
  CREATIVE = 'creative',
  ATS_STANDARD = 'ats_standard',
  ACADEMIC = 'academic'
}

export type SectionType = 'personal' | 'experience' | 'education' | 'skills' | 'projects';