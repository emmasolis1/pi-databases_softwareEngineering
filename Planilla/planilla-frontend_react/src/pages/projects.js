import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { projects } from '../__mocks__/projects';
import { ProjectListToolbar } from '../components/project/project-list-toolbar';
import { ProjectCard } from '../components/project/project-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import { useEffect } from 'react';

const Projects = () => { 
    const [customers, setCustomers] = useState(null);

useEffect(() => {
    const getCustomers = async () => {
        const response = await fetch('https://localhost:7150/api/projects');
        const data = await response.json();
        setCustomers(data);
    };

    getCustomers();
}, []);

return (
    <>
        <Head>
            <title>
                Projects | Material Kit
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
                        {projects.map((project) => (
                            <Grid
                                item
                                key={project.id}
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <ProjectCard project={projects} />
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
};

Projects.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Projects;
