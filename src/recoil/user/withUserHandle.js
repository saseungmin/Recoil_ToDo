import { selector } from 'recoil';

import userAtom from './atom';
import isLoadingAtom from '../common/atom';

const userWithHandle = selector({
  key: 'userWithHandle',
  set: ({ set }, { loadable, handling }) => {
    const { type, data, status } = loadable;

    if (type === 'loading') {
      set(isLoadingAtom, true);
      return;
    }

    set(
      userAtom,
      (prevState) => ({
        ...prevState,
        ...handling[type]({ data, status }),
      }),
    );

    set(isLoadingAtom, false);
  },
});

export default userWithHandle;
