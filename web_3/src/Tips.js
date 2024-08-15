import React from 'react';
import { Link } from 'react-router-dom';

const TipsPage = () => {
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-white'}`}>Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/lobby" className={`hover:text-teal-800 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Lobby</Link>
              </li>
              <li>
                <Link to="/" className={`hover:text-teal-800 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Logout</Link>
              </li>
              {/* Add more navigation items if needed */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex flex-col items-center justify-center py-8 px-4">
        <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>Tips and Recommendations</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link to="/healthyrecipes">
              <button className={`w-full bg-teal-500 text-white p-4 text-lg rounded-lg transform hover:scale-105 transition-transform duration-300 ${isDarkMode ? 'hover:bg-teal-400' : ''}`}>
                Healthy Recipes
              </button>
            </Link>
            <Link to="/healthysports">
              <button className={`w-full bg-teal-500 text-white p-4 text-lg rounded-lg transform hover:scale-105 transition-transform duration-300 ${isDarkMode ? 'hover:bg-teal-400' : ''}`}>
                Healthy Sports
              </button>
            </Link>
            <Link to="/setgoals">
              <button className={`w-full bg-teal-500 text-white p-4 text-lg rounded-lg transform hover:scale-105 transition-transform duration-300 ${isDarkMode ? 'hover:bg-teal-400' : ''}`}>
                Goals
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className={`p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-blue-600 text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TipsPage;
