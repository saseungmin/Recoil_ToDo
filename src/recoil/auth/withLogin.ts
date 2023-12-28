import { selectorFamily } from 'recoil';

import { AuthRequest, login } from '../../services/api/auth';

const authWithLogin = selectorFamily({
  key: 'authWithLogin',
  get: (user: AuthRequest) => async () => {
    const response = await login(user);

    return response;
  },
});

export default authWithLogin;
