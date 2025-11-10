import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaBook, 
  FaCalendarAlt, 
  FaClock, 
  FaTasks, 
  FaFileInvoiceDollar, 
  FaPercent, 
  FaTimes,
  FaIdCard,
  FaEdit,
  FaBirthdayCake,
  FaHome,
} from 'react-icons/fa';

const DashboardCard = ({ title, icon, children, className = '' }) => {
  const IconComponent = icon;
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {IconComponent && <IconComponent className="text-xl text-blue-600" />}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

const ProfileEditModal = ({ user, profile, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob:'',
    address: '',
    fatherName: '',
    fatherNo: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if( user && profile ) {
      const formatDob = profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '';
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: profile.phone || '',
        dob: formatDob,
        address: profile.address || '',
        fatherName: profile.fatherName || '',
        fatherNo: profile.fatherNo || '',
      });
    }
  }, [user, profile, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;
  
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Edit Your Profile</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h4 className="font-semibold text-gray-800">Account Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelStyle}>Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputStyle} autoComplete="nope"/>
            </div>
            <div>
              <label htmlFor="email" className={labelStyle}>Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputStyle} autoComplete="nope"/>
            </div>
          </div>

          <hr className="my-4" />
          <h4 className="font-semibold text-gray-800">Personal Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className={labelStyle}>Full phone</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputStyle} autoComplete="nope"/>
            </div>
            <div>
              <label htmlFor="dob" className={labelStyle}>Date of Birth</label>
              <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} className={inputStyle} autoComplete="nope"/>
            </div>
          </div>

          <div>
            <label htmlFor="address" className={labelStyle}>Address</label>
            <textarea name="address" id="address" rows="3" value={formData.address} onChange={handleChange} className={inputStyle} placeholder="32,Shastri Nagar, Jodhpur Rajasthan" autoComplete="nope"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fathername" className={labelStyle}>Father's Name</label>
              <input type="text" name="fathername" id="fathername" value={formData.fathername} onChange={handleChange} className={inputStyle} autoComplete="nope" />
            </div>
            <div>
              <label htmlFor="fatherNo" className={labelStyle}>Father's Phone number</label>
              <input type="tel" name="fatherNo" id="fatherNo" value={formData.fatherNo} onChange={handleChange} className={inputStyle} autoComplete="nope"/>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div> 
        </form>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user: authUser, token, logout } = useAuth();

  useEffect(() => {
    if (authUser && token) {
      const fetchDashboardData = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/students/me', {
            method: 'GET'
            ,headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(res);
          if (!res.ok) {
            const errData = await res.json();
            if (res.status === 401 || res.status === 403) {
                logout();
            }
            throw new Error(errData.message  || 'Could not fetch student data');
          }
          
          const data = await res.json();
          setStudentData(data);
          
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchDashboardData();
    }
  }, [authUser, token, logout]);

  const todaySchedule = useMemo(() => {
    if (!studentData || !studentData.classSchedule) return [];

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(); // 0 for Sunday, 1 for Monday...
    const todayDayName = dayNames[today]; 

    return studentData.classSchedule.find(day => day.day === todayDayName) || { slots: [] };
  }, [studentData]);

