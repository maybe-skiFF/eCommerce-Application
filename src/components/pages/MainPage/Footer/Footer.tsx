import './Footer.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Link, Typography, List, ListItem } from '@mui/material';

export default function Footer() {
  return (
    <Box component='footer' className="footer container">
      <Box className="info">
        <List className="contact__list">
          <ListItem className="contact__item">
            <Link href="tel:+375291234567"><PhoneIcon />phone number: +375 29 123-45-67</Link>
          </ListItem>
          <ListItem className="contact__item">
            <Link href="mailto:example@gmail.com"><EmailIcon />email: example@gmail.com</Link>
          </ListItem>
          <ListItem className="contact__item">
            <Link href=""><BusinessIcon />address: Minsk, Station Square, 3</Link>
          </ListItem>
        </List>
        <List className="social__list">
          <ListItem className="social__item">
            <Link target='blank' href="https://www.facebook.com/"><FacebookIcon />facebook</Link>
          </ListItem>
          <ListItem className="social__item">
            <Link target='blank' href="https://www.instagram.com/"><InstagramIcon />instagram</Link>
          </ListItem>
          <ListItem className="social__item">
            <Link target='blank' href="https://www.youtube.com/"><YouTubeIcon />youtube</Link>
          </ListItem>
        </List>
      </Box >
      <Box className="copyright">
        <Typography
          variant="body1">
          <Link target='blank' href="https://rs.school/">RSSchool</Link>
        </Typography>
        <Typography
          variant="body1">2024</Typography>
      </Box>
    </Box >
  );
};