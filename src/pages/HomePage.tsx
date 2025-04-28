import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, BarChart3, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Upload className="h-6 w-6 text-primary-600" />,
      title: "Easy Resume Upload",
      description: "Upload multiple resume files (PDF, DOCX) in just a few seconds"
    },
    {
      icon: <FileText className="h-6 w-6 text-primary-600" />,
      title: "AI-Powered Analysis",
      description: "Our AI engine extracts and matches skills from resumes with job descriptions"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
      title: "Detailed Insights",
      description: "Get comprehensive match scores and skill-level analysis for each candidate"
    },
    {
      icon: <Star className="h-6 w-6 text-primary-600" />,
      title: "Smart Recommendations",
      description: "Let our AI suggest the best candidates for your open positions"
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="py-12 md:py-16 lg:py-20 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            AI-Powered Resume Screening
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Find the perfect candidates faster with AI-driven resume analysis. 
            Automatically rank resumes based on job requirements and save hours of manual screening.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/job-description')}
              className="btn btn-primary px-8 py-3 text-base"
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline px-8 py-3 text-base"
            >
              View Demo
            </button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 bg-gray-50 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Streamline Your Hiring Process
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our AI tools help you identify the best candidates quickly and efficiently.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-md">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              How It Works
            </h2>
          </div>
          
          <div className="mt-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            
            <div className="relative flex justify-around">
              {[
                { step: 1, title: "Add Job Description", description: "Input role requirements and key skills" },
                { step: 2, title: "Upload Resumes", description: "Upload candidate resumes in bulk" },
                { step: 3, title: "AI Analysis", description: "Our AI scores and ranks each resume" },
                { step: 4, title: "Review Results", description: "View detailed match reports and insights" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-full h-12 w-12 flex items-center justify-center border-2 border-primary-500 z-10 relative">
                  <span className="text-primary-600 font-bold">{item.step}</span>
                  <div className="absolute top-16 w-48 text-center">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-700 rounded-lg mt-12 mb-8">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to find the best candidates?</span>
            <span className="block text-primary-200 mt-1">Start screening resumes today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:ml-8">
            <button 
              onClick={() => navigate('/job-description')}
              className="btn bg-white text-primary-700 hover:bg-gray-100 focus:ring-white px-6 py-3"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;