import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './DarkModeContext'; // Import the provider
import Login from './Login.js';
import Home from './Home.js';
import Signup from './Signup.js';
import Contact from './Contact.js';
import Features from './Features.js';
import Lobby from './Lobby.js';
import EditDetails from './EditDetails.js';
import ShowDetails from './ShowDetails.js';
import MakeAppointment from './Appointment.js';
import ShowAppointments from './ShowAppointments.js';
import HealthyRecipes from './HealthyRecipes.js';
import HealthySports from './Sports.js';
import SetGoals from './SetGoals.js';
import TestResults from './TestResults.js';
import Tips from './Tips.js';


function App() {
  return (
    <DarkModeProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/editdetails" element={<EditDetails />} />
        <Route path="/showdetails" element={<ShowDetails />} />
        <Route path="/makeappointment" element={<MakeAppointment />} />
        <Route path="/showappointments" element={<ShowAppointments />} />
        <Route path="/healthyrecipes" element={<HealthyRecipes />} />
        <Route path="/healthysports" element={<HealthySports />} />
        <Route path="/setgoals" element={<SetGoals />} />
        <Route path="/testresults" element={<TestResults />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </Router>
    </DarkModeProvider>
    
  );
}

export default App;
