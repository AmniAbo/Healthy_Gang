import React, { useEffect, useState } from 'react';
import { auth, firestore } from './Firebase'; // Adjust the import if necessary
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import backgroundImage from './Images/doctor.jpg'; // Adjust the path if necessary

const SetGoals = () => {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

  useEffect(() => {
    if (user) {
      const goalsRef = doc(firestore, 'goals', user.uid);

      const unsubscribe = onSnapshot(goalsRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setGoals(docSnapshot.data().goals || []);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const addGoal = async () => {
    if (goalInput.trim() !== '' && user) {
      const newGoals = [...goals, goalInput];
      setGoals(newGoals);
      setGoalInput('');

      const goalsRef = doc(firestore, 'goals', user.uid);
      await setDoc(goalsRef, { goals: newGoals });
    }
  };

  const removeGoal = async (index) => {
    const newGoals = goals.filter((_, goalIndex) => goalIndex !== index);
    setGoals(newGoals);

    if (user) {
      const goalsRef = doc(firestore, 'goals', user.uid);
      await setDoc(goalsRef, { goals: newGoals });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-white'}`}>Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" onClick={handleLogout} className={`text-white hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-grow flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-8 rounded shadow-md w-full max-w-2xl mx-auto text-center`}>
        <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>Set Your Health Goals</h1>
        <input
          type="text"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          className={`border p-2 mb-4 w-full rounded ${isDarkMode ? 'border-gray-600 bg-gray-900' : 'border-gray-300'}`}
          placeholder="Enter your goal"
        />
        <button
          onClick={addGoal}
          className={`bg-teal-500 text-white px-4 py-2 rounded mb-4 hover:bg-teal-600 ${isDarkMode ? 'hover:bg-teal-400' : ''}`}
        >
          Add Goal
        </button>
        <ul className="w-full text-left">
          {goals.map((goal, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 mb-2 rounded shadow ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
            >
              {goal}
              <button
                onClick={() => removeGoal(index)}
                className={`bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ${isDarkMode ? 'hover:bg-red-400' : ''}`}
              >
                Done
              </button>
            </li>
          ))}
        </ul>
        <Link to="/lobby" className={`text-teal-500 hover:underline mt-4 block ${isDarkMode ? 'text-teal-300' : ''}`}>Back to Lobby</Link>
      </main>

      {/* Footer */}
      <footer className={`p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-teal-500 text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SetGoals;
