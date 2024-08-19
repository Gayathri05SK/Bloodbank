// src/components/ReceiveBloodSummary.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import './ReceiveBloodSummary.css'; // Import the CSS for styling

const ReceiveBloodSummary = () => {
  const location = useLocation();
  const { state } = location;
  const { totalCost, units, bloodType } = state || {};

  return (
    <div className="receive-blood-summary-container">
      <h1>Receive Blood Summary</h1>
      <p><strong>Number of Units:</strong> {units}</p>
      <p><strong>Blood Type:</strong> {bloodType}</p>
      <p><strong>Cost per Unit:</strong> ₹500</p>
      <p><strong>Total Cost:</strong> ₹{totalCost}</p>
      {/* Add any other information or buttons if necessary */}
    </div>
  );
};

export default ReceiveBloodSummary;
