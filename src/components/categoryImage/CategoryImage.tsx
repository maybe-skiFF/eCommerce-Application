import { Box, Typography } from '@mui/material';
import categoryForMenImg from '../../assets/image/for-men.jpg';
import categoryForWomenImg from '../../assets/image/for-women.jpg';

interface CategoryImageProps {
  selectedCategory: string;
}

export function CategoryImage({ selectedCategory }: CategoryImageProps) {
  const backgroundImageSrc =
    selectedCategory === 'for-men'
      ? `url(${categoryForMenImg})`
      : `url(${categoryForWomenImg})`;

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
      className="navigation__image"
    >
      <Typography
        sx={{
          fontSize: '36px',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
        variant="body1"
        className="navigation__title"
      >
        {selectedCategory === 'for-men' && 'FOR MEN'}
        {selectedCategory === 'for-women' && 'FOR WOMEN'}
      </Typography>
    </Box >
  );
}
