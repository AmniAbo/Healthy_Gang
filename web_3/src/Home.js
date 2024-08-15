import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve dark mode preference from localStorage or default to false
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  useEffect(() => {
    // Apply the dark mode class to the document based on the state
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save to localStorage
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
          <button 
            onClick={toggleDarkMode} 
            className="ml-4 p-2 bg-gray-200 rounded dark:bg-gray-800 dark:text-white"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow">
        <section className="text-center my-8">
          <h2 className="text-4xl font-bold mb-4">Welcome to Be Healthy</h2>
          <p className="text-lg mb-8">Track and visualize your health metrics over time.</p>
          <Link 
            to="/signup" 
            id="join_now" 
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
          >
            Join Now
          </Link>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="container-track p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-2">Track Your Progress</h3>
            <p>Monitor your health metrics with easy-to-use tools.</p>
          </div>
          <div className="container-track p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-2">Visualize Data</h3>
            <p>See your health data in beautiful, easy-to-understand graphs.</p>
          </div>
          <div className="container-track p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Motivated</h3>
            <p>Set goals and track your progress to stay motivated.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
