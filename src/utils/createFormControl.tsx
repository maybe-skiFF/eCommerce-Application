import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
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
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { ChangeEvent } from 'react';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { STYLE_FOR_HELPER } from 'src/constants/STYLES';
import {
  ValueOfCustomer,
  // AnswerAddress,
  // CustomerServerData,
  // CustomerAddress,
} from './interfaces';

import { Address, Customer } from '@commercetools/platform-sdk';

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

const getLoopForObject = (data: Customer | Address, array: string[]) => {
  console.log(data, 'data');
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    console.log(Object.entries(data));
    if (array.includes(key)) {
      if (Object.prototype.hasOwnProperty.call(data, 'country')) {
        result.push(
          getSettingsItem(key as keyof Address, value as ValueOfCustomer),
        );
      }
      result.push(
        getSettingsItem(key as keyof Customer, value as ValueOfCustomer),
      );
    }
  }
  return result;
};

export const createSettingsField = (data: Customer | undefined) => {
  if (!data) {
    return;
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={3} padding={'1%'} alignItems={'center'}>
        {getSettingsAddress(data)}
      </Stack>
    </Box>
  );
};

export const getSettingsList = (data: Customer): JSX.Element[] | undefined => {
  const pagePersonalData: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'password',
  ];
  return getLoopForObject(data, pagePersonalData);
};

const getSettingsItem = (
  key: keyof Customer | keyof Address,
  value: ValueOfCustomer,
): JSX.Element => {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        sx={{ width: '40%', marginLeft: '20%', marginRight: '10%' }}
        disabled
        id={key}
        label={key}
        defaultValue={value}
      />
      <EditIcon sx={{ margin: '1% 2%' }} />
      <SaveIcon sx={{ margin: '1%' }} />
    </Box>
  );
};

const getAddressBlock = (label: string, data: Address) => {
  const pageOfAddresses: string[] = [
    'country',
    'city',
    'streetName',
    'postalCode',
  ];
  return (
    <Box>
      <TextField
        sx={{ width: '40%', marginLeft: '20%', marginRight: '10%' }}
        disabled
        id={label}
        label={label}
      />
      {getLoopForObject(data, pageOfAddresses)}
    </Box>
  );
};
export const getSettingsAddress = (data: Customer): JSX.Element | undefined => {
  if (data.addresses.length === 1) {
    getAddressBlock(SERVICE_MESSAGES.address, data.addresses[0]);
  }
  return getAddressBlock(SERVICE_MESSAGES.address, data.addresses[1]);
  // const currentObject = addressesArray.filter(
  //   address => address.id === addressID,
  // );
};
