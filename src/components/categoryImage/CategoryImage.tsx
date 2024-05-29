import { Box, Typography } from '@mui/material';
import categoryForMenImg from '../../assets/image/for-men.jpg';
import categoryForWomenImg from '../../assets/image/for-women.jpg';
import categoryForKidsImg from '../../assets/image/for-kids.webp';
import categoryNewArrivalsImg from '../../assets/image/new arrivals.webp';
import { Category } from 'src/utils/interfaces';

interface CategoryImageProps {
  selectedCategory: string | Category;
}

export function CategoryImage({ selectedCategory }: CategoryImageProps) {
  let backgroundImageSrc;

  switch (selectedCategory) {
    case 'for-men':
    case 'shirts':
    case 'shorts':
    case 'boots':
      backgroundImageSrc = `url(${categoryForMenImg})`;
      break;
    case 'for-women':
    case 'dresses':
    case 'skirts':
    case 'shoes':
      backgroundImageSrc = `url(${categoryForWomenImg})`;
      break;
    case 'for-kids':
    case 'cloth':
    case 'toys':
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
        {['for-men', 'shirts', 'shorts', 'boots'].includes(
          selectedCategory as string,
        ) && 'FOR MEN'}
        {['for-women', 'dresses', 'skirts', 'shoes'].includes(
          selectedCategory as string,
        ) && 'FOR WOMEN'}
        {['for-kids', 'cloth', 'toys'].includes(selectedCategory as string) &&
          'FOR KIDS'}
        {['new-arrivals'].includes(selectedCategory as string) &&
          'NEW ARRIVALS'}
      </Typography>
    </Box>
  );
}
