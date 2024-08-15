import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './Firebase'; // Adjust the import if necessary

const Lobby = () => {
  const navigate = useNavigate();
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

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" onClick={handleLogout} className="hover:text-teal-800">Logout</a>
              </li>
              <li>
                <button onClick={toggleDarkMode} className="p-2 rounded bg-gray-300 dark:bg-gray-600">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex flex-col items-center justify-center py-8 px-4">
        <div className={`p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h1 className="text-3xl font-semibold text-teal-600 mb-8">Welcome to Be Healthy Lobby</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/editdetails">
              <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <span className="text-lg font-medium">Edit Details</span>
              </div>
            </Link>
            <Link to="/showdetails">
              <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <span className="text-lg font-medium">View Your Details</span>
              </div>
            </Link>
            <Link to="/makeappointment">
              <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <span className="text-lg font-medium">Make an Appointment</span>
              </div>
            </Link>
            <Link to="/showappointments">
              <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <span className="text-lg font-medium">Show Appointments</span>
              </div>
            </Link>
            <Link to="/testresults">
              <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <span className="text-lg font-medium">Test Results</span>
              </div>
            </Link>
            <Link to="/tips">
              <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <span className="text-lg font-medium">Tips</span>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className={`p-4 text-center ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-blue-600 text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Lobby;
