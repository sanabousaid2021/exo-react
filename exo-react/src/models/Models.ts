import { AxiosRequestConfig } from 'axios';

export interface AxiosResponse<T = []> {
  data: T[];
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: any;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}
