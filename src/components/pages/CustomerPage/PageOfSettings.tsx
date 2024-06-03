import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { checkCustomer } from 'src/serverPart/ApiRoot';
import { getCookie } from 'src/utils/cookieWork';
import { createSettingsField } from 'src/utils/createFormControl';
import { Customer } from '@commercetools/platform-sdk';
import SettingsTabs from './Tabs';

export const PageOfSettings = () => {
  const [customerDataById, setCustomerDataById] = useState<
    Customer | undefined
  >();
  const [numberPage, setNumberPage] = useState<boolean>(true);

  const handleClickShowSettings = () => setNumberPage(show => !show);

  const customerID = getCookie('myID');
  useEffect(() => {
    async function customerByIdData(): Promise<Customer> {
      try {
        const response = await checkCustomer(customerID ?? '');
        const data = response.body;
        setCustomerDataById(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    void customerByIdData();
  }, [customerID]);

  return (
    <div>
      <div onClick={handleClickShowSettings}>
        <SettingsTabs />
      </div>
      <div>
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }} key={Date.now()}>
          {createSettingsField(customerDataById, numberPage ? 1 : 2)}
        </Box>
      </div>
    </div>
  );
};
