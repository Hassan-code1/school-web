import React, { useState, useMemo, useEffect } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaBook, FaCalendarAlt, 
  FaClock, FaTasks, FaPercent, FaTimes, FaIdCard, FaEdit,
  FaChalkboardTeacher, FaPlus, FaUsers, FaCheck, FaFileAlt, FaFileSignature, FaQuestionCircle
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// --- Mock Data ---
// In a real app, you would fetch this with useEffect.
const mockTeacherData = {
  profile: {
    teacherId: 'TJS-0042',
    name: 'Mrs. Priya Singh',
    email: 'priya.singh@shivjyoti.ac.in',
    phone: '+91 9123456789',
    profilePicUrl: 'https://via.placeholder.com/150/007bff/FFFFFF?text=PS',
    department: 'Science',
    title: 'Senior Physics Teacher',
  },
  // List of classes the teacher manages
  classes: [
    { classId: 'XI-A', name: 'Class XI - Section A', subject: 'Physics', studentCount: 30, averageGrade: 88, students: [/* ...list of student objects... */] },
    { classId: 'XI-B', name: 'Class XI - Section B', subject: 'Physics', studentCount: 32, averageGrade: 82, students: [/* ...list of student objects... */] },
    { classId: 'XII-A', name: 'Class XII - Section A', subject: 'Physics', studentCount: 28, averageGrade: 91, students: [/* ...list of student objects... */] },
  ],
  // Full weekly schedule
  classSchedule: [
    { day: 'Sunday', slots: [] },
    { day: 'Monday', slots: [
      { time: '08:00 - 08:50', class: 'XI-A', subject: 'Physics' },
      { time: '09:00 - 09:50', class: 'XI-B', subject: 'Physics' },
    ]},
    { day: 'Tuesday', slots: [
      { time: '10:00 - 10:50', class: 'XII-A', subject: 'Physics' },
    ]},
    { day: 'Wednesday', slots: [ // This will be today's schedule for the demo
      { time: '08:00 - 08:50', class: 'XI-A', subject: 'Physics' },
      { time: '09:00 - 09:50', class: 'XI-B', subject: 'Physics' },
      { time: '11:00 - 11:50', class: 'XII-A', subject: 'Physics (Lab)' },
    ]},
    { day: 'Thursday', slots: [
      { time: '10:00 - 10:50', class: 'XII-A', subject: 'Physics' },
    ]},
    { day: 'Friday', slots: [
      { time: '08:00 - 08:50', class: 'XI-A', subject: 'Physics' },
      { time: '09:00 - 09:50', class: 'XI-B', subject: 'Physics' },
    ]},
    { day: 'Saturday', slots: [] },
  ],
  // List of assignments they have given
  assignments: [
    { id: 1, title: 'Chapter 3 Problems', class: 'XI-A', dueDate: '2025-10-25', submittedCount: 28, totalStudents: 30 },
    { id: 2, title: 'Chapter 3 Problems', class: 'XI-B', dueDate: '2025-10-25', submittedCount: 30, totalStudents: 32 },
    { id: 3, title: 'Wave Optics Worksheet', class: 'XII-A', dueDate: '2025-10-28', submittedCount: 25, totalStudents: 28 },
  ],
};

const BASE_URL = "http://localhost:5000";

// ===================================
// REUSABLE CARD COMPONENT
// ===================================
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
// PROFILE EDIT MODAL COMPONENT
// ===================================
const ProfileEditModal = ({ teacher, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(teacher);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(teacher);
  }, [teacher, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // --- API Submission Simulation ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Saving profile data:", formData);
    onSave(formData); // Update parent state
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;
  
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Edit Your Profile</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className={labelStyle}>Full Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputStyle} />
          </div>
          <div>
            <label htmlFor="email" className={labelStyle}>Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputStyle} />
          </div>
          <div>
            <label htmlFor="phone" className={labelStyle}>Phone</label>
            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputStyle} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===================================
