import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';

export const ProjectProfile = ({ project, ...props }) => {
  const router = useRouter();

  function RegisterHours() {
    router.push('/hour_registration');
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
          onClick={RegisterHours}
        >
          Register hours
        </Button>
      </CardActions>
    </Card>
  );
};
