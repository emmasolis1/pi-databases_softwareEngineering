import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

import SideNavigationBar from './components/SideNavigationBar';
import EmployeeMainInfo from './components/EmployeeMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';

const Employees = () => {
  return (
    <div className="App">

      <SideNavigationBar />
      <Header />

      <div className="App-header">

        <div style={titleStyle}>
          <h2 style={{ paddingRight: '20pt' }}>Empleados</h2>
          <Button color="primary" outline>
            Agregar un nuevo empleado
          </Button>
        </div>

        <EmployeeMainInfo name="Emmanuel D. Solis" isActive="true" jobPosition="Scrum Master" employeeType="Tiempo completo" paymentType="Mensual" netSalary="$15000" sumDeductions="$2000" realSalary="$13000" extraBenefits="$100" />
        <EmployeeMainInfo name="Jan Murillo" isActive="true" jobPosition="Developer" employeeType="Medio tiempo" paymentType="Semanal" netSalary="$7500" sumDeductions="$1000" realSalary="$6000" extraBenefits="$50" />

      </div>

      <Footer />
      
    </div>
  );
};

const titleStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  alignItems: 'center',
  paddingTop: '10pt', 
  paddingLeft: '60pt'
}

/*export default Employees;*/


export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://localhost:7150/api/employees`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.nombre}>{person.apellido1}</li>
            )
        }
      </ul>
    )
  }
}

