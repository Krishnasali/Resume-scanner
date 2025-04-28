import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useResumes } from '../context/ResumeContext';
import ResumeUploader from '../components/ResumeUploader';
import ResumeList from '../components/ResumeList';

const Dashboard: React.FC = () => {
  const { resumes, jobDescriptions, currentJobDescription, processResumes, loading } = useResumes();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If there's a job description and resumes, process them
    if (currentJobDescription && resumes.length > 0 && !resumes[0].score) {
      processResumes();
    }
  }, [currentJobDescription, resumes]);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Upload and analyze resumes based on job requirements
        </p>
      </div>
      
      {/* Job Description Alert */}
      {!currentJobDescription && (
        <div className="mb-8 bg-warning-50 border-l-4 border-warning-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-warning-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-warning-700">
                No job description selected. 
                <button 
                  onClick={() => navigate('/job-description')}
                  className="ml-1 font-medium text-warning-700 underline"
                >
                  Add or select a job description
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Active Job Description */}
      {currentJobDescription && (
        <div className="mb-8 bg-primary-50 border border-primary-200 p-4 rounded-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-medium text-primary-800">
                {currentJobDescription.title} at {currentJobDescription.company}
              </h2>
              <p className="mt-1 text-sm text-primary-600">
                {currentJobDescription.requiredSkills.length} required skills, {currentJobDescription.preferredSkills.length} preferred skills
              </p>
            </div>
            <button 
              onClick={() => navigate('/job-description')}
              className="mt-4 md:mt-0 btn btn-outline text-primary-600 border-primary-300 hover:bg-primary-50"
            >
              Change Job Description
            </button>
          </div>
        </div>
      )}
      
      {/* Resume Upload Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upload Resumes
        </h2>
        <ResumeUploader />
      </div>
      
      {/* Processing Indicator */}
      {loading && (
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
          <p className="mt-4 text-gray-600">Processing resumes with AI...</p>
        </div>
      )}
      
      {/* Resume List Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Resume Rankings
        </h2>
        <ResumeList />
      </div>
    </div>
  );
};

export default Dashboard;