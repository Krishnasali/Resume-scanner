import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Resume } from '../types';

interface SkillMatchChartProps {
  resume: Resume;
}

const SkillMatchChart: React.FC<SkillMatchChartProps> = ({ resume }) => {
  // Prepare data for the chart
  const data = resume.skillMatches
    .filter(match => match.present) // Only show matched skills
    .sort((a, b) => b.relevance - a.relevance) // Sort by relevance descending
    .slice(0, 8) // Take top 8 skills for better visualization
    .map(match => ({
      name: match.skill,
      relevance: match.relevance
    }));
    
  const getBarColor = (relevance: number) => {
    if (relevance >= 80) return '#22C55E'; // success-500
    if (relevance >= 60) return '#3B82F6'; // primary-500
    if (relevance >= 40) return '#F59E0B'; // warning-500
    return '#EF4444'; // error-500
  };
  
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No skill match data available</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Skill Match Analysis
      </h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${value}% Match`, 'Relevance']}
              labelFormatter={(name) => `Skill: ${name}`}
            />
            <Bar dataKey="relevance" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.relevance)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillMatchChart;