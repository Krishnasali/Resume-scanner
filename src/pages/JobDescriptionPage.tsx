import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumes } from '../context/ResumeContext';
import JobDescriptionInput from '../components/JobDescriptionInput';
import { Briefcase, Check } from 'lucide-react';

const JobDescriptionPage: React.FC = () => {
  const { jobDescriptions, setCurrentJobDescription, currentJobDescription } = useResumes();
  const navigate = useNavigate();
  
  const handleSelectJobDescription = (id: string) => {
    setCurrentJobDescription(id);
    navigate('/dashboard');
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Descriptions</h1>
        <p className="mt-1 text-gray-600">
          Create or select a job description to analyze resumes against
        </p>
      </div>
      
      {/* Create New Job Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Create New Job Description
        </h2>
        <JobDescriptionInput />
      </div>
      
      {/* Existing Job Descriptions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Job Descriptions
        </h2>
        
        {jobDescriptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Briefcase className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No job descriptions yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a new job description to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobDescriptions.map(job => (
              <div 
                key={job.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg ${
                  currentJobDescription?.id === job.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                    
                    {currentJobDescription?.id === job.id && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 line-clamp-3">
                      {job.description || "No description provided"}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Required Skills
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {job.requiredSkills.slice(0, 4).map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.requiredSkills.length > 4 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{job.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleSelectJobDescription(job.id)}
                    className="mt-6 w-full btn btn-outline"
                  >
                    {currentJobDescription?.id === job.id ? 'Currently Selected' : 'Select this Position'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescriptionPage;