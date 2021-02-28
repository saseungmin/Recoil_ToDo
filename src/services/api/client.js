import axios from 'axios';

import { BASE_URL } from '../../utils/constants/url';

const client = axios.create();

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : BASE_URL;

export default client;
