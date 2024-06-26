import { selectorFamily } from 'recoil';

import { multipleRemove } from '../../services/api/todos';

const todoWithMultipleRemove = selectorFamily({
  key: 'todoWithMultipleRemove',
  get: (ids: string[]) => async () => {
    const response = await multipleRemove(ids);

    return response;
  },
});

export default todoWithMultipleRemove;
