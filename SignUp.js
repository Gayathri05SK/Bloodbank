import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Ensure you have the correct CSS file for styling

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Ensure the endpoint matches your Express route
      const response = await axios.post('http://localhost:3000/register', { email, password });
      setSuccess('Registration successful');
      setEmail('');
      setPassword('');
    } catch (err) {
      // Display a more detailed error message
      setError(err.response ? err.response.data.message : 'Error registering user');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-container"> {/* Changed to 'signup-container' to match the SignUp context */}
      <div className="signup-box"> {/* Changed to 'signup-box' to match the SignUp context */}
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">SIGN UP</button> {/* Changed to 'signup-button' */}
        </form>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
