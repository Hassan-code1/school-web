import React, { useState, useEffect } from 'react';
import { 
  FaUserFriends, 
  FaChalkboardTeacher, 
  FaUserCog, 
  FaFileInvoiceDollar, 
  FaBullhorn, 
  FaPlus,
  FaTasks,
  FaTimes,
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaSchool,
  FaBookReader
} from 'react-icons/fa';

// --- Mock Data ---
// In a real app, this would be fetched from a comprehensive admin API.
const mockAdminData = {
  profile: {
    name: 'Mr. A. K. Sharma',
    title: 'Principal',
    email: 'principal@shivjyoti.ac.in',
    profilePicUrl: 'https://via.placeholder.com/150/007bff/FFFFFF?text=AS',
  },
  stats: {
    totalStudents: 1250,
    totalTeachers: 85,
    totalStaff: 42,
    totalRevenue: 9500000, // in INR
    outstandingFees: 750000,
  },
  announcements: [
    { id: 1, title: 'Annual Sports Day', date: '2025-10-20', content: 'Annual Sports Day will be held on Nov 5th...' },
    { id: 2, title: 'Diwali Break', date: '2025-10-18', content: 'The school will remain closed from Oct 28th to Nov 2nd for Diwali.' },
  ],
  recentActivity: [
    { id: 1, type: 'USER_ADDED', description: 'Teacher Priya Singh added to Science Dept.', time: '2h ago' },
    { id: 2, type: 'FEE_PAID', description: 'Fee payment of ₹15,000 received from Student ID SJS-10234.', time: '3h ago' },
  ]
};

// ===================================
// REUSABLE CARD COMPONENTS
// ===================================

