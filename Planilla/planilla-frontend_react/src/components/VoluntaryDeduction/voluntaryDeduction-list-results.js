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

export const VoluntaryDeductionListResults = ({ voluntaryDeductions, ...rest }) => {
  const router = useRouter();
  const [selectedVoluntaryDeductionIds, setSelectedVoluntaryDeductionIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleSelectAll = (event) => {
    let newSelectedVoluntaryDeductionIds;

    if (event.target.checked) {
      newSelectedVoluntaryDeductionIds = voluntaryDeductions.map((voluntaryDeduction) => voluntaryDeduction.voluntaryDeductionName);
    } else {
      newSelectedVoluntaryDeductionIds = [];
    }
    setSelectedVoluntaryDeductionIds(newSelectedVoluntaryDeductionIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedVoluntaryDeductionIds.indexOf(id);
    let newSelectedVoluntaryDeductionIds = [];

    if (selectedIndex === -1) {
      newSelectedVoluntaryDeductionIds = newSelectedVoluntaryDeductionIds.concat(selectedVoluntaryDeductionIds, id);
    } else if (selectedIndex === 0) {
      newSelectedVoluntaryDeductionIds = newSelectedVoluntaryDeductionIds.concat(selectedVoluntaryDeductionIds.slice(1));
    } else if (selectedIndex === selectedBenefitIds.length - 1) {
      newSelectedVoluntaryDeductionIds = newSelectedVoluntaryDeductionIds.concat(selectedVoluntaryDeductionIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedVoluntaryDeductionIds = newSelectedVoluntaryDeductionIds.concat(
        selectedVoluntaryDeductionIds.slice(0, selectedIndex),
        selectedVoluntaryDeductionIds.slice(selectedIndex + 1)
      );
    }

      setSelectedVoluntaryDeductionIds(newSelectedVoluntaryDeductionIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (voluntaryDeductionName) => {
    sessionStorage.setItem("voluntaryDeduction", voluntaryDeductionName);
    setOpen(true);
  };

  const viewVoluntaryDeduction = (voluntaryDeductionName) => {
    sessionStorage.setItem("voluntaryDeduction", voluntaryDeductionName);
    router.push('/specific_voluntaryDeduction');
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
                    checked={selectedVoluntaryDeductionIds.length === voluntaryDeductions.length}
                    color="primary"
                    indeterminate={
                      selectedVoluntaryDeductionIds.length > 0
                      && selectedVoluntaryDeductionIds.length < voluntaryDeductions.length
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
              {voluntaryDeductions.slice(page * limit, page * limit + limit).map(voluntaryDeduction => (
                <TableRow
                  hover
                  key={voluntaryDeduction.voluntaryDeductionName + voluntaryDeduction.projectName + voluntaryDeduction.employerID}
                  selected={selectedVoluntaryDeductionIds.indexOf(voluntaryDeduction.voluntaryDeductionName) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedVoluntaryDeductionIds.indexOf(voluntaryDeduction.voluntaryDeductionName) !== -1}
                      onChange={(event) => handleSelectOne(event, voluntaryDeduction.voluntaryDeductionName)}
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
                        src={voluntaryDeduction.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(voluntaryDeduction.voluntaryDeductionName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {voluntaryDeduction.voluntaryDeductionName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {voluntaryDeduction.description}
                  </TableCell>
                  <TableCell>
                    {voluntaryDeduction.cost}
                  </TableCell>
                  <TableCell>
                  <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" color="primary" onClick={() => viewVoluntaryDeduction(voluntaryDeduction.voluntaryDeductionName)}>
                  <ReadMoreIcon />
                  </IconButton>
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
        count={voluntaryDeductions.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

VoluntaryDeductionListResults.propTypes = {
  voluntaryDeductions: PropTypes.array.isRequired
};

