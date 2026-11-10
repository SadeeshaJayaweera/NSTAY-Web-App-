import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nstay_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.avatar && parsed.avatar.includes('avatar.png')) {
          parsed.avatar = null;
        }
        return parsed;
      }
    } catch (e) {
      // ignore JSON parse errors
    }
    return {
      id: 'user-1',
      name: 'Sadeesha Jayaweera',
      email: 'sadeesha@students.nsbm.ac.lk',
      role: 'student',
      avatar: null
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('nstay_token') || 'mock-token-123');

  useEffect(() => {
    if (user) {
      localStorage.setItem('nstay_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nstay_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('nstay_token', token);
    } else {
      localStorage.removeItem('nstay_token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to login');
      if (data.user && data.user.avatar && data.user.avatar.includes('avatar.png')) {
        data.user.avatar = null;
      }
      setUser(data.user);
      setToken(data.token);
      return data.user;
    } catch (err) {
      // Fallback local mock login for seamless demo
      const fallbackUser = {
        id: 'user-1',
        name: email.split('@')[0],
        email,
        role: 'student',
        avatar: null
      };
      setUser(fallbackUser);
      setToken('mock-jwt-token');
      return fallbackUser;
    }
  };

  const register = async (name, email, password, role = 'student') => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register');
      if (data.user && data.user.avatar && data.user.avatar.includes('avatar.png')) {
        data.user.avatar = null;
      }
      setUser(data.user);
      setToken(data.token);
      return data.user;
    } catch (err) {
      const fallbackUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar: null
      };
      setUser(fallbackUser);
      setToken('mock-jwt-token');
      return fallbackUser;
    }
  };

  const oauthLogin = async (provider) => {
    try {
      const res = await fetch('/api/auth/oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.user && data.user.avatar && data.user.avatar.includes('avatar.png')) {
        data.user.avatar = null;
      }
      setUser(data.user);
      setToken(data.token);
      return data.user;
    } catch (err) {
      const mockOAuth = {
        id: `oauth-${Date.now()}`,
        name: provider === 'github' ? 'NSBM GitHub Student' : 'NSBM Google Student',
        email: provider === 'github' ? 'github.student@nsbm.ac.lk' : 'google.student@nsbm.ac.lk',
        role: 'student',
        avatar: null
      };
      setUser(mockOAuth);
      setToken('mock-oauth-token');
      return mockOAuth;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nstay_user');
    localStorage.removeItem('nstay_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, oauthLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

