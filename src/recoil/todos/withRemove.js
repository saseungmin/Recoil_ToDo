import { selectorFamily } from 'recoil';

import { remove } from '../../services/api/todos';

const todoWithRemove = selectorFamily({
  key: 'todoWithRemove',
  get: (id) => async () => {
    const response = await remove(id);

    return response;
  },
});

export default todoWithRemove;
