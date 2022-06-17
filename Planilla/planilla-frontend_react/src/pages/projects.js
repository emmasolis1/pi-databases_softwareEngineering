import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProjectListToolbar } from '../components/project/project-list-toolbar';
import { ProjectCard } from '../components/project/project-card';
import { DashboardLayout } from '../components/dashboard-layout';

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            APIUrl: 'https://localhost:7150/api/projects',
        };
    }

    componentDidMount() {
        axios.get(this.state.APIUrl + "?employerID=" + sessionStorage.getItem("employerID")).then(response => {
            this.setState({ projects: response.data });
        });
    }

    render() {
        return (
            <>
                <Head>
                    <title>
                        Projects | Ta' Bueno
                    </title>
                </Head>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <Container maxWidth={false}>
                        <ProjectListToolbar />
                        <Box sx={{ pt: 3 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                {this.state.projects.map((project) => (
                                    <Grid
                                        item
                                        key={project.projectName + project.employerID}
                                        lg={4}
                                        md={6}
                                        xs={12}
                                    >
                                        <ProjectCard project={project} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                pt: 3
                            }}
                >
                  <Pagination
                    color="primary"
                    count={3}
                    size="small"
                  />
                        </Box>
                    </Container>
                </Box>
            </>
        );
    }
}

Projects.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Projects;
