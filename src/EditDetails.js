import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ref, set, update, get } from 'firebase/database';
import { auth, database } from './Firebase'; // Ensure Firebase is initialized and exported

const EditDetails = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '', // Added gender field
  });
  const [isDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { height, weight, age } = formData;

    // Ensure the minimal height is 50, weight is 20, and age is 8
    if (height < 50) {
      alert("Height must be at least 50 cm");
      return;
    }
    if (weight < 20) {
      alert("Weight must be at least 20 kg");
      return;
    }
    if (age < 8) {
      alert("Age must be at least 8 years");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    const userId = user.uid;
    const userRef = ref(database, `users/${userId}`);

    try {
      // Check if user data already exists
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        // Update existing user data
        await update(userRef, formData);
      } else {
        // Set new user data
        await set(userRef, formData);
      }
      console.log('Details updated successfully!');
      alert('Details updated successfully!');
      navigate('/lobby');
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Error updating details: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/lobby" className="hover:text-teal-500">Lobby</Link></li>
              <li>
                {auth.currentUser ? (
                  <button onClick={handleLogout} className="hover:text-teal-500">Logout</button>
                ) : (
                  <Link to="/login" className="hover:text-teal-500">Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div id="container" className="flex-grow flex items-center justify-center py-8 px-4">
        <div className={`bg-white p-8 rounded shadow-md w-full max-w-md mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">Edit Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className={`bg-blue-600 text-white p-4 text-center ${isDarkMode ? 'bg-gray-900' : ''}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EditDetails;
