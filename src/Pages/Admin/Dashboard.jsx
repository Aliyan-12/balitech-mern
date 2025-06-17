import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoGridOutline, IoDocumentTextOutline, IoMailOutline, IoLogOutOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import JobPostManager from './JobPostManager';
import ApplicationManager from './ApplicationManager';
import ContactFormManager from './ContactFormManager';
import { useAuth } from '../../utils/AuthContext';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('jobPosts');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'jobPosts', label: 'Job Posts', icon: IoGridOutline },
    { id: 'applications', label: 'Job Applications', icon: IoDocumentTextOutline },
    { id: 'contactForms', label: 'Contact Form Submissions', icon: IoMailOutline },
  ];

  return (
    <div className="min-h-screen bg-navy-dark flex flex-col">
      {/* Top Header */}
      <header className="bg-[#0f172a] border-b border-gray-800 py-4 px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 text-gray-400 hover:text-white md:hidden"
          >
            {sidebarOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
          </button>
          <img src="/logos/balitech-logo.png" alt="BaliTech Logo" className="h-8" />
          <h1 className="text-xl font-bold text-white ml-3">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <IoLogOutOutline size={20} className="mr-1" /> Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
            <nav className="relative w-64 max-w-xs h-full bg-[#0f172a] border-r border-gray-800 pt-5 pb-4 flex flex-col">
              <div className="flex-1 px-2 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-orange text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="mr-3" size={20} />
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}

        {/* Sidebar - Desktop */}
        <nav className="hidden md:flex md:flex-col md:w-64 md:bg-[#0f172a] md:border-r md:border-gray-800">
          <div className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-orange text-white shadow-[0_0_10px_rgba(244,149,35,0.3)]'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon className="mr-3" size={20} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 shadow-lg">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'jobPosts' && <JobPostManager />}
              {activeSection === 'applications' && <ApplicationManager />}
              {activeSection === 'contactForms' && <ContactFormManager />}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard; 