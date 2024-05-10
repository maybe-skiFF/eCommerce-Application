import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.scss'
import { Box, AppBar, Toolbar, Link, Typography, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
});

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className='header container' position="static" elevation={0}>
          <Toolbar className='toolbar'>
            <Box sx={{ flexGrow: 1 }}>
              <Link className='toolbar__link' color="textPrimary" underline="none" href="/">
                <CheckroomIcon fontSize='large'>
                </CheckroomIcon>
                <Typography variant="h4" component="div"
                  sx={{
                    flexGrow: 1,
                    '@media (max-width: 767px)': {
                      fontSize: '18px',
                    },
                  }}>
                  simple clothes
                </Typography></Link>
            </Box>
            <Box className='login'>
              <Link className='login__link' color="textPrimary" underline="none" href="/login">
                <PersonIcon />Login
              </Link>
              <Link className='login__link' color="textPrimary" underline="none" href="/cart">
                <ShoppingCartIcon />Cart
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
