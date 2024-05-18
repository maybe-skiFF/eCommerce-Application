import { Box, Typography } from '@mui/material';

interface CategoryImageProps {
  selectedCategory: string;
}

export function CategoryImage({ selectedCategory }: CategoryImageProps) {
  const backgroundImageSrc =
    selectedCategory === 'for men'
      ? 'url("src/assets/image/for-men.jpg")'
      : 'url("src/assets/image/for-women.jpg")';

  return (
    <Box
      sx={{
        backgroundImage: backgroundImageSrc,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className="navigation__image"
    >
      <Typography
        sx={{ fontSize: '36px', color: 'white', fontWeight: 'bold' }}
        variant="body1" className="navigation__title">
        {selectedCategory === 'for men' && 'FOR MEN'}
        {selectedCategory === 'for women' && 'FOR WOMEN'}
      </Typography>
    </Box>
  );
}