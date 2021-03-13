// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todosWithListQuery from './withList';

jest.mock('axios');
describe('todosWithListQuery', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    mockAxios.get.mockResolvedValueOnce(data);
  });

  it('When user is empty', () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(todosWithListQuery).valueOrThrow()).toBeNull();
  });
});
