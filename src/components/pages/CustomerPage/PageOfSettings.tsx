import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { checkCustomer } from 'src/serverPart/ApiRoot';
import { getCookie } from 'src/utils/cookieWork';
import { createSettingsField } from 'src/utils/createFormControl';
import { Customer } from '@commercetools/platform-sdk';
// import { KeyOfCustomer } from 'src/utils/interfaces';
// import { SettingsAddress } from 'src/utils/interfaces';

export const PageOfSettings = () => {
  const [customerDataById, setCustomerDataById] = useState<
    Customer | undefined
  >();
  const pagePersonalData: [keyof Customer] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'password',
  ];

  const pageOfAddresses: [keyof Customer] = [
    'addresses',
    'billingAddressIds',
    'shippingAddressIds',
  ];
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
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      {createSettingsField(customerDataById, pageOfAddresses)}
    </Box>
  );
};
