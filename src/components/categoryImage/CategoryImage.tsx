import {
  Box,
  Typography,
} from '@mui/material';

interface CategoryImageProps {
  selectedCategory: string;
}

export function CategoryImage({ selectedCategory }: CategoryImageProps) {
  return (
    <Box className="navigation__image">
      {selectedCategory === 'for men' && (
        <Typography variant="body1" className="navigation__title">
          FOR MEN
        </Typography>
      )}
      {selectedCategory === 'for women' && (
        <Typography variant="body1" className="navigation__title">
          FOR WOMEN
        </Typography>
      )}
    </Box>
  );
}