// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import userWithCheckQuery from './withCheck';

jest.mock('axios');
describe('authWithCheckQuery', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
  });

  it('When auth is empty', () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(userWithCheckQuery).valueOrThrow()).toBeNull();
  });
});
