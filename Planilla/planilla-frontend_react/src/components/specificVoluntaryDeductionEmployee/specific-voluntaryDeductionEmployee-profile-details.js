import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import { URL } from 'src/utils/url';

export const SpecificVoluntaryDeductionEmployeeProfileDetails = ({ voluntaryDeduction, ...props }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      projectName: voluntaryDeduction.projectName,
      employerID: voluntaryDeduction.employerID,
      description: voluntaryDeduction.description,
      cost: voluntaryDeduction.cost,
    },
    onSubmit: values => {
      var data = {
        voluntaryDeductionName: voluntaryDeduction.voluntaryDeductionName,
        projectName: voluntaryDeduction.projectName,
        employerID: voluntaryDeduction.employerID,
        description: voluntaryDeduction.description,
        cost: voluntaryDeduction.cost,
      };
      axios.put(URL + 'specificVoluntaryDeductionEmployee', data).then((response) => {
        alert("Voluntary Deduction selected successfully");
        router.push('/voluntaryDeductionsEmployee');
      });
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Voluntary Deduction's add information:"
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
              {/*<TextField*/}
              {/*  fullWidth*/}
              {/*  label="Cost"*/}
              {/*  margin="none"*/}
              {/*  value={formik.values.cost}*/}
              {/*  name="cost"*/}
              {/*  error={Boolean(formik.touched.cost && formik.errors.cost)}*/}
              {/*  helperText={formik.touched.cost && formik.errors.cost}*/}
              {/*  onBlur={formik.handleBlur}*/}
              {/*  onChange={formik.handleChange}*/}
              {/*  variant="outlined"*/}
              {/*/>*/}
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
              Save and select 
            </Button>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};