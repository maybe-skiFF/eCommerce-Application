import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { LoginForm } from './../../forms/LoginForm';
import { PATHS } from 'src/constants/PATHS';

export function RegistrationPage(): ReactNode {
  return (
    <Grid container component="main" sx={{ height: '96vh' }}>
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
    </Grid>
  );
}
