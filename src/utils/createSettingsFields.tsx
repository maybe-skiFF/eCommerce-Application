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
  deleteAddress,
  createAddress,
} from 'src/serverPart/ApiRoot';
import { ValueOfCustomer } from './interfaces';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { STYLE_FOR_HELPER } from 'src/constants/STYLES';
import { getCookie } from './cookieWork';
import { AddressBlock } from 'src/components/forms/AddressBlock';
import { getAddressesArray } from './getAddressesArray';

const getLoopForObject = (
  data: Customer | Address,
  array: [
    string,
    (
      event: FormEvent<HTMLFormElement>,
    ) => Promise<ClientResponse<Customer>> | Promise<void> | void,
  ][],
  id?: string,
  version?: number,
) => {
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    const neededData = array.filter(item => item[0] === key);
    if (neededData.length) {
      if (!id && !version) {
        result.push(
          getSettingsItem(
            key as keyof Customer,
            value as ValueOfCustomer,
            neededData[0][1],
          ),
        );
      } else {
        result.push(
          <Box>
            {getAddressItem(key as keyof Customer, value as ValueOfCustomer)}
          </Box>,
        );
      }
    }
  }
  return result;
};
const getAddressItem = (
  key: keyof Customer,
  value: ValueOfCustomer,
): JSX.Element => {
  uniKey += 0.6;
  return (
    <Box sx={{ width: '100%' }} key={uniKey}>
      <TextField
        sx={{
          width: '80%',
          marginLeft: '20%',
          marginRight: '10%',
          marginTop: '1%',
        }}
        name={key}
        type={'text'}
        disabled={false}
        id={key}
        label={key}
        defaultValue={value}
      />
    </Box>
  );
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
        <IconButton color="primary" aria-label="save-mode" type="submit">
          <SaveIcon sx={{ margin: '1%' }} />
        </IconButton>
      </Box>
    );
  }
};

const getAddressBlock = (
  label: string,
  data: Address,
  id: string,
  version: number,
): JSX.Element => {
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
      key={uniKey}
      sx={{
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
      }}
    >
      <Divider>
        <Chip label={label} size="small" />
      </Divider>
      <Box sx={{ display: 'flex', marginTop: '3%' }}>
        {getLoopForObject(data, pageOfAddresses, id, version)}
        <IconButton
          color="primary"
          aria-label="edit-mode"
          type="button"
          onClick={() => void handleDeleteAddress(version, id)}
        >
          <DeleteIcon sx={{ margin: '1% 2%' }} />
        </IconButton>
        <IconButton color="primary" aria-label="edit-mode" type="submit">
          <SaveIcon sx={{ margin: '1%' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const getSettingsAddress = (
  data: Customer,
): JSX.Element[] | JSX.Element | undefined => {
  const result: JSX.Element[] = [];
  console.log(data);
  if (!data.addresses.length) {
    return (
      <Box
        key={uniKey}
        sx={{
          width: '80%',
          marginLeft: '10%',
          marginRight: '10%',
          marginTop: '10%',
        }}
      >
        <Divider>
          <Chip label="There is not any address" size="small" />
        </Divider>
      </Box>
    );
  }
  if (data.addresses.length) {
    data.addresses.forEach(item => {
      result.push(
        getAddressBlock(
          SERVICE_MESSAGES.address,
          item,
          item.id ?? '',
          data.version,
        ),
      );
    });
  }
  if (data.defaultBillingAddressId) {
    const biilData = data.addresses.filter(
      address => address.id === data.defaultBillingAddressId,
    );
    result.push(
      getAddressBlock(
        SERVICE_MESSAGES.address,
        biilData[0],
        biilData[0].id ?? '',
        data.version,
      ),
    );
  }
  if (data.defaultShippingAddressId) {
    const biilData = data.addresses.filter(
      address => address.id === data.defaultShippingAddressId,
    );
    result.push(
      getAddressBlock(
        SERVICE_MESSAGES.address,
        biilData[0],
        biilData[0].id ?? '',
        data.version,
      ),
    );
  }
  if (data.billingAddressIds?.length) {
    data.billingAddressIds.forEach(item => {
      const biilData = data.addresses.filter(address => address.id === item);
      result.push(
        getAddressBlock(
          SERVICE_MESSAGES.address,
          biilData[0],
          biilData[0].id ?? '',
          data.version,
        ),
      );
    });
  }
  if (data.shippingAddressIds?.length) {
    data.shippingAddressIds.forEach(item => {
      const biilData = data.addresses.filter(address => address.id === item);
      result.push(
        getAddressBlock(
          SERVICE_MESSAGES.address,
          biilData[0],
          biilData[0].id ?? '',
          data.version,
        ),
      );
    });
  }

  return (
    <Box
      component="form"
      sx={{ margin: '0 auto' }}
      onSubmit={(event: FormEvent<HTMLFormElement>) =>
        void handleSubmitAddress(event, data)
      }
    >
      {result}
      <Box sx={{ display: 'flex', width: '100%' }}>
        <AddressBlock text={SERVICE_MESSAGES.address} value={'default'} />
        <IconButton type="submit">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const createNewAddress = (event: FormEvent<HTMLFormElement>): Address[] => {
  const data = new FormData(event.currentTarget);
  const kindOfAddresses = ['default'];
  const newAddress: Address[] = [];
  getAddressesArray(kindOfAddresses, newAddress, data);
  return newAddress;
};

const handleSubmitAddress = async (
  event: FormEvent<HTMLFormElement>,
  data: Customer,
) => {
  event.preventDefault();
  await createAddress(
    getCookie('myID') ?? '',
    data.version,
    createNewAddress(event)[0],
  );
  location.reload();
};

const handleDeleteAddress = async (version: number, id: string) => {
  await deleteAddress(getCookie('myID') ?? '', version, id);
  location.reload();
};
