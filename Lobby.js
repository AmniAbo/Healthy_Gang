import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './Firebase'; // Adjust the import if necessary
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" onClick={handleLogout} className="text-white hover:text-teal-500">Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-teal-500 mb-6">Welcome to Be Healthy Lobby</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link to="/editdetails">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                Edit Details
              </button>
            </Link>
            <Link to="/showdetails">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                View Your Details
              </button>
            </Link>
            <Link to="/makeappointment">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                Make an Appointment
              </button>
            </Link>
            <Link to="/showappointments">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                Show Appointments
              </button>
            </Link>
            <Link to="/healthyrecipes">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                Healthy Recipes
              </button>
            </Link>
            <Link to="/healthysports">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                Healthy Sports
              </button>
            </Link>
            <Link to="/setgoals">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                Goals
              </button>
            </Link>
            <Link to="/testresults">
              <button className="w-full bg-teal-500 text-white p-4 text-lg rounded transform hover:scale-105 transition-transform duration-200">
                Test Results
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Lobby;
