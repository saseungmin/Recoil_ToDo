import { selectorFamily, selector, noWait } from 'recoil';

import authFieldsAtom, { authResultAtom } from './atom';

import { login } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoilLoadable';

const branchAuthResult = {
  success: ({ data }) => ({
    user: data,
    loading: false,
  }),
  error: (authError) => ({
    authError,
    loading: false,
  }),
  loading: () => ({
    loading: true,
  }),
};

const authWithLogin = selectorFamily({
  key: 'authWithLogin',
  get: (user) => async () => {
    const response = await login(user);

    return response;
  },
});

export const authWithLoginQuery = selector({
  key: 'authWithLoginQuery',
  get: ({ get }) => {
    const loginFields = get(authFieldsAtom);

    if (!loginFields) {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(authWithLogin(loginFields))));

    return loadable;
  },
});

const authWithLoginHandle = selector({
  key: 'authWithLoginHandle',
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

export default authWithLoginHandle;
