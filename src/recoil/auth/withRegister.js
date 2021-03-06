import { selectorFamily, selector, noWait } from 'recoil';

import authFieldsAtom from './atom';

import { register } from '../../services/api/auth';
import recoilLoadable from '../../utils/recoil/recoilLoadable';

const authWithRegister = selectorFamily({
  key: 'authWithRegister',
  get: (user) => async () => {
    const response = await register(user);

    return response;
  },
});

const authWithRegisterQuery = selector({
  key: 'authWithRegisterQuery',
  get: ({ get }) => {
    const registerFields = get(authFieldsAtom);

    if (!registerFields) {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(authWithRegister(registerFields))));

    return loadable;
  },
});

export default authWithRegisterQuery;
