import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { EmployeeListResults } from '../components/employeeInProject/employee-list-results';
import { EmployeeListToolbar } from '../components/employeeInProject/employee-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

class SpecificProjectEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      APIUrl: 'https://localhost:7150/api/specificProjectEmployees'
    };
  }

  componentDidMount() {
    axios.get(this.state.APIUrl + "?projectName=" + sessionStorage.getItem("project") + "&employerID=" + sessionStorage.getItem("employerID")).then(response => {
      this.setState({ employees: response.data });
    });
  }

  render() {
    return (
      <>
        <Head>
          <title>
            This project's employees | Ta' Bueno
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
            <EmployeeListToolbar />
            <Box sx={{ mt: 3 }}>
              <EmployeeListResults employees={this.state.employees} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}
SpecificProjectEmployees.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SpecificProjectEmployees;
