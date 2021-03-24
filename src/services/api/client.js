import axios from 'axios';

import { setPath } from '../../utils/utils';
import { getCookie } from '../cookie';

const client = axios.create(setPath(process.env.NODE_ENV));

client.interceptors.request.use((config) => {
  const token = getCookie('access_token');
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token || '';

  return config;
});

export default client;
