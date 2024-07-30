import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, database } from './Firebase'; // Ensure Firebase is initialized and exported
import { ref, push, get, query, orderByChild, equalTo } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const MakeAppointment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    reason: '',
    appointmentType: '',
    medicalCenter: '',
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/lobby" className="text-white-700 hover:text-teal-500">Lobby</Link></li>
              <li>
                {auth.currentUser ? (
                  <button onClick={handleLogout} className="text-white-700 hover:text-teal-500">Logout</button>
                ) : (
                  <Link to="/login" className="text-white-700 hover:text-teal-500">Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div id="container" className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">Make an Appointment</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="doctor">Select Doctor</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
              <label className="block text-gray-700 mb-2" htmlFor="appointmentType">Appointment Type</label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
              <label className="block text-gray-700 mb-2" htmlFor="medicalCenter">Medical Center</label>
              <select
                id="medicalCenter"
                name="medicalCenter"
                value={formData.medicalCenter}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
              <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="reason">Reason for Appointment</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
            >
              Make Appointment
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

export default MakeAppointment;
