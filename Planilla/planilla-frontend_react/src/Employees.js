import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import SideNavigationBar from './components/SideNavigationBar';
import EmployeeMainInfo from './components/EmployeeMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';


const Employees = () => {
  return (
    <div className="App">
      <Header />
      <div className='App-header' style={navMenuStyle}>
        <SideNavigationBar />
        <div className="App-header">
        <div style={tittleStyle}>
          <h2 style={{paddingRight: '30pt',}}>Empleados</h2>
          <Button color="primary" outline>
            Agregar un nuevo empleado
          </Button>
        </div>

        <EmployeeMainInfo name="Emmanuel D. Solis" isActive="true" jobPosition="Scrum Master" employeeType="Tiempo completo" paymentType="Mensual" netSalary="$15000" sumDeductions="$2000" realSalary="$13000" extraBenefits="$100"/>
        <EmployeeMainInfo name="Jan Murillo" isActive="true" jobPosition="Developer" employeeType="Medio tiempo" paymentType="Semanal" netSalary="$7500" sumDeductions="$1000" realSalary="$6000" extraBenefits="$50"/>
        
      </div>
      </div>
      <Footer />
    </div>
  );
};

const tittleStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  alignItems: 'baseline',
}

const navMenuStyle={
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  justifyContent: 'center',
  alignItems: 'strech',
  alignContent: 'center',
}

export default Employees;