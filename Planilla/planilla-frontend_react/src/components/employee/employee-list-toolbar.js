import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import NextLink from 'next/link';
import { Search as SearchIcon } from '../../icons/search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const EmployeeListToolbar = (props) => {
  const showAddEmployeeButton = true;
  const showPrevPage = false;
  const isNextPageCreateEmployee = true;
  const prevPage = "";
  const nextPage = "/create_employee";
  const pageTitle = "";
  const prevPageTitle = "";

  if (sessionStorage.getItem("showSpecificProjectEmployees") == "allNoButton") {
    showAddEmployeeButton = false;
    isNextPageCreateEmployee = false;
    showPrevPage = true;
  }

  if (sessionStorage.getItem("showSpecificProjectEmployees") == "specific") {
    isNextPageCreateEmployee = false;
    showPrevPage = true;
  }

  if (showAddEmployeeButton && isNextPageCreateEmployee) {
    pageTitle = "Employees";
  }
  else if (showAddEmployeeButton && !isNextPageCreateEmployee) {
    prevPage = "/specificProject"
    prevPageTitle = sessionStorage.getItem("project");
    nextPage = "/add_employee_to_project";
    pageTitle = sessionStorage.getItem("project") + "'s employees";
  }
  else if (!showAddEmployeeButton && !isNextPageCreateEmployee) {
    prevPage = "/specific_project_employees"
    prevPageTitle = sessionStorage.getItem("project") + "'s employees";
    pageTitle = "Add employee to " + sessionStorage.getItem("project");
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          {showPrevPage ?
            <NextLink
              href={prevPage}
              passHref
            >
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
              >
                {/*prevPageTitle*/}
              </Button>
            </NextLink>
            :
            ""
          }
          <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
            {pageTitle}
          </Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          {showAddEmployeeButton ?
            <NextLink
              href={nextPage}
              passHref
            >
              <Button
                color="primary"
                variant="contained"
              >
                Add Employee
              </Button>
            </NextLink>
            :
            ""
          }
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search employee"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}