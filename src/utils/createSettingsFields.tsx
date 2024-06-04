import { Customer, Address, ClientResponse } from '@commercetools/platform-sdk';
import {
  Box,
  Stack,
  TextField,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import { FormEvent, SyntheticEvent, ChangeEvent } from 'react';
import { SimpleSnackbar } from 'src/components/SimpleSnackbar/SimpleSnackbar';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import {
  updateCustomerFirstName,
  updateCustomerLastName,
  updateCustomerDataOfBirth,
  updateCustomerEmail,
} from 'src/serverPart/ApiRoot';
import { getTextForm } from './createFormControl';
import { ValueOfCustomer } from './interfaces';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const getLoopForObject = (
  data: Customer | Address,
  array: [
    string,
    (
      event: FormEvent<HTMLFormElement>,
    ) => Promise<ClientResponse<Customer>> | Promise<void> | void,
  ][],
) => {
  console.log(data, 'data');
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
  console.log(uniKeyForStack, 'un');
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
const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return event;
  }
};
export const getSettingsList = (data: Customer): JSX.Element[] | undefined => {
  const pagePersonalData: [
    string,
    (
      event: FormEvent<HTMLFormElement>,
    ) => Promise<ClientResponse<Customer>> | Promise<void> | void,
  ][] = [
    [
      'firstName',
      async event =>
        await updateCustomerFirstName(
          data.id,
          data.version,
          (getDataField(event, 'firstName') as string) ?? '',
        )
          .then(() => {
            SimpleSnackbar('The update was successful', true, handleClose);
          })
          .catch((error: Error) => {
            console.log('no');
            SimpleSnackbar(error.message, true, handleClose);
          }),
    ],
    [
      'lastName',
      event =>
        updateCustomerLastName(
          data.id,
          data.version,
          (getDataField(event, 'lastName') as string) ?? '',
        ),
    ],
    [
      'dateOfBirth',
      event =>
        updateCustomerDataOfBirth(
          data.id,
          data.version,
          (getDataField(event, 'dateOfBirth') as string) ?? '',
        ),
    ],
    [
      'email',
      event => {
        const res = updateCustomerEmail(
          data.id,
          data.version,
          (getDataField(event, 'email') as string) ?? '',
        );
        console.log(res, 'res');
        return res;
      },
    ],
    [
      'password',
      event =>
        updateCustomerEmail(
          data.id,
          data.version,
          (getDataField(event, 'password') as string) ?? '',
        ),
    ],
  ];
  return getLoopForObject(data, pagePersonalData);
};

const getDataField = (
  event: FormEvent<HTMLFormElement>,
  nameField: string,
): FormDataEntryValue | null => {
  event.preventDefault();
  const dataField = new FormData(event.currentTarget);
  console.log('yes');
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
  let mode = false;
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
        type={key === 'password' ? 'password' : 'text'}
        disabled={mode}
        id={key}
        label={key}
        defaultValue={value}
      />
      <IconButton
        color="primary"
        aria-label="edit-mode"
        type="reset"
        onClick={event => {
          event.preventDefault();
          console.log('change', mode, 'mode');
          mode = true;
          getTextForm(
            'firstName',
            key,
            (event: ChangeEvent<HTMLInputElement>) => {
              console.log('firstName', event.target.value);
            },
            true,
          );
        }}
      >
        <EditIcon sx={{ margin: '1% 2%' }} />
      </IconButton>
      <IconButton color="primary" aria-label="edit-mode" type="submit">
        <SaveIcon sx={{ margin: '1%' }} />
      </IconButton>
    </Box>
  );
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
          (getDataField(event, 'email') as string) ?? '',
        ),
    ],
    [
      'city',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          3,
          (getDataField(event, 'email') as string) ?? '',
        ),
    ],
    [
      'streetName',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          4,
          (getDataField(event, 'email') as string) ?? '',
        ),
    ],
    [
      'postalCode',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          8,
          (getDataField(event, 'email') as string) ?? '',
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
