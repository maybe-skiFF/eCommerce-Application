import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationComponentProps } from 'src/utils/interfaces';

export function PaginationComponent({
  count,
  page,
  handlePageChange,
}: PaginationComponentProps) {
  return (
    <Stack sx={{ alignItems: 'center', marginTop: '20px' }}>
      <Pagination
        count={count}
        variant="outlined"
        page={page}
        onChange={handlePageChange}
      />
    </Stack>
  );
}
