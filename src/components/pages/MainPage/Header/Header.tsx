import {
  Box,
  AppBar,
  Toolbar,
  Link,
  Typography,
  styled,
  alpha,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import './Header.scss';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '14ch',
      },
    },
  },
}));

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="header container"
        position="static"
        elevation={0}
        style={{ backgroundColor: '#ffffff' }}
      >
        <Toolbar className="toolbar">
          <Box className="logo" sx={{ flexGrow: 1 }}>
            <Link
              className="toolbar__link"
              color="textPrimary"
              underline="none"
              href="/"
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <Box className="login">
            <Link
              className="login__link"
              color="textPrimary"
              underline="none"
              href="/login"
            >
              <PersonIcon />
              Login
            </Link>
            <Link
              className="login__link"
              color="textPrimary"
              underline="none"
              href="/cart"
            >
              <ShoppingCartIcon />
              Cart
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
