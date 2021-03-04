import { selector, noWait } from 'recoil';

import { authFormStatusAtom } from './atom';

import { logout } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoilLoadable';

const authWithLogout = selector({
  key: 'authWithLogout',
  get: async () => {
    const response = await logout();

    return response;
  },
});

const authWithLogoutQuery = selector({
  key: 'authWithLogoutLoadable',
  get: ({ get }) => {
    const { type } = get(authFormStatusAtom);

    if (type !== 'logout') {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(authWithLogout)));

    return loadable;
  },
});

export default authWithLogoutQuery;
