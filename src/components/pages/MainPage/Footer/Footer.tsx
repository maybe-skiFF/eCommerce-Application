import './Footer.scss';
import { Box, Link, Typography, List, ListItem } from '@mui/material';
import { socialMediaData, contactData } from 'src/constants/DATA_LIST';

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

  function ContactList() {
    return (
      <List className="contact__list">
        {contactData.map((item, index) => (
          <ListItem className="contact__item" key={index}>
            {item.link ? (
              <Link href={item.link}>
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <>
                {item.icon}
                {item.label}
              </>
            )}
          </ListItem>
        ))}
      </List>
    );
  }

  function SocialMediaList() {
    return (
      <List className="social__list">
        {socialMediaData.map((item, index) => (
          <ListItem className="social__item" key={index}>
            <Link target="_blank" href={item.link}>
              {item.icon}
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    );
  }
}
