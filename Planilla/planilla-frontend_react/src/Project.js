import React from 'react';
import { Button } from 'reactstrap';

import SideNavigationBar from './components/SideNavigationBar';
import BenefitsMainInfo from './components/ProjectsMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';

const Project = () => {
  return (
    <div className="App">

      <SideNavigationBar />
      <Header />

      <div className="App-header">

        <div style={titleStyle}>
          <h2 style={{ paddingRight: '20pt' }}>Proyectos</h2>
          <Button color="primary" outline>
            Agregar un nuevo proyecto
          </Button>
        </div>

              <BenefitsMainInfo name="Produccion audiovisual" isActive="true" payment="Quincenal" budget="$15000" />
              <BenefitsMainInfo name="Mercadeo internacional" isActive="true" payment="Mensual" budget="$17000" />
              <BenefitsMainInfo name="Distribucion agropecuaria" isActive="true" payment="Semanal" budget="$20000" />

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

export default Project;
