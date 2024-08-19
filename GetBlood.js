// src/components/GetBlood.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetBlood.css'; // Import the CSS for styling

const GetBlood = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    phone: '',
    bloodType: '',
    units: 1,
    place: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName) newErrors.patientName = 'Patient name is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) newErrors.age = 'Valid age is required';
    if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    if (!formData.place || !/^\d{6}$/.test(formData.place)) newErrors.place = 'Valid pincode is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Calculate the total cost (assuming cost per unit is 500)
      const costPerUnit = 500;
      const totalCost = formData.units * costPerUnit;

      navigate('/receive-blood-summary', { state: { totalCost, units: formData.units, bloodType: formData.bloodType } }); // Navigate to the new page
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="get-blood-container">
      <h1>Get Blood</h1>
      <form className="get-blood-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Patient's Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="form-input"
          />
          {errors.patientName && <span className="form-error">{errors.patientName}</span>}
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
        <label className="form-label">
          Place of Receiving (Pincode):
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
        <button type="button" className="form-back-button" onClick={() => navigate('/home')}>Back to Home</button>
      </form>
    </div>
  );
};

export default GetBlood;
