import { ReactNode } from 'react';

import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import { Box } from '@mui/material';
import { PageOfSettings } from './PageOfSettings';

export const CustomerPage = (): ReactNode => {
  return (
    <HeaderWrapper>
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
        <PageOfSettings />
      </Box>
    </HeaderWrapper>
  );
};
