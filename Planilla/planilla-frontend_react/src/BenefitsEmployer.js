import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import SideNavigationBar from './components/SideNavigationBar';
import BenefitsMainInfo from './components/BenefitsMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import variables from './Variables';

export default class BenefitsEmployer extends React.Component {
    state = {
        BenefitsEmployer: []
    }

    componentDidMount() {
        axios.get(variables.API_URL + 'Benefitsemployer')
            .then(res => {
                const BenefitsEmployer = res.data;
                this.setState({ BenefitsEmployer });
            })
    }

    render() {

        return (
            <div className="App">

                <SideNavigationBar />
                <Header />

                <div className="App-header">

                    <div style={titleStyle}>
                        <h2 style={{ paddingRight: '20pt' }}>Beneficios</h2>
                        <Button color="primary" outline>
                            Agregar un nuevo beneficio
                        </Button>
                    </div>

                    {
                        this.state.BenefitsEmployer.map(beem =>
                            <BenefitsMainInfo name={beem.nombre} isActive={beem.activo} cost={beem.costo} />
                        )
                    }

                </div>

                <Footer />

            </div>
        );
    }
};

const titleStyle = {
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    paddingTop: '10pt',
    paddingLeft: '60pt'
}
