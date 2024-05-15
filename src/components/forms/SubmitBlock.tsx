import { ReactNode, ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
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

import { checkCustomer } from 'src/serverPart/ApiRoot';

import { STYLE_FOR_HELPER } from 'src/constants/STYLES';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';

export const SubmitBlock = (): ReactNode => {
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

  const HandleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') === '') {
      setCurrentStatusEmail(SERVICE_MESSAGES.notEmpty);
    }
    if (data.get('password') === '') {
      setCurrentStatusPassword(SERVICE_MESSAGES.notEmpty);
    }
    await checkCustomer(currentStatusEmail)
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={event => void HandleSubmit(event)}
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
