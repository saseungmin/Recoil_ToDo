import axios from 'axios';

import { setPath } from '../../utils/utils';

const client = axios.create({
  baseURL: setPath(process.env.NODE_ENV),
});

export default client;
