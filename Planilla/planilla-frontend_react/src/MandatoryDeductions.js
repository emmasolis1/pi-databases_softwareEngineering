import React from 'react';
import axios from 'axios';
import SideNavigationBar from './components/SideNavigationBar';
import MandatoryDeductionsMainInfo from './components/MandatoryDeductionsMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import variables from './Variables';

export default class MandatoryDeductions extends React.Component {
    state = {
        mandatoryDeductions: []
    }

    componentDidMount() {
      axios.get(variables.API_URL + 'MandatoryDeductions')
            .then(res => {
              const mandatoryDeductions = res.data;
              this.setState({ mandatoryDeductions });
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
                        this.state.mandatoryDeductions.map(obde =>
                            <MandatoryDeductionsMainInfo name={obde.nombre} percentage={obde.porcentaje} />
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