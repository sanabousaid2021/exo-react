import { useState } from 'react';

export interface FilterModel {
  field: string;
  value: string;
}
export default function useGetInfosTable() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [filter, setFilter] = useState<Partial<FilterModel>>({});

  return { filter, setFilter, page, setPage, size, setSize };
}
