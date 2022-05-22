import React from 'react'
import './App.css';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="App">
            <div className="App-header">
                <h1>Page not found</h1>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default NotFound;