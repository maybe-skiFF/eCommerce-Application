import { ChangeEvent, MouseEvent, useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

import { STYLE_FOR_HELPER } from 'src/constants/STYLE_FOR_HELPER';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';
const handleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): void => {
  checkValidationFieldEmail(event.target.value);
};
const handleOnInputPassword = (event: ChangeEvent<HTMLInputElement>): void => {
  checkValidationFieldPassword(event.target.value);
};

const InputEmail = (correctEmail: string) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email"
      name="email"
      autoComplete="email"
      autoFocus
      error={correctEmail === SERVICE_MESSAGES.checkDone ? false : true}
      helperText={correctEmail}
      FormHelperTextProps={{
        sx: STYLE_FOR_HELPER,
      }}
      onInput={handleOnInputEmail}
    />
  );
};

const InputPassword = (correctPassword: string) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      id="password"
      autoComplete="current-password"
      error={correctPassword === SERVICE_MESSAGES.checkDone ? false : true}
      helperText={correctPassword}
      FormHelperTextProps={{
        sx: STYLE_FOR_HELPER,
      }}
      onInput={handleOnInputPassword}
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
  );
};

const SubmitButton = (disabled: boolean) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={disabled}
      sx={{ mt: 3, mb: 2 }}
    >
      {SERVICE_MESSAGES.signIn}
    </Button>
  );
};
export { InputEmail, InputPassword, SubmitButton };
