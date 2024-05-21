import './Header.scss';
import { Box, AppBar, Toolbar, Link, Typography } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Search } from 'src/components/search/Search';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCustomer, useIsAuth } from 'src/context/context';
import { deleteContact } from 'src/serverPart/ApiRoot';
import { ErrorObject } from '@commercetools/platform-sdk';
import { SimpleSnackbar } from 'src/components/forms/Snackbar';
import { SyntheticEvent, useState } from 'react';

export function Header() {
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
    const logoutBtn = document.querySelector('.logout')!;
    logoutBtn.classList.remove('logout__btn-active');
    logoutBtn.classList.add('logout__btn');
    navigate('/login');
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
              to="/login"
            >
              <PersonIcon />
              {SERVICE_MESSAGES.login}
            </Link>
            <Link
              component={RouterLink}
              to="/"
              className="login__link"
              color="textPrimary"
              underline="none"
            >
              <ShoppingCartIcon />
              {SERVICE_MESSAGES.cart}
            </Link>
            <Link
              component={RouterLink}
              to="/login"
              className={`login__link logout ${isAuth ? 'logout__btn-active' : 'logout__btn'}`}
              color="textPrimary"
              underline="none"
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
