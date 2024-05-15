import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const getListItems = (arr: string[]): JSX.Element[] => {
  return arr.map((item, index) => {
    return (
      <MenuItem
        divider={true}
        value={index}
        key={`${item}`}
        sx={{ width: 1, fontSize: '45%' }}
      >
        {item.length === 1 ? '0' + item : item}
      </MenuItem>
    );
  });
};
export const getFormControl = (purpose: string, arr: string[]): JSX.Element => {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
        <InputLabel id={purpose} sx={{ fontSize: '50%' }}>
          {`SERVICE_MESSAGES.${purpose}`}
        </InputLabel>
        <Select
          name={purpose}
          labelId={purpose}
          id={purpose}
          value={purpose}
          label={purpose}
          sx={{ fontSize: '50%' }}
        >
          {getListItems(arr)}
        </Select>
      </FormControl>
    </div>
  );
};
