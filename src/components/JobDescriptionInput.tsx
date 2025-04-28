import React, { useState } from 'react';
import { Briefcase, Plus, X } from 'lucide-react';
import { useResumes } from '../context/ResumeContext';
import { mockJobTitles, mockCompanies } from '../utils/mockData';

const JobDescriptionInput: React.FC = () => {
  const { addJobDescription } = useResumes();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleAddRequiredSkill = () => {
    if (skillInput.trim()) {
      setRequiredSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };
  
  const handleAddPreferredSkill = () => {
    if (skillInput.trim()) {
      setPreferredSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };
  
  const removeRequiredSkill = (index: number) => {
    setRequiredSkills(prev => prev.filter((_, i) => i !== index));
  };
  
  const removePreferredSkill = (index: number) => {
    setPreferredSkills(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addJobDescription({
      title,
      company,
      description,
      requiredSkills,
      preferredSkills
    });
    
    // Reset form
    setTitle('');
    setCompany('');
    setDescription('');
    setRequiredSkills([]);
    setPreferredSkills([]);
  };
  
  const fillSampleData = () => {
    const randomIndex = Math.floor(Math.random() * mockJobTitles.length);
    
    setTitle(mockJobTitles[randomIndex]);
    setCompany(mockCompanies[randomIndex]);
    setDescription(
      "We are looking for a talented professional to join our team. The ideal candidate will have strong problem-solving skills and the ability to work in a fast-paced environment."
    );
    setRequiredSkills([
      "Communication skills",
      "Problem solving",
      "Teamwork",
      "Time management"
    ]);
    setPreferredSkills([
      "Leadership experience",
      "Project management"
    ]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Briefcase className="h-6 w-6 text-primary-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="form-label">
              Job Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="e.g. Software Engineer"
              required
            />
          </div>
          
          <div>
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="form-input"
              placeholder="e.g. TechCorp"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input min-h-[120px]"
            placeholder="Paste or type the full job description here..."
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="skills" className="form-label">
            Skills
          </label>
          <div className="flex">
            <input
              id="skills"
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="form-input flex-grow"
              placeholder="Add a skill..."
            />
            <button
              type="button"
              onClick={handleAddRequiredSkill}
              className="ml-2 btn btn-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Required
            </button>
            <button
              type="button"
              onClick={handleAddPreferredSkill}
              className="ml-2 btn btn-secondary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Preferred
            </button>
          </div>
          
          {showSuggestions && (
            <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-sm">
              <ul className="text-sm divide-y divide-gray-200">
                {["React", "JavaScript", "TypeScript", "Node.js", "CSS"]
                  .filter(s => s.toLowerCase().includes(skillInput.toLowerCase()))
                  .slice(0, 5)
                  .map((skill, i) => (
                    <li 
                      key={i}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSkillInput(skill);
                        setShowSuggestions(false);
                      }}
                    >
                      {skill}
                    </li>
                  ))
                }
              </ul>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
              <div className="min-h-[100px] p-3 border border-gray-200 rounded-md bg-gray-50">
                {requiredSkills.length === 0 ? (
                  <p className="text-sm text-gray-500">No required skills added yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {requiredSkills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {skill}
                        <button 
                          onClick={() => removeRequiredSkill(index)}
                          className="ml-1 text-primary-600 hover:text-primary-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preferred Skills</h4>
              <div className="min-h-[100px] p-3 border border-gray-200 rounded-md bg-gray-50">
                {preferredSkills.length === 0 ? (
                  <p className="text-sm text-gray-500">No preferred skills added yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {preferredSkills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800"
                      >
                        {skill}
                        <button 
                          onClick={() => removePreferredSkill(index)}
                          className="ml-1 text-secondary-600 hover:text-secondary-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={fillSampleData}
            className="btn btn-outline"
          >
            Fill with Sample Data
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
          >
            Create Job Description
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobDescriptionInput;