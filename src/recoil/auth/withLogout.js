import { selector, noWait } from 'recoil';

import { authFormStatusAtom, authResultAtom } from './atom';

import { logout } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoilLoadable';

const branchAuthResult = {
  success: () => ({
    user: null,
    loading: false,
  }),
  loading: () => ({
    loading: true,
  }),
};

const authWithLogout = selector({
  key: 'authWithLogout',
  get: async () => {
    const response = await logout();

    return response;
  },
});

export const authWithLogoutQuery = selector({
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

const authWithLogoutHandle = selector({
  key: 'authWithLogoutHandle',
  set: ({ set }, loadable) => {
    const { type, data, status } = loadable;

    set(
      authResultAtom,
      (prevState) => ({
        ...prevState,
        ...branchAuthResult[type]({ data, status }),
      }),
    );
  },
});

export default authWithLogoutHandle;
