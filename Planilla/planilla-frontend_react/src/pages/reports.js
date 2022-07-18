import Head from 'next/head';
import React from 'react';
import { Box, Container } from '@mui/material';
import { ReportsToolbar } from '../components/report/report-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Head>
            <title>
              Reports | Ta' Bueno
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
              <ReportsToolbar />
            </Container>
          </Box>
        </>
      );
    }
  }
}

Reports.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Reports;
