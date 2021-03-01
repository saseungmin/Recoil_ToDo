import axios from 'axios';

import { setPath } from '../../utils/utils';

const client = axios.create();

axios.defaults.baseURL = setPath(process.env.NODE_ENV);

export default client;
