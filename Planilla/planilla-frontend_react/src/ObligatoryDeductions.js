import React from 'react';
import axios from 'axios';
import SideNavigationBar from './components/SideNavigationBar';
import ObligatoryDeductionsMainInfo from './components/ObligatoryDeductionsMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import variables from './Variables';

export default class ObligatoryDeductions extends React.Component {
    state = {
        obligatoryDeductions: []
    }

    componentDidMount() {
        axios.get(variables.API_URL + 'obligatorydeductions')
            .then(res => {
                const obligatoryDeductions = res.data;
                this.setState({ obligatoryDeductions });
            })
    }

    render() {

        return (
            <div className="App">

                <SideNavigationBar />
                <Header />

                <div className="App-header">

                    <div style={titleStyle}>
                        <h2 style={{ paddingRight: '20pt' }}>Deducciones obligatorias</h2>
                    </div>

                    {
                        this.state.obligatoryDeductions.map(obde =>
                            <ObligatoryDeductionsMainInfo name={obde.nombre} percentage={obde.porcentaje} />
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