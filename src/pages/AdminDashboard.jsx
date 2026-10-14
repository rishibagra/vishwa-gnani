import React, { useState, useEffect } from 'react';
import API_URL from '../config';

export default function AdminDashboard() {
  // Member Form States
  const [memberRole, setMemberRole] = useState('President');
  const [memberName, setMemberName] = useState('');
  const [memberImage, setMemberImage] = useState(null);
  const [members, setMembers] = useState([]);

  // Event Form States (Past Events & Gallery)
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventImages, setEventImages] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);

  // New Admin Form States
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isPromoting, setIsPromoting] = useState(false);

  const [message, setMessage] = useState('');

  // Robust helper to dynamically resolve logged-in admin email from localStorage
  const getAdminEmail = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('userInfo') || localStorage.getItem('user') || '{}');
      if (storedUser.email) return storedUser.email;
    } catch (e) {
      // JSON parse fallback
    }
    return localStorage.getItem('userEmail') || localStorage.getItem('email') || '';
  };

  const currentUserEmail = getAdminEmail();

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/members`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', memberName);
    formData.append('role', memberRole);
    if (memberImage) {
      formData.append('image', memberImage);
    }

    try {
      const res = await fetch(`${API_URL}/api/admin/member`, {
        method: 'POST',
        headers: {
          'x-admin-email': currentUserEmail
        },
        body: formData
      });
      const data = await res.json();
      setMessage(data.message || 'Member added/updated successfully!');
      setMemberName('');
      setMemberImage(null);
      e.target.reset();
      fetchMembers();
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/member/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-email': currentUserEmail
        }
      });
      const data = await res.json();
      setMessage(data.message || 'Member removed successfully!');
      fetchMembers();
    } catch (err) {
      setMessage('Error deleting member');
    }
  };

  // Handle Past Event Submission with Multiple Images & Database persistence
  const handleAddEvent = async (e) => {
    e.preventDefault();
    setEventLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', eventTitle);
    formData.append('date', eventDate);
    formData.append('description', eventDesc);

    // Append multiple files if selected
    if (eventImages && eventImages.length > 0) {
      for (let i = 0; i < eventImages.length; i++) {
        formData.append('images', eventImages[i]);
      }
    }

    try {
      const res = await fetch(`${API_URL}/api/admin/event`, {
        method: 'POST',
        headers: {
          'x-admin-email': currentUserEmail
        },
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Event and photo gallery successfully added to database!');
        setEventTitle('');
        setEventDate('');
        setEventDesc('');
        setEventImages([]);
        e.target.reset();
      } else {
        setMessage(data.message || 'Failed to add event.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error connecting to server while publishing event.');
    } finally {
      setEventLoading(false);
    }
  };

  // Handle Promoting another user to Admin
  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminEmail) {
      alert('Please enter an email address');
      return;
    }

    const activeAdminEmail = getAdminEmail();
    if (!activeAdminEmail) {
      setMessage('❌ Admin email not found in session. Please log in again.');
      return;
    }

    try {
      setIsPromoting(true);
      const res = await fetch(`${API_URL}/api/admin/make-admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': activeAdminEmail
        },
        body: JSON.stringify({ email: newAdminEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`🛡️ ${data.message}`);
        setNewAdminEmail('');
      } else {
        setMessage(`❌ Failed: ${data.message || 'Could not promote user'}`);
      }
    } catch (err) {
      console.error('Error promoting admin:', err);
      setMessage('❌ Server error promoting user to admin.');
    } finally {
      setIsPromoting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded font-medium shadow-sm">{message}</div>}
      
      {/* SECTION 1: MEMBERS FORM ONLY (Program Form Removed) */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-xl mx-auto">
        {/* Update Member Form */}
        <form onSubmit={handleUpdateMember} className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Update / Add Team Member</h2>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Role Designation</label>
            <select 
              value={memberRole} 
              onChange={(e) => setMemberRole(e.target.value)} 
              className="w-full p-2 border rounded bg-white"
              required
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Secretary">Secretary</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Director">Director</option>
              <option value="Member">Member</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Name</label>
            <input 
              type="text" 
              value={memberName} 
              onChange={(e) => setMemberName(e.target.value)} 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Upload Image from Gallery</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setMemberImage(e.target.files[0])} 
              className="w-full p-2 border rounded cursor-pointer" 
            />
          </div>
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-semibold cursor-pointer">
            Save Member
          </button>
        </form>
      </div>

      {/* SECTION 2: ADD PAST EVENTS & PHOTO GALLERY */}
      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Past Event & Photo Gallery</h2>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Event Title / Heading</label>
              <input 
                type="text" 
                value={eventTitle} 
                onChange={(e) => setEventTitle(e.target.value)} 
                placeholder="e.g. Free Health Checkup Camp"
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Event Date</label>
              <input 
                type="text" 
                value={eventDate} 
                onChange={(e) => setEventDate(e.target.value)} 
                placeholder="e.g. February 15, 2026"
                className="w-full p-2 border rounded" 
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Description & Content</label>
            <textarea 
              rows="4"
              value={eventDesc} 
              onChange={(e) => setEventDesc(e.target.value)} 
              placeholder="Write detailed event highlights, outcomes, and stories..."
              className="w-full p-2 border rounded" 
              required 
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Upload Event Photos (Multiple Gallery Images)</label>
            <input 
              type="file" 
              multiple
              accept="image/*"
              onChange={(e) => setEventImages(e.target.files)} 
              className="w-full p-2 border rounded bg-gray-50 cursor-pointer" 
            />
            <p className="text-xs text-gray-500 mt-1">Select multiple photos from your device to form the event gallery.</p>
          </div>

          <button 
            type="submit" 
            disabled={eventLoading}
            className="bg-orange-500 text-white px-6 py-2.5 rounded hover:bg-orange-600 font-semibold transition shadow cursor-pointer"
          >
            {eventLoading ? 'Uploading to Cloudinary & Saving...' : 'Publish Past Event'}
          </button>
        </form>
      </div>

      {/* SECTION 3: GRANT ADMIN ACCESS TO OTHER USERS */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">🛡️ Grant Admin Access</h2>
        <p className="text-xs font-semibold text-amber-600 mb-4 bg-amber-50 p-2 rounded border border-amber-200">
  ⚠️ Note: The user must already be registered/signed up on the website before you can grant them admin access.
</p>
        <form onSubmit={handleMakeAdmin} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">User Email Address</label>
            <input
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isPromoting}
            className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 font-semibold transition shadow cursor-pointer disabled:opacity-50"
          >
            {isPromoting ? 'Promoting...' : 'Make Admin'}
          </button>
        </form>
      </div>

      {/* SECTION 4: MANAGE EXISTING MEMBERS */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Current Team Members</h2>
        {members.length === 0 ? (
          <p className="text-gray-500">No members found.</p>
        ) : (
          <div className="divide-y">
            {members.map((member) => (
              <div key={member._id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {member.image && (
                    <img 
                      src={member.image.startsWith('http') ? member.image : `${API_URL}/${member.image.replace(/^\/+/, '')}`} 
                      alt={member.name} 
                      className="w-10 h-10 object-cover rounded-full border"
                    />
                  )}
                  <div>
                    <span className="font-semibold text-gray-800 block">{member.name}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full font-medium inline-block mt-1">
                      {member.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteMember(member._id)}
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}