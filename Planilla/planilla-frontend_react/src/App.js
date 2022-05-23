import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import UserRegistration from './UserRegistration';
import Project from './Project';
import Employees from './Employees';
import BenefitsEmployer from './BenefitsEmployer';
import NotFound from './NotFound';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/UserRegistration" element={<UserRegistration />} />
                <Route path="/BenefitsEmployer" element={<BenefitsEmployer />} />
                <Route path="/Project" element={<Project />} />
                <Route path="/Employees" element={<Employees />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
