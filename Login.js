import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign-up logic
        await axios.post('http://localhost:3000/register', { email, password });
        alert('Registration successful');
        setIsSignUp(false); // Switch to login after successful signup
      } else {
        // Login logic
        const response = await axios.post('http://localhost:3000/login', { email, password });
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        navigate('/home'); // Navigate to Home page after login
      }
    } catch (err) {
      alert(`Error: ${err.response ? err.response.data.message : 'An error occurred'}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button">
            {isSignUp ? 'SIGN UP' : 'LOGIN'}
          </button>
        </form>
        <button
          className="signup-link"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Login' : 'Create a new account'}
        </button>
      </div>
    </div>
  );
};

export default Login;
