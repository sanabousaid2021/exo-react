import React from 'react';
import './App.css';
import TableContent from './components/Table/TableContent';
import { GridColDef } from '@mui/x-data-grid';
import useGetInfosTable from './hooks/useGetInfosTable';
import useGetAllUsers from './hooks/useGetAllUsers';

interface ColumnsTable {
  filterOptions?: string[];
}

export type GridCol = GridColDef & ColumnsTable;

const columns: GridCol[] = [
  {
    field: 'title',
    headerName: 'Titre',
  },
  {
    field: 'body',
    headerName: 'Commentaire',
  },
  {
    field: 'name',
    headerName: 'Posteur',
    type: 'singleSelect',
    filterOptions: ['Antonette', 'Bret'],
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
  },
];

function App() {
  const { page, setPage, size } = useGetInfosTable();

  const { data } = useGetAllUsers(page);

  return (
    <div className='App'>
      <TableContent
        columns={columns}
        data={data ?? []}
        page={page}
        setPage={setPage}
        size={size}
        count={100}
      />
    </div>
  );
}

export default App;
