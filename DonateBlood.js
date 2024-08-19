import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonateBlood.css'; // Import the CSS for styling
import jsPDF from 'jspdf'; // Import jsPDF library
import axios from 'axios'; // Import axios for making HTTP requests

const DonateBlood = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    bloodType: '',
    units: 1,
    alreadyRegistered: '',
    place: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? (checked ? value : formData[name]) : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) newErrors.age = 'Valid age is required';
    if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    if (!formData.place || !/^\d{6}$/.test(formData.place)) newErrors.place = 'Valid pincode is required';
    if (!formData.alreadyRegistered) newErrors.alreadyRegistered = 'Please select if already registered';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log('Submitting form data:', formData);
        
        const response = await axios.post('http://localhost:3000/api/donate', formData);
        console.log('Donation submitted:', response.data);
  
        // Generate and download the PDF bill
        const costPerUnit = 500;
        const totalCost = formData.units * costPerUnit;
        const doc = new jsPDF();
        doc.text(`Bill for Blood Donation`, 20, 20);
        doc.text(`Name: ${formData.name}`, 20, 30);
        doc.text(`Phone: ${formData.phone}`, 20, 40);
        doc.text(`Age: ${formData.age}`, 20, 50);
        doc.text(`Blood Type: ${formData.bloodType}`, 20, 60);
        doc.text(`Number of Units: ${formData.units}`, 20, 70);
        doc.text(`Place of Donation: ${formData.place}`, 20, 80);
        doc.text(`Total Cost: ₹${totalCost}`, 20, 90);
        doc.save('blood-donation-bill.pdf');
  
        alert(`Payment Successful. Total Cost: ₹${totalCost}`);
        navigate('/payment', { state: { totalCost, units: formData.units } });
  
      } catch (err) {
        console.error('Error submitting donation:', err);
        if (err.response) {
          // Server responded with a status other than 200 range
          console.error('Response error:', err.response.data);
          alert(`Error: ${err.response.data.message || 'Something went wrong. Please try again.'}`);
        } else if (err.request) {
          // Request was made but no response received
          console.error('Request error:', err.request);
          alert('No response from server. Please check your network connection.');
        } else {
          // Something else happened
          console.error('Error:', err.message);
          alert('An unexpected error occurred. Please try again.');
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };
  
  return (
    <div className="donate-blood-container">
      <h1>Donate Blood</h1>
      <form className="donate-blood-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </label>
        <label className="form-label">
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </label>
        <label className="form-label">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-input"
          />
          {errors.age && <span className="form-error">{errors.age}</span>}
        </label>
        <label className="form-label">
          Blood Type:
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodType && <span className="form-error">{errors.bloodType}</span>}
        </label>
        <label className="form-label">
          Number of Units:
          <input
            type="number"
            name="units"
            value={formData.units}
            onChange={handleChange}
            min="1"
            className="form-input"
          />
        </label>
        <fieldset className="form-fieldset">
          <legend>Already Registered:</legend>
          <label className="form-radio">
            <input
              type="radio"
              name="alreadyRegistered"
              value="Yes"
              checked={formData.alreadyRegistered === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="form-radio">
            <input
              type="radio"
              name="alreadyRegistered"
              value="No"
              checked={formData.alreadyRegistered === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          {errors.alreadyRegistered && <span className="form-error">{errors.alreadyRegistered}</span>}
        </fieldset>
        <label className="form-label">
          Place of Donation (Pincode):
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="form-input"
          />
          {errors.place && <span className="form-error">{errors.place}</span>}
        </label>
        <button type="submit" className="form-submit-button">Submit</button>
        <button type="button" className="form-back-button" onClick={() => navigate('/')}>Back to Home</button>
      </form>
    </div>
  );
};

export default DonateBlood;
