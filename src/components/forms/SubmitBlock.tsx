import { ReactNode, ChangeEvent, FormEvent, useState } from 'react';
import { Box } from '@mui/material';

import {
  getProject,
  // getToken,
  checkCustomer,
  // getPasswordFlow,
} from 'src/serverPart/ApiRoot';
import { getTextForm, getInputProps } from 'src/utils/createFormControl';
import { SubmitButton } from './SubmitButton';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';
import { useNavigate } from 'react-router-dom';
// import {
// CustomerServerData,
// CustomerPagedQueryResponse,
// } from 'src/utils/interfaces';

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

  const navigate = useNavigate();
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
    await getProject().then(() => {
      checkCustomer(data.get('email') as string)
        .then(({ body }) => {
          if (body.results.length === 0) {
            console.log('No acc');
          } else {
            navigate('/');
            console.log(body.results[0]);
          }
        })
        .catch(error => console.log(error));
    });
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
      {SubmitButton(
        [currentStatusEmail, currentStatusPassword],
        SERVICE_MESSAGES.signIn,
      )}
    </Box>
  );
};
