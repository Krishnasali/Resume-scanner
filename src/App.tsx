import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import ResumeDetail from './pages/ResumeDetail';
import JobDescriptionPage from './pages/JobDescriptionPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume/:id" element={<ResumeDetail />} />
        <Route path="/job-description" element={<JobDescriptionPage />} />
      </Routes>
    </Layout>
  );
}

export default App;