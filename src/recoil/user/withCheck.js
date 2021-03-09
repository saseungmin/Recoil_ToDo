import { selector, noWait, selectorFamily } from 'recoil';

import { authResultAtom } from '../auth';

import { check } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoil/recoilLoadable';

const userWithCheck = selectorFamily({
  key: 'userWithCheck',
  get: () => async () => {
    const response = await check();

    return response;
  },
});

const userWithCheckQuery = selector({
  key: 'userWithCheckQuery',
  get: ({ get }) => {
    const { auth } = get(authResultAtom);

    if (!auth) {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(userWithCheck(auth))));

    return loadable;
  },
});

export default userWithCheckQuery;
