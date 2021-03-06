import { selectorFamily, selector, noWait } from 'recoil';

import authFieldsAtom from './atom';

import { login } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoil/recoilLoadable';

const authWithLogin = selectorFamily({
  key: 'authWithLogin',
  get: (user) => async () => {
    const response = await login(user);

    return response;
  },
});

const authWithLoginQuery = selector({
  key: 'authWithLoginQuery',
  get: ({ get }) => {
    const loginFields = get(authFieldsAtom);

    if (!loginFields) {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(authWithLogin(loginFields))));

    return loadable;
  },
});

export default authWithLoginQuery;
