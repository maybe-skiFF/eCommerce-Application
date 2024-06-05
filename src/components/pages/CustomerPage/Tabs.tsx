import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, SyntheticEvent } from 'react';

export default function SettingsTabs() {
  const [value, setValue] = useState('data');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="settings"
        centered
      >
        <Tab value="data" label="Your data" />
        <Tab value="address" label="Your addresses" />
      </Tabs>
    </Box>
  );
}
