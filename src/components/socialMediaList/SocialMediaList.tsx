import { Link, List, ListItem, Box } from '@mui/material';
import { socialMediaData } from 'src/constants/DATA_LIST';

export function SocialMediaList() {
  return (
    <List className="social__list">
      {socialMediaData.map((item) => (
        <ListItem
          key={item.id}>
          <Link
            sx={{
              textDecoration: 'none',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
            }}
            target="_blank"
            href={item.link}>
            <Box
              sx={{ marginRight: '5px' }}
            >
              {item.icon}
            </Box>
            {item.name}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
