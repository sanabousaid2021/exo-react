import { useCallback, useEffect, useState } from 'react';
import { getPostService } from '../api/api';

import { User } from 'src/models/Models';

export default function useGetAllUsers(page: number) {
  const [data, setData] = useState<User[]>();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = useCallback(async () => {
    const result = await getPostService(page);

    setData(result);
  }, [page]);

  return { data };
}
