import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from './Firebase'; // Ensure Firebase is initialized and exported
import { ref, get, remove } from 'firebase/database';

const ShowAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const userId = user.uid;
      const appointmentsRef = ref(database, `appointments/${userId}`);

      try {
        const snapshot = await get(appointmentsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const appointmentsList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAppointments(appointmentsList);
        } else {
          setError('No appointments found');
        }
      } catch (error) {
        setError('Error fetching appointments: ' + error.message);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out: " + error.message);
    }
  };

  const handleDelete = async (appointmentId) => {
    const user = auth.currentUser;
    if (!user) {
      setError('User not authenticated');
      return;
    }

    const userId = user.uid;
    const appointmentRef = ref(database, `appointments/${userId}/${appointmentId}`);

    try {
      await remove(appointmentRef);
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      console.log('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setError('Error deleting appointment: ' + error.message);
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
              <li><a href="/" onClick={handleLogout} className="text-white-700 hover:text-teal-500">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="container" className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-500">Your Appointments</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id} className="mb-4 p-4 border rounded shadow flex justify-between items-center">
                  <div>
                    <p><strong>Doctor:</strong> {appointment.doctor}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Reason:</strong> {appointment.reason}</p>
                    <p><strong>Type:</strong> {appointment.appointmentType}</p> {/* Display the type */}
                    <p><strong>Medical Center:</strong> {appointment.medicalCenter}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ShowAppointments;
