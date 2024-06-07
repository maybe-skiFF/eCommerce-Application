import { Card, CardContent, Skeleton, Box } from '@mui/material';

export function SkeletonComponent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        '@media (max-width: 767px)': {
          justifyContent: 'center',
        },
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <Card
          key={index}
          sx={{
            width: '300px',
            height: '700px',
            border: '1px solid #ebedf0',
            marginBottom: '40px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            },
            '@media (max-width: 426px)': {
              width: '100%',
            },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={400} />
          <CardContent>
            <Skeleton
              variant="text"
              sx={{ marginBottom: '10px', height: '60px' }}
            />
            <Skeleton variant="text" sx={{ height: '80px' }} />
            <Skeleton variant="text" sx={{ height: '60px' }} />
            <Skeleton sx={{ width: '120px', height: '60px' }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
