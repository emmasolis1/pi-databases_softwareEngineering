import React from 'react';
import { Button } from 'reactstrap';

import SideNavigationBar from './components/SideNavigationBar';
import BenefitsMainInfo from './components/BenefitsMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';


const BenefitsEmployer = () => {
  return (
    <div className="App">
      <Header />
      <div className='App-header' style={navMenuStyle}>
        <SideNavigationBar />
        <div className="App-header">
        <div style={tittleStyle}>
          <h2 style={{paddingRight: '30pt',}}>Beneficios</h2>
          <Button color="primary" outline>
            Agregar un nuevo beneficio
          </Button>
        </div>

        <BenefitsMainInfo name="Gimnasio" isActive="true" cost="$15"/>
        <BenefitsMainInfo name="Plan dental" isActive="true" cost="$10"/>
        <BenefitsMainInfo name="Seguro privado" isActive="true" cost="$20"/>
        
      </div>
      </div>
      <Footer />
    </div>
  );
};

const tittleStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  alignItems: 'baseline',
}

const navMenuStyle={
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  justifyContent: 'center',
  alignItems: 'strech',
  alignContent: 'center',
}

export default BenefitsEmployer;
