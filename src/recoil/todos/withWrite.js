import { selectorFamily, selector, noWait } from 'recoil';

import { write } from '../../services/api/todos';
import recoilLoadable from '../../utils/recoil/recoilLoadable';

import { taskInputAtom } from './atom';

export const todosWithWrite = selectorFamily({
  key: 'todosWithWrite',
  get: (task) => async () => {
    const response = await write(task);

    return response;
  },
});

const todosWithWriteQuery = selector({
  key: 'todosWithWriteQuery',
  get: ({ get }) => {
    const task = get(taskInputAtom);

    if (!task) {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(todosWithWrite(task))));

    return loadable;
  },
  set: ({ set }, task) => {
    set(
      taskInputAtom,
      task,
    );
  },
});

export default todosWithWriteQuery;
