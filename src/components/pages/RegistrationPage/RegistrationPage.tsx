import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { RegistrationBlock } from 'src/components/forms/RegistrationBlock';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { Header } from '../../Header/Header';

export function RegistrationPage(): ReactNode {
  localStorage.clear();
  return (
    <>
      <Header></Header>
      <Container className="container" component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {SERVICE_MESSAGES.authorization}
          </Typography>
          <RegistrationBlock />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                sx={{ fontSize: `16px`, whiteSpace: 'pre-line' }}
                to="/login"
                variant="body2"
              >
                {SERVICE_MESSAGES.haveAccount} {SERVICE_MESSAGES.signIn}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
