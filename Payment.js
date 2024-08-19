import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const { state } = location;
  const { totalCost = 0, units = 1, bloodType = 'O+', donorName = 'John Doe' } = state || {};
  const costPerUnit = 500;

  // Function to generate and download the payment bill
  const handleDownloadBill = () => {
    const doc = new jsPDF();
    doc.text(`Payment Bill`, 20, 20);
    doc.text(`Number of Units: ${units}`, 20, 30);
    doc.text(`Cost per Unit: ₹${costPerUnit}`, 20, 40);
    doc.text(`Total Cost: ₹${totalCost}`, 20, 50);
    doc.save('payment-bill.pdf');
  };

  // Function to generate and download the donation certificate
  const handleDownloadCertificate = () => {
    const doc = new jsPDF();
    doc.text(`Certificate of Donation`, 20, 20);
    doc.text(`This is to certify that`, 20, 30);
    doc.text(`${donorName}`, 20, 40);
    doc.text(`has successfully donated`, 20, 50);
    doc.text(`${units} unit(s) of ${bloodType} blood`, 20, 60);
    doc.text(`Thank you for your valuable contribution.`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);
    doc.save('donation-certificate.pdf');
  };

  return (
    <div className="payment-container">
      <h1>Payment Details</h1>
      <div className="payment-details">
        <p><strong>Number of Units:</strong> {units}</p>
        <p><strong>Cost per Unit:</strong> ₹{costPerUnit}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost}</p>
      </div>
      <button onClick={handleDownloadBill} className="download-bill-button">Download Bill</button>
      <button onClick={handleDownloadCertificate} className="download-certificate-button">Download Certificate</button>
    </div>
  );
};

export default Payment;
