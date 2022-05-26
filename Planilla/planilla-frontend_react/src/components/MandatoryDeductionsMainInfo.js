import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

// Props expected: name, isActive, jobPosition, employeeType, paymentType, netSalary, sumDeductions, realSalary, extraBenefits

const MandatoryDeductionsMainInfo = (props) => {
    return (
        <div style={divStyle}>

            <div class="container">
                <div class="row">
                    <div class="col">
                        {props.name}
                    </div>
                    <div class="col">
                        Porcentaje: {props.percentage}
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

export default MandatoryDeductionsMainInfo;