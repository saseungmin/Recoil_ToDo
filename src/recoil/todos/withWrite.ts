import { selectorFamily } from 'recoil';

import { write } from '../../services/api/todos';

const todoWithWrite = selectorFamily({
  key: 'todoWithWrite',
  get: (task: string) => async () => {
    const response = await write(task);

    return response;
  },
});

export default todoWithWrite;
