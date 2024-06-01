import './Header.scss';
import { Box, AppBar, Toolbar, Link, Typography } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCustomer, useIsAuth } from 'src/context/context';
import { deleteContact } from 'src/serverPart/ApiRoot';
import { ErrorObject } from '@commercetools/platform-sdk';
import { SimpleSnackbar } from 'src/components/SimpleSnackbar/SimpleSnackbar';
import { SyntheticEvent, useState, useRef } from 'react';

export function Header() {
  const refLogout = useRef<HTMLAnchorElement>(null);
  const [serverMessage, setServerMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const { customer } = useCustomer();
  const { isAuth, setIsAuth } = useIsAuth();
  const navigate = useNavigate();
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen(false);
  };
  async function logoutUserHandler() {
    if (refLogout.current) {
      refLogout.current.classList.remove('login');
      refLogout.current.classList.add('logout__btn');
    }

    await deleteContact(customer.email)
      .then(() => {
        navigate('/login');
        setIsAuth(false);
      })
      .catch((error: ErrorObject) => {
        setServerMessage(error.message);
        setOpen(true);
      });
  }

  const navigationLinks = [
    {
      icon: <LoginIcon />,
      label: SERVICE_MESSAGES.login,
      to: isAuth ? '/' : '/login',
      className: 'login__link login',
    },
    {
      icon: <PersonIcon />,
      label: SERVICE_MESSAGES.authorization,
      to: isAuth ? '/' : '/registration',
      className: 'login__link login',
    },
    {
      icon: <ShoppingCartIcon />,
      label: SERVICE_MESSAGES.cart,
      to: '/',
      className: 'login__link login',
    },
    {
      icon: <LogoutIcon />,
      label: SERVICE_MESSAGES.logout,
      to: '/login',
      className: isAuth ? 'login login__link' : 'logout__btn',
      onClick: () => void logoutUserHandler(),
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          width: '100 %',
          maxWidth: '1280px',
          boxSizing: 'border-box',
          margin: ' 0 auto',
          backgroundColor: '#ffffff',
          padding: '8px 16px',
        }}
        position="static"
        elevation={0}
      >
        <Toolbar
          sx={{
            flexGrow: 1,
            '@media (max-width: 767px)': {
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Link
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '10px',
              }}
              component={RouterLink}
              color="textPrimary"
              underline="none"
              to="/"
            >
              <CheckroomIcon fontSize="large"></CheckroomIcon>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  '@media (max-width: 767px)': {
                    marginBottom: '10px',
                  },
                }}
              >
                {SERVICE_MESSAGES.headerTitle}
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navigationLinks.map((item, index) => (
              <Box
                key={index}
                sx={{
                  marginRight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  width: '60px',
                }}
              >
                <Link
                  component={RouterLink}
                  to={item.to}
                  className={item.className}
                  color="textPrimary"
                  underline="none"
                  ref={index === 3 ? refLogout : null}
                  onClick={item.onClick}
                  sx={{ width: '100%' }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </Box>
            ))}
            {SimpleSnackbar(serverMessage, open, handleClose)}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
