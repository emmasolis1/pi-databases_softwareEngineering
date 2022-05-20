import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import BenefitsEmployer from './BenefitsEmployer';
import Employees from './Employees';
import NotFound from './NotFound';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route exact path="BenefitsEmployer" element={<BenefitsEmployer />} />
                <Route exact path="Employees" element={<Employees />} />
                <Route exact path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
