import React, { useState } from 'react';
import JobPostManager from './JobPostManager';
import ApplicationManager from './ApplicationManager';
import ContactFormManager from './ContactFormManager';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('jobPosts');

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">
              <h3 className="text-xl font-medium text-white mb-4">Menu</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('jobPosts')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === 'jobPosts' 
                      ? 'bg-orange text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Job Posts
                </button>
                <button
                  onClick={() => setActiveSection('applications')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === 'applications' 
                      ? 'bg-orange text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Job Applications
                </button>
                <button
                  onClick={() => setActiveSection('contactForms')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === 'contactForms' 
                      ? 'bg-orange text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Contact Form Submissions
                </button>
              </nav>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6">
              {activeSection === 'jobPosts' && <JobPostManager />}
              {activeSection === 'applications' && <ApplicationManager />}
              {activeSection === 'contactForms' && <ContactFormManager />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 