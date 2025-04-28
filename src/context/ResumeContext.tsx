import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Resume, JobDescription, ResumeContextType, SkillMatch } from '../types';
import { generateMockResume, generateMockSkillMatches } from '../utils/mockData';

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumes = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumes must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [currentJobDescription, setCurrentJobDesc] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(false);

  const addResume = (file: File) => {
    const newResume: Resume = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
      uploadDate: new Date().toISOString(),
      score: 0,
      skillMatches: [],
      keyPoints: [],
      missingSkills: []
    };
    
    setResumes(prev => [...prev, newResume]);
  };

  const addJobDescription = (jobDesc: Partial<JobDescription>) => {
    const newJobDescription: JobDescription = {
      id: Math.random().toString(36).substring(2, 9),
      title: jobDesc.title || 'Untitled Position',
      company: jobDesc.company || 'Company',
      description: jobDesc.description || '',
      requiredSkills: jobDesc.requiredSkills || [],
      preferredSkills: jobDesc.preferredSkills || [],
      dateCreated: new Date().toISOString()
    };
    
    setJobDescriptions(prev => [...prev, newJobDescription]);
    setCurrentJobDesc(newJobDescription);
  };

  const setCurrentJobDescription = (id: string) => {
    const jobDesc = jobDescriptions.find(jd => jd.id === id) || null;
    setCurrentJobDesc(jobDesc);
  };

  const processResumes = () => {
    if (!currentJobDescription) return;
    
    setLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const updatedResumes = resumes.map(resume => {
        // Generate mock score and skill matches
        const score = Math.floor(Math.random() * 61) + 40; // 40-100
        const skillMatches = generateMockSkillMatches(
          currentJobDescription.requiredSkills, 
          currentJobDescription.preferredSkills
        );
        
        // Generate missing skills
        const missing = currentJobDescription.requiredSkills
          .filter(() => Math.random() > 0.7)
          .slice(0, 3);
        
        return {
          ...resume,
          score,
          skillMatches,
          keyPoints: generateMockResume(currentJobDescription).keyPoints,
          missingSkills: missing
        };
      });
      
      setResumes(updatedResumes);
      setLoading(false);
    }, 2000);
  };

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id));
  };

  const value = {
    resumes,
    jobDescriptions,
    currentJobDescription,
    addResume,
    addJobDescription,
    setCurrentJobDescription,
    processResumes,
    deleteResume,
    loading
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};