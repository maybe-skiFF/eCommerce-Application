import { Product } from '@commercetools/platform-sdk';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  ImageList,
  ImageListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
// import { useState } from 'react';

interface ProductObj {
  productDataById: Product | undefined;
}

export function DetailedProductWrapper({ productDataById }: ProductObj) {
  // const [productName, setProductName] = useState<string>();
  if (!productDataById) return;
  // setProductName(productDataById.key);
  console.log(productDataById);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div>{productDataById.id}</div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <ImageList sx={{ width: 600, height: 300 }} cols={1}>
            <ImageListItem>
              <img
                src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                alt="image"
              />
            </ImageListItem>
          </ImageList>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
          <Typography variant="h4">Product Name</Typography>
          <Typography variant="h5">Product Description</Typography>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select Color
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="red" control={<Radio />} label="Red" />
              <FormControlLabel
                value="green"
                control={<Radio />}
                label="Green"
              />
              <FormControlLabel
                value="black"
                control={<Radio />}
                label="Black"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
