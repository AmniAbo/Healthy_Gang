import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BeHealthyVideo from './Videos/Be_Healthy.mp4'; // Adjust the path as necessary

const Features = () => {
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
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-teal-500 text-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
            </ul>
          </nav>
          <button onClick={toggleDarkMode} className="ml-4 p-2 rounded bg-gray-300 dark:bg-gray-600">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className={`flex-grow flex items-center justify-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-50'}`}>
        <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center ${isDarkMode ? 'bg-gray-900 text-white' : ''}`}>
          {/* Video Player */}
          <div className="w-full" style={{ aspectRatio: '16/9' }}>
            <video
              className="w-full h-full rounded-lg"
              controls
              autoPlay
              src={BeHealthyVideo}
              title="Video Overview"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className={`bg-teal-500 text-white p-4 text-center ${isDarkMode ? 'bg-gray-900 text-gray-200' : ''}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Features;
