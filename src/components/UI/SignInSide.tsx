import * as React from 'react';
import { useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { checkValidationField } from 'src/utils/checkValidashionField';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide(): React.ReactNode {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      password: data.get('password'),
    });
  };
  const [correctName, setCorrectName] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(false);
  const [correctNameColor, setCorrectNameColor] = useState(false);
  const [correctPasswordColor, setCorrectPasswordColor] = useState(false);
  const [labelName, setLabelName] = useState('Name');
  const [labelPassword, setLabelPassword] = useState('Password');
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
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
              Sign in
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
                id="name"
                label={labelName}
                name="name"
                autoComplete="name"
                autoFocus
                error={correctNameColor}
                onInput={() => {
                  const resultCheck = checkValidationField('name');
                  if (typeof resultCheck === 'string') {
                    setLabelName(resultCheck);
                    setCorrectNameColor(true);
                  } else {
                    setCorrectName(resultCheck);
                    setCorrectNameColor(!resultCheck);
                    setLabelName('Name');
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={labelPassword}
                type="password"
                id="password"
                autoComplete="current-password"
                error={correctPasswordColor}
                onInput={() => {
                  const resultCheck = checkValidationField('password');
                  if (typeof resultCheck === 'string') {
                    setLabelPassword(resultCheck);
                    setCorrectPasswordColor(true);
                  } else {
                    setCorrectPassword(resultCheck);
                    setCorrectPasswordColor(!resultCheck);
                    setLabelPassword('Password');
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
                disabled={!correctName || !correctPassword}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
