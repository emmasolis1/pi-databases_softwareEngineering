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

export const BenefitEmployeeListResults = ({ benefits, ...rest }) => {
  const router = useRouter();
  const [selectedBenefitIds, setSelectedBenefitIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

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

  const viewBenefitEmployee = (benefitName) => {
    sessionStorage.setItem("benefit", benefitName);
    router.push('/specificBenefitEmployee');
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
                  Value
                </TableCell>
                <TableCell>
                  Start date
                </TableCell>
                <TableCell>
                  End date
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
                  {showButton(benefit.isActive)}
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
                  <IconButton aria-label="edit" color="primary" onClick={() => viewBenefitEmployee(benefit.benefitName)}>
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

BenefitEmployeeListResults.propTypes = {
  benefits: PropTypes.array.isRequired
};
