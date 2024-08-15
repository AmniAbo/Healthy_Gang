import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sportsImage from './Images/sports.jpg'; // Use a suitable background image
import { auth } from './Firebase'; // Adjust the import if necessary
import basketballImage from './Images/basketball.jpg';
import yogaImage from './Images/yoga.jpg';
import runningImage from './Images/running.jpg';
import cyclingImage from './Images/cycling.jpg';
import swimmingImage from './Images/swimming.jpg';
import hikingImage from './Images/hiking.jpg';
import tennisImage from './Images/tennis.jpg';
import soccerImage from './Images/soccer.jpg';
import weightliftingImage from './Images/weightlifting.jpg';
import pilatesImage from './Images/pilates.jpg';

const sports = [
  { id: 1, name: 'Basketball', image: basketballImage, description: 'A great way to build endurance and agility while having fun.' },
  { id: 2, name: 'Yoga', image: yogaImage, description: 'Enhances flexibility and reduces stress.' },
  { id: 3, name: 'Running', image: runningImage, description: 'Improves cardiovascular health and burns calories.' },
  { id: 4, name: 'Cycling', image: cyclingImage, description: 'Builds muscle and improves heart health.' },
  { id: 5, name: 'Swimming', image: swimmingImage, description: 'A full-body workout that is easy on the joints.' },
  { id: 6, name: 'Hiking', image: hikingImage, description: 'Great for building leg strength and enjoying nature.' },
  { id: 7, name: 'Tennis', image: tennisImage, description: 'Enhances hand-eye coordination and cardiovascular fitness.' },
  { id: 8, name: 'Soccer', image: soccerImage, description: 'Improves endurance and teamwork skills.' },
  { id: 9, name: 'Weightlifting', image: weightliftingImage, description: 'Builds muscle strength and bone density.' },
  { id: 10, name: 'Pilates', image: pilatesImage, description: 'Improves core strength and flexibility.' },
];

const HealthySports = () => {
  const navigate = useNavigate();
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

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
    <div
      className={`min-h-screen bg-cover bg-center flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      style={{ backgroundImage: `url(${sportsImage})` }}
    >
      {/* Overlay */}
      <div className={`bg-black bg-opacity-50 flex flex-col flex-grow ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {/* Header */}
        <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'}`}>
          <div className="container mx-auto flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-white'}`}>Be Healthy</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><Link to="/lobby" className={`hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Lobby</Link></li>
                <li><a href="/" onClick={handleLogout} className={`hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Logout</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center py-8">
          <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>Healthy Sports</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {sports.map((sport) => (
              <div key={sport.id} className={`bg-white rounded-lg shadow-md overflow-hidden border ${isDarkMode ? 'border-gray-600' : 'border-green-500'}`}>
                <img src={sport.image} alt={sport.name} className="w-full h-48 object-cover" />
                <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>{sport.name}</h2>
                  <p className="mt-2">{sport.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className={`p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-teal-500 text-white'}`}>
          <p>&copy; 2024 Be Healthy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HealthySports;
