import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import userWithCheck from './withCheck';

describe('authWithLogin', () => {
  const data = {
    status: 200,
  };

  beforeEach(() => {
    (mockAxios.get as jest.Mock).mockResolvedValueOnce(data);
  });

  it('Should Call api check', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(userWithCheck('token'));

    expect(response).toBe(data);
    expect(mockAxios.get).toHaveBeenCalledWith('/api/auth/check', {
      headers: { Authorization: 'token' },
    });
  });
});
