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
        

      </Box>
    </CardContent>
    <Divider />
    <CardActions>
    </CardActions>
  </Card>
);

/*
 *         <Typography
          color="textSecondary"
          variant="body2"
        >
          {`${project.City} ${project.Country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {project.timezone}
        </Typography>
        */