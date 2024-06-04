import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css'; // Import the CSS file

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const WelcomePage = () => {
  const { empNumber } = useParams();
  const query = useQuery();
  const employeeName = query.get('name');
  const navigate = useNavigate();

  const [punchMessage, setPunchMessage] = useState('');

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handlePunchIn = async () => {
    try {
      const response = await axios.post('http://localhost:8086/BharatIt/punch-in', {
        empNumber: empNumber,
      });

      if (response.status === 200) {
        setPunchMessage('Punch in successful!');
      } else {
        setPunchMessage('Punch in failed. Please try again.');
      }
    } catch (error) {
      console.error('Punch in error:', error);
      setPunchMessage('An error occurred during punch in. Please try again.');
    }
  };

  return (
    <div className="welcome-container">
      <h1>Welcome........</h1>
      
      <p>Employee Name: {employeeName}</p>
      <button onClick={handleBack}>LogOut</button> {/* Back button */}
      <button onClick={handlePunchIn}>Punch In</button> {/* Punch In button */}
      {punchMessage && <p>{punchMessage}</p>} {/* Display punch in message */}
    </div>
  );
};

export default WelcomePage;
