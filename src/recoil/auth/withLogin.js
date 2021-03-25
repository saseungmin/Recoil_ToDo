import { selectorFamily } from 'recoil';

import { login } from '../../services/api/auth';

const authWithLogin = selectorFamily({
  key: 'authWithLogin',
  get: (user) => async () => {
    const response = await login(user);

    return response;
  },
});

export default authWithLogin;
