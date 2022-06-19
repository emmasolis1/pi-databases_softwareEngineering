import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Box, Container } from '@mui/material';
import { EmployeeListResults } from '../components/employee/employee-list-results';
import { EmployeeListToolbar } from '../components/employee/employee-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      APIUrl: 'https://localhost:7150/api/employees',
    };
  }

  componentDidMount() {
    // Using Fetch(), JavaScript method.
    // fetch('https://localhost:7150/api/employees')
    //   .then(response => response.json())
    //   .then(data => this.setState({ employees: data }));

    // Using Axios, React library.
    axios.get(this.state.APIUrl).then(response => {
      this.setState({ employees: response.data });
      sessionStorage.setItem("showSpecificProjectEmployees", "all");
    });
  }

  render() {
    // This is just something extra required for the library for searching, it is NOT a must to use.
    this.state.employees.forEach(employee => {
      employee.id = uuid();
    });
    
    return (
      <>
        <Head>
          <title>
            Employees | Ta' Bueno
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

export default Employees;
