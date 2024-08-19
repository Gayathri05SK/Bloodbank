import React from 'react';
import './Home.css'; // Import CSS for styling
import { FaInstagram, FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa';
import Header from './Header'; // Import the Header component

const Home = () => (
  <div className="home">
    {/* Header */}
    <Header />

    {/* Main Content */}
    <div className="home-main">
      <div className="home-left">
        <div className="background-image">
          <img src="C:\Users\ADMIN\Documents\SEM-5\FSWD LAB\React\bloodbank\src\components\bg1.jpg" alt="Background" className="background-img" />
        </div>
      </div>
      <div className="home-right">
        <h1>DONAR CONNECT</h1>
        <h4>Your one-step solution for managing blood donations and receiving blood.</h4>
        <div className="reach-out">
          <h3>Reach Out Us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/donate_blood_to_save_life?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="mailto:tndonarconnect211@gmail.com" aria-label="Email">
              <FaEnvelope size={24} />
            </a>
            <a href="https://www.linkedin.com/company/blooddonation/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BmawNcQkLQIaZiA0UFa%2Fbqw%3D%3D" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="tel:+917598682805" aria-label="Phone">
              <FaPhone size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
