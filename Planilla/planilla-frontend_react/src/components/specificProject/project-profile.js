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

export const ProjectProfile = ({ project, ...props }) => (
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
    </CardActions>
  </Card>
);