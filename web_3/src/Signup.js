import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from './Firebase'; // Import Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { generateTestResults } from './generateTestResults';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user data to Firestore in the "users" collection
      await setDoc(doc(firestore, 'users', user.uid), {
        email: formData.email,
        createdAt: new Date(),
      });
      
      await generateTestResults(user.uid);

      // Show a success message
      alert('Sign up successful');
      
      await generateTestResults(user.uid);
      navigate('/lobby');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in or reset your password.');
      } else {
        setError(error.message);
      }
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
              <li><Link to="/" className="hover:text-teal-500">Home</Link></li>
              <li><Link to="/features" className="hover:text-teal-500">Features</Link></li>
              <li><Link to="/contact" className="hover:text-teal-500">Contact</Link></li>
            </ul>
          </nav>
          <button onClick={toggleDarkMode} className="ml-4 p-2 rounded bg-gray-300 dark:bg-gray-600">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div id="container" className="flex-grow flex flex-col justify-center sm:py-12">
        <div className={`p-8 rounded shadow-md w-full max-w-sm mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition"
            >
              Sign Up
            </button>
            {error && error.includes('email-already-in-use') && (
              <p className="text-red-500 mt-4">
                This email is already registered. <Link to="/reset-password" className="text-teal-500 underline">Reset your password</Link> or <Link to="/login" className="text-teal-500 underline">log in</Link>.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className={`p-4 text-center ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
