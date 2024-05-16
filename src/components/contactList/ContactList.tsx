import { Link, List, ListItem } from '@mui/material';
import { contactData } from 'src/constants/DATA_LIST';

export function ContactList() {
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
