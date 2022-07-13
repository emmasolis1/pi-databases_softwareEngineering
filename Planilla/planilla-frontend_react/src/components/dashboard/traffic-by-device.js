import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import ScheduleIcon from '@mui/icons-material/Schedule';

export const TrafficByDevice = ({ fulltime, parttime, hourly, professional_services, ...props }) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [fulltime, parttime, hourly, professional_services],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#00C853'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Fulltime', 'Part-time', 'Hourly', 'Prof. Services']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Fulltime',
      value: fulltime,
      icon: LaptopMacIcon,
      color: '#3F51B5',
      total_sum: parseInt(fulltime) + parseInt(parttime) + parseInt(hourly) + parseInt(professional_services)
    },
    {
      title: 'Part-time',
      value: parttime,
      icon: TabletIcon,
      color: '#E53935',
      total_sum: parseInt(fulltime) + parseInt(parttime) + parseInt(hourly) + parseInt(professional_services)
    },
    {
      title: 'Hourly',
      value: hourly,
      icon: ScheduleIcon,
      color: '#FB8C00',
      total_sum: parseInt(fulltime) + parseInt(parttime) + parseInt(hourly) + parseInt(professional_services)
    },
    {
      title: 'Professional Services',
      value: professional_services,
      icon: PhoneIcon,
      color: '#00C853',
      total_sum: parseInt(fulltime) + parseInt(parttime) + parseInt(hourly) + parseInt(professional_services)
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title={"Types of Employees in:\n" + sessionStorage.getItem('project')} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value,
            total_sum
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h6"
              >
                {parseFloat(value / total_sum * 100).toFixed(0)}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
