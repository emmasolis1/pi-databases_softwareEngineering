import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
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
import { getInitials } from '../../utils/get-initials';

export const MandatoryDeductionListResults = ({ mandatoryDeductions, ...rest }) => {
  const [selectedVoluntaryDeductionIds, setSelectedVoluntaryDeductionIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedVoluntaryDeductionIds;

    if (event.target.checked) {
      newSelectedVoluntaryDeductionIds = mandatoryDeductions.map((mandatoryDeduction) => mandatoryDeduction.Name);
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

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedVoluntaryDeductionIds.length === mandatoryDeductions.length}
                    color="primary"
                    indeterminate={
                      selectedVoluntaryDeductionIds.length > 0
                      && selectedVoluntaryDeductionIds.length < mandatoryDeductions.length
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
                  Percentage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mandatoryDeductions.slice(page * limit, page * limit + limit).map(mandatoryDeduction => (
                <TableRow
                  hover
                  key={mandatoryDeduction.Name + mandatoryDeduction.Percentage + mandatoryDeduction.Description}
                  selected={selectedVoluntaryDeductionIds.indexOf(mandatoryDeduction.Name) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedVoluntaryDeductionIds.indexOf(mandatoryDeduction.Name) !== -1}
                      onChange={(event) => handleSelectOne(event, mandatoryDeduction.Name)}
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
                        src={mandatoryDeduction.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(mandatoryDeduction.Name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {mandatoryDeduction.Name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {mandatoryDeduction.Description}
                  </TableCell>
                  <TableCell>
                    {mandatoryDeduction.Percentage + "%"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={mandatoryDeductions.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MandatoryDeductionListResults.propTypes = {
  mandatoryDeductions: PropTypes.array.isRequired
};

