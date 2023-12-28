import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todoWithWrite from './withWrite';

describe('todoWithRemove', () => {
  const data = {
    status: 204,
  };

  beforeEach(() => {
    (mockAxios.post as jest.Mock).mockResolvedValueOnce(data);
  });

  it('Should Call api delete', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(todoWithWrite('task'));

    expect(response).toBe(data);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/todos', { task: 'task' });
  });
});
