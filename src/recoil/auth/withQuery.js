import { selector, selectorFamily } from 'recoil';

import authFieldsAtom, { authFormStatusAtom } from './atom';

import { register, login } from '../../services/api/auth';

export const authWithRegister = selectorFamily({
  key: 'authWithRegister',
  get: (user) => async () => {
    const response = await register(user);

    return response;
  },
});

export const authWithLogin = selectorFamily({
  key: 'authWithLogin',
  get: (user) => async () => {
    const response = await login(user);

    return response;
  },
});

export const branchAuthType = (user) => ({
  register: authWithRegister(user),
  login: authWithLogin(user),
});

const authWithQuery = selector({
  key: 'authWithQuery',
  get: ({ get }) => {
    const { type } = get(authFormStatusAtom);
    const user = get(authFieldsAtom);

    if (!user) {
      return null;
    }
    const response = get(branchAuthType(user)[type]);

    return response;
  },
});

export default authWithQuery;
