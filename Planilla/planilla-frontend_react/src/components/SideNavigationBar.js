import React from 'react';
import '../SideNavigationBarStyle.css';
import { slide as Menu } from 'react-burger-menu'


function SideNavigationBar() {
    return (
        <Menu>
            <a id="Home" className="menu-item" href="/">Home</a>
            <a id="BenefitsEmployer" className="menu-item" href="/BenefitsEmployer">BenefitsEmployer</a>
            <a id="Employees" className="menu-item" href="/Employees">Employees</a>
        </Menu>
    );
}

export default SideNavigationBar;
