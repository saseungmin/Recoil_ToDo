// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import authWithRegisterQuery from './withRegister';

jest.mock('axios');
describe('authWithRegisterQuery', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
  });

  it('When auth input fields is empty', () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(authWithRegisterQuery).valueOrThrow()).toBeNull();
  });
});
