import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { VoluntaryDeductionEmployeeListResults } from '../components/voluntaryDeductionEmployee/voluntaryDeductionEmployee-list-results';
import { VoluntaryDeductionEmployeeListToolbar } from '../components/voluntaryDeductionEmployee/voluntaryDeductionEmployee-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

class VoluntaryDeductionsEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voluntaryDeductions: [],
      APIUrl: 'https://localhost:7150/api/voluntaryDeductionsBeingUsedByEmployee',
    };
  }
  componentDidMount() {    
    axios.get(this.state.APIUrl + "?project=" + sessionStorage.getItem("project") + "&employerID=" + sessionStorage.getItem("employerID")).then(response => {
      this.setState({ voluntaryDeductions: response.data });
    });
  }

  render() {
    return (
      <>
        <Head>
          <title>
            Voluntary Deductions | Ta' Bueno
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
            <VoluntaryDeductionEmployeeListToolbar />
            <Box sx={{ mt: 3 }}>
              {<VoluntaryDeductionEmployeeListResults voluntaryDeductions={this.state.voluntaryDeductions} />}
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

VoluntaryDeductionsEmployee.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default VoluntaryDeductionsEmployee;
