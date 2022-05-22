import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

// Props expected: name, isActive, jobPosition, employeeType, paymentType, netSalary, sumDeductions, realSalary, extraBenefits

const BenefitsMainInfo = (props) => {
  return (
    <div style={divStyle}>

      <div class="container">
        <div class="row">
        <div class="col">
            <Button outline>
                          <Link to="/Employees"><a className="App-link">{props.name}</a></Link>
            </Button>
            
          </div>
          { props.isActive ?
            <div class="col">
              Activo
            </div>
          :
            <div class="col">
              Inactivo
            </div>
          }
          <div class="col" style={{}}>
            <Button color="info" outline>
              Editar
            </Button>
          </div>
          <div class="col">
            <Button color="danger" outline>
              Eliminar
            </Button>
          </div>
        </div>

        <hr></hr>

        <div class="row">
          <div class="col">
            Modalidad de pago: {props.payment}
          </div>
        </div>

        <div class="row">
            <div class="col">
                Presupuesto: {props.budget}
            </div>
        </div>

      </div>

    </div>
  );
}

const divStyle = {
  border: '1pt solid #d3d3d3',
  marginBottom: '1em',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  padding: '1em',
  textAlign: 'left',
  width: '75%',
  boxShadow: '2px 2px 4px black',
}

export default BenefitsMainInfo;