// CREATE ASSIGNMENT MODAL COMPONENT
// ===================================
const CreateAssignmentModal = ({ classes, isOpen, onClose, onSave }) => {
  const initialFormState = {
    title: '',
    classId: '',
    dueDate: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // --- API Submission Simulation ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find class info from selected classId
    const selectedClass = classes.find(c => c.classId === formData.classId);
    
    const newAssignment = {
      id: Math.floor(Math.random() * 10000), // temp ID
      title: formData.title,
      class: selectedClass.name,
      dueDate: formData.dueDate,
      submittedCount: 0,
      totalStudents: selectedClass.studentCount,
      ...formData, // includes description
    };
    
    console.log("Saving new assignment:", newAssignment);
    onSave(newAssignment); // Pass new assignment to parent
    setIsSubmitting(false);
    setFormData(initialFormState); // Reset form
    onClose();
  };

  if (!isOpen) return null;

  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Create New Assignment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className={labelStyle}>Assignment Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputStyle} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="classId" className={labelStyle}>Assign to Class</label>
              <select name="classId" id="classId" value={formData.classId} onChange={handleChange} className={inputStyle} required>
                <option value="" disabled>Select a class...</option>
                {classes.map(c => (
                  <option key={c.classId} value={c.classId}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className={labelStyle}>Due Date</label>
              <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} className={inputStyle} required />
            </div>
          </div>
          <div>
            <label htmlFor="description" className={labelStyle}>Description (Optional)</label>
            <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} className={`${inputStyle} resize-y`}></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSubmitting ? 'Assigning...' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateQuestionModal = ({ isOpen, onClose, onSave, classes, token }) => {
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState(''); // 'class' is a reserved word
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (options.includes('') || !answer || !description || !subject || !className) {
      setError("Please fill out all fields, including all four options and the correct answer.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          description,
          options,
          answer,
          subject,
          class: className // Send as 'class'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create question');
      }
      
      onSave(data); // Pass new question back to dashboard
      // Reset form
      setDescription('');
      setOptions(['', '', '', '']);
      setAnswer('');
      setSubject('');
      setClassName('');
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  
  // Get unique subjects from the classes prop
  const uniqueSubjects = [...new Set(classes.map(c => c.subject))];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Create New Question</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="subject" className={labelStyle}>Subject</label>
              <select name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputStyle} required>
                <option value="" disabled>Select a subject...</option>
                {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="className" className={labelStyle}>Class</label>
              <select name="className" id="className" value={className} onChange={(e) => setClassName(e.target.value)} className={inputStyle} required>
                <option value="" disabled>Select a class...</option>
                {/* Filter classes by selected subject */}
                {classes.filter(c => c.subject === subject).map(c => <option key={c.classId} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className={labelStyle}>Question Description</label>
            <textarea name="description" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className={inputStyle} placeholder="e.g., What is the powerhouse of the cell?" required />
          </div>

          <div>
            <label className={labelStyle}>Options</label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">{String.fromCharCode(65 + index)}.</span>
                  <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} className={inputStyle} placeholder={`Option ${String.fromCharCode(65 + index)}`} required />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Correct Answer</label>
            <div className="flex gap-4 p-2 bg-gray-50 rounded-md">
              {options.map((option, index) => (
                <label key={index} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="answer" value={option} checked={answer === option} onChange={(e) => setAnswer(e.target.value)} className="focus:ring-blue-500" required />
                  {String.fromCharCode(65 + index)}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSubmitting ? 'Saving...' : 'Save Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateTestModal = ({ isOpen, onClose, onSave, classes, questions, token }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');
  const [duration, setDuration] = useState(60);
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Array of IDs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleQuestion = (questionId) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subject || !className || !scheduledFor || selectedQuestions.length === 0) {
      setError("Please fill all fields and select at least one question.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${BASE_URL}/api/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          subject,
          class: className,
          scheduledFor,
          duration,
          questions: selectedQuestions
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create test');
      }
      
      onSave(data); // Pass new test back to dashboard
      // Reset form
      setTitle(''); setSubject(''); setClassName(''); setScheduledFor(''); setDuration(60); setSelectedQuestions([]);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  
  // Filter questions based on selected subject and class
  const availableQuestions = questions.filter(q => q.subject === subject && q.class === className);
  const uniqueSubjects = [...new Set(classes.map(c => c.subject))];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Create New Test</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className={labelStyle}>Test Title</label>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputStyle} placeholder="e.g., Mid-Term Physics Exam" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="subject" className={labelStyle}>Subject</label>
              <select name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputStyle} required>
                <option value="" disabled>Select a subject...</option>
                {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="className" className={labelStyle}>Class</label>
              <select name="className" id="className" value={className} onChange={(e) => setClassName(e.target.value)} className={inputStyle} required>
                <option value="" disabled>Select a class...</option>
                {classes.filter(c => c.subject === subject).map(c => <option key={c.classId} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="scheduledFor" className={labelStyle}>Schedule For</label>
              <input type="datetime-local" name="scheduledFor" id="scheduledFor" value={scheduledFor} onChange={(e) => setScheduledFor(e.target.value)} className={inputStyle} required />
            </div>
            <div>
              <label htmlFor="duration" className={labelStyle}>Duration (in minutes)</label>
              <input type="number" name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className={inputStyle} min="1" required />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Select Questions</label>
            <p className="text-sm text-gray-500 mb-2">
              {(!subject || !className) 
                ? "Please select a subject and class to see available questions."
                : `Found ${availableQuestions.length} matching questions.`
              }
            </p>
            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-4 space-y-2">
              {availableQuestions.length > 0 ? (
                availableQuestions.map(q => (
                  <label key={q._id} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" checked={selectedQuestions.includes(q._id)} onChange={() => handleToggleQuestion(q._id)} className="mt-1" />
                    <span className="text-sm text-gray-800">{q.description}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">No questions found for this subject/class.</p>
              )}
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSubmitting ? 'Creating Test...' : 'Create Test'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===================================
// MAIN TEACHER DASHBOARD COMPONENT
// ===================================
const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null); // Holds profile, classes, assignments
  const [questions, setQuestions] = useState([]); // Holds all created questions
  const [tests, setTests] = useState([]); // Holds all created tests

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  
  const { user, token, logout } = useAuth(); // <-- 2. GET AUTH DATA

  useEffect(() => {
    if (!token) return;

    const fetchData = async (url) => {
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) logout();
        throw new Error(`Failed to fetch ${url}`);
      }
      return res.json();
    };

    const fetchAllData = async () => {
      try {
        // You need to create this /me route in teacherRoutes.js
        // It should return { profile: {...}, classes: [...], schedule: [...] }
        const dashData = await fetchData(`${BASE_URL}/api/teachers/me`); 
        const qData = await fetchData(`${BASE_URL}/api/questions`);
        const tData = await fetchData(`${BASE_URL}/api/tests`);
        setDashboardData(dashData);
        setQuestions(qData);
        setTests(tData);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    };
    
    fetchAllData();
  }, [token, logout]);


  // --- Memoized value to get today's schedule ---
  const todaySchedule = useMemo(() => {
    if (!dashboardData) return null; // Wait for data
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDayName = dayNames[new Date().getDay()];
    return dashboardData.classSchedule.find(day => day.day === todayDayName);
  }, [dashboardData]);

  // --- Event Handlers ---
  const handleSaveProfile = (updatedProfile) => {
    // ... (Add API call to PUT /api/teachers/me)
  };
  
  const handleCreateAssignment = (newAssignment) => {
    // ... (Add API call to POST /api/assignments)
  };

  const handleCreateQuestion = (newQuestion) => {
    setQuestions(prev => [newQuestion, ...prev]); // Add new question to state
  };
  
  const handleCreateTest = (newTest) => {
    setTests(prev => [newTest, ...prev]); // Add new test to state
  };

  // Loading state
  if (!dashboardData || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading Teacher Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {dashboardData.profile.name}!
          </h1>
          <p className="text-lg text-gray-600">Your dashboard is ready.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            
            {/* Today's Schedule */}
            <DashboardCard title="Today's Class Schedule" icon={FaClock}>
              {/* ... (Your schedule JSX) ... */}
            </DashboardCard>
            
            {/* My Classes */}
            <DashboardCard title="My Classes" icon={FaChalkboardTeacher}>
              {/* ... (Your classes JSX) ... */}
            </DashboardCard>
            
            {/* --- NEW: Question & Test Bank --- */}
            <DashboardCard 
              title="Test & Question Bank" 
              icon={FaFileAlt}
              actions={
                <div className="flex gap-2">
                  <button onClick={() => setIsQuestionModalOpen(true)} className="text-sm bg-blue-100 text-blue-700 py-1 px-3 rounded-md font-semibold hover:bg-blue-200">
                    <FaPlus className="inline mr-1" /> New Question
                  </button>
                  <button onClick={() => setIsTestModalOpen(true)} className="text-sm bg-green-100 text-green-700 py-1 px-3 rounded-md font-semibold hover:bg-green-200">
                    <FaPlus className="inline mr-1" /> New Test
                  </button>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaQuestionCircle className="text-3xl text-blue-600 mx-auto mb-2" />
                  <p className="text-4xl font-bold text-gray-800">{questions.length}</p>
                  <p className="text-sm font-medium text-gray-600">Total Questions</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaFileSignature className="text-3xl text-green-600 mx-auto mb-2" />
                  <p className="text-4xl font-bold text-gray-800">{tests.length}</p>
                  <p className="text-sm font-medium text-gray-600">Total Tests Created</p>
                </div>
              </div>
            </DashboardCard>
            
            {/* Active Assignments */}
            <DashboardCard 
              title="Active Assignments" 
              icon={FaTasks}
              actions={
                <button onClick={() => setIsAssignmentModalOpen(true)} className="...">
                  <FaPlus /> New
                </button>
              }
            >
              {/* ... (Your assignments JSX) ... */}
            </DashboardCard>

          </div>

          {/* --- Column 2: Sidebar --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profile Card */}
            <DashboardCard title="Teacher Profile" icon={FaUser} className="relative">
              {/* ... (Your profile card JSX) ... */}
            </DashboardCard>

            {/* Quick Actions Card --- UPDATED */}
            <DashboardCard title="Quick Actions">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => setIsAssignmentModalOpen(true)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create New Assignment
                </button>
                <button
                  onClick={()=> setIsQuestionModalOpen(true)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create a Question
                </button>
                <button 
                  onClick={() => setIsTestModalOpen(true)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create a Test
                </button>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      <ProfileEditModal
        teacher={dashboardData.profile}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
      />
      <CreateAssignmentModal
        classes={dashboardData.classes}
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onSave={handleCreateAssignment}
      />
      <CreateQuestionModal
        classes={dashboardData.classes}
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onSave={handleCreateQuestion}
        token={token}
      />
      <CreateTestModal
        classes={dashboardData.classes}
        questions={questions}
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        onSave={handleCreateTest}
        token={token}
      />
    </div>
  );
};

export default TeacherDashboard;