import React from 'react';
import '../SideNavigationBarStyle.css';
import { slide as Menu } from 'react-burger-menu'


function SideNavigationBar() {
    return (
        <Menu>
            <a id="Home" className="menu-item" href="/">Home</a>
            <a id="Project" className="menu-item" href="/Project">Projects</a>
            <a id="Employees" className="menu-item" href="/Employees">Employees</a>
            <a id="BenefitsEmployer" className="menu-item" href="/BenefitsEmployer">BenefitsEmployer</a>
        </Menu>
    );
}

export default SideNavigationBar;

