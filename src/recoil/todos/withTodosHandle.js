import { selector } from 'recoil';

import isLoadingAtom from '../common/atom';
import todosResultAtom from './atom';

import { loadTodosHandling } from '../../utils/recoil/statusHandling';

const todosWithHandle = selector({
  key: 'todosWithHandle',
  set: ({ set, reset }, loadable) => {
    const { type, data, status } = loadable;

    if (type === 'loading') {
      set(isLoadingAtom, true);
      return;
    }

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        ...loadTodosHandling[type]({ data, status }),
      }),
    );

    reset(isLoadingAtom);
  },
});

export default todosWithHandle;
