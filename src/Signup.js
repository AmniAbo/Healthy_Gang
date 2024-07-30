import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { generateTestResults } from './generateTestResults';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await generateTestResults(user.uid);
      console.log('User signed up and test results generated:', user);
      navigate('/lobby');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <header className="shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-white-700 hover:text-teal-500">Home</Link></li>
              <li><Link to="/features" className="text-white-700 hover:text-teal-500">Features</Link></li>
              <li><Link to="/contact" className="text-white-700 hover:text-teal-500">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <div id="container" className="min-h-screen flex flex-col justify-center sm:py-12">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
