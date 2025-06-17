import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoBriefcaseOutline, IoTimeOutline, IoLocationOutline, IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job listings from backend
    fetch('/api/jobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-28 pb-20 bg-navy-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Team</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore opportunities to work with us and be part of building innovative solutions.
          </p>
          
          {/* Decorative elements */}
          <div className="relative mt-12">
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-40 h-40 bg-orange/10 rounded-full blur-3xl"></div>
            <img src="/icons/wave.svg" alt="" className="w-full max-w-md mx-auto opacity-10" />
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Background decorative elements */}
          <div className="absolute -right-20 top-40 w-40 h-40 bg-orange/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -left-20 top-80 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading job openings...</p>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-8">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#0f172a] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
                <IoBriefcaseOutline size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl text-gray-200 mb-4">No open positions at the moment</h3>
              <p className="text-gray-400">
                Please check back later or submit your application for future opportunities.
              </p>
            </div>
          )}

          <div className="mt-16 bg-[#0f172a] rounded-xl p-8 border border-gray-800 shadow-lg relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-6">Don't see a role for you?</h2>
              <p className="text-gray-300 mb-8">
                We're always looking for talented individuals to join our team. 
                Submit your application and we'll keep you in mind for future opportunities.
              </p>
              <ApplicationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);
  const [applying, setApplying] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-[#0f172a] rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-[0_5px_30px_rgba(15,23,42,0.8)] transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">{job.title}</h3>
            <div className="flex flex-wrap items-center mt-2 gap-4">
              <span className="text-sm flex items-center text-blue-400">
                <IoBriefcaseOutline className="mr-1" /> {job.type}
              </span>
              <span className="text-sm flex items-center text-gray-400">
                <IoLocationOutline className="mr-1" /> {job.location}
              </span>
              {job.deadline && (
                <span className="text-sm flex items-center text-orange">
                  <IoTimeOutline className="mr-1" /> Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-orange hover:text-orange/80 transition-colors"
          >
            {expanded ? (
              <>Hide Details <IoChevronUpOutline className="ml-1" /></>
            ) : (
              <>View Details <IoChevronDownOutline className="ml-1" /></>
            )}
          </button>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 border-t border-gray-800 pt-4"
          >
            <div className="prose prose-sm prose-invert max-w-none">
              <h4 className="text-lg font-medium text-white">Description</h4>
              <p className="text-gray-300">{job.description}</p>
              
              <h4 className="text-lg font-medium text-white mt-4">Requirements</h4>
              <ul className="list-disc pl-5 text-gray-300">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>

              <h4 className="text-lg font-medium text-white mt-4">Responsibilities</h4>
              <ul className="list-disc pl-5 text-gray-300">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={() => setApplying(true)}
                  className="bg-orange hover:bg-orange/90 text-white py-2 px-6 rounded-lg transition-colors shadow-[0_5px_15px_rgba(244,149,35,0.3)] hover:shadow-[0_8px_25px_rgba(244,149,35,0.5)]"
                >
                  Apply for this position
                </button>
              </div>

              {applying && (
                <div className="mt-6">
                  <ApplicationForm jobId={job._id} jobTitle={job.title} onComplete={() => setApplying(false)} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function ApplicationForm({ jobId = '', jobTitle = '', onComplete = () => {} }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bpoExperience: '',
    resumeUrl: '',
    coverLetter: '',
    jobId: jobId,
    jobTitle: jobTitle
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit application');
      }
      
      setSubmitted(true);
      setSubmitting(false);
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error submitting application:', error);
      setError(`Failed to submit application: ${error.message}`);
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 bg-green-900/20 border border-green-800 rounded-lg"
      >
        <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl text-green-400 mb-2">Application Submitted!</h3>
        <p className="text-gray-300">
          Thank you for your interest. We'll review your application and get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {jobTitle && (
        <div className="mb-4 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-blue-400 flex items-center">
            <IoBriefcaseOutline className="mr-2" /> Applying for: {jobTitle}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>

        <div>
          <label htmlFor="bpoExperience" className="block text-sm font-medium text-gray-300 mb-1">
            How much experience do you have in BPO?
          </label>
          <input
            type="text"
            id="bpoExperience"
            name="bpoExperience"
            value={formData.bpoExperience}
            onChange={handleChange}
            required
            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>
      </div>

      <div>
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-300 mb-1">
          Cover Letter (Optional)
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          rows={4}
          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="Tell us why you're interested in working with us..."
        ></textarea>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange hover:bg-orange/90 disabled:bg-orange/50 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-[0_5px_15px_rgba(244,149,35,0.3)] hover:shadow-[0_8px_25px_rgba(244,149,35,0.5)]"
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Submitting...
            </span>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  );
}

export default Careers; 