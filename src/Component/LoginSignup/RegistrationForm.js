import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ setAction }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  const [empNumber, setEmpNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8086/BharatIt/employee/', {
        employeeName: username,
        employeePassword: password,
        emailId: emailId,
        empNumber: empNumber
      });
  
      if (response.status === 200) {
        setSuccessMessage('Employee registered successfully with ID: ' + response.data);
        setErrorMessage('');
        // Clear form fields upon successful registration
        setUsername('');
        setPassword('');
        setEmailId('');
        setEmpNumber('');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 409) {
        setErrorMessage('Employee already registered with this employee number');
      } else if (error.response && error.response.data) {
        setErrorMessage('Error: ' + error.response.data);
      } else {
        setErrorMessage('An error occurred during registration.');
      }
      setSuccessMessage(''); // Reset success message in case of error
    }
  };

  return (
    <div className="container">
      <div className="inputs">
        <div className="input">
          <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="input">
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="input">
          <input placeholder="Email" type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
        </div>

        <div className="input">
          <input placeholder="EmpNumber" type="text" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} />
        </div>

        

        {/* Render success message only if successMessage is truthy */}
        {successMessage ? <div className="success-message">{successMessage}</div> : null}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="submit-container">
          <div className="submit gray" onClick={() => setAction("Login")}>Login</div>
          <div className="submit" onClick={handleSignUp}>Register</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
