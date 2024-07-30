import React from 'react';
import { Link } from 'react-router-dom';
import BeHealthyVideo from './Videos/Be_Healthy.mp4'; // Adjust the path as necessary

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="shadow-md py-4 bg-teal-500 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
              <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
              <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex items-center justify-center py-12 bg-teal-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center">
          {/* Video Player */}
          <div className="w-full" style={{ aspectRatio: '16/9' }}>
  <video
    className="w-full h-full rounded-lg"
    controls
    autoPlay
    src={BeHealthyVideo}
    title="Video Overview"
  >
    Your browser does not support the video tag.
  </video>
</div>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-teal-500 text-white p-4 text-center">
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Features;
