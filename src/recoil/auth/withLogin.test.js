// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import authWithLoginQuery from './withLogin';

jest.mock('axios');
describe('authWithLoginQuery', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
  });

  it('When auth input fields is empty', () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(authWithLoginQuery).valueOrThrow()).toBeNull();
  });
});
