import React, { useState, useEffect } from 'react';

function ContactFormManager() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_APP_SERVER_URI}/api/contacts`)
      .then(response => response.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
  };

  const handleStatusChange = (contactId, newStatus) => {
    fetch(`${import.meta.env.VITE_APP_SERVER_URI}/api/contacts/${contactId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to update status');
        fetchContacts();
      })
      .catch(error => {
        console.error('Error updating contact status:', error);
      });
  };

  const handleDeleteContact = (contactId) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      fetch(`${import.meta.env.VITE_APP_SERVER_URI}/api/contacts/${contactId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete contact');
          fetchContacts();
          if (selectedContact && selectedContact._id === contactId) {
            setSelectedContact(null);
          }
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
        });
    }
  };

  const filteredContacts = contacts
    .filter(contact => {
      // Filter by status
      if (statusFilter !== 'all' && contact.status !== statusFilter) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          contact.name?.toLowerCase().includes(query) ||
          contact.email?.toLowerCase().includes(query) ||
          contact.subject?.toLowerCase().includes(query)
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
      case 'read':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'replied':
        return 'bg-green-900/30 text-green-400';
      case 'spam':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-white mb-6">Contact Form Submissions</h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contacts List */}
        <div className={`${selectedContact ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="bg-[#1e293b] rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email or subject..."
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
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="spam">Spam</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading contacts...</p>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="space-y-4">
              {filteredContacts.map(contact => (
                <div
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors ${selectedContact && selectedContact._id === contact._id
                    ? 'bg-[#1e293b] border-orange'
                    : 'bg-[#1e293b] border-gray-800 hover:border-gray-600'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-white">{contact.name}</h4>
                      <p className="text-gray-400">{contact.email}</p>
                      {contact.subject && (
                        <p className="text-sm text-orange mt-1">Subject: {contact.subject}</p>
                      )}
                    </div>
                    <div>
                      <span className={`inline-block py-1 px-3 rounded-full text-xs ${getStatusBadgeClass(contact.status || 'new')}`}>
                        {contact.status || 'New'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Received: {formatDate(contact.createdAt || new Date())}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-[#1e293b]/50 rounded-lg">
              <p className="text-gray-400">No contact submissions found.</p>
            </div>
          )}
        </div>

        {/* Contact Details */}
        {selectedContact && (
          <div className="lg:col-span-5">
            <div className="bg-[#1e293b] rounded-xl p-6 sticky top-28">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-medium text-white">{selectedContact.name}'s Message</h4>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm text-gray-400">Email</h5>
                    <p className="text-white">{selectedContact.email}</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-gray-400">Phone</h5>
                    <p className="text-white">{selectedContact.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400">Subject</h5>
                  <p className="text-white">{selectedContact.subject || 'No subject'}</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-400">Message</h5>
                  <div className="mt-1 bg-[#0f172a] rounded-lg p-4">
                    <p className="text-gray-300 whitespace-pre-line">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h5 className="text-sm text-gray-400 mb-2">Update Status</h5>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedContact._id, 'new')}
                      className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-lg hover:bg-blue-900/40"
                    >
                      New
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id, 'read')}
                      className="px-3 py-1 bg-yellow-900/20 text-yellow-400 rounded-lg hover:bg-yellow-900/40"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id, 'replied')}
                      className="px-3 py-1 bg-green-900/20 text-green-400 rounded-lg hover:bg-green-900/40"
                    >
                      Replied
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id, 'spam')}
                      className="px-3 py-1 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40"
                    >
                      Mark as Spam
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <button
                    onClick={() => handleDeleteContact(selectedContact._id)}
                    className="px-4 py-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg"
                  >
                    Delete Message
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

export default ContactFormManager; 