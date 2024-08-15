import React, { useEffect, useState } from 'react';
import { auth, database } from './Firebase';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import BloodTestChart from './BloodTestChart';
import './TestResults.css'; // Create this CSS file for custom styles

const TestResults = () => {
  const [results, setResults] = useState([]);
  const [bloodTestResults, setBloodTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const userId = user.uid;
      const resultsRef = ref(database, `testresults/${userId}`);

      try {
        const snapshot = await get(resultsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Fetched test results:', data);
          const allResults = Object.values(data);
          setResults(allResults);
          setBloodTestResults(allResults.filter(result => result.testName === 'Blood Test').reverse());
        } else {
          setError('No test results found');
        }
      } catch (error) {
        setError('Error fetching test results: ' + error.message);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Error logging out: ' + error.message);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" onClick={handleLogout} className={`text-white-700 hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex items-center justify-center py-8 px-4">
        <div className={`bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">Your Test Results</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <BloodTestChart data={bloodTestResults} />
              {results.map((result, index) => (
                <div key={index} className={`mb-4 p-4 border rounded shadow ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                  <p><strong>Test:</strong> {result.testName}</p>
                  <p><strong>Date:</strong> {result.date}</p>
                  <div className="parameters">
                    {result.parameters && result.parameters.map((param, idx) => (
                      <div key={idx} className="parameter">
                        <p><strong>{param.name}:</strong> {param.value} {param.unit}</p>
                        {result.testName === 'Blood Test' && param.range && (
                          <p className="range">Normal Range: {param.range}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className={`p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-teal-500 text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TestResults;
