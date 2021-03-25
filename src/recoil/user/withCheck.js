import { selectorFamily } from 'recoil';

import { check } from '../../services/api/auth';

const userWithCheck = selectorFamily({
  key: 'userWithCheck',
  get: (token) => async () => {
    const response = await check(token);

    return response;
  },
});

export default userWithCheck;
