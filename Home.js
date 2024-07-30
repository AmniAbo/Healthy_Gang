import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/features" >Features</Link></li>
              <li><Link to="/contact" >Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow   ">
        <section className="text-center my-8">
          <h2 className="text-4xl font-bold mb-4">Welcome to Be Healthy</h2>
          <p className="text-lg mb-8">Track and visualize your health metrics over time.</p>
          <Link to="/signup" id="join_now" className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700">
            Join Now
          </Link>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-2">Track Your Progress</h3>
            <p>Monitor your health metrics with easy-to-use tools.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-2">Visualize Data</h3>
            <p>See your health data in beautiful, easy-to-understand graphs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Motivated</h3>
            <p>Set goals and track your progress to stay motivated.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id ="footer" className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;