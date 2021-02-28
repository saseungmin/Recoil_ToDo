import { selector, selectorFamily } from 'recoil';

import authFieldsAtom, { authStatusAtom } from './atom';

import { register, login } from '../../services/api/auth';

const authWithRegister = selectorFamily({
  key: 'authWithRegister',
  get: (user) => async () => {
    const response = await register(user);

    return response;
  },
});

const authWithLogin = selectorFamily({
  key: 'authWithLogin',
  get: (user) => async () => {
    const response = await login(user);

    return response;
  },
});

const branchAuthType = (user) => ({
  register: authWithRegister(user),
  login: authWithLogin(user),
});

const authWithQuery = selector({
  key: 'authWithApi',
  get: ({ get }) => {
    const { type } = get(authStatusAtom);
    const user = get(authFieldsAtom);

    if (!user) {
      return null;
    }

    const response = get(branchAuthType(user)[type]);

    return response;
  },
});

export default authWithQuery;
