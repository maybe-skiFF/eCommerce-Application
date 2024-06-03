import { Breadcrumbs, Link, Typography } from '@mui/material';

export function CreateBreadcrumbs({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  return (
    <Breadcrumbs sx={{ marginTop: '20px', fontSize: '24px' }} aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        main
      </Link>
      {getIntermediateBreadcrumb(selectedCategory)}
      <Typography sx={{ fontSize: '24px' }} color="text.primary">{selectedCategory}</Typography>
    </Breadcrumbs>
  );
}

function getIntermediateBreadcrumb(selectedCategory: string) {
  switch (selectedCategory) {
    case 'cloth':
    case 'toys':
      return (
        <Link underline="hover" color="inherit" href="/for-kids">
          for-kids
        </Link>
      );
    case 'shirts':
    case 'shorts':
    case 'boots':
      return (
        <Link underline="hover" color="inherit" href="/for-men">
          for-men
        </Link>
      );
    case 'dresses':
    case 'skirts':
    case 'shoes':
      return (
        <Link underline="hover" color="inherit" href="/for-women">
          for-women
        </Link>
      );
    default:
      return null;
  }
}
