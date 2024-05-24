import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@material-ui/core';
import LoginIcon from '@material-ui/icons/Login';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LogoutIcon from '@material-ui/icons/Logout';

const NavigationLinks = ({ isAuth, logoutUserHandler, refLogout, serverMessage, open, handleClose }) => {
  const links = [
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
      onClick: logoutUserHandler,
    },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {links.map((item, index) => (
        <Box
          key={index}
          sx={{
            marginRight: index < 3 ? '20px' : '0',
            display: 'flex',
            alignItems: 'center',
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
          >
            {item.icon}
            {item.label}
          </Link>
        </Box>
      ))}
      {SimpleSnackbar(serverMessage, open, handleClose)}
    </Box>
  );
};

export default NavigationLinks;