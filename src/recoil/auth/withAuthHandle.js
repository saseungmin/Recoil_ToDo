import { selector } from 'recoil';

import { authResultAtom } from './atom';
import isLoadingAtom from '../common/atom';

import { authStatusHandling } from '../../utils/recoil/statusHandling';

const authWithHandle = selector({
  key: 'authWithHandle',
  set: ({ set }, loadable) => {
    const { type, data, status } = loadable;

    if (type === 'loading') {
      set(isLoadingAtom, true);
      return;
    }

    set(
      authResultAtom,
      (prevState) => ({
        ...prevState,
        ...authStatusHandling[type]({ data, status }),
      }),
    );

    set(isLoadingAtom, false);
  },
});

export default authWithHandle;
