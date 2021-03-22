// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todosWithLoad from './withLoad';

describe('todosWithLoad', () => {
  const data = {
    status: 200,
  };

  beforeEach(() => {
    mockAxios.get.mockResolvedValueOnce(data);
  });

  it('Should Call api load', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(todosWithLoad);

    expect(response).toBe(data);
    expect(mockAxios.get).toBeCalledWith('/api/todos');
  });
});
