import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaUserCog, 
  FaEnvelope, 
  FaLock, 
  FaIdCard,
  FaSchool,
  FaUser
} from 'react-icons/fa';

const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  STAFF: 'staff',
  ADMIN: 'admin'
};


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const {userData} = await login(formData.email, formData.password);
      if (userData.role === ROLES.STUDENT) {
        navigate('/student');
      } 
      if (userData.role === ROLES.TEACHER) {
        navigate('/teacher');
      }
      if (userData.role === ROLES.ADMIN) {
        navigate('/admin');
      }
    } catch (error) {
      setFormMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputStyle = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className={labelStyle}>Email Address</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input autoComplete='off' type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={inputStyle} />
        </div>
      </div>
      <div>
        <label htmlFor="password" className={labelStyle}>Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className={inputStyle} />
        </div>
      </div>
      <div className="text-right">
        <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
      </div>
      
      {formMessage && (
        <div className={`p-3 rounded-md text-center text-sm font-medium ${
          formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>{formMessage.text}</div>
      )}

      <div>
        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400">
          {isSubmitting ? 'Logging In...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

const SignupForm = ({ onSignupSuccess }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleId: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setFormMessage({ type: 'error', text: 'Passwords do not match.' });
      setIsSubmitting(false);
      return;
    }

    try{
      await signup(
        formData.name,
        formData.email,
        formData.password,
        selectedRole,
        formData.roleId
      );

      setFormMessage({ type: 'success', text: 'Account created successfully! You can now log in.' });
      setSelectedRole(null);
      setFormData({ name: '', email: '', roleId: '', password: '', confirmPassword: '' });
      onSignupSuccess();
    } catch (error) {
      setFormMessage({ type: 'error', text: error.message });
    }finally{
      setIsSubmitting(false);
    }
  };

  let roleIdLabel = '';
  let roleIdPlaceholder = '';
  if (selectedRole === ROLES.STUDENT) {
    roleIdLabel = 'Student ID';
    roleIdPlaceholder = 'Enter the Student ID from your admission email';
  } else if (selectedRole === ROLES.TEACHER) {
    roleIdLabel = 'Teacher ID';
    roleIdPlaceholder = 'Enter your official Teacher ID';
  } else if (selectedRole === ROLES.STAFF) {
    roleIdLabel = 'Staff ID';
    roleIdPlaceholder = 'Enter your official Staff ID';
  }
  
  const inputStyle = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  
  return (
    <div>
      {!selectedRole && (
        <div className="space-y-4">
          <h3 className="text-center text-lg font-medium text-gray-700">I am a...</h3>
          <RoleButton icon={FaUserGraduate} text="Student" onClick={() => setSelectedRole(ROLES.STUDENT)} />
          <RoleButton icon={FaChalkboardTeacher} text="Teacher" onClick={() => setSelectedRole(ROLES.TEACHER)} />
          <RoleButton icon={FaUserCog} text="Staff" onClick={() => setSelectedRole(ROLES.STAFF)} />
        </div>
      )}

      {selectedRole && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Create <span className="capitalize text-blue-600">{selectedRole}</span> Account
            </h3>
          </div>

          <div>
            <label htmlFor="name" className={labelStyle}>Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" name="name" id="name" value={formData.name} autoComplete='off' onChange={handleChange} required className={inputStyle} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={labelStyle}>Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" name="email" id="email" value={formData.email} autoComplete='off' onChange={handleChange} required className={inputStyle} />
            </div>
          </div>
          
          <div>
            <label htmlFor="roleId" className={labelStyle}>{roleIdLabel}</label>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" name="roleId" id="roleId" value={formData.roleId} autoComplete='off' onChange={handleChange} placeholder={roleIdPlaceholder} required className={inputStyle} />
              <p className='text-gray-400 text-[14px] text-center'>#for demo purpose use id as hassan123</p>
            </div>
          </div>

          <div>
            <label htmlFor="password" className={labelStyle}>Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className={inputStyle} />
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className={labelStyle}>Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={inputStyle} />
            </div>
          </div>
          
          {formMessage && (
            <div className={`p-3 rounded-md text-center text-sm font-medium ${
              formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>{formMessage.text}</div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={() => setSelectedRole(null)} className="w-full sm:w-1/3 py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-300">
              Back
            </button>
            <button type="submit" disabled={isSubmitting} className="w-full sm:w-2/3 py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400">
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const RoleButton = ({ icon, text, onClick }) => {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-5 border border-gray-300 rounded-lg text-left text-lg font-medium text-gray-700
                 transition-all duration-300 hover:bg-blue-50 hover:border-blue-500 hover:shadow-md"
    >
      <Icon className="text-2xl text-blue-600" />
      {text}
    </button>
  );
};

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const tabStyle = "w-1/2 py-4 text-center font-semibold border-b-4 transition-colors duration-300";
  const activeTabStyle = "border-blue-600 text-blue-600";
  const inactiveTabStyle = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full">
        
        <div className="text-center mb-6">
          <FaSchool className="inline-block text-5xl text-blue-600 mb-2" />
          <h2 className="text-3xl font-bold text-gray-800">
            Shiv Jyoti School Portal
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('login')}
              className={`${tabStyle} ${activeTab === 'login' ? activeTabStyle : inactiveTabStyle}`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`${tabStyle} ${activeTab === 'signup' ? activeTabStyle : inactiveTabStyle}`}
            >
              Sign Up
            </button>
          </nav>

          <div className="p-8 md:p-10">
            {activeTab === 'login' ? <LoginForm /> : <SignupForm onSignupSuccess={()=> setActiveTab('login')} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;