import { selectorFamily } from 'recoil';

import { check } from '../../services/api/auth';

const userWithCheck = selectorFamily({
  key: 'userWithCheck',
  get: () => async () => {
    const response = await check();

    return response;
  },
});

export default userWithCheck;
