import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoleSelection from './components/UserRoleSelection';
import Login from './components/Login';
import Home from './components/Home';
import AboutUs from './components/AboutUs'; // Create this component
import Register from './components/Register'; // Create this component
import Donate from './components/DonateBlood'; // Create this component
import GetBlood from './components/GetBlood'; // Create this component
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/get-blood" element={<GetBlood />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
