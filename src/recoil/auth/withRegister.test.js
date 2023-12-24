import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import authWithRegister from './withRegister';

describe('authWithRegister', () => {
  const data = {
    status: 204,
  };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
  });

  it('Should Call api register', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(authWithRegister({
      userId: 'test',
      password: 'test',
    }));

    expect(response).toBe(data);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/register', {
      id: 'test',
      password: 'test',
    });
  });
});
