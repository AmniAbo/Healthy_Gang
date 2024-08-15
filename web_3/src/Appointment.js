import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from './Firebase'; // Ensure Firebase is initialized and exported
import { ref, push, get } from 'firebase/database';

const MakeAppointment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    reason: '',
    appointmentType: '',
    medicalCenter: '',
  });
  const [error, setError] = useState('');
  const [isDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
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

    const { doctor, date, reason, appointmentType, medicalCenter } = formData;
    const user = auth.currentUser;

    if (!user) {
      setError('User not authenticated');
      return;
    }

    if (!doctor || !date || !reason || !appointmentType || !medicalCenter) {
      setError('All fields are required');
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Invalid date. Please select a future date.');
      return;
    }

    const appointmentsRef = ref(database, 'appointments');

    try {
      // Check if an appointment already exists for the same doctor, date, and time
      const snapshot = await get(appointmentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const appointmentExists = Object.values(data).some(userAppointments =>
          Object.values(userAppointments).some(appointment =>
            appointment.doctor === doctor &&
            appointment.date === date &&
            appointment.appointmentType === appointmentType &&
            appointment.medicalCenter === medicalCenter
          )
        );

        if (appointmentExists) {
          setError('This appointment slot is already taken. Please choose a different time.');
          return;
        }
      }

      // No existing appointment found, create new appointment
      const userId = user.uid;
      const userAppointmentsRef = ref(database, `appointments/${userId}`);
      await push(userAppointmentsRef, formData);
      console.log('Appointment made successfully!');
      alert('Appointment made successfully!');
      navigate('/lobby');
    } catch (error) {
      console.error('Error making appointment:', error);
      alert('Error making appointment: ' + error.message);
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
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/lobby" className={`hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                  Lobby
                </Link>
              </li>
              <li>
                {auth.currentUser ? (
                  <button onClick={handleLogout} className={`hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className={`hover:text-teal-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div id="container" className="flex-grow flex items-center justify-center py-8 px-4">
        <div className={`bg-white p-8 rounded shadow-md w-full max-w-md mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">Make an Appointment</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="doctor">Select Doctor</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-gray-100'}`}
                required
              >
                <option value="">Choose a doctor</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Dr. Johnson">Dr. Johnson</option>
                <option value="Dr. Lee">Dr. Lee</option>
                <option value="Dr. Brown">Dr. Brown</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="appointmentType">Appointment Type</label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-gray-100'}`}
                required
              >
                <option value="">Select an appointment type</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pulmonology">Pulmonology</option>
                <option value="Infectious Diseases">Infectious Diseases</option>
                <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Neurology">Neurology</option>
                <option value="Rheumatology">Rheumatology</option>
                <option value="Urology">Urology</option>
                <option value="Nephrology">Nephrology</option>
                <option value="Hematology">Hematology</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="medicalCenter">Medical Center</label>
              <select
                id="medicalCenter"
                name="medicalCenter"
                value={formData.medicalCenter}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-gray-100'}`}
                required
              >
                <option value="">Select a medical center</option>
                <option value="City Hospital">City Hospital</option>
                <option value="County Medical Center">County Medical Center</option>
                <option value="State Health Clinic">State Health Clinic</option>
                <option value="Regional Hospital">Regional Hospital</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-gray-100'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="reason">Reason for Appointment</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-gray-100'}`}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-teal-400 hover:bg-teal-300' : 'bg-teal-500 hover:bg-teal-600'} text-white`}
            >
              Make Appointment
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className={`p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-blue-600 text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MakeAppointment;
