import { selectorFamily } from 'recoil';

import { update } from '../../services/api/todos';

const todoWithUpdate = selectorFamily({
  key: 'todoWithUpdate',
  get: ({ id, value }) => async () => {
    const response = await update(id, value);

    return response;
  },
});

export default todoWithUpdate;
