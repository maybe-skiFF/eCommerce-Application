import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { ChangeEvent, FormEvent } from 'react';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { STYLE_FOR_HELPER } from 'src/constants/STYLES';
import { ValueOfCustomer } from './interfaces';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import {
  updateCustomerEmail,
  updateCustomerFirstName,
  updateCustomerLastName,
  updateCustomerDataOfBirth,
} from 'src/serverPart/ApiRoot';

const createListItem = (item: string) => {
  const sameValue = item.split(' ');
  return (
    <MenuItem
      divider={true}
      value={sameValue.length === 1 ? sameValue[0] : sameValue[1]}
      key={item}
      sx={{
        width: 1,
        fontSize: '45%',
        '@media screen and (max-width:520px)': {
          width: '100%',
        },
      }}
    >
      {sameValue[0].length === 1 ? '0' + sameValue[0] : sameValue[0]}
    </MenuItem>
  );
};

const getListItems = (
  items: string[] | string,
): JSX.Element[] | JSX.Element => {
  return Array.isArray(items)
    ? items.map(item => createListItem(item))
    : createListItem(items);
};

export const getFormControl = (
  purpose: string,
  selectValue: string,
  items: string[] | string,
  styles: object,
  kind: string,
  callback?: (event: SelectChangeEvent) => void,
): JSX.Element => {
  return (
    <div style={{ maxWidth: '600px', minWidth: '100px', marginLeft: '1%' }}>
      <FormControl
        fullWidth
        sx={{
          styles,
        }}
        size="small"
        error={selectValue === ''}
      >
        <InputLabel
          id={purpose}
          sx={{
            fontSize: '50%',
          }}
        >
          {purpose.toUpperCase()}
        </InputLabel>
        <Select
          name={purpose + ' ' + kind}
          labelId={purpose}
          id={purpose}
          value={selectValue}
          label={purpose.toUpperCase()}
          sx={{
            fontSize: '50%',
            marginTop: '3%',
            '@media screen and (max-width:520px)': {
              width: '100%',
              padding: '0',
            },
          }}
          key={`${purpose}`}
          onChange={callback}
        >
          {getListItems(items)}
        </Select>
      </FormControl>
    </div>
  );
};

export const getInputProps = (
  showCallback: () => void,
  showPassword: boolean,
) => {
  return {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={showCallback}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  };
};

export const getTextForm = (
  purpose: string,
  state: string,
  callback: (event: ChangeEvent<HTMLInputElement>) => void,
  showPassword?: boolean,
  inputProps?: object,
): JSX.Element => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={purpose}
      label={purpose}
      type={showPassword ? 'text' : 'password'}
      id={purpose}
      autoComplete={`current-${purpose}`}
      error={
        Object.values(SERVICE_MESSAGES).some(value => value === state) &&
        state !== SERVICE_MESSAGES.startCheck &&
        state !== SERVICE_MESSAGES.checkDone
      }
      helperText={state}
      sx={{ width: 'calc(90% - 15px)' }}
      FormHelperTextProps={{
        sx: STYLE_FOR_HELPER,
      }}
      onInput={callback}
      InputProps={inputProps}
    />
  );
};

const getLoopForObject = (
  data: Customer | Address,
  array: [
    string,
    (event: FormEvent<HTMLFormElement>) => Promise<ClientResponse<Customer>>,
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
let uniKeyForStack = 'b';
export const createSettingsField = (
  data: Customer | undefined,
  numberPage: 1 | 2,
) => {
  uniKeyForStack += 'c';
  console.log(uniKeyForStack, 'un');
  if (!data) {
    return;
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        spacing={3}
        padding={'1%'}
        alignItems={'center'}
        key={uniKeyForStack}
      >
        {numberPage === 1 ? getSettingsList(data) : getSettingsAddress(data)}
      </Stack>
    </Box>
  );
};

export const getSettingsList = (data: Customer): JSX.Element[] | undefined => {
  const pagePersonalData: [
    string,
    (event: FormEvent<HTMLFormElement>) => Promise<ClientResponse<Customer>>,
  ][] = [
    [
      'firstName',
      event => {
        const res = updateCustomerFirstName(
          data.id,
          data.version,
          (getDataField(event, 'firstName') as string) ?? '',
        );
        console.log(res, 'firstName');
        return res;
      },
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
          data.email,
          data.version,
          (getDataField(event, 'email') as string) ?? '',
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
  const data = new FormData(event.currentTarget);
  return data.get(nameField);
};

let uniKey = Date.now();

const getSettingsItem = (
  key: keyof Customer | keyof Address,
  value: ValueOfCustomer,
  callback: (
    event: FormEvent<HTMLFormElement>,
  ) => Promise<ClientResponse<Customer>>,
): JSX.Element => {
  uniKey += 0.6;
  const mode = false;
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
          1,
          (getDataField(event, 'email') as string) ?? '',
        ),
    ],
    [
      'streetName',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          1,
          (getDataField(event, 'email') as string) ?? '',
        ),
    ],
    [
      'postalCode',
      event =>
        updateCustomerEmail(
          data.city ?? '',
          1,
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
