import React, { useState } from 'react';
import './Register.css'; // Add CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    type: 'donate',
    bloodType: '',
    units: 1,
    place: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? checked ? value : formData[name] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (formData.phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    if (!formData.place) newErrors.place = 'Place is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        type: 'donate',
        bloodType: '',
        units: 1,
        place: ''
      });
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        <label>Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </label>

        <label>Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset>
          <legend>Gender:</legend>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
        </fieldset>

        <label>Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="donate">Donate</option>
            <option value="receive">Receive</option>
          </select>
        </label>

        <label>Blood Type:
          <div className="scrollable-select">
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          {errors.bloodType && <p className="error">{errors.bloodType}</p>}
        </label>

        <label>Number of Units:
          <input
            type="number"
            name="units"
            value={formData.units}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>Place of Donation/Receiving (Pincode):
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />
          {errors.place && <p className="error">{errors.place}</p>}
        </label>

        <button type="submit" className="submit-button">Submit</button>
      </form>
      <button onClick={() => window.location.href = '/'} className="back-button">Back to Home</button>
    </div>
  );
};

export default Register;
