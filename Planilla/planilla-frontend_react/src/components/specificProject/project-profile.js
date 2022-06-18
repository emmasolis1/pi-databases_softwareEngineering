import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

export const ProjectProfile = ({ project, ...props }) => {

  function viewEmployees() {
    alert('View employees');
  }

  function payProject() {
    alert('Pay project');
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {project.projectName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Created by employer with ID: {project.employerID}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          display="inline"
          fullWidth
          sx={{ pl: 1 }}
          onClick={viewEmployees}
        >
          View Employees
        </Button>
        <Button
          color="error"
          display="inline"
          fullWidth
          sx={{ pl: 1 }}
          onClick={payProject}
        >
          Pay Project
        </Button>
      </CardActions>
    </Card>
  );
};