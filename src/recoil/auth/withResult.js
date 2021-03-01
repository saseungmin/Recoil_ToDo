import { selector } from 'recoil';

import { authResultAtom } from './atom';

const branchAuthResult = {
  success: (auth) => ({
    auth,
  }),
  error: (authError) => ({
    authError,
  }),
};

const authWithResult = selector({
  key: 'authWithResult',
  get: ({ get }) => {
    const authResult = get(authResultAtom);

    return authResult;
  },
  set: ({ set }, { type, data, status }) => {
    set(
      authResultAtom,
      (prevState) => ({
        ...prevState,
        ...branchAuthResult[type]({ data, status }),
      }),
    );
  },
});

export default authWithResult;
