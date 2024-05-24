import { Box, Link, Typography } from '@mui/material';
import { ContactList } from 'src/components/contactList/ContactList';
import { SocialMediaList } from 'src/components/socialMediaList/SocialMediaList';
import { SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';

export function Footer() {
  return (
    <Box component="footer"
      sx={{
        width: '100 %',
        maxWidth: '1280px',
        boxSizing: 'border - box',
        margin: '0 auto',
        padding: '0 16px',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <ContactList />
        <SocialMediaList />
      </Box>
      <Box
        sx={{
          display: ' flex',
          justifyContent: 'space-between',
          height: '80px',
          alignItems: 'center',
          padding: '8px 16px',
        }}>
        <Typography variant="body1">
          <Link
            sx={{
              textDecoration: 'none',
              color: '#000000',
            }}
            target="blank"
            href="https://rs.school/">
            {SERVICE_MESSAGES.school}
          </Link>
        </Typography>
        <Typography variant="body1">{SERVICE_MESSAGES.year}</Typography>
      </Box>
    </Box >
  );
}
