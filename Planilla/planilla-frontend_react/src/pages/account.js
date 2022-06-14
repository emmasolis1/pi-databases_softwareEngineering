import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      APIUrl: 'https://localhost:7150/api/editProfile',
    };
  }

  componentDidMount() {
    //var bodyData = {id: localStorage.getItem('id')};
    var bodyData = {id: "1234567899"};
    axios.post(this.state.APIUrl, bodyData).then(response => {
      this.setState({ user: (response.data)[0] });
    });
  }

  render() {
    return (
      <>
        <Head>
          <title>
            Account | Material Kit
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
                <AccountProfile user={this.state.user}/>
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <AccountProfileDetails user={this.state.user}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
