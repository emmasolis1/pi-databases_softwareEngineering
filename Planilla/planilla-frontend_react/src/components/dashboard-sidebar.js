import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const items = [
  {
    href: '/dashboard',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/employees',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Employees'
  },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  {
    href: '/projects',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Projects'
  },
  {
    href: '/benefits',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Benefits'
  },
  {
    href: '/mandatoryDeductions',
    icon: (<LockIcon fontSize="small" />),
    title: 'Mandatory Deductions'
  },
  {
    href: '/voluntaryDeductions',
    icon: (<LockIcon fontSize="small" />),
    title: 'Voluntary Deductions'
  }
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // },
];

const employeeItems = [
  {
    href: '/projects_employee',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Projects'
  },
  {
    href: '/benefitsEmployee',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Benefits'
  },
  {
    href: '/mandatoryDeductions',
    icon: (<LockIcon fontSize="small" />),
    title: 'Mandatory Deductions'
  },
  {
    href: '/voluntaryDeductionsEmployee',
    icon: (<LockIcon fontSize="small" />),
    title: 'Voluntary Deductions'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const [project, setProject] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const open2 = Boolean(project);
  const [isEmployer, setIsEmployer] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState('');
  
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }

      if (sessionStorage.getItem('userType') === '0') {
        setIsEmployer(true);
      } else {
        setIsEmployer(false);
      }
      setCurrentProject(sessionStorage.getItem('project'));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  );

  // useEffect(() => {
  //   setProjects(JSON.parse(sessionStorage.getItem('userProjects')));
  // }, [projects]);

  const handleClick = (event) => {
    setProject(event.currentTarget);
  };
  const handleClose = () => {
    setProject(null);
  };

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/dashboard"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  {currentProject}
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Selected project
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
            {/* <Button
                id="basic-button"
                aria-controls={open2 ? 'basic-menu' : undefined}
                aria-haspopup="true"
                fullWidth
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick}
              >
                Project
                <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={project}
                open={open2}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {JSON.parse(sessionStorage.getItem('userProjects')).map((project) => (
                  <MenuItem
                    key={project.href}
                    onClick={handleClose}
                    selected={router.asPath === project.href}
                    divider="true"
                  >
                    {project}
                  </MenuItem>
                ))}
              </Menu> */}
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
            align="center"
          >
            &copy; Ta' Bueno - 2022
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
            align='center'
          >
            PI - Databases / Software
          </Typography>
        </Box>
      </Box>
    </>
  );

  const employeeContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/dashboard"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  {currentProject}
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Selected project
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {employeeItems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
            align="center"
          >
            &copy; Ta' Bueno - 2022
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
            align='center'
          >
            PI - Databases / Software
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {isEmployer ? content : employeeContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {isEmployer ? content : employeeContent}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
