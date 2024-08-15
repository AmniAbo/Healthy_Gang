import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-teal-500">Home</Link></li>
              <li><Link to="/features" className="hover:text-teal-500">Features</Link></li>
              <li><Link to="/login" className="hover:text-teal-500">Login</Link></li>
            </ul>
          </nav>
          <button onClick={toggleDarkMode} className="ml-4 p-2 rounded bg-gray-300 dark:bg-gray-600">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex items-center justify-center">
        <div className={`bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="text-center">
            <p className="text-lg mb-4">You can reach us through the following methods:</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Phone Number</h3>
              <p className="text-black dark:text-gray-300">+972502800980</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-black dark:text-gray-300">support@behealthy.com</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Fax</h3>
              <p className="text-black dark:text-gray-300">049947573</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className={`p-4 text-center ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
