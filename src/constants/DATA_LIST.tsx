import { ReactNode } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';

interface SocialMediaItem {
  icon: ReactNode;
  name: string;
  link: string;
}

export const socialMediaData: SocialMediaItem[] = [
  {
    icon: <FacebookIcon />,
    name: 'facebook',
    link: 'https:/www.facebook.com/',
  },
  {
    icon: <InstagramIcon />,
    name: 'instagram',
    link: 'https:/www.instagram.com/',
  },
  { icon: <YouTubeIcon />, name: 'youtube', link: 'https:/www.youtube.com/' },
];

interface ContactItem {
  icon: ReactNode;
  label: string;
  link: string;
}

export const contactData: ContactItem[] = [
  {
    icon: <PhoneIcon />,
    label: 'phone number: +375 29 123-45-67',
    link: 'tel:+375291234567',
  },
  {
    icon: <EmailIcon />,
    label: 'email: example@gmail.com',
    link: 'mailto:example@gmail.com',
  },
  {
    icon: <BusinessIcon />,
    label: 'address: Minsk, Station Square, 3',
    link: '',
  },
];
