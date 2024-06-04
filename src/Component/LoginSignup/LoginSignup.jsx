import React, { useState } from "react";
import './LoginSignup.css';
import axios from 'axios';
import RegistrationForm from "./RegistrationForm";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8086/BharatIt/authenticate', {
                employeeName: username,
                employeePassword: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            console.log('Server response:', response.data); // Log response to confirm

            if (response.status === 200) {
                console.log('Authentication successful:', response.data);
                navigate(`/welcome/${response.data.emp_number}?name=${username}`);
            } else {
                console.error('Authentication failed:', response.data.message);
                setErrorMessage('Authentication failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Authentication failed:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.token || 'Authentication failed');
            } else {
                setErrorMessage('Authentication failed: ' + error.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            {action === "Login" ? (
                <div className="inputs">
                    <div className="input">
                        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="input">
                        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                  

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div className="submit-container">
                        <div className="submit gray" onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                        <div className="submit" onClick={handleLogin}>Login</div>
                    </div>
                </div>
            ) : (
                <RegistrationForm setAction={setAction} />
            )}
        </div>
    );
};

export default LoginSignup;
