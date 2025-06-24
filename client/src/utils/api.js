// API utility functions with CSRF protection
let csrfToken = null;

// Function to fetch CSRF token
const fetchCsrfToken = async () => {
  if (csrfToken) return csrfToken;
  
  try {
    const response = await fetch('/api/csrf-token', {
      credentials: 'include' // Important for cookies
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }
    
    const data = await response.json();
    csrfToken = data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

// Generic API request function with CSRF token
const apiRequest = async (url, method = 'GET', data = null) => {
  try {
    // Get CSRF token for non-GET requests
    let headers = {
      'Content-Type': 'application/json'
    };
    
    if (method !== 'GET') {
      const token = await fetchCsrfToken();
      headers['CSRF-Token'] = token;
    }
    
    const options = {
      method,
      headers,
      credentials: 'include', // Important for cookies
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};

// API functions for different endpoints
export const getJobs = () => apiRequest('/api/jobs');
export const getJob = (id) => apiRequest(`/api/jobs/${id}`);
export const createJob = (data) => apiRequest('/api/jobs', 'POST', data);
export const updateJob = (id, data) => apiRequest(`/api/jobs/${id}`, 'PUT', data);
export const deleteJob = (id) => apiRequest(`/api/jobs/${id}`, 'DELETE');

export const getApplications = () => apiRequest('/api/applications');
export const getApplicationsByJob = (jobId) => apiRequest(`/api/applications/job/${jobId}`);
export const createApplication = (data) => apiRequest('/api/applications', 'POST', data);
export const updateApplicationStatus = (id, status) => apiRequest(`/api/applications/${id}/status`, 'PUT', { status });
export const deleteApplication = (id) => apiRequest(`/api/applications/${id}`, 'DELETE');

export const getContacts = () => apiRequest('/api/contacts');
export const createContact = (data) => apiRequest('/api/contacts', 'POST', data);
export const updateContactStatus = (id, status) => apiRequest(`/api/contacts/${id}/status`, 'PUT', { status });
export const deleteContact = (id) => apiRequest(`/api/contacts/${id}`, 'DELETE');

// File upload function (doesn't use CSRF token as it's multipart/form-data)
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `File upload failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}; 