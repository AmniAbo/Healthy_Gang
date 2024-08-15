import React, { useEffect, useState, useCallback } from 'react';
import { auth, database } from './Firebase'; // Adjust the import if necessary
import { ref, get } from 'firebase/database';
import { useNavigate, Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const ShowDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');
  const [isDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const navigate = useNavigate();

  const calculateBMI = useCallback((height, weight) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
      setBMICategory(getBMICategory(bmiValue));
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserDetails(data);
          calculateBMI(data.height, data.weight);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate, calculateBMI]);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const title = 'Be Healthy';
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Centering the title
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;

    // Add the title at the top
    doc.text(title, titleX, 10);

    // Add the user details
    doc.text('User Details :', 10, 20);
    doc.text(`Email: ${auth.currentUser.email}`, 10, 30);
    doc.text(`Age: ${userDetails.age}`, 10, 40);
    doc.text(`Height: ${userDetails.height} cm`, 10, 50);
    doc.text(`Weight: ${userDetails.weight} kg`, 10, 60);
    doc.text(`Gender: ${userDetails.gender}`, 10, 70);
    doc.text(`BMI: ${bmi} (${bmiCategory})`, 10, 80);

    // Add the copyright notice at the bottom
    const copyrightText = '© 2024 Be Healthy. All rights reserved.';
    const copyrightWidth = doc.getStringUnitWidth(copyrightText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const copyrightX = (pageWidth - copyrightWidth) / 2;
    const copyrightY = pageHeight - 10;

    doc.text(copyrightText, copyrightX, copyrightY);

    // Save the PDF
    doc.save('Be-Healthy.pdf');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
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
      <main id="container" className={`flex-grow flex items-center justify-center py-8 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className={`p-8 rounded shadow-md w-full max-w-md mx-auto ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">User Details</h2>
          {userDetails ? (
            <div className="max-h-96 overflow-y-auto">
              <div className="mb-4">
                <label className="block mb-2" htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={auth.currentUser.email}
                  className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300'}`}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="age">Age</label>
                <input
                  type="text"
                  id="age"
                  value={userDetails.age}
                  className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300'}`}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="height">Height (cm)</label>
                <input
                  type="text"
                  id="height"
                  value={userDetails.height}
                  className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300'}`}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="weight">Weight (kg)</label>
                <input
                  type="text"
                  id="weight"
                  value={userDetails.weight}
                  className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300'}`}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  value={userDetails.gender}
                  className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300'}`}
                  readOnly
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl">Your BMI: <span className="font-bold">{bmi}</span></p>
                <p className="text-lg text-teal-500">{bmiCategory}</p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={downloadPDF}
                  className={`w-full ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-teal-300 text-gray-900 hover:bg-teal-400'}`}
                >
                  Download Details as PDF
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Be Healthy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ShowDetails;
