import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const createListItem = (item: string) => {
  return (
    <MenuItem
      divider={true}
      value={item}
      key={item}
      sx={{ width: 1, fontSize: '45%' }}
    >
      {item.length === 1 ? '0' + item : item}
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
  callback?: (event: SelectChangeEvent) => void,
): JSX.Element => {
  return (
    <div>
      <FormControl sx={styles} size="small">
        <InputLabel id={purpose} sx={{ fontSize: '50%' }}>
          {purpose.toUpperCase()}
        </InputLabel>
        <Select
          name={purpose}
          labelId={purpose}
          id={purpose}
          value={selectValue}
          label={purpose.toUpperCase()}
          sx={{ fontSize: '50%' }}
          key={`${purpose}`}
          onChange={callback}
        >
          {getListItems(items)}
        </Select>
      </FormControl>
    </div>
  );
};

export const getCurrItem = (event: SelectChangeEvent) => {
  return event.target.value;
};
