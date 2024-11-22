// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main_page';
import Login from './pages/auth/login'
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route
            path="/"
            element={<MainPage user={user} onLogout={handleLogout} />}
          />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
