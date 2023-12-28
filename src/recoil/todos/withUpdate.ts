import { selectorFamily } from 'recoil';

import { update } from '../../services/api/todos';
import { Todo } from './atom';

const todoWithUpdate = selectorFamily({
  key: 'todoWithUpdate',
  get: ({ id, value }: { id: string; value: Todo; }) => async () => {
    const response = await update(id, value);

    return response;
  },
});

export default todoWithUpdate;
