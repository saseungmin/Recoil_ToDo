import { selector } from 'recoil';

import isLoadingAtom from '../common/atom';
import { todosResultAtom, taskInputAtom } from './atom';

const todosWithHandle = selector({
  key: 'todosWithHandle',
  set: ({ set, reset }, { loadable, handling }) => {
    const { type, data, status } = loadable;

    if (type === 'loading') {
      set(isLoadingAtom, true);
      return;
    }

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        ...handling[type]({ data, status }),
      }),
    );

    reset(taskInputAtom);
    reset(isLoadingAtom);
  },
});

export default todosWithHandle;
