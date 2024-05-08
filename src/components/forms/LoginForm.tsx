import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
import { SubmitBlock } from './SubmitBlock';

export const LoginForm = () => {
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {SERVICE_MESSAGES.signIn}
      </Typography>
      <SubmitBlock />
    </Box>
  );
};
