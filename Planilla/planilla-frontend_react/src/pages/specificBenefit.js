import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { BenefitProfile } from '../components/specificBenefit/benefit-profile';
import { BenefitProfileDetails } from '../components/specificBenefit/benefit-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';

class SpecificBenefit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      benefit: [],
      isLoaded: false,
      APIUrl: 'https://localhost:7150/api/specificBenefit',
    };
  }

  componentDidMount() {
    axios.get(this.state.APIUrl + "?benefitName=" + sessionStorage.getItem("benefit") +"&projectName=" + sessionStorage.getItem("project") + "&employerID=" + sessionStorage.getItem("employerID")).then(response => {
        this.setState({ isLoaded: true, benefit: response.data });
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
              Benefits | Ta' Bueno
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
                Benefit
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
                  <BenefitProfile benefit={this.state.benefit} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xs={12}
                >
                  <BenefitProfileDetails benefit={this.state.benefit} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
    }
  }
}

SpecificBenefit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SpecificBenefit;