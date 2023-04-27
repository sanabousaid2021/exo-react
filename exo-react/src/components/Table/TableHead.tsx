import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useState } from 'react';
import { GridCol } from '../../App';

interface TableProps {
  columns: GridCol[];
}

export default function TableHead({ columns }: TableProps) {
  const [direction, setDirection] = useState('');
  const [sortFieldName, setSortFieldName] = useState('');
  const sortField = (field: string) => {
    setSortFieldName(field);
    if (direction === 'UP') {
      setDirection('DOWN');
    } else {
      setDirection('UP');
    }
  };
  return (
    <>
      <TableRow>
        {columns.map((el) => (
          <TableCell key={el.field}>
            <Button onClick={() => sortField(el.field)}>{el.headerName}</Button>
            {(el.sortable || el.sortable === undefined) && (
              <>
                {sortFieldName === el.field && (
                  <IconButton onClick={() => sortField(el.field)}>
                    {direction === 'UP' && <ArrowDropUp />}
                    {direction === 'DOWN' && <ArrowDropDown />}
                  </IconButton>
                )}
              </>
            )}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}
