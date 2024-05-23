import { Button } from '@mui/material';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export const SubmitButton = (
  statuses: string[],
  text: string,
  callback?: () => void,
) => {
  return (
    <Button
      type="submit"
      size="large"
      variant="contained"
      disabled={statuses.some(status => status !== SERVICE_MESSAGES.checkDone)}
      sx={{ mt: 3, mb: 2 }}
      onMouseLeave={callback}
    >
      {text}
    </Button>
  );
};
