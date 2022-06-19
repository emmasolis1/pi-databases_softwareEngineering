import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Box, Container } from '@mui/material';
import { EmployeeListResults } from '../components/employee/employee-list-results';
import { EmployeeListToolbar } from '../components/employee/employee-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

class AddEmployeeToProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      APIUrl: 'https://localhost:7150/api/employees'
      //APIUrl: 'https://localhost:7150/api/employeesNotInProject'
    };
  }

  componentDidMount() {
    axios.get(this.state.APIUrl).then(response => {
      this.setState({ employees: response.data });
    });
  }

  render() {
    sessionStorage.setItem("showSpecificProjectEmployees", "allNoButton");
    return (
      <>
        <Head>
          <title>
            Add employee to {sessionStorage.getItem("project")} | Ta' Bueno
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
Employees.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AddEmployeeToProject;
