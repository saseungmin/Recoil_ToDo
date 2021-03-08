import queryString from 'query-string';

import client from './client';

import { AUTH_PATH } from '../../utils/constants/url';

export const register = ({
  userId,
  password,
}) => client.post(`${AUTH_PATH}/register`, queryString.stringify({
  id: userId,
  password,
}));

export const login = ({
  userId,
  password,
}) => client.post(`${AUTH_PATH}/login`, queryString.stringify({
  id: userId,
  password,
}));

export const check = () => client.get(`${AUTH_PATH}/check`);

export const logout = () => client.post(`${AUTH_PATH}/logout`);
