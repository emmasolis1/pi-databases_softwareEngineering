import React from 'react'
import './App.css';
import { Link } from "react-router-dom";

const BenefitsEmployer = () => {
  return (
    <div className="App">
      <div className="App-header">
        <p>Beneficios</p>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default BenefitsEmployer;