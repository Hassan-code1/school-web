import './App.css';
import {Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Admission from "./pages/Admission";
import Fee from "./pages/Fee";
import AuthPage from "./pages/Signup";
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from "./components/Navbar";
import About from "./pages/About";
import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signup" replace />;
  }
  return <Outlet />;
};

const AuthRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <AuthPage />;
  }

  if (user.role === 'student') return <Navigate to="/student" />;
  if (user.role === 'teacher') return <Navigate to="/teacher" />;
  if (user.role === 'admin') return <Navigate to="/admin" />;
  
  return <AuthPage />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/fees" element={<Fee />} />
        <Route path="/signup" element={<AuthPage />} /> {/* <-- Use AuthRoute */}
        <Route path='/about' element={<About/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;