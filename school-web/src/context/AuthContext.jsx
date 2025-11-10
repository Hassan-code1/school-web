// src/context/AuthContext.js
import React, { createContext, useContext ,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = "http://localhost:5000";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // On app load, check localStorage for existing token/user
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message || 'Failed to login');
    }

    setUser(data.userData);
    setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.userData));
    localStorage.setItem('token', data.token);
    
    return data;
  };

  const signup = async (name, email, password, role, idToVerify) => {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, idToVerify }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || 'Failed to sign up');
    }
    
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/signup');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};