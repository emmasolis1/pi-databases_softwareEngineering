import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      projectTitle: '',
      budget: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      projectTitle: Yup
        .string()
        .max(255)
        .required(
          'Project title is required')
    }),
    onSubmit: () => {
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Material Kit
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
            href="/projects"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Projects
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new project
              </Typography>
             
            </Box>
            <TextField
              error={Boolean(formik.touched.projectTitle && formik.errors.projectTitle)}
              fullWidth
              helperText={formik.touched.projectTitle && formik.errors.projectTitle}
              label="Project Title"
              margin="normal"
              name="projectTitle"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.projectTitle}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.budget && formik.errors.shortDescription)}
              fullWidth
              helperText={formik.touched.budget && formik.errors.shortDescription}
              label="Short description"
              margin="normal"
              name="shortDescription"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.shortDescription}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.budget && formik.errors.budget)}
              fullWidth
              helperText={formik.touched.budget && formik.errors.budget}
              label="Budget"
              margin="normal"
              name="budget"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.budget}
              variant="outlined"
            />
            <TextField
                error={Boolean(formik.touched.budget && formik.errors.paymentMethod)}
                fullWidth
                helperText={formik.touched.budget && formik.errors.paymentMethod}
                label="Payment Method"
                margin="normal"
                name="paymentMethod"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.paymentMethod}
                variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
             
            </Box>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Create project
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
