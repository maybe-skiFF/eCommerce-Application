import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { LoginForm } from './../../forms/LoginForm';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { PATHS } from 'src/constants/PATHS';
import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';

export function LoginPage(): ReactNode {
  return (
    <HeaderWrapper>
      <Grid
        className="container"
        container
        component="main"
        sx={{ height: '96vh' }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${PATHS.backgroundForLoginPage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <LoginForm />
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              component={RouterLink}
              sx={{ fontSize: `16px`, whiteSpace: 'pre-line' }}
              to="/registration"
              variant="body2"
            >
              {SERVICE_MESSAGES.noAccount} {SERVICE_MESSAGES.signIn}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </HeaderWrapper>
  );
}
