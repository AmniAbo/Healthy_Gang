import React from 'react';
import { Link } from 'react-router-dom';


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-white-700 hover:text-teal-500">Home</Link></li>
              <li><Link to="/features" className="text-white-700 hover:text-teal-500">Features</Link></li>
              <li><Link to="/login" className="text-white-700 hover:text-teal-500">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="text-center">
            <p className="text-lg mb-4">You can reach us through the following methods:</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Phone Number</h3>
              <p className="text-gray-700">+972502800980</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-gray-700">support@behealthy.com</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Fax</h3>
              <p className="text-gray-700">049947573</p>
            </div>
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

export default Contact;
