import { Customer, Address, ClientResponse } from '@commercetools/platform-sdk';
import {
  Box,
  Stack,
  TextField,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import { FormEvent } from 'react';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  updateCustomerFirstName,
  updateCustomerLastName,
  updateCustomerDataOfBirth,
  updateCustomerEmail,
  checkCustomer,
  updateCustomerPassword,
} from 'src/serverPart/ApiRoot';
import { ValueOfCustomer } from './interfaces';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { STYLE_FOR_HELPER } from 'src/constants/STYLES';

const getLoopForObject = (
  data: Customer | Address,
  array: [
    string,
    (
      event: FormEvent<HTMLFormElement>,
    ) => Promise<ClientResponse<Customer>> | Promise<void> | void,
  ][],
) => {
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    const neededData = array.filter(item => item[0] === key);
    if (neededData.length) {
      result.push(
        getSettingsItem(
          key as keyof Customer,
          value as ValueOfCustomer,
          neededData[0][1],
        ),
      );
    }
  }
  return result;
};

const uniKeyForStack = Math.random();

export const createSettingsField = (
  data: Customer | undefined,
  numberPage: 1 | 2,
) => {
  if (!data) {
    return;
  }
  return (
    <Box sx={{ width: '100%' }} key={uniKeyForStack}>
      <Stack
        spacing={3}
        padding={'1%'}
        alignItems={'center'}
        key={data.id + Math.random()}
      >
        {numberPage === 1 ? getSettingsList(data) : getSettingsAddress(data)}
      </Stack>
    </Box>
  );
};

