import { useState, ReactNode, FormEvent, ChangeEvent, MouseEvent } from 'react';
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
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';
export default function RegistrationPage(): ReactNode {
  const [correctEmail, setCorrectEmail] = useState<boolean>(false);
  const [correctPassword, setCorrectPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [helperEmail, setHelperEmail] = useState<string>(
    SERVICE_MESSAGES.useLowerCase,
  );
  const [helperPassword, setHelperPassword] = useState<string>(
    SERVICE_MESSAGES.useLowerCase,
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('email'),
      password: data.get('password'),
    });
  };
  const getBehaviorEmail = (value: string) => {
    if (!value) {
      setHelperEmail(SERVICE_MESSAGES.isNoValid);
      setCorrectEmail(true);
      setErrorEmail(false);
    } else {
      setCorrectEmail(false);
      setHelperEmail(value);
      setErrorEmail(true);
    }
  };
  const getBehaviorPassword = (value: string) => {
    if (!value) {
      setHelperPassword(SERVICE_MESSAGES.useMore);
      setCorrectPassword(true);
      setErrorPassword(false);
    } else {
      setCorrectPassword(false);
      setHelperPassword(value);
      setErrorPassword(true);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
              error={errorEmail}
              helperText={helperEmail}
              FormHelperTextProps={{
                sx: {
                  width: '100%',
                  color: 'transparent',
                },
              }}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                const resultCheck: string = checkValidationFieldEmail(
                  event.target.value,
                );
                getBehaviorEmail(resultCheck);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              error={errorPassword}
              helperText={helperPassword}
              FormHelperTextProps={{
                sx: {
                  color: 'transparent',
                  width: '100%',
                },
              }}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                const resultCheck: string = checkValidationFieldPassword(
                  event.target.value,
                );
                getBehaviorPassword(resultCheck);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={SERVICE_MESSAGES.rememberMe}
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
