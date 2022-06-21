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

export const EmployeeListToolbar = ({ projectName, ...props }) => {
  const prevPage = "/projects";
  const nextPage = "/add_employee_to_project";
  const pageTitle = projectName + "'s employees";
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
          <NextLink
            href={prevPage}
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
            </Button>
          </NextLink>
          <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
            {pageTitle}
          </Typography>
        </Box>
        <Box sx={{ m: 1 }}>
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