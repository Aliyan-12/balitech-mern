import React, { useState, useEffect } from 'react';

function ApplicationManager() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    setLoading(true);
    fetch('/api/applications')
      .then(response => response.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
        setLoading(false);
      });
  };

  const handleStatusChange = (applicationId, newStatus) => {
    fetch(`/api/applications/${applicationId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to update status');
        fetchApplications();
      })
      .catch(error => {
        console.error('Error updating application status:', error);
      });
  };

  const handleDeleteApplication = (applicationId) => {
    if (confirm('Are you sure you want to delete this application?')) {
      fetch(`/api/applications/${applicationId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete application');
          fetchApplications();
          if (selectedApplication && selectedApplication._id === applicationId) {
            setSelectedApplication(null);
          }
        })
        .catch(error => {
          console.error('Error deleting application:', error);
        });
    }
  };

  const filteredApplications = applications
    .filter(app => {
      // Filter by status
      if (statusFilter !== 'all' && app.status !== statusFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          app.name?.toLowerCase().includes(query) ||
          app.email?.toLowerCase().includes(query) ||
          app.jobTitle?.toLowerCase().includes(query)
        );
      }
      
      return true;
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-900/30 text-blue-400';
      case 'reviewing':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'interviewed':
        return 'bg-purple-900/30 text-purple-400';
      case 'accepted':
        return 'bg-green-900/30 text-green-400';
      case 'rejected':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-white mb-6">Job Applications</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Applications List */}
        <div className={`${selectedApplication ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="bg-[#1e293b] rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email or job title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="interviewed">Interviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading applications...</p>
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map(application => (
                <div 
                  key={application._id}
                  onClick={() => setSelectedApplication(application)}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                    selectedApplication && selectedApplication._id === application._id
                      ? 'bg-[#1e293b] border-orange'
                      : 'bg-[#1e293b] border-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-white">{application.name}</h4>
                      <p className="text-gray-400">{application.email}</p>
                      {application.jobTitle && (
                        <p className="text-sm text-orange mt-1">Applied for: {application.jobTitle}</p>
                      )}
                    </div>
                    <div>
                      <span className={`inline-block py-1 px-3 rounded-full text-xs ${getStatusBadgeClass(application.status || 'new')}`}>
                        {application.status || 'New'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Received: {formatDate(application.createdAt || new Date())}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-[#1e293b]/50 rounded-lg">
              <p className="text-gray-400">No applications found.</p>
            </div>
          )}
        </div>

        {/* Application Details */}
        {selectedApplication && (
          <div className="lg:col-span-5">
            <div className="bg-[#1e293b] rounded-xl p-6 sticky top-28">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-medium text-white">{selectedApplication.name}'s Application</h4>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm text-gray-400">Email</h5>
                    <p className="text-white">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-gray-400">Phone</h5>
                    <p className="text-white">{selectedApplication.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400">Position</h5>
                  <p className="text-white">{selectedApplication.jobTitle || 'General Application'}</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400">Resume</h5>
                  <div className="mt-1">
                    <a 
                      href="#" 
                      className="inline-flex items-center px-3 py-1 bg-blue-900/20 text-blue-400 rounded-lg hover:bg-blue-900/40"
                    >
                      View Resume
                    </a>
                  </div>
                </div>

                {selectedApplication.coverLetter && (
                  <div>
                    <h5 className="text-sm text-gray-400">Cover Letter</h5>
                    <div className="mt-1 bg-[#0f172a] rounded-lg p-4">
                      <p className="text-gray-300 whitespace-pre-line">{selectedApplication.coverLetter}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <h5 className="text-sm text-gray-400 mb-2">Update Status</h5>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedApplication._id, 'new')}
                      className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-lg hover:bg-blue-900/40"
                    >
                      New
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplication._id, 'reviewing')}
                      className="px-3 py-1 bg-yellow-900/20 text-yellow-400 rounded-lg hover:bg-yellow-900/40"
                    >
                      Reviewing
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplication._id, 'interviewed')}
                      className="px-3 py-1 bg-purple-900/20 text-purple-400 rounded-lg hover:bg-purple-900/40"
                    >
                      Interviewed
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplication._id, 'accepted')}
                      className="px-3 py-1 bg-green-900/20 text-green-400 rounded-lg hover:bg-green-900/40"
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplication._id, 'rejected')}
                      className="px-3 py-1 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40"
                    >
                      Rejected
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <button
                    onClick={() => handleDeleteApplication(selectedApplication._id)}
                    className="px-4 py-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg"
                  >
                    Delete Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationManager; 