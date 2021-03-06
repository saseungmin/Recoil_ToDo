import { selector, noWait } from 'recoil';

import { authFormStatusAtom } from './atom';

import { logout } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoil/recoilLoadable';

const authWithLogout = selector({
  key: 'authWithLogout',
  get: async () => {
    const response = await logout();

    return response;
  },
});

const authWithLogoutQuery = selector({
  key: 'authWithLogoutQuery',
  get: ({ get }) => {
    const { type } = get(authFormStatusAtom);

    if (type !== 'logout') {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(authWithLogout)));

    return loadable;
  },
  set: ({ set }) => {
    set(
      authFormStatusAtom,
      (prevState) => ({
        ...prevState,
        type: 'logout',
        visible: false,
      }),
    );
  },
});

export default authWithLogoutQuery;
