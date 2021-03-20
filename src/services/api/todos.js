import client from './client';

import { TODOS_PATH } from '../../utils/constants/url';

export const write = (task) => client.post(TODOS_PATH, { task });

export const list = () => client.get(TODOS_PATH);

export const multipleRemove = (ids) => client.delete(TODOS_PATH, {
  data: { ids },
});

export const update = (id, value) => client.patch(`${TODOS_PATH}/${id}`, value);

export const remove = (id) => client.delete(`${TODOS_PATH}/${id}`);
