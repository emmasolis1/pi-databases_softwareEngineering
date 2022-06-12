import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateBenefit = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      benefitName: '',
      projectName: '',
      employerID: '',
      description: '',
      cost: ''
    },
    validationSchema: Yup.object({
      benefitName: Yup
        .string()
        .max(255)
        .required(
          'Benefit name is required'),
      description: Yup
        .string()
        .max(255),
      cost: Yup
        .string()
        .max(8)
    }),
    onSubmit: values => {
      var data = {
        benefitName: values.benefitName,
        projectName: sessionStorage.getItem("project"),
        employerID: sessionStorage.getItem("employerID"),
        description: values.description,
        cost: values.cost
      };
      axios.post('https://localhost:7150/api/benefits', data);
      router.push('/benefits');
    }
  });

  return (
    <>
      <Head>
        <title>
          New Benefit | Ta' Bueno
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/benefits"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Benefits
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new benefit
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.benefitName && formik.errors.benefitName)}
              fullWidth
              helperText={formik.touched.benefitName && formik.errors.benefitName}
              label="Benefit Name"
              margin="normal"
              name="benefitName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.benefitName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.description && formik.errors.description)}
              fullWidth
              helperText={formik.touched.description && formik.errors.description}
              label="Description"
              margin="normal"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.cost && formik.errors.cost)}
              fullWidth
              helperText={formik.touched.cost && formik.errors.cost}
              label="Cost"
              margin="normal"
              name="cost"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.cost}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Create Benefit
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default CreateBenefit;