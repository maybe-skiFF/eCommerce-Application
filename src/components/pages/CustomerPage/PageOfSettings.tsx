import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { checkCustomer } from 'src/serverPart/ApiRoot';
import { getCookie } from 'src/utils/cookieWork';
import { createSettingsField } from 'src/utils/createFormControl';
// import { SettingsPersonalData } from 'src/utils/interfaces';
import { Customer } from '@commercetools/platform-sdk';
// import { SettingsPersonalData } from 'src/utils/interfaces';

export const PageOfSettings = (numberPage: number) => {
  const [customerDataById, setCustomerDataById] = useState<
    Customer | undefined
  >();
  const pagePersonalData: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'password',
  ];

  const pageOfAddresses: SettingsAddress = {
    addresses: [
      { id: '', country: '', city: '', postalCode: '', streetName: '' },
    ],
    billingAddress: [''],
    shippingAddress: [''],
  };

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
      {createSettingsField(
        customerDataById,
        numberPage === 1 ? pagePersonalData : pageOfAddresses,
      )}
    </Box>
  );
};
