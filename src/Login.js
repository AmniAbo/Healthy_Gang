import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in:', userCredential.user);
      alert('Welcome');
      navigate('/lobby');
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.message);
    }
  };

  const handleResetChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetStatus('Password reset email sent! Please check your inbox.');
      setResetEmail('');
    } catch (error) {
      setResetStatus(`Error: ${error.message}`);
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
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded bg-gray-300 dark:bg-gray-600"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div id="container" className="flex-grow flex flex-col justify-center sm:py-12">
        <div className={`p-8 rounded shadow-md w-full max-w-sm mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowResetForm(!showResetForm)}
                className="text-teal-500 hover:text-teal-600"
              >
                Forgot Password?
              </button>
            </div>
          </form>
          {showResetForm && (
            <form onSubmit={handleResetSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block mb-2" htmlFor="reset-email">Enter your email</label>
                <input
                  type="email"
                  id="reset-email"
                  value={resetEmail}
                  onChange={handleResetChange}
                  className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
              >
                Reset Password
              </button>
              {resetStatus && (
                <p className={`mt-4 ${resetStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {resetStatus}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className={`p-4 text-center ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
