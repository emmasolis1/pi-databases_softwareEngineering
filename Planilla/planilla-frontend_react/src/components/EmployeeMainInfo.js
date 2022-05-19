import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {List} from 'reactstrap';
import { Button } from "reactstrap";

// Props expected: name, isActive, jobPosition, employeeType, paymentType, netSalary, sumDeductions, realSalary, extraBenefits

const EmployeeMainInfo = (props) => {
  return (
    <div style={divStyle}>
      <div style={tittleStyle}>
        <p style={{marginBottom: '0px',}}>{props.name}</p>
        <p style={{marginBottom: '0px',}}>Empleado activo: {props.isActive}</p>
        <Button color="info" outline>
          Editar
        </Button>
        <Button color="danger" outline>
          Eliminar
        </Button>
      </div>

      <div class="container">
        <div class="row">
          <div class="col">
            Puesto: {props.jobPosition}
          </div>
          <div class="col">
            Salario bruto: {props.netSalary}
          </div>
          <div class="col">
            Beneficios extras: {props.extraBenefits}
          </div>
        </div>

        <div class="row">
          <div class="col">
            Tipo de empleado: {props.employeeType}
          </div>
          <div class="col">
            Deducciones: {props.sumDeductions}
          </div>
          <div class="col">
          </div>
        </div>

        <div class="row">
          <div class="col">
            Tipo de pago: {props.paymentType}
          </div>
          <div class="col">
            Salario neto: {props.realSalary}
          </div>
          <div class="col">  
          </div>
        </div>

      </div>

    </div>
  );
}

const divStyle = {
  border: '1pt solid #d3d3d3',
  // borderRadius: '.5em',
  marginBottom: '1em',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  padding: '1em',
  textAlign: 'left',
  width: '75%',
  boxShadow: '2px 2px 4px black',
}

const tittleStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  fontFamily: 'inter',
  fontSize: '20pt',
}

export default EmployeeMainInfo;
