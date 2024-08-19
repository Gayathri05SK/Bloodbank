// Header.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header-left">Donar Connect</div>
    <nav className="header-right">
      <NavLink to="/home" aria-label="Home">Home</NavLink>
      <NavLink to="/about-us" aria-label="About Us">About Us</NavLink>
      <NavLink to="/register" aria-label="Register">Register</NavLink>
      <NavLink to="/donate" aria-label="Donate Blood">Donate Blood</NavLink>
      <NavLink to="/get-blood" aria-label="Get Blood">Get Blood</NavLink>
    </nav>
  </header>
);

export default Header;
