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
      firstName: '',
      lastName: '',
      password: '',
      identificationCard: '',
      phoneNumber: '',
      province: '',
      canton: '',
      postalCode: '',
      userType: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required(
           'Password is required'),
      identificationCard: Yup
        .string()
        .min(9)
        .max(9)
        .required(
          'Identification card is required'),
      phoneNumber: Yup
        .string()
        .min(8)
        .max(8)
        .required(
          'Phone number is required'),
      province: Yup
        .string()
        .max(20)
        .required(
          'Province is required'),
      canton: Yup
        .string()
        .max(35)
        .required(
          'Canton is required'),
      postalCode: Yup
        .string()
        .min(5)
        .max(5)
        .required(
          'Postal code is required'),
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
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
             <TextField 
              error={Boolean(formik.touched.identificationCard && formik.errors.identificationCard)}
              fullWidth
              helperText={formik.touched.identificationCard && formik.errors.identificationCard}
              label="Identification card"
              margin="normal"
              name="identificationCard"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.identificationCard}
              variant="outlined"
            /> 
           <TextField 
              error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              fullWidth
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              label="Phone number"
              margin="normal"
              name="phoneNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              variant="outlined"
            />
           <TextField 
              error={Boolean(formik.touched.province && formik.errors.province)}
              fullWidth
              helperText={formik.touched.province && formik.errors.province}
              label="Province"
              margin="normal"
              name="province"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.province}
              variant="outlined"
            />
           <TextField 
              error={Boolean(formik.touched.canton && formik.errors.canton)}
              fullWidth
              helperText={formik.touched.canton && formik.errors.canton}
              label="Canton"
              margin="normal"
              name="canton"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.canton}
              variant="outlined"
            />
           <TextField 
              error={Boolean(formik.touched.postalCode && formik.errors.postalCode)}
              fullWidth
              helperText={formik.touched.postalCode && formik.errors.postalCode}
              label="Postal code"
              margin="normal"
              name="postalCode"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.postalCode}
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
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
