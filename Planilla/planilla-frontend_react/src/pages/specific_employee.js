import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { SpecificEmployeeProfile } from '../components/specificEmployee/specific-employee-profile';
import { SpecificEmployeeProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';

class SpecificEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoaded: false,
      APIUrl: 'https://localhost:7150/api/account',
    };
  }

  componentDidMount() {
    // var data = {id: localStorage.getItem('id')};
    var data = {id: sessionStorage.getItem("userID")};
    axios.post(this.state.APIUrl, data).then(response => {
      this.setState({ isLoaded: true, user: (response.data)[0] });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Head>
            <title>
              Account | Ta' Bueno
            </title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8
            }}
          >
            <Container maxWidth="lg">
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                Account
              </Typography>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <SpecificEmployeeProfile user={this.state.user}/>
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xs={12}
                >
                  <SpecificEmployeeProfileDetails user={this.state.user}/>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
    }
  }
}

SpecificEmployee.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SpecificEmployee;
