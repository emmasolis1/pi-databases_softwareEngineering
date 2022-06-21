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

export const SpecificVoluntaryDeductionProfileDetails = ({ voluntaryDeduction, ...props }) => {
  const router = useRouter();
  //const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      projectName: voluntaryDeduction.projectName,
      employerID: voluntaryDeduction.employerID,
      description: voluntaryDeduction.description,
      cost: '',
    },
    validationSchema: Yup.object({
      description: Yup
        .string()
        .max(255)
    }),
    onSubmit: values => {
      var data = {
        voluntaryDeductionName: voluntaryDeduction.voluntaryDeductionName,
        projectName: voluntaryDeduction.projectName,
        employerID: voluntaryDeduction.employerID,
        description: values.description,
        cost: ""
      };
      axios.put('https://localhost:7150/api/specificVoluntaryDeduction', data).then((response) => {
        alert("Voluntary Deduction updated successfully");
        router.push('/voluntaryDeductions');
      });
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Voluntary Deduction's information:"
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
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
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
              Delete Voluntary Deduction
            </Button>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};