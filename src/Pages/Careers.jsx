import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <div className="pt-28 pb-20">
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
        </motion.div>

        <div className="max-w-4xl mx-auto">
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
              <h3 className="text-2xl text-gray-200 mb-4">No open positions at the moment</h3>
              <p className="text-gray-400">
                Please check back later or send your resume for future opportunities.
              </p>
            </div>
          )}

          <div className="mt-16 bg-[#0f172a] rounded-xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Don't see a role for you?</h2>
            <p className="text-gray-300 mb-8">
              We're always looking for talented individuals to join our team. 
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <ApplicationForm />
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
      className="bg-[#0f172a] rounded-xl overflow-hidden border border-gray-800"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">{job.title}</h3>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-sm bg-blue-900/30 text-blue-400 py-1 px-3 rounded-full">
                {job.type}
              </span>
              <span className="text-sm text-gray-400">{job.location}</span>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-orange hover:text-orange/80 transition-colors"
          >
            {expanded ? 'Hide Details' : 'View Details'}
          </button>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                  className="bg-orange hover:bg-orange/90 text-white py-2 px-6 rounded-lg transition-colors"
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
    resumeUrl: '',
    coverLetter: '',
    jobId: jobId,
    jobTitle: jobTitle
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Just store the file name for now
      setFormData(prevState => ({
        ...prevState,
        resumeUrl: file.name // This will be replaced with the actual URL after upload
      }));
    }
  };

  const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      console.log('Starting file upload from frontend...', file.name, file.type);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Upload response not OK:', response.status, errorData);
        throw new Error(errorData.message || `Upload failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('File upload successful, received URL:', data.fileUrl);
      return data.fileUrl; // Return the URL of the uploaded file
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      // First upload the file if selected
      let resumeUrl = formData.resumeUrl;
      if (selectedFile) {
        try {
          resumeUrl = await uploadFileToCloudinary(selectedFile);
        } catch (uploadError) {
          setError(`File upload failed: ${uploadError.message}. Please try again.`);
          setSubmitting(false);
          return;
        }
      }
      
      // Then submit the application with the file URL
      const applicationData = {
        ...formData,
        resumeUrl
      };
      
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
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
      <div className="text-center py-6 bg-green-900/20 border border-green-800 rounded-lg">
        <h3 className="text-xl text-green-400 mb-2">Application Submitted!</h3>
        <p className="text-gray-300">
          Thank you for your interest. We'll review your application and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form encType='multipart/form-data' onSubmit={handleSubmit} className="space-y-4">
      {jobTitle && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-blue-400">Applying for: {jobTitle}</p>
        </div>
      )}

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
        <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-1">
          Resume
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange file:text-white hover:file:bg-orange/90"
        />
        <p className="text-xs text-gray-400 mt-1">Accepted formats: PDF, DOC, DOCX</p>
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
        ></textarea>
      </div>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange hover:bg-orange/90 disabled:bg-orange/50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}

export default Careers; 