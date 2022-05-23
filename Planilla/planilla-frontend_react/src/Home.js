import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import logo from './logo.svg';
import { Link } from "react-router-dom";
import './App.css';

const Home = () => {
    return (
        <div className="App">
            <Header />
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Ta' Bueno - PI IngeBases</h1>
                <h2>React.js (Frontend) + ASP.NET (Backend)</h2>
                <p>
                    We have successfully created a project using both ReactJS (JavaScript) and ASP.NET (C#),
                    they are connected by using an internal API.
                </p>
                <p>
                    This project has an active connection to the database server for this PI.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Link to="Login"><a href className="App-link">Login</a></Link>
                <Link to="UserRegistration"><a href className="App-link">UserRegistration</a></Link>
                <Link to="Project"><a href className="App-link">Projects</a></Link>
                <Link to="Employees"><a href className="App-link">Employees</a></Link>
                <Link to="BenefitsEmployer"><a href className="App-link">BenefitsEmployer</a></Link>
            </div>
            <Footer />
        </div>
    );
}

export default Home;