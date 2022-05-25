import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

import SideNavigationBar from './components/SideNavigationBar';
import EmployeeMainInfo from './components/EmployeeMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';

// Original component form: <EmployeeMainInfo name="Emmanuel D. Solis" isActive="true" jobPosition="Scrum Master" employeeType="Tiempo completo" paymentType="Mensual" netSalary="$15000" sumDeductions="$2000" realSalary="$13000" extraBenefits="$100" />


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
          {
            this.state.persons.map(person =>
              <EmployeeMainInfo
                name={person.nombre + " " + person.apellido1 + " " + person.apellido2}
                isActive="true"
                jobPosition="Scrum Master"
                employeeType="Tiempo completo"
                paymentType="Mensual"
                netSalary="$15000"
                sumDeductions="$2000"
                realSalary="$13000"
                extraBenefits="$100" />
          )
        }

      </div>

      <Footer />
      
    </div>
    )
  }
}

const titleStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  alignItems: 'center',
  paddingTop: '10pt',
  paddingLeft: '60pt'
}

