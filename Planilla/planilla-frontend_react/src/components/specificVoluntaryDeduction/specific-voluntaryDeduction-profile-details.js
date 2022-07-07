import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      projectName: voluntaryDeduction.projectName,
      employerID: voluntaryDeduction.employerID,
      description: voluntaryDeduction.description,
      cost: voluntaryDeduction.cost,
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
        voluntaryDeductionName: voluntaryDeduction.voluntaryDeductionName,
        projectName: voluntaryDeduction.projectName,
        employerID: voluntaryDeduction.employerID,
        description: values.description,
        cost: values.cost
      };
      axios.put('https://localhost:7150/api/specificVoluntaryDeduction', data).then((response) => {
        alert("Voluntary Deduction updated successfully");
        router.push('/voluntaryDeductions');
      });
    }
  });

const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (agreed) => {
    setOpen(false);
    if (agreed === true) {
      axios.delete("https://localhost:7150/api/deleteVoluntaryDeduction?voluntaryDeductionName=" + sessionStorage.getItem("voluntaryDeduction") + "&projectName=" + sessionStorage.getItem("project") + "&employerID=" + sessionStorage.getItem("employerID")).then(() => {
        alert("Voluntary deduction deleted successfully");
        router.push('/voluntaryDeductions');
      });
    }
  };

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
              onClick={() => handleClickOpen()}
            >
              Delete Voluntary Deduction
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Alert: Please read!!!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You are about to delete a voluntary deduction, this means
                  that everyone linked to it will lose access.
                  Are you sure?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>NO</Button>
                <Button onClick={() => handleClose(true)}>Yes</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};