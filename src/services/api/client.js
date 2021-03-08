import axios from 'axios';

import { setPath } from '../../utils/utils';

const client = axios.create(setPath(process.env.NODE_ENV));

axios.defaults.withCredentials = true;

export default client;
