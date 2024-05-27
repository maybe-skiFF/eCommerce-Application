import { Box, Typography } from '@mui/material';
import categoryForMenImg from '../../assets/image/for-men.jpg';
import categoryForWomenImg from '../../assets/image/for-women.jpg';
import categoryForKidsImg from '../../assets/image/for-kids.webp';
import categoryNewArrivalsImg from '../../assets/image/new-arrivals.webp';
import { Category } from 'src/utils/interfaces';

interface CategoryImageProps {
  selectedCategory: string | Category;
}

export function CategoryImage({ selectedCategory }: CategoryImageProps) {
  let backgroundImageSrc;

  switch (selectedCategory) {
    case 'for-men':
      backgroundImageSrc = `url(${categoryForMenImg})`;
      break;
    case 'for-women':
      backgroundImageSrc = `url(${categoryForWomenImg})`;
      break;
    case 'for-kids':
      backgroundImageSrc = `url(${categoryForKidsImg})`;
      break;
    case 'new-arrivals':
      backgroundImageSrc = `url(${categoryNewArrivalsImg})`;
      break;
    default:
      backgroundImageSrc = 'none';
      break;
  }

  return (
    <Box
      sx={{
        backgroundImage: backgroundImageSrc,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginTop: '20px',
        height: '500px',
        width: '100%',
        alignContent: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '36px',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        variant="body1"
        className="navigation__title"
      >
        {selectedCategory === 'for-men' && 'FOR MEN'}
        {selectedCategory === 'for-women' && 'FOR WOMEN'}
        {selectedCategory === 'for-kids' && 'FOR KIDS'}
        {selectedCategory === 'new-arrivals' && 'NEW ARRIVALS'}
      </Typography>
    </Box>
  );
}
