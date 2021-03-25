import { selectorFamily } from 'recoil';

import { register } from '../../services/api/auth';

const authWithRegister = selectorFamily({
  key: 'authWithRegister',
  get: (user) => async () => {
    const response = await register(user);

    return response;
  },
});

export default authWithRegister;
