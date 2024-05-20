import './Header.scss';
import { Box, AppBar, Toolbar, Link, Typography } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Search } from 'src/components/search/Search';
import { Link as RouterLink } from 'react-router-dom';

export function Header() {
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
              className="login__link"
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
              to="/"
              className="login__link"
              color="textPrimary"
              underline="none"
            >
              <LogoutIcon />
              {SERVICE_MESSAGES.logout}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
