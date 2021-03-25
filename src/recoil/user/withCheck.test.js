import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import userWithCheck from './withCheck';

describe('authWithLogin', () => {
  const data = {
    status: 200,
  };

  beforeEach(() => {
    mockAxios.get.mockResolvedValueOnce(data);
  });

  it('Should Call api check', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(userWithCheck());

    expect(response).toBe(data);
    expect(mockAxios.get).toBeCalledWith('/api/auth/check');
  });
});
