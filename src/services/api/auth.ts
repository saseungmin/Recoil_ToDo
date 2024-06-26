import client from './client';

import { AUTH_PATH } from '../../utils/constants/url';

export type AuthRequest = { userId: string; password: string; };

export const register = ({
  userId,
  password,
}: AuthRequest) => client.post(`${AUTH_PATH}/register`, {
  id: userId,
  password,
});

export const login = ({
  userId,
  password,
}: AuthRequest) => client.post(`${AUTH_PATH}/login`, {
  id: userId,
  password,
});

export const check = (token: string) => client.get(`${AUTH_PATH}/check`, {
  headers: {
    Authorization: token,
  },
});
