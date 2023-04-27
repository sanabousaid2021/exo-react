import { GridCol } from '../../App';
import { MenuItem, Select, TextField, Grid, SelectChangeEvent } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';
import { ChangeEvent } from 'react';
import { format, toDate } from 'date-fns';
import { FilterModel } from 'src/hooks/useGetInfosTable';

interface TableProps {
  columns: GridCol[];
  onFilter: (filter: FilterModel) => void;
}
export default function TableFilter({ columns, onFilter }: TableProps) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    field: string,
  ) => {
    onFilter({ field, value: event.target.value });
  };

  const handleChangeDatePicker = (value: Date | null, field: string) => {
    if (value) {
      onFilter({ field, value: format(toDate(value), 'dd/MM/yyyy') });
    }
  };

  return (
    <>
      {columns.map((el) => (
        <Grid key={el.field} alignItems='center' display='flex' gap={5} mb={1}>
          {el.type === 'singleSelect' && (
            <Select
              size='small'
              value='-1'
              label={el.headerName}
              onChange={(event) => handleChange(event, el.field)}
            >
              <MenuItem value='-1'>Select</MenuItem>
              {el.filterOptions?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
          {el.type === 'string' && (
            <TextField
              size='small'
              variant='outlined'
              onChange={(event) => handleChange(event, el.field)}
            />
          )}
          {el.type === 'date' && (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <DesktopDatePicker
                onChange={(value: Date | null) => handleChangeDatePicker(value, el.field)}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          )}
        </Grid>
      ))}
    </>
  );
}
