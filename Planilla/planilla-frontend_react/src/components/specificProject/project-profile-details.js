import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export const ProjectProfileDetails = ({ project, ...props }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      budget: project.budget,
      paymentMethod: project.paymentMethod,
      description: project.description,
      maxNumberOfBenefits: project.maxNumberOfBenefits,
      maxBudgetForBenefits: project.maxBudgetForBenefits,
    },
    validationSchema: Yup.object({
      budget: Yup
        .string(),
      paymentMethod: Yup
        .string()
        .max(50),
      description: Yup
        .string()
        .max(255),
      maxNumberOfBenefits: Yup
        .number().typeError("Invalid input, please insert a number"),
      maxBudgetForBenefits: Yup
        .string(),
    }),
    onSubmit: values => {
      var data = {
        projectName: project.projectName,
        employerID: project.employerID,
        budget: values.budget,
        paymentMethod: values.paymentMethod,
        description: values.description,
        maxNumberOfBenefits: values.maxNumberOfBenefits,
        maxBudgetForBenefits: values.maxBudgetForBenefits
      };
      axios.put('https://localhost:7150/api/specificProject', data).then((response) => {
        alert("Project updated successfully");
        router.push('/specificProject');
      });
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Project"
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
                disabled={true}
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
                disabled={true}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                margin="none"
                value={formik.values.description}
                disabled={true}
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
                disabled={true}
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
                disabled={true}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};