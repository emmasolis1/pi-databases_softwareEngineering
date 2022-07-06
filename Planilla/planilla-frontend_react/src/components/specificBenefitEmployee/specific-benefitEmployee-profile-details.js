import * as React from 'react';
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
import { URL } from 'src/utils/url';

export const SpecificBenefitEmployeeProfileDetails = ({ benefit, ...props }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      projectName: benefit.projectName,
      employerID: benefit.employerID,
      description: benefit.description,
      cost: benefit.cost,
    },
    onSubmit: values => {
      var data = {
        benefitName: benefit.benefitName,
        projectName: benefit.projectName,
        employerID: benefit.employerID,
        description: benefit.description,
        cost: benefit.cost
      };
      axios.put(URL + 'specificBenefitEmployee', data).then((response) => {
        alert("Benefit select successfully");
        router.push('/BenefitEmployee');
      });
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Benefit's add information:"
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
              Select benefit
            </Button>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};