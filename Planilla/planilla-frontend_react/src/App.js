import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import BenefitsEmployer from './BenefitsEmployer';
import NotFound from './NotFound';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="BenefitsEmployer" element={<BenefitsEmployer />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}