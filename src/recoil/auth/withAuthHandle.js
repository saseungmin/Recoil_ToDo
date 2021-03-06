import { selector } from 'recoil';

import { authResultAtom } from './atom';

const authWithHandle = selector({
  key: 'authWithHandle',
  set: ({ set }, { loadable, handling }) => {
    const { type, data, status } = loadable;

    set(
      authResultAtom,
      (prevState) => ({
        ...prevState,
        ...handling[type]({ data, status }),
      }),
    );
  },
});

export default authWithHandle;
