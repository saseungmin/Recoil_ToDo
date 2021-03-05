import { selectorFamily, selector, noWait } from 'recoil';

import authFieldsAtom, { authResultAtom } from './atom';

import { register } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoilLoadable';

const branchAuthResult = {
  success: (auth) => ({
    auth,
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

const authWithRegister = selectorFamily({
  key: 'authWithRegister',
  get: (user) => async () => {
    const response = await register(user);

    return response;
  },
});

export const authWithRegisterQuery = selector({
  key: 'authWithRegisterQuery',
  get: ({ get }) => {
    const registerFields = get(authFieldsAtom);

    if (!registerFields) {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(authWithRegister(registerFields))));

    return loadable;
  },
});

const authWithRegisterHandle = selector({
  key: 'authWithRegisterHandle',
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

export default authWithRegisterHandle;
