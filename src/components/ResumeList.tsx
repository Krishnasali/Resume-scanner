import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronDown, ChevronUp, Search, Trash2 } from 'lucide-react';
import { useResumes } from '../context/ResumeContext';
import { Resume } from '../types';

const ResumeList: React.FC = () => {
  const { resumes, deleteResume } = useResumes();
  const [sortField, setSortField] = useState<'score' | 'name' | 'uploadDate'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSort = (field: 'score' | 'name' | 'uploadDate') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'bg-success-100 text-success-800';
    if (score >= 60) return 'bg-primary-100 text-primary-800';
    if (score >= 40) return 'bg-warning-100 text-warning-800';
    return 'bg-error-100 text-error-800';
  };
  
  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedResumes = [...filteredResumes].sort((a, b) => {
    if (sortField === 'score') {
      return sortDirection === 'asc' ? a.score - b.score : b.score - a.score;
    }
    
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
    
    // uploadDate
    return sortDirection === 'asc'
      ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
      : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  });
  
  const handleResumeClick = (resume: Resume) => {
    navigate(`/resume/${resume.id}`);
  };
  
  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteResume(id);
  };
  
  if (resumes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <FileText className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No resumes yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload resumes to get started with the screening process
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 md:mb-0">
            Resume List ({filteredResumes.length})
          </h3>
          
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resumes..."
              className="form-input pl-9"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resume Name
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('score')}
                >
                  <div className="flex items-center">
                    <span>Match Score</span>
                    {sortField === 'score' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('uploadDate')}
                >
                  <div className="flex items-center">
                    <span>Upload Date</span>
                    {sortField === 'uploadDate' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedResumes.map((resume) => (
                <tr 
                  key={resume.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleResumeClick(resume)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="font-medium text-gray-900">{resume.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resume.score ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColorClass(resume.score)}`}>
                        {resume.score}%
                      </span>
                    ) : (
                      <span className="text-gray-500">Not processed</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(resume.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => handleDeleteClick(e, resume.id)}
                      className="text-gray-400 hover:text-error-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResumeList;