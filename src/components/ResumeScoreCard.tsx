import React from 'react';
import { Resume } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResumeScoreCardProps {
  resume: Resume;
}

const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({ resume }) => {
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'from-success-500 to-success-700';
    if (score >= 60) return 'from-primary-500 to-primary-700';
    if (score >= 40) return 'from-warning-500 to-warning-700';
    return 'from-error-500 to-error-700';
  };
  
  const getScoreTextClass = (score: number) => {
    if (score >= 80) return 'text-success-700';
    if (score >= 60) return 'text-primary-700';
    if (score >= 40) return 'text-warning-700';
    return 'text-error-700';
  };
  
  const getProgressWidth = (score: number) => {
    return `${score}%`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`h-2 w-full bg-gradient-to-r ${getScoreColorClass(resume.score)}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{resume.name}</h2>
            <p className="text-sm text-gray-500">
              Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
            </p>
          </div>
          
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreTextClass(resume.score)}`}>
              {resume.score}%
            </div>
            <p className="text-sm text-gray-500">Match Score</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Match Percentage</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreColorClass(resume.score)}`}
              style={{ width: getProgressWidth(resume.score) }}
            ></div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Key Strengths</h3>
            <ul className="space-y-2">
              {resume.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Missing Skills</h3>
            {resume.missingSkills.length > 0 ? (
              <ul className="space-y-2">
                {resume.missingSkills.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-error-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{skill}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No missing required skills!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;