import { useState, ReactNode, FormEvent, ChangeEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export default function RegistrationPage(): ReactNode {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('email'),
      password: data.get('password'),
    });
  };
  const [correctEmail, setCorrectEmail] = useState<boolean>(false);
  const [correctPassword, setCorrectPassword] = useState<boolean>(false);
  const [correctEmailColor, setCorrectEmailColor] = useState<boolean>(false);
  const [correctPasswordColor, setCorrectPasswordColor] =
    useState<boolean>(false);
  const [helperEmail, setHelperEmail] = useState<string>(
    SERVICE_MESSAGES.isNoValid,
  );
  const [helperPassword, setHelperPassword] = useState<string>(
    SERVICE_MESSAGES.useOnlyNumbers,
  );
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {SERVICE_MESSAGES.signIn}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={correctEmailColor}
              helperText={helperEmail}
              FormHelperTextProps={{
                sx: {
                  color: 'transparent',
                },
              }}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                const resultCheck: string = checkValidationFieldEmail(
                  event.target.value,
                );
                if (!resultCheck) {
                  setHelperEmail(SERVICE_MESSAGES.isNoValid);
                  setCorrectEmailColor(false);
                  setCorrectEmail(true);
                } else {
                  setCorrectEmail(false);
                  setCorrectEmailColor(true);
                  setHelperEmail(resultCheck);
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={correctPasswordColor}
              helperText={helperPassword}
              FormHelperTextProps={{
                sx: {
                  color: 'transparent',
                },
              }}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                const resultCheck: string = checkValidationFieldPassword(
                  event.target.value,
                );
                if (!resultCheck) {
                  setHelperPassword(SERVICE_MESSAGES.useOnlyNumbers);
                  setCorrectPasswordColor(false);
                  setCorrectPassword(true);
                } else {
                  setCorrectPassword(false);
                  setCorrectPasswordColor(true);
                  setHelperPassword(resultCheck);
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!correctEmail || !correctPassword}
              sx={{ mt: 3, mb: 2 }}
            >
              {SERVICE_MESSAGES.signIn}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
