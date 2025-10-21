import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admission from "./pages/Admission";
import Fee from "./pages/Fee";
import Signup from "./pages/Signup";
// import StaffLogin from "./pages/StaffLogin";
import Navbar from "./components/navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/fees" element={<Fee />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

