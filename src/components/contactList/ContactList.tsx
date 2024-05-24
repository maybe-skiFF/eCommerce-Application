import { Link, List, ListItem, Box } from '@mui/material';
import { contactData } from 'src/constants/DATA_LIST';

export function ContactList() {
  return (
    <List>
      {contactData.map((item, index) => (
        <ListItem
          key={index}>
          {item.link ? (
            <Link
              sx={{
                textDecoration: 'none',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
              }}
              href={item.link}>
              <Box
                sx={{ marginRight: '5px' }}
              >
                {item.icon}
              </Box>
              {item.label}
            </Link>
          ) : (
            <>
              <Box
                sx={{ marginRight: '5px' }}
              >
                {item.icon}
              </Box>
              {item.label}
            </>
          )}
        </ListItem>
      ))
      }
    </List >
  );
}
