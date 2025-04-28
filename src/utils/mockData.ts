import { Resume, SkillMatch } from '../types';

export const generateMockSkillMatches = (requiredSkills: string[], preferredSkills: string[]): SkillMatch[] => {
  const allSkills = [...requiredSkills, ...preferredSkills];
  
  return allSkills.map(skill => ({
    skill,
    relevance: Math.floor(Math.random() * 101), // 0-100
    present: Math.random() > 0.3 // 70% chance of being present
  }));
};

export const generateMockResume = (jobDescription: any): Partial<Resume> => {
  // Generate key points based on job description
  const keyPoints = [
    'Has experience with required technologies',
    'Demonstrates communication skills',
    'Previous experience in similar role',
    'Education aligns with position requirements',
    'Shows problem-solving abilities'
  ].filter(() => Math.random() > 0.3).slice(0, 3);
  
  return {
    keyPoints,
  };
};

export const mockJobTitles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Specialist',
  'Financial Analyst',
  'HR Coordinator',
  'Project Manager',
  'Business Analyst',
  'Sales Representative'
];

export const mockCompanies = [
  'TechCorp',
  'Innovate Solutions',
  'DataMetrics Inc',
  'Creative Designs',
  'Market Leaders',
  'Financial Group',
  'HR Excellence',
  'Project Management Pros',
  'Business Analytics Ltd',
  'Sales Force Inc'
];