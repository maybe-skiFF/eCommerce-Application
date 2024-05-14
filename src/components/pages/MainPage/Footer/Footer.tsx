import './Footer.scss';
import { Box, Link, Typography, List, ListItem } from '@mui/material';
import { ContactList } from 'src/components/contactList/ContactList';
import { SocialMediaList } from 'src/components/socialMediaList/SocialMediaList';

export function Footer() {
  return (
    <Box component="footer" className="footer container">
      <Box className="info">
        <ContactList />
        <SocialMediaList />
      </Box>
      <Box className="copyright">
        <Typography variant="body1">
          <Link target="blank" href="https://rs.school/">
            RSSchool
          </Link>
        </Typography>
        <Typography variant="body1">2024</Typography>
      </Box>
    </Box>
  );
}
