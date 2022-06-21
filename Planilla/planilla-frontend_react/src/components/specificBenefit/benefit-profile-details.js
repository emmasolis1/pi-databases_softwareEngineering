import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export const BenefitProfileDetails = ({ benefit, ...props }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      projectName: benefit.projectName,
      employerID: benefit.employerID,
      description: benefit.description,
      cost: benefit.cost,
    },
    validationSchema: Yup.object({
      description: Yup
        .string()
        .max(255),
      cost: Yup
        .string(),
    }),
    onSubmit: values => {
      var data = {
        projectName: benefit.projectName,
        employerID: benefit.employerID,
        description: benefit.description,
        cost: benefit.cost
      };
      axios.put('https://localhost:7150/api/specificBenefit', data).then((response) => {
        alert("Benefit updated successfully");
        router.push('/specificBenefit');
      });
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Benefit's information:"
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
                label="Employer ID"
                margin="none"
                value={formik.values.employerID}
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
                label="Cost"
                margin="none"
                value={formik.values.cost}
                name="cost"
                error={Boolean(formik.touched.cost && formik.errors.cost)}
                helperText={formik.touched.cost && formik.errors.cost}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                variant="outlined"
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
                name="description"
                error={Boolean(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                variant="outlined"
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
          <Stack direction="row" spacing={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Save details
            </Button>
            <Button
              color="error"
              variant="contained"
              type="submit"
            >
              Delete Benefit
            </Button>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};