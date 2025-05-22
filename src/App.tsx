import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { isTokenExpired } from './lib/auth';

function App() {
  const isLoggedIn = !!localStorage.getItem('access_token'); // simple check

  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if (token && isTokenExpired(token)) {
  //     localStorage.removeItem('access_token'); // Clean up expired token
  //   }
  // }, []);

  return (
    <Router>
      <Routes>
        {/* If user is not logged in, redirect to /login */}
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
        />
        
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />}
        />

        {/* Optional: Catch-all redirect to home or login */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;