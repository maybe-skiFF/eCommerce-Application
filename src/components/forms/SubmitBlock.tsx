import {
  ReactNode,
  ChangeEvent,
  FormEvent,
  useState,
  SyntheticEvent,
} from 'react';
import { Box } from '@mui/material';

import { getMyCustomer, getApiWithCredentials } from 'src/serverPart/ApiRoot';
import { getTextForm, getInputProps } from 'src/utils/createFormControl';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  checkValidationFieldEmail,
  checkValidationFieldPassword,
} from 'src/utils/checkValidationField';
import { setCookie } from 'src/utils/cookieWork';
import { useNavigate } from 'react-router-dom';
import { SimpleSnackbar } from '../SimpleSnackbar/SimpleSnackbar';
import {
  ClientResponse,
  Customer,
  ErrorObject,
} from '@commercetools/platform-sdk';

export const SubmitBlock = (): ReactNode => {
  const [currentStatusEmail, setCurrentStatusEmail] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [currentStatusPassword, setCurrentStatusPassword] = useState<string>(
    SERVICE_MESSAGES.startCheck,
  );
  const [serverMessage, setServerMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return event;
    }
    setOpen(false);
  };

  const handleOnInputEmailPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.name === 'email') {
      setCurrentStatusEmail(checkValidationFieldEmail(event.target.value));
    }
    if (event.target.name === 'password') {
      setCurrentStatusPassword(
        checkValidationFieldPassword(event.target.value),
      );
    }
  };

  const navigate = useNavigate();

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
    const myApi = getApiWithCredentials(
      data.get('email') as string,
      data.get('password') as string,
    );

    await getMyCustomer(
      myApi,
      data.get('email') as string,
      data.get('password') as string,
    )
      .then(({ body, statusCode }: ClientResponse<Customer>) => {
        if (statusCode !== 200) {
          setOpen(true);
          setServerMessage(SERVICE_MESSAGES.errorMail);
        } else {
          navigate('/');
          localStorage.setItem('isAuth', 'true');
          setCookie('myID', body.customer.id);
          console.log(body.customer.id);
        }
      })
      .catch((error: ErrorObject) => {
        setServerMessage(error.message);
        setOpen(true);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={event => void handleSubmit(event)}
    >
      {SimpleSnackbar(serverMessage, open, handleClose)}
      {getTextForm(
        'email',
        currentStatusEmail,
        handleOnInputEmailPassword,
        true,
      )}
      {getTextForm(
        'password',
        currentStatusPassword,
        handleOnInputEmailPassword,
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
