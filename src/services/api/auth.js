import client from './client';

import { AUTH_PATH } from '../../utils/constants/url';

export const register = ({
  userId,
  password,
}) => client.post(`${AUTH_PATH}/register`, {
  id: userId,
  password,
});

export const login = ({
  userId,
  password,
}) => client.post(`${AUTH_PATH}/login`, {
  id: userId,
  password,
});

export const check = () => client.get(`${AUTH_PATH}/check`);