const StatCard = ({ title, value, icon, note }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <IconComponent className="text-2xl text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {note && <p className="text-xs text-gray-500">{note}</p>}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon, children, className = '', actions }) => {
  const IconComponent = icon;
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {IconComponent && <IconComponent className="text-xl text-blue-600" />}
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

// ===================================
// ADD USER MODAL COMPONENT
// ===================================
const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [role, setRole] = useState('student'); // 'student', 'teacher', 'staff'
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Reset form when role changes
  useEffect(() => {
    setFormData({ name: '', email: '' });
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // --- API Submission Simulation ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user object and descriptive log
    const newUser = {
      id: `SJS-${Math.floor(10000 + Math.random() * 90000)}`,
      role,
      ...formData,
      defaultPassword: 'password123' // Simulating default password
    };
    const activityLog = `New ${role} added: ${formData.name} (${formData.email})`;

    console.log("Creating new user:", newUser);
    onSave(newUser, activityLog); // Pass data back to parent
    setIsSaving(false);
    onClose();
    setRole('student'); // Reset modal
  };

  if (!isOpen) return null;

  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Create New User</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="role" className={labelStyle}>User Role</label>
            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className={inputStyle}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <hr />
          <div>
            <label htmlFor="name" className={labelStyle}>Full Name</label>
            <input type="text" name="name" id="name" onChange={handleChange} required className={inputStyle} />
          </div>
          <div>
            <label htmlFor="email" className={labelStyle}>Email Address</label>
            <input type="email" name="email" id="email" onChange={handleChange} required className={inputStyle} />
          </div>

          {/* Conditional Fields */}
          {role === 'student' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="class" className={labelStyle}>Class</label>
                <input type="text" name="class" id="class" onChange={handleChange} placeholder="e.g., Class XI" required className={inputStyle} />
              </div>
              <div>
                <label htmlFor="section" className={labelStyle}>Section</label>
                <input type="text" name="section" id="section" onChange={handleChange} placeholder="e.g., A" required className={inputStyle} />
              </div>
            </div>
          )}
          {role === 'teacher' && (
            <div>
              <label htmlFor="department" className={labelStyle}>Department</label>
              <input type="text" name="department" id="department" onChange={handleChange} placeholder="e.g., Science" required className={inputStyle} />
            </div>
          )}
          {role === 'staff' && (
            <div>
              <label htmlFor="jobTitle" className={labelStyle}>Job Title</label>
              <input type="text" name="jobTitle" id="jobTitle" onChange={handleChange} placeholder="e.g., Accountant" required className={inputStyle} />
            </div>
          )}

          <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-md">
            An email will be sent with their auto-generated ID and default password.
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSaving ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===================================
// POST ANNOUNCEMENT MODAL
// ===================================
const PostAnnouncementModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // --- API Submission Simulation ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAnnouncement = {
      id: Math.floor(Math.random() * 10000),
      date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
      ...formData
    };

    console.log("Posting announcement:", newAnnouncement);
    onSave(newAnnouncement); // Pass data back to parent
    setIsSaving(false);
    setFormData({ title: '', content: '' }); // Reset form
    onClose();
  };

  if (!isOpen) return null;
  
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Post New Announcement</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className={labelStyle}>Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={inputStyle} />
          </div>
          <div>
            <label htmlFor="content" className={labelStyle}>Content</label>
            <textarea name="content" id="content" rows="5" value={formData.content} onChange={handleChange} required className={`${inputStyle} resize-y`}></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSaving ? 'Posting...' : 'Post Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(mockAdminData);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  // --- Event Handlers ---
  const handleCreateUser = (newUser, activityLog) => {
    // This simulates adding the user and updating the activity log
    const newActivity = {
      id: Math.random(),
      type: 'USER_ADDED',
      description: activityLog,
      time: 'Just now'
    };

    setAdminData(prev => ({
      ...prev,
      // In a real app, you might refetch stats or just increment
      stats: {
        ...prev.stats,
        totalStudents: newUser.role === 'student' ? prev.stats.totalStudents + 1 : prev.stats.totalStudents,
        totalTeachers: newUser.role === 'teacher' ? prev.stats.totalTeachers + 1 : prev.stats.totalTeachers,
        totalStaff: newUser.role === 'staff' ? prev.stats.totalStaff + 1 : prev.stats.totalStaff,
      },
      recentActivity: [newActivity, ...prev.recentActivity]
    }));
  };
  
  const handlePostAnnouncement = (newAnnouncement) => {
    setAdminData(prev => ({
      ...prev,
      announcements: [newAnnouncement, ...prev.announcements]
    }));
  };

  // Format currency
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto">
        
        {/* --- Welcome Header --- */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">Welcome, {adminData.profile.name} (Principal)</p>
        </div>

        {/* --- Top Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Students" value={adminData.stats.totalStudents} icon={FaUserFriends} />
          <StatCard title="Total Teachers" value={adminData.stats.totalTeachers} icon={FaChalkboardTeacher} />
          <StatCard title="Total Staff" value={adminData.stats.totalStaff} icon={FaUserCog} />
          <StatCard 
            title="Total Revenue" 
            value={formatINR(adminData.stats.totalRevenue)} 
            icon={FaFileInvoiceDollar}
            note={`${formatINR(adminData.stats.outstandingFees)} outstanding`}
          />
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* --- Column 1: Main Content --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Actions */}
            <DashboardCard title="Quick Actions" icon={FaTasks}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setIsUserModalOpen(true)}
                  className="flex flex-col items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                >
                  <FaPlus className="text-2xl mb-2" />
                  Add New User
                </button>
                <button 
                  onClick={() => setIsAnnouncementModalOpen(true)}
                  className="flex flex-col items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                >
                  <FaBullhorn className="text-2xl mb-2" />
                  Post Announcement
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  <FaFileInvoiceDollar className="text-2xl mb-2" />
                  Manage Finances
                </button>
              </div>
            </DashboardCard>

            {/* School Announcements */}
            <DashboardCard 
              title="School Announcements" 
              icon={FaBullhorn}
              actions={
                <button 
                  onClick={() => setIsAnnouncementModalOpen(true)}
                  className="flex items-center gap-1 text-sm bg-blue-600 text-white py-1 px-3 rounded-md font-semibold hover:bg-blue-700"
                >
                  <FaPlus /> Post New
                </button>
              }
            >
              <ul className="space-y-4 max-h-96 overflow-y-auto">
                {adminData.announcements.map(item => (
                  <li key={item.id} className="p-3 bg-gray-50 rounded-md border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{item.title}</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 truncate">{item.content}</p>
                  </li>
                ))}
              </ul>
            </DashboardCard>
          </div>

          {/* --- Column 2: Sidebar --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Admin Profile */}
            <DashboardCard title="Admin Profile" icon={FaUser}>
              <div className="flex flex-col items-center">
                <img 
                  src={adminData.profile.profilePicUrl} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full shadow-md mb-4" 
                />
                <h4 className="text-xl font-semibold">{adminData.profile.name}</h4>
                <p className="text-gray-600">{adminData.profile.title}</p>
              </div>
              <hr className="my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-500" />
                  <span>{adminData.profile.email}</span>
                </div>
              </div>
            </DashboardCard>

            {/* Recent Activity */}
            <DashboardCard title="Recent Activity" icon={FaTasks}>
              <ul className="space-y-3 max-h-96 overflow-y-auto">
                {adminData.recentActivity.map(activity => (
                  <li key={activity.id} className="flex gap-3">
                    <div className="p-2 bg-gray-100 rounded-full h-fit">
                      {activity.type === 'USER_ADDED' ? <FaUserFriends className="text-gray-600" /> : <FaFileInvoiceDollar className="text-gray-600" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </DashboardCard>
          </div>
        </div>
      </div>
      <AddUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleCreateUser}
      />
      <PostAnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        onSave={handlePostAnnouncement}
      />
    </div>
  );
};

export default AdminDashboard;