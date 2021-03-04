// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import authWithLogout from './withLogout';
import { authFormStatusAtom } from './atom';

describe('authWithLogout', () => {
  it('When user is Logged in', async () => {
    const initialSnapshot = snapshot_UNSTABLE(({ set }) => set(authFormStatusAtom, {
      type: 'register',
      visible: false,
    }));

    const result = await initialSnapshot.getPromise(authWithLogout);

    expect(result).toBeNull();
  });
});
