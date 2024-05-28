import { CategoryChoice } from 'src/components/categoryChoice/CategoryChoice';
import { Box } from '@mui/material';

export function Main() {
  return (
    <Box
      component="main"
      sx={{
        padding: '16px',
        width: '100%',
        maxWidth: '1280px',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      <CategoryChoice />
    </Box>
  );
}