const getSettingsList = (data: Customer): JSX.Element[] | undefined => {
  const pagePersonalData: [
    string,
    (
      event: FormEvent<HTMLFormElement>,
    ) => Promise<ClientResponse<Customer>> | Promise<void> | void,
  ][] = [
    [
      'firstName',
      async event => {
        event.preventDefault();
        try {
          const newFirstName = getDataField(event, 'firstName') ?? '';
          const currentCustomer = await checkCustomer(data.id);
          const newCustomer = await updateCustomerFirstName(
            data.id,
            currentCustomer.body.version,
            newFirstName ?? '',
          );

          getSettingsList(newCustomer.body);
        } catch (error) {
          console.error(error);

          throw error;
        }
      },
    ],
    [
      'lastName',
      async event => {
        event.preventDefault();
        try {
          const newLastName = getDataField(event, 'lastName') ?? '';
          const currentCustomer = await checkCustomer(data.id);
          await updateCustomerLastName(
            data.id,
            currentCustomer.body.version,
            newLastName ?? '',
          );
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    ],
    [
      'dateOfBirth',
      async event => {
        event.preventDefault();
        try {
          const newDay = getDataField(event, 'dateOfBirth') ?? '';
          const currentCustomer = await checkCustomer(data.id);
          await updateCustomerDataOfBirth(
            data.id,
            currentCustomer.body.version,
            newDay ?? '',
          );
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    ],
    [
      'email',
      async event => {
        event.preventDefault();
        try {
          const newEmail = getDataField(event, 'email') ?? '';
          const currentCustomer = await checkCustomer(data.id);
          await updateCustomerEmail(
            data.id,
            currentCustomer.body.version,
            newEmail ?? '',
          );
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    ],
    [
      'password',
      async event => {
        event.preventDefault();
        try {
          const currPassword = getDataField(event, `current-password`) ?? '';
          const newPassword = getDataField(event, 'password') ?? '';
          await updateCustomerPassword(data.email, currPassword, newPassword);
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    ],
  ];
  return getLoopForObject(data, pagePersonalData);
};

const getDataField = (
  event: FormEvent<HTMLFormElement>,
  nameField: string,
): FormDataEntryValue | null => {
  const dataField = new FormData(event.currentTarget);
  return dataField.get(nameField);
};

let uniKey = Date.now();
const getSettingsItem = (
  key: keyof Customer,
  value: ValueOfCustomer,
  callback: (
    event: FormEvent<HTMLFormElement>,
  ) => Promise<ClientResponse<Customer>> | Promise<void> | void,
): JSX.Element => {
  uniKey += 0.6;
  if (key !== 'password') {
    return (
      <Box
        component="form"
        sx={{ width: '100%' }}
        key={uniKey}
        onSubmit={event => void callback(event)}
      >
        <TextField
          sx={{
            width: '40%',
            marginLeft: '20%',
            marginRight: '10%',
            marginTop: '1%',
          }}
          name={key}
          type={'text'}
          disabled={false}
          id={key}
          label={key}
          autoComplete={`current-${key}`}
          defaultValue={value}
          FormHelperTextProps={{
            sx: STYLE_FOR_HELPER,
          }}
        />
        <IconButton color="primary" aria-label="edit-mode" type="reset">
          <EditIcon sx={{ margin: '1% 2%' }} />
        </IconButton>
        <IconButton color="primary" aria-label="edit-mode" type="submit">
          <SaveIcon sx={{ margin: '1%' }} />
        </IconButton>
      </Box>
    );
  } else {
    return (
      <Box
        component="form"
        sx={{ width: '100%' }}
        key={uniKey}
        onSubmit={event => void callback(event)}
      >
        <TextField
          sx={{
            width: '40%',
            marginLeft: '20%',
            marginRight: '10%',
            marginTop: '1%',
          }}
          name={`current-${key}`}
          type={'password'}
          id={`current-${key}`}
          label={`current-${key}`}
          autoComplete={`current-${key}`}
          defaultValue={value}
          FormHelperTextProps={{
            sx: STYLE_FOR_HELPER,
          }}
        />
        <TextField
          sx={{
            width: '40%',
            marginLeft: '20%',
            marginRight: '10%',
            marginTop: '1%',
          }}
          name={key}
          type={'text'}
          id={key}
          label={`new-${key}`}
          FormHelperTextProps={{
            sx: STYLE_FOR_HELPER,
          }}
        />
        <IconButton color="primary" aria-label="edit-mode" type="reset">
          <EditIcon sx={{ margin: '1% 2%' }} />
        </IconButton>
        <IconButton color="primary" aria-label="edit-mode" type="submit">
          <SaveIcon sx={{ margin: '1%' }} />
        </IconButton>
      </Box>
    );
  }
};

const getAddressBlock = (label: string, data: Address): JSX.Element => {
  const pageOfAddresses: [
    string,
    (event: FormEvent<HTMLFormElement>) => Promise<ClientResponse<Customer>>,
  ][] = [
    [
      'country',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          1,
          getDataField(event, 'email') ?? '',
        ),
    ],
    [
      'city',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          3,
          getDataField(event, 'email') ?? '',
        ),
    ],
    [
      'streetName',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          4,
          getDataField(event, 'email') ?? '',
        ),
    ],
    [
      'postalCode',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          8,
          getDataField(event, 'email') ?? '',
        ),
    ],
  ];
  return (
    <Box
      sx={{
        width: '100%',
        marginLeft: '20%',
        marginRight: '10%',
        marginTop: '10%',
      }}
    >
      <Divider>
        <Chip label={label} size="small" />
      </Divider>
      {getLoopForObject(data, pageOfAddresses)}
    </Box>
  );
};
const getSettingsAddress = (data: Customer): JSX.Element[] | undefined => {
  const result: JSX.Element[] = [];
  if (data.addresses.length) {
    console.log('co');
    data.addresses.forEach(item => {
      result.push(getAddressBlock(SERVICE_MESSAGES.address, item));
    });
  }
  if (data.defaultBillingAddressId) {
    const biilData = data.addresses.filter(
      address => address.id === data.defaultBillingAddressId,
    );
    console.log('cdef');
    result.push(getAddressBlock(SERVICE_MESSAGES.address, biilData[0]));
  }
  if (data.defaultShippingAddressId) {
    console.log('defShip');
    const biilData = data.addresses.filter(
      address => address.id === data.defaultShippingAddressId,
    );
    result.push(getAddressBlock(SERVICE_MESSAGES.address, biilData[0]));
  }
  if (data.billingAddressIds?.length) {
    console.log('bill');
    data.billingAddressIds.forEach(item => {
      const biilData = data.addresses.filter(address => address.id === item);
      result.push(getAddressBlock(SERVICE_MESSAGES.address, biilData[0]));
    });
  }
  if (data.shippingAddressIds?.length) {
    console.log('sh');
    data.shippingAddressIds.forEach(item => {
      const biilData = data.addresses.filter(address => address.id === item);
      result.push(getAddressBlock(SERVICE_MESSAGES.address, biilData[0]));
    });
  }

  return result;
};
