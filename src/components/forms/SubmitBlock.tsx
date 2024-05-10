import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

import { STYLE_FOR_HELPER } from 'src/constants/STYLE_FOR_HELPER';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';

import { createCustomer } from 'src/serverPart/ApiRoot';
import { testCustomer } from 'src/serverPart/clientData';

export const SubmitBlock = () => {
  const [currentStatusEmail, setCurrentStatusEmail] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [currentStatusPassword, setCurrentStatusPassword] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const HandleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentStatusEmail(checkValidationFieldEmail(event.target.value));
  };

  const HandleOnInputPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setCurrentStatusPassword(checkValidationFieldPassword(event.target.value));
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const HandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') === '') {
      setCurrentStatusEmail(SERVICE_MESSAGES.notEmpty);
    }
    if (data.get('password') === '') {
      setCurrentStatusPassword(SERVICE_MESSAGES.notEmpty);
    }
    console.log({
      name: data.get('email'),
      password: data.get('password'),
    });
  };
  createCustomer(testCustomer).then(console.log).catch(console.error);
  // getProject()
  //   .then(data => {
  //     console.log(data.body.key);
  //   })
  //   .catch(console.error);
  return (
    <Box component="form" noValidate onSubmit={HandleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        error={
          currentStatusEmail === SERVICE_MESSAGES.checkDone ||
          currentStatusEmail === SERVICE_MESSAGES.startCheck
            ? false
            : true
        }
        helperText={currentStatusEmail}
        FormHelperTextProps={{
          sx: STYLE_FOR_HELPER,
        }}
        onInput={HandleOnInputEmail}
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
        error={
          currentStatusPassword === SERVICE_MESSAGES.checkDone ||
          currentStatusPassword === SERVICE_MESSAGES.startCheck
            ? false
            : true
        }
        helperText={currentStatusPassword}
        FormHelperTextProps={{
          sx: STYLE_FOR_HELPER,
        }}
        onInput={HandleOnInputPassword}
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
        disabled={
          currentStatusEmail !== SERVICE_MESSAGES.checkDone ||
          currentStatusPassword !== SERVICE_MESSAGES.checkDone
        }
        sx={{ mt: 3, mb: 2 }}
      >
        {SERVICE_MESSAGES.signIn}
      </Button>
    </Box>
  );
};
