import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import authWithLogin from './withLogin';

describe('authWithLogin', () => {
  const data = {
    status: 204,
  };

  beforeEach(() => {
    (mockAxios.post as jest.Mock).mockResolvedValueOnce(data);
  });

  it('Should Call api login', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(authWithLogin({
      userId: 'test',
      password: 'test',
    }));

    expect(response).toBe(data);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/login', {
      id: 'test',
      password: 'test',
    });
  });
});
