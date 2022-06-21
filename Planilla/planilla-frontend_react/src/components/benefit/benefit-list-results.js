import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getInitials } from '../../utils/get-initials';
import IconButton from '@mui/material/IconButton';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

export const BenefitListResults = ({ benefits, ...rest }) => {
  const router = useRouter();
  const [selectedBenefitIds, setSelectedBenefitIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleSelectAll = (event) => {
    let newSelectedBenefitIds;

    if (event.target.checked) {
      newSelectedBenefitIds = benefits.map((benefit) => benefit.benefitName);
    } else {
      newSelectedBenefitIds = [];
    }
    setSelectedBenefitIds(newSelectedBenefitIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBenefitIds.indexOf(id);
    let newSelectedBenefitIds = [];

    if (selectedIndex === -1) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(selectedBenefitIds, id);
    } else if (selectedIndex === 0) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(selectedBenefitIds.slice(1));
    } else if (selectedIndex === selectedBenefitIds.length - 1) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(selectedBenefitIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(
        selectedBenefitIds.slice(0, selectedIndex),
        selectedBenefitIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBenefitIds(newSelectedBenefitIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (benefitName) => {
    sessionStorage.setItem("benefit", benefitName);
    setOpen(true);
  };

  const handleClose = (agreed) => {
    setOpen(false);
    if (agreed === true) {
      axios.delete("https://localhost:7150/api/deleteBenefit?benefitName=" + sessionStorage.getItem("benefit") + "&projectName=" + sessionStorage.getItem("project") + "&employerID=" + sessionStorage.getItem("employerID")).then(() => {
        alert("Benefit deleted successfully");
        window.location.reload(false);
      });
    }
  };

  const viewBenefit = (benefitName) => {
    sessionStorage.setItem("benefit", benefitName);
    router.push('/specificBenefit');
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedBenefitIds.length === benefits.length}
                    color="primary"
                    indeterminate={
                      selectedBenefitIds.length > 0
                      && selectedBenefitIds.length < benefits.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Cost
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {benefits.slice(page * limit, page * limit + limit).map(benefit => (
                <TableRow
                  hover
                  key={benefit.benefitName + benefit.projectName + benefit.employerID}
                  selected={selectedBenefitIds.indexOf(benefit.benefitName) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBenefitIds.indexOf(benefit.benefitName) !== -1}
                      onChange={(event) => handleSelectOne(event, benefit.benefitName)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={benefit.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(benefit.benefitName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {benefit.benefitName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {benefit.description}
                  </TableCell>
                  <TableCell>
                    {benefit.cost}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="edit" color="primary" onClick={() => viewBenefit(benefit.benefitName)}>
                        <ReadMoreIcon />
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={() => handleClickOpen(benefit.benefitName)}>
                        <DeleteForeverIcon />
                      </IconButton>
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
                            You are about to delete a benefit, this means
                            that everyone linked to it will lose access to it.
                            Are you sure?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} autoFocus>NO</Button>
                          <Button onClick={() => handleClose(true)}>Yes</Button>
                        </DialogActions>
                      </Dialog>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={benefits.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BenefitListResults.propTypes = {
  benefits: PropTypes.array.isRequired
};
