import { selectorFamily } from 'recoil';

import { remove } from '../../services/api/todos';

const todoWithRemove = selectorFamily({
  key: 'todoWithRemove',
  get: (task) => async () => {
    const response = await remove(task);

    return response;
  },
});

export default todoWithRemove;
