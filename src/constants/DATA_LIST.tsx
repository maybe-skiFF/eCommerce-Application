import { ReactNode } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';

interface SocialMediaItem {
  id: string;
  icon: ReactNode;
  name: string;
  link: string;
}

export const socialMediaData: SocialMediaItem[] = [
  {
    id: '1',
    icon: <FacebookIcon />,
    name: 'facebook',
    link: 'https:/www.facebook.com/',
  },
  {
    id: '2',
    icon: <InstagramIcon />,
    name: 'instagram',
    link: 'https:/www.instagram.com/',
  },
  {
    id: '3',
    icon: <YouTubeIcon />,
    name: 'youtube',
    link: 'https:/www.youtube.com/',
  },
];

interface ContactItem {
  id: string;
  icon: ReactNode;
  label: string;
  link: string;
}

export const contactData: ContactItem[] = [
  {
    id: '1',
    icon: <PhoneIcon />,
    label: 'phone number: +375 29 123-45-67',
    link: 'tel:+375291234567',
  },
  {
    id: '2',
    icon: <EmailIcon />,
    label: 'email: example@gmail.com',
    link: 'mailto:example@gmail.com',
  },
  {
    id: '3',
    icon: <BusinessIcon />,
    label: 'address: Minsk, Station Square, 3',
    link: '',
  },
];
