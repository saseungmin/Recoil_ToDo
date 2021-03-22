import { selector } from 'recoil';

import { list } from '../../services/api/todos';

const todosWithLoad = selector({
  key: 'todosWithLoad',
  get: async () => {
    const response = await list();

    return response;
  },
});

export default todosWithLoad;
