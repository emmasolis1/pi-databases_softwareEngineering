import React from 'react';
import { Button } from 'reactstrap';
import SideNavigationBar from './components/SideNavigationBar';
import BenefitsMainInfo from './components/BenefitsMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';

const BenefitsEmployer = () => {
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

        <BenefitsMainInfo name="Gimnasio" isActive="true" cost="$15" />
        <BenefitsMainInfo name="Plan dental" isActive="true" cost="$10" />
        <BenefitsMainInfo name="Seguro privado" isActive="true" cost="$20" />

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

export default BenefitsEmployer;
