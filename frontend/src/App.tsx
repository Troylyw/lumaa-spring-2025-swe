import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/tasks" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/tasks" />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

