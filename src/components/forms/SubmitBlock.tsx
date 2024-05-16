import { ReactNode, ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button } from '@mui/material';

import { checkCustomer } from 'src/serverPart/ApiRoot';
import { getTextForm, getInputProps } from 'src/utils/createFormControl';
// import { STYLE_FOR_HELPER } from 'src/constants/STYLES';
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

  const handleOnInputEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentStatusEmail(checkValidationFieldEmail(event.target.value));
  };

  const handleOnInputPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setCurrentStatusPassword(checkValidationFieldPassword(event.target.value));
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleSubmit = async (
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
      onSubmit={event => void handleSubmit(event)}
    >
      {getTextForm('email', currentStatusEmail, handleOnInputEmail, true)}
      {getTextForm(
        'password',
        currentStatusPassword,
        handleOnInputPassword,
        showPassword,
        getInputProps(handleClickShowPassword, showPassword),
      )}
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
