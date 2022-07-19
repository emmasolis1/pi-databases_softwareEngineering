import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboardEmployee/budget';
import { LatestOrders } from '../components/dashboardEmployee/latest-orders';
import { LatestProducts } from '../components/dashboardEmployee/latest-products';
import { Sales } from '../components/dashboardEmployee/sales';
import { TasksProgress } from '../components/dashboardEmployee/tasks-progress';
import { TotalCustomers } from '../components/dashboardEmployee/total-customers';
import { TotalProfit } from '../components/dashboardEmployee/total-profit';
import { TrafficByDevice } from '../components/dashboardEmployee/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';
import { URL } from 'src/utils/url';
import { parseJSON } from 'date-fns';

class DashboardEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      info: [],
      APIUrl: URL + 'dashboardEmployee',
    };
  }

  componentDidMount() {
    let requestAPI = this.state.APIUrl + "?employeeID=" + sessionStorage.getItem("employeeID");
    axios.get(requestAPI).then(response => {
      this.setState({ isLoaded: true, info: response.data });
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
              Dashboard | Ta' Bueno
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
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xl={4}
                  lg={4}
                  sm={6}
                  xs={12}
                >
                  <Budget totalProjects={this.state.info.totalWorkingProjects} />
                </Grid>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  sm={6}
                  xs={12}
                >
                  <TotalCustomers totalEmployeesCompany={this.state.info.totalEmployees} />
                </Grid>
                {/* <Grid
                  item
                  xl={3}
                  lg={3}
                  sm={6}
                  xs={12}
                >
                  <TasksProgress totalEmployeesProject="NA" />
                </Grid> */}
                <Grid
                  item
                  xl={4}
                  lg={4}
                  sm={6}
                  xs={12}
                >
                  <TotalProfit totalProjectsCost={this.state.info.totalProjectCost} sx={{ height: '100%' }} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <Sales employeeTypes={this.state.info.totalEmployeesByProject} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={3}
                  xs={12}
                >
                  <TrafficByDevice projects={this.state.info.totalProjectCost} sx={{ height: '100%' }} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={3}
                  xs={12}
                >
                  <LatestProducts nextPayments={this.state.info.nextPayments} sx={{ height: '100%' }} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <LatestOrders latestPayments={this.state.info.latestPayments} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
    }
  }
}

DashboardEmployee.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default DashboardEmployee;
