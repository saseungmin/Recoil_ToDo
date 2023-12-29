import { Todo } from 'src/recoil/todos/atom';
import client from './client';

import { TODOS_PATH } from '../../utils/constants/url';

export const write = (task: string) => client.post(TODOS_PATH, { task });

export const list = (token: string) => client.get(TODOS_PATH, {
  headers: {
    Authorization: token,
  },
});

export const multipleRemove = (ids: string[]) => client.delete(TODOS_PATH, {
  data: { ids },
});

export const update = (id: string, value: Partial<Todo>) => client.patch(`${TODOS_PATH}/${id}`, value);

export const remove = (id: string) => client.delete(`${TODOS_PATH}/${id}`);
