import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './Component/LoginSignup/LoginSignup'; 
import WelcomePage from './Component/LoginSignup/WelcomePage ';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/welcome/:empNumber" element={<WelcomePage />} /> 
        </Routes>
      </div>
    </Router>
  );
}
export default App;
