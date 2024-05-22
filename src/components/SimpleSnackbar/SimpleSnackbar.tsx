import { SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function SimpleSnackbar(
  message: string,
  open: boolean,
  callback: (event: SyntheticEvent | Event, reason?: string) => void,
) {
  const action = (
    <>
      <Button color="secondary" size="small" onClick={callback}>
        {message}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={callback}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      style={{ marginLeft: '14%', marginBottom: '15%' }}
      open={open}
      autoHideDuration={5000}
      onClose={callback}
      message={message}
      action={action}
    />
  );
}
