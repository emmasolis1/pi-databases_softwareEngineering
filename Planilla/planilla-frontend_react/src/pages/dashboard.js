import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';
import { URL } from 'src/utils/url';
import { parseJSON } from 'date-fns';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      info: [],
      APIUrl: URL + 'dashboard',
    };
  }

  componentDidMount() {
    let requestAPI = this.state.APIUrl + "?employerID=" + sessionStorage.getItem("employerID") + "&projectName=" + sessionStorage.getItem('project');
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
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <Budget totalProjects={this.state.info.totalProjects} />
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  sm={6}
                  xs={12}
                >
                  <TotalCustomers totalEmployeesCompany={this.state.info.totalEmployees} />
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  sm={6}
                  xs={12}
                >
                  <TasksProgress totalEmployeesProject={this.state.info.totalEmployeesByProject} />
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  sm={6}
                  xs={12}
                >
                  <TotalProfit totalBenefitCost={this.state.info.costForBenefits} sx={{ height: '100%' }} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <Sales />
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={3}
                  xs={12}
                >
                  <TrafficByDevice fulltime={this.state.info.totalFulltimeEmployees} parttime={this.state.info.totalPartTimeEmployees} hourly={this.state.info.totalHourlyEmployees} professional_services={this.state.info.totalProfessionalServicesEmployees} sx={{ height: '100%' }} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={3}
                  xs={12}
                >
                  <LatestProducts sx={{ height: '100%' }} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <LatestOrders />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
    }
  }
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
