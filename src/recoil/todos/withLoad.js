import { selectorFamily } from 'recoil';

import { list } from '../../services/api/todos';

const todosWithLoad = selectorFamily({
  key: 'todosWithLoad',
  get: (token) => async () => {
    const response = await list(token);

    return response;
  },
});

export default todosWithLoad;
