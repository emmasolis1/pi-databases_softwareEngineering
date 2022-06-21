import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';

export const ProjectProfileDetails = ({ project, ...props }) => {
  const formik = useFormik({
    initialValues: {
      budget: project.budget,
      paymentMethod: project.paymentMethod,
      description: project.description,
      maxNumberOfBenefits: project.maxNumberOfBenefits,
      maxBudgetForBenefits: project.maxBudgetForBenefits,
    }
  });

  return (
    <form>
      <Card>
        <CardHeader
          title="Project's information:"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Budget"
                margin="none"
                value={formik.values.budget}
                InputProps={{readOnly: true}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Payment Method"
                margin="none"
                value={formik.values.paymentMethod}
                InputProps={{readOnly: true}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Max Number of Benefits"
                margin="none"
                value={formik.values.maxNumberOfBenefits}
                InputProps={{readOnly: true}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Max Budget for Benefits"
                margin="none"
                value={formik.values.maxBudgetForBenefits}
                InputProps={{readOnly: true}}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                margin="none"
                value={formik.values.description}
                InputProps={{readOnly: true}}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};