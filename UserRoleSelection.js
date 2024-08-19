import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserRoleSelection() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };  

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("C:\\Users\\ADMIN\\Documents\\SEM-5\\FSWD LAB\\React\\bloodbank\\src\\components\\bg1.jpg")', // Ensure you use double backslashes or a relative path for the image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <h1>WELCOME TO BLOODBANK</h1>
        <h1>Select Your Role</h1>
        <div>
          <button onClick={handleButtonClick}>Hospital</button>
          <button onClick={handleButtonClick}>Donor</button>
        </div>
      </div>
    </div>
  );
}

export default UserRoleSelection;
