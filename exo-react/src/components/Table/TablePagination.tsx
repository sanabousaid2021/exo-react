import { styles } from './tablepagination.styles';
import { useCallback, useMemo, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Button } from '@mui/material';

interface TablePaginationProps {
  currentPage: number;
  size: number;
  count: number;
  onPage: (newPage: number) => void;
}

export default function TablePagination({
  currentPage,
  count,
  size,
  onPage,
}: TablePaginationProps) {
  const [page, setPage] = useState(currentPage);

  const startIndex = useMemo(() => {
    if (page === 0) {
      return 1;
    }

    return page * size;
  }, [page, size]);

  const endIndex = useMemo(() => {
    if (page === 0) {
      return size;
    }

    return (page + 1) * size;
  }, [page, size]);

  const prev = useCallback(() => {
    setPage(page - 1);
    onPage(page - 1);
  }, [page]);

  const next = useCallback(() => {
    setPage(page + 1);
    onPage(page + 1);
  }, [page]);
  return (
    <div style={styles.paginationContainer}>
      <span data-testid='startIndex'>{startIndex}</span>-
      <span data-testid='endIndex'>{endIndex}</span> of
      <span data-testid='count'>{count}</span>
      <IconButton onClick={prev} disabled={page === 0} aria-label='prev'>
        <ArrowBackIos fontSize='small'></ArrowBackIos>
      </IconButton>
      <Button onClick={next} disabled={endIndex === count} aria-label='next'>
        <ArrowForwardIos fontSize='small'></ArrowForwardIos>
      </Button>
    </div>
  );
}
