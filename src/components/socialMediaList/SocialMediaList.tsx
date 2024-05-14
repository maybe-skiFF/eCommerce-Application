import { Link, List, ListItem } from '@mui/material';
import { socialMediaData } from 'src/constants/DATA_LIST';

export function SocialMediaList() {
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