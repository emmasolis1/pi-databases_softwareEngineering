import axios from 'axios';
import variables from './../Variables';

const fetchBenefits = () => {
    var data = []

    axios.get(variables.API_URL + 'benefits').then(res => {
        const { nombreBeneficio, cedulaEmpleador, nombreProyecto } = res.data;
        data.push({ nombreBeneficio, cedulaEmpleador, nombreProyecto })
    })

    return data;
}

export const benefits = fetchBenefits();
