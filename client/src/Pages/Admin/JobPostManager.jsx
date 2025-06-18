import React, { useState, useEffect } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '../../utils/api';

function JobPostManager() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [formError, setFormError] = useState('');

  const emptyJobForm = {
    title: '',
    type: 'Full-time', // Default value
    location: '',
    description: '',
    requirements: [''],
    responsibilities: ['']
  };

  const [jobForm, setJobForm] = useState(emptyJobForm);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    getJobs()
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  };

  const handleJobFormChange = (e) => {
    const { name, value } = e.target;
    setJobForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setJobForm(prevState => {
      const updatedArray = [...prevState[field]];
      updatedArray[index] = value;
      return {
        ...prevState,
        [field]: updatedArray
      };
    });
  };

  const addArrayField = (field) => {
    setJobForm(prevState => ({
      ...prevState,
      [field]: [...prevState[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setJobForm(prevState => {
      const updatedArray = [...prevState[field]];
      updatedArray.splice(index, 1);
      return {
        ...prevState,
        [field]: updatedArray.length ? updatedArray : [''] // Ensure at least one empty field
      };
    });
  };

  const validateForm = () => {
    if (!jobForm.title) return 'Job title is required';
    if (!jobForm.type) return 'Job type is required';
    if (!jobForm.location) return 'Job location is required';
    if (!jobForm.description) return 'Job description is required';
    if (jobForm.requirements.some(req => !req.trim())) 
      return 'All requirements must be filled or removed';
    if (jobForm.responsibilities.some(resp => !resp.trim())) 
      return 'All responsibilities must be filled or removed';
    return '';
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }
    
    // Filter out empty fields
    const formData = {
      ...jobForm,
      requirements: jobForm.requirements.filter(req => req.trim()),
      responsibilities: jobForm.responsibilities.filter(resp => resp.trim())
    };
    
    try {
      if (editingJobId) {
        // Update existing job
        await updateJob(editingJobId, formData);
      } else {
        // Create new job
        await createJob(formData);
      }
      fetchJobs();
      resetForm();
    } catch (error) {
      setFormError(`Error ${editingJobId ? 'updating' : 'creating'} job: ${error.message}`);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteJob(jobId);
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        alert(`Failed to delete job: ${error.message}`);
      }
    }
  };

  const handleEditJob = (job) => {
    setJobForm({
      title: job.title,
      type: job.type,
      location: job.location,
      description: job.description,
      requirements: job.requirements.length ? job.requirements : [''],
      responsibilities: job.responsibilities.length ? job.responsibilities : ['']
    });
    setEditingJobId(job._id);
    setIsAddingJob(true);
  };

  const resetForm = () => {
    setJobForm(emptyJobForm);
    setEditingJobId(null);
    setIsAddingJob(false);
    setFormError('');
  };

  const renderJobForm = () => (
    <form onSubmit={handleJobSubmit} className="space-y-4">
      <h3 className="text-xl font-medium text-white mb-4">
        {editingJobId ? 'Edit Job Posting' : 'Add New Job Posting'}
      </h3>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Job Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={jobForm.title}
          onChange={handleJobFormChange}
          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
            Job Type*
          </label>
          <select
            id="type"
            name="type"
            value={jobForm.type}
            onChange={handleJobFormChange}
            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Location*
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobForm.location}
            onChange={handleJobFormChange}
            placeholder="e.g., Remote, New York, Hybrid"
            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Job Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={jobForm.description}
          onChange={handleJobFormChange}
          rows={4}
          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Requirements*
        </label>
        {jobForm.requirements.map((requirement, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={requirement}
              onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
              className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
              placeholder={`Requirement ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayField('requirements', index)}
              className="bg-red-900/20 hover:bg-red-900/40 text-red-400 px-3 py-2 rounded-lg"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField('requirements')}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          + Add Requirement
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Responsibilities*
        </label>
        {jobForm.responsibilities.map((responsibility, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={responsibility}
              onChange={(e) => handleArrayFieldChange('responsibilities', index, e.target.value)}
              className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
              placeholder={`Responsibility ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayField('responsibilities', index)}
              className="bg-red-900/20 hover:bg-red-900/40 text-red-400 px-3 py-2 rounded-lg"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField('responsibilities')}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          + Add Responsibility
        </button>
      </div>

      {formError && (
        <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400 text-sm">{formError}</p>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange hover:bg-orange/90 text-white rounded-lg"
        >
          {editingJobId ? 'Update Job' : 'Create Job'}
        </button>
      </div>
    </form>
  );

  const renderJobsList = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-white">Job Postings</h3>
        <button
          onClick={() => setIsAddingJob(true)}
          className="px-4 py-2 bg-orange hover:bg-orange/90 text-white rounded-lg"
        >
          Add New Job
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading jobs...</p>
        </div>
      ) : jobs.length > 0 ? (
        <div className="divide-y divide-gray-800">
          {jobs.map(job => (
            <div key={job._id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-white">{job.title}</h4>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-sm bg-blue-900/30 text-blue-400 py-1 px-3 rounded-full">
                      {job.type}
                    </span>
                    <span className="text-sm text-gray-400">{job.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="px-3 py-1 bg-blue-900/20 hover:bg-blue-900/40 text-blue-400 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="px-3 py-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-400 mt-2 line-clamp-2">{job.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-[#1e293b]/50 rounded-lg">
          <p className="text-gray-400">No job postings yet.</p>
          <button
            onClick={() => setIsAddingJob(true)}
            className="mt-4 px-4 py-2 bg-orange hover:bg-orange/90 text-white rounded-lg"
          >
            Add Your First Job Posting
          </button>
        </div>
      )}
    </div>
  );

  return isAddingJob ? renderJobForm() : renderJobsList();
}

export default JobPostManager; 