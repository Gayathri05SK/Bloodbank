import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AboutUs.css'; // Add CSS file for styling

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleBackToHome = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div className="about-us">
      <div className="vision-mission">
        <div className="vision">
          <h2>VISION</h2>
          <p>To revolutionize blood donation by seamlessly connecting donors, hospitals, and organizations, ensuring every life is supported through accessible and efficient blood supply.</p>
        </div>
        <div className="mission">
          <h2>MISSION</h2>
          <p>To provide an intuitive platform that simplifies blood donation and management, fostering a connected community dedicated to saving lives with transparency, efficiency, and reliability.</p>
        </div>
      </div>
      
      <div className="impact-join">
        <div className="impact">
          <h2>OUR IMPACT</h2>
          <p>Since our inception, Donar Connect has facilitated thousands of successful blood donations, connecting those in need with generous donors and ensuring that hospitals have the resources they need to save lives. We believe in the power of community and are committed to making a difference, one donation at a time.</p>
        </div>
        <div className="cta">
          <h2>JOIN US</h2>
          <p>Be a part of our journey in saving lives. Whether you are a donor, a hospital, or an organization, your participation is invaluable. Together, we can make a difference.</p>
        </div>
      </div>
      
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default AboutUs;
