import axios from 'axios';
import { Post, User } from '../models/Models';
const uri = 'https://jsonplaceholder.typicode.com';

export const getPostService = async (page: number) => {
  const getUsers = axios({
    method: 'get',
    url: `${uri}/users`,
  });
  const getPosts = axios({
    method: 'get',
    url: `${uri}/posts?_page=${page}&_limit=10`,
  });

  const [usersList, postsList] = await Promise.all([getUsers, getPosts]);

  return postsList.data.map(({ title, id, body, userId }: Post) => ({
    id,
    title,
    body,
    ...usersList.data.find(({ id }: User) => id === userId),
  }));
};
