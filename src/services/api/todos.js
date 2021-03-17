import client from './client';

import { TODOS_PATH } from '../../utils/constants/url';

export const write = (task) => client.post(TODOS_PATH, { task });

export const list = () => client.get(TODOS_PATH);

export const remove = (id) => client.delete(`${TODOS_PATH}/${id}`);
