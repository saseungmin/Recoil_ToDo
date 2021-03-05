// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import { authWithLogoutQuery } from './withLogout';
import { authFormStatusAtom } from './atom';

describe('authWithLogoutQuery', () => {
  it('When type is login', async () => {
    const initialSnapshot = snapshot_UNSTABLE(({ set }) => set(authFormStatusAtom, {
      type: 'login',
      visible: false,
    }));

    const result = await initialSnapshot.getPromise(authWithLogoutQuery);

    expect(result).toBeNull();
  });
});