const handleSaveProfile = async (updatedProfile) => {
  try {
    const res = await fetch("http://localhost:5000/api/students/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to update profile");
    }

    const {user, profile} = await res.json();
    setStudentData((prev) => ({ ...prev, user: user, profile: profile }));
  } catch (error) {
    console.error("Failed to update profile", error);
  }
};
  if (!studentData || !studentData.user || !studentData.profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading Dashboard...</p>
      </div>
    );
  }
  const {user, profile, assignments, financials, examSchedule, previousMarks} = studentData;
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-lg text-gray-600">Here's your dashboard for today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* main content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upcoming Assignments */}
            <DashboardCard title="Upcoming Assignments" icon={FaTasks}>
              <ul className="space-y-4">
                {assignments.length > 0 ? (
                  assignments.map(item => (
                    <li key={item.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <span className="font-semibold text-gray-800">{item.title}</span>
                        <span className="block sm:inline sm:ml-2 text-sm text-blue-700">{item.subject}</span>
                      </div>
                      <span className="text-sm font-medium text-red-600">Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                    </li>
                  ))
                ) : (
                  <p>No upcoming assignments. Great job!</p>
                )}
              </ul>
            </DashboardCard>
            
            {/* Today's Schedule */}
            <DashboardCard title="Today's Class Schedule" icon={FaClock}>
              <ul className="space-y-3">
                {todaySchedule && todaySchedule.slots.length > 0 ? (
                  todaySchedule.slots.map(slot => (
                    <li key={slot.time} className="flex items-center gap-4 p-3 border-b last:border-b-0">
                      <span className="font-semibold text-gray-800 w-32">{slot.time}</span>
                      <span className="text-gray-700">{slot.subject}</span>
                    </li>
                  ))
                ) : (
                  <p>No classes scheduled for today. Enjoy your day!</p>
                )}
              </ul>
            </DashboardCard>

            {/* Exam Schedule */}
            <DashboardCard title="Upcoming Exam Schedule" icon={FaCalendarAlt}>
              <ul className="space-y-3">
                {examSchedule.length > 0 ? (
                  examSchedule.map(exam => (
                    <li key={exam.subject} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <span className="font-semibold text-gray-800">{exam.subject}</span>
                        <span className="block text-sm text-gray-600">{exam.time}</span>
                      </div>
                      <span className="text-sm font-medium text-blue-700">{new Date(exam.date).toLocaleDateString()}</span>
                    </li>
                  ))
                ) : (
                  <p>No exams scheduled.</p>
                )}
              </ul>
            </DashboardCard>

          </div>

          {/*  Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profile Card */}
            <DashboardCard title="Student Profile" icon={FaUser} className="relative">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition-colors"
                title="Edit Profile"
              >
                <FaEdit className="text-lg" />
              </button>
              <div className="flex flex-col items-center">
                <img 
                  src={profile.profilePicUrl || `https://via.placeholder.com/150/007bff/FFFFFF?text=${user.name.charAt(0)}`} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full shadow-md mb-4" 
                />
                <h4 className="text-xl font-semibold">{user.name}</h4>
                <p className="text-gray-600">{profile.currentClass}</p>
              </div>
              <hr className="my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <FaIdCard className="text-gray-500" />
                  <span>{profile.studentId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-500" />
                  <span>{user.email}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gray-500" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.dob && (
                  <div className="flex items-center gap-3">
                    <FaBirthdayCake className="text-gray-500" />
                    <span>{new Date(profile.dob).toLocaleDateString()}</span>
                  </div>
                )}
                {profile.address && (
                  <div className="flex items-start gap-3">
                    <FaHome className="text-gray-500 mt-1" />
                    <span className="flex-1">{profile.address}</span>
                  </div>
                )}
                {profile.fatherName && (
                  <div className="flex items-center gap-3">
                    <FaUserFriends className="text-gray-500" />
                    <span>{profile.fatherName} (Father)</span>
                  </div>
                )}
              </div>
            </DashboardCard>
            
            {/* Fee Status */}
            <DashboardCard title="Fee Status" icon={FaFileInvoiceDollar}>
               <div className="text-center p-4 bg-blue-50 rounded-lg">
                 <p className="text-sm text-gray-600">Next Installment Due:</p>
                 <p className="text-2xl font-bold text-red-600">{financials.nextDueDate}</p>
                 <p className="text-lg font-semibold text-gray-800 mt-2">Amount: {financials.amount}</p>
                 <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700">
                   Pay Now
                 </button>
               </div>
            </DashboardCard>
            
            {/* Previous Marks */}
            <DashboardCard title={`Class ${previousMarks.class} Marks`} icon={FaPercent}>
               <p className="text-lg font-bold text-center text-blue-700 mb-4">
                 Overall: {previousMarks.overall}
               </p>
               <ul className="space-y-2 text-sm">
                 {previousMarks.subjects.map(sub => (
                   <li key={sub.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                     <span className="font-semibold text-gray-800">{sub.name}</span>
                     <span className="font-bold text-gray-700">{sub.score} <span className="text-xs text-gray-500">({sub.grade})</span></span>
                   </li>
                 ))}
               </ul>
            </DashboardCard>

          </div>
        </div>
      </div>

      <ProfileEditModal
        user={studentData.user}
        profile={studentData.profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default StudentDashboard;