import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import SideNavigationBar from './components/SideNavigationBar';
import ProjectsMainInfo from './components/ProjectsMainInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import variables from './Variables';


export default class Project extends React.Component {
    state = {
        Project: []
    }

    componentDidMount() {
        axios.get(variables.API_URL + 'Project')
            .then(res => {
                const Project = res.data;
                this.setState({ Project });
            })
    }

    render() {
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

                    {
                        this.state.Project.map(proy =>
                            <ProjectsMainInfo name={proy.nombre} payment={proy.modalidadPago} budget={proy.presupuesto}/>
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