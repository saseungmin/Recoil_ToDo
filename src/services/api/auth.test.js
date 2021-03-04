import mockAxios from 'axios';

import {
  register, login, logout, check,
} from './auth';

jest.mock('axios');

describe('auth api', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
    mockAxios.get.mockResolvedValueOnce(data);
  });
  it('/api/auth/register', async () => {
    const result = await register(data);

    expect(result).toBe(data);
  });

  it('/api/auth/login', async () => {
    const result = await login(data);

    expect(result).toBe(data);
  });

  it('/api/auth/logout', async () => {
    const result = await logout(data);

    expect(result).toBe(data);
  });

  it('/api/auth/check', async () => {
    const result = await check(data);

    expect(result).toBe(data);
  });
});
