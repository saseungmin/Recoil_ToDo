// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todosWithWriteQuery from './withWrite';

jest.mock('axios');
describe('authWithLoginQuery', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
  });

  it('When new todo task is empty', () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(todosWithWriteQuery).valueOrThrow()).toBeNull();
  });
});
