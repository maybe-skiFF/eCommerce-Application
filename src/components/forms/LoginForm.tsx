import { useState, FormEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

// import {
//   checkValidationFieldEmail,
//   checkValidationFieldPassword,
// } from 'src/utils/checkValidationField';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { InputEmail, InputPassword } from './Input_Email_Password';
export const LoginForm = () => {
  const [correctEmail, setCorrectEmail] = useState<string>(
    SERVICE_MESSAGES.checkDone,
  );
  const [correctPassword, setCorrectPassword] = useState<string>(
    SERVICE_MESSAGES.checkDone,
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') === '') {
      setCorrectEmail(SERVICE_MESSAGES.notEmpty);
    }
    if (data.get('password') === '') {
      setCorrectPassword(SERVICE_MESSAGES.notEmpty);
    }
    console.log({
      name: data.get('email'),
      password: data.get('password'),
    });
  };
  //   const handleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): string => {
  //     setCorrectEmail(checkValidationFieldEmail(event.target.value));
  //     return checkValidationFieldEmail(event.target.value);
  //   };
  //   const handleOnInputPassword = (
  //     event: ChangeEvent<HTMLInputElement>,
  //   ): string => {
  //     setCorrectPassword(checkValidationFieldPassword(event.target.value));
  //     return checkValidationFieldPassword(event.target.value);
  //   };
  return (
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
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <InputEmail />
        <InputPassword />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label={SERVICE_MESSAGES.rememberMe}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={
            correctEmail !== SERVICE_MESSAGES.checkDone &&
            correctPassword !== SERVICE_MESSAGES.checkDone
          }
          sx={{ mt: 3, mb: 2 }}
        >
          {SERVICE_MESSAGES.signIn}
        </Button>
      </Box>
    </Box>
  );
};
