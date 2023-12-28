import { selectorFamily } from 'recoil';

import { AuthRequest, register } from '../../services/api/auth';

const authWithRegister = selectorFamily({
  key: 'authWithRegister',
  get: (user: AuthRequest) => async () => {
    const response = await register(user);

    return response;
  },
});

export default authWithRegister;
