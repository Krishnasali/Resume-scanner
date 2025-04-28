export interface Resume {
  id: string;
  name: string;
  fileName: string;
  uploadDate: string;
  score: number;
  skillMatches: SkillMatch[];
  content?: string;
  keyPoints: string[];
  missingSkills: string[];
}

export interface SkillMatch {
  skill: string;
  relevance: number; // 0 to 100
  present: boolean;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  dateCreated: string;
}

export interface ResumeContextType {
  resumes: Resume[];
  jobDescriptions: JobDescription[];
  currentJobDescription: JobDescription | null;
  addResume: (resume: File) => void;
  addJobDescription: (jobDescription: Partial<JobDescription>) => void;
  setCurrentJobDescription: (id: string) => void;
  processResumes: () => void;
  deleteResume: (id: string) => void;
  loading: boolean;
}