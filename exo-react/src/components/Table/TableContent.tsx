import { GridColDef } from '@mui/x-data-grid';
import {
  TableBody,
  TableRow,
  TableHead as THead,
  Table,
  TableCell,
  TableContainer,
} from '@mui/material';
import TableHead from './TableHead';
import TableFilter from './TableFilter';
import { FilterModel } from 'src/hooks/useGetInfosTable';
import TablePagination from './TablePagination';
interface TableProps<T> {
  columns: GridColDef[];
  onFilter?: (filter: FilterModel) => void;
  data?: T[];
  page: number;
  setPage: (newPage: number) => void;
  size: number;
  count: number;
}
export default function TableContent<T extends { id?: string }>({
  columns,
  onFilter,
  data,
  page,
  setPage,
  size,
  count,
}: TableProps<T>) {
  const renderRow = (el: Partial<T>) => {
    return (
      <>
        {columns.map(({ field }) => (
          <TableCell key={`field-${el.id}`}>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              el[field]
            }
          </TableCell>
        ))}
      </>
    );
  };

  return (
    <TableContainer>
      {onFilter && <TableFilter columns={columns} onFilter={onFilter} />}
      <Table>
        <THead>
          <TableHead columns={columns} />
        </THead>
        <TableBody>
          {data?.map((el) => (
            <TableRow key={el.id}>{renderRow(el)}</TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination currentPage={page} size={size} count={count} onPage={setPage} />
    </TableContainer>
  );
}
