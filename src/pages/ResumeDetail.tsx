import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Mail } from 'lucide-react';
import { useResumes } from '../context/ResumeContext';
import ResumeScoreCard from '../components/ResumeScoreCard';
import SkillMatchChart from '../components/SkillMatchChart';

const ResumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { resumes, currentJobDescription } = useResumes();
  const navigate = useNavigate();
  
  const resume = resumes.find(r => r.id === id);
  
  if (!resume) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Resume Not Found</h2>
          <p className="mt-2 text-gray-600">The resume you're looking for doesn't exist or has been deleted.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 btn btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <ResumeScoreCard resume={resume} />
          
          <SkillMatchChart resume={resume} />
          
          {/* Resume content mockup */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Resume Preview
            </h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm text-gray-700 h-96 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">{resume.name}</h4>
                  <p>example@email.com | (555) 123-4567 | City, State</p>
                </div>
                
                <div>
                  <h5 className="font-bold">SUMMARY</h5>
                  <p>Experienced professional with expertise in {resume.skillMatches.filter(s => s.present).slice(0, 3).map(s => s.skill).join(', ')}. Passionate about delivering high-quality work and driving results.</p>
                </div>
                
                <div>
                  <h5 className="font-bold">EXPERIENCE</h5>
                  <p>Senior Position | Company Name | 2020 - Present</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Led team projects resulting in 30% efficiency improvement</li>
                    <li>Developed solutions utilizing {resume.skillMatches.filter(s => s.present).slice(0, 2).map(s => s.skill).join(' and ')}</li>
                    <li>Collaborated with cross-functional teams to deliver projects on time</li>
                  </ul>
                  
                  <p className="mt-2">Previous Position | Previous Company | 2017 - 2020</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Implemented {resume.skillMatches.filter(s => s.present).slice(3, 5).map(s => s.skill).join(' and ')} solutions</li>
                    <li>Improved team productivity through process optimization</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-bold">EDUCATION</h5>
                  <p>Bachelor's Degree in Related Field</p>
                  <p>University Name, Graduation Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Actions
            </h3>
            
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </button>
              
              <button className="btn btn-secondary w-full">
                <Mail className="h-4 w-4 mr-2" />
                Contact Candidate
              </button>
            </div>
          </div>
          
          {/* Job Match */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Job Match
            </h3>
            
            {currentJobDescription ? (
              <div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Position
                  </h4>
                  <p className="mt-1">{currentJobDescription.title}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Company
                  </h4>
                  <p className="mt-1">{currentJobDescription.company}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Required Skills
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {currentJobDescription.requiredSkills.map((skill, index) => {
                      const match = resume.skillMatches.find(m => m.skill === skill);
                      const present = match?.present || false;
                      
                      return (
                        <span 
                          key={index}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            present 
                              ? 'bg-success-100 text-success-800' 
                              : 'bg-error-100 text-error-800'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No job description selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;