import { selector, selectorFamily } from 'recoil';

import authFieldsAtom, { authFormStatusAtom } from './atom';

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

export const branchAuthType = (user) => ({
  register: authWithRegister(user),
  login: authWithLogin(user),
});

const authWithEnterUser = selector({
  key: 'authWithEnterUser',
  get: ({ get }) => {
    const user = get(authFieldsAtom);
    const { type } = get(authFormStatusAtom);

    if (!user) {
      return null;
    }

    const response = get(branchAuthType(user)[type]);

    return response;
  },
});

export default authWithEnterUser;
