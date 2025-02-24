import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <h1>Task Manager</h1>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/tasks">Tasks</Link> | <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;









