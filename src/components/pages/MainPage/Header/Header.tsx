import './Header.scss';
import { Box, AppBar, Toolbar, Link, Typography } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Search } from 'src/components/search/Search';

export function Header({ customer }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {customer ? (
        <AppBar
          className="header container"
          position="static"
          elevation={0}
          sx={{ backgroundColor: '#ffffff' }}
        >
          <Toolbar className="toolbar">
            <Box className="logo" sx={{ flexGrow: 1 }}>
              <Link
                className="toolbar__link"
                color="textPrimary"
                underline="none"
                href="/"
              >
                <CheckroomIcon fontSize="large" />
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
            <Typography
              variant="body1"
              sx={{ marginRight: '10px', color: '#000000' }}
            >
              Hello, {customer.firstName} {customer.lastName}!
            </Typography>
            <Box className="search">
              <Search />
            </Box>
            <Box className="login">
              <Link
                className="login__link"
                color="textPrimary"
                underline="none"
                href="/logout"
              >
                <PersonIcon />
                {SERVICE_MESSAGES.logout}
              </Link>
              <Link
                className="login__link"
                color="textPrimary"
                underline="none"
                href="/cart"
              >
                <ShoppingCartIcon />
                {SERVICE_MESSAGES.cart}
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          className="header container"
          position="static"
          elevation={0}
          sx={{ backgroundColor: '#ffffff' }}
        >
          <Toolbar className="toolbar">
            <Box className="logo" sx={{ flexGrow: 1 }}>
              <Link
                className="toolbar__link"
                color="textPrimary"
                underline="none"
                href="/"
              >
                <CheckroomIcon fontSize="large" />
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
                className="login__link"
                color="textPrimary"
                underline="none"
                href="/login"
              >
                <PersonIcon />
                {SERVICE_MESSAGES.login}
              </Link>
              <Link
                className="login__link"
                color="textPrimary"
                underline="none"
                href="/cart"
              >
                <ShoppingCartIcon />
                {SERVICE_MESSAGES.cart}
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}