import './Header.scss';
import { Box, AppBar, Toolbar, Link, Typography } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Search } from 'src/components/search/Search';
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="header container"
        position="static"
        elevation={0}
        sx={{ backgroundColor: '#ffffff' }}
      >
        <Toolbar className="toolbar">
          <Box className="logo" sx={{ flexGrow: 1 }}>
            <Link
              component={RouterLink}
              className="toolbar__link"
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
                }}
              >
                {SERVICE_MESSAGES.headerTitle}
              </Typography>
            </Link>
          </Box>
          <Box className="search">
            <Search />
          </Box>
          <Box className="login">
            <Link
              component={RouterLink}
              className="login__link login"
              color="textPrimary"
              underline="none"
              to={isAuth ? '/' : '/login'}
              sx={{ width: '100px', marginLeft: '3%' }}
            >
              <LoginIcon />
              {SERVICE_MESSAGES.login}
            </Link>
          </Box>
          <Box className="login">
            <Link
              component={RouterLink}
              className="login__link login"
              color="textPrimary"
              underline="none"
              to={isAuth ? '/' : '/registration'}
              sx={{ width: '100px', marginLeft: '3%' }}
            >
              <PersonIcon />
              {SERVICE_MESSAGES.authorization}
            </Link>
          </Box>
          <Box className="login">
            <Link
              component={RouterLink}
              to="/"
              className="login__link login"
              color="textPrimary"
              underline="none"
            >
              <ShoppingCartIcon />
              {SERVICE_MESSAGES.cart}
            </Link>
          </Box>
          <Box className="login">
            <Link
              component={RouterLink}
              to="/login"
              className={isAuth ? 'login login__link ' : 'logout__btn'}
              color="textPrimary"
              underline="none"
              ref={refLogout}
              onClick={() => void logoutUserHandler()}
            >
              <LogoutIcon />
              {SERVICE_MESSAGES.logout}
            </Link>
            {SimpleSnackbar(serverMessage, open, handleClose)}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
