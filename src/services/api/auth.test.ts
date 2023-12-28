import mockAxios from 'axios';

import { register, login, check } from './auth';

jest.mock('axios');

describe('auth api', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    (mockAxios.post as jest.Mock).mockResolvedValueOnce(data);
    (mockAxios.get as jest.Mock).mockResolvedValueOnce(data);
  });
  it('/api/auth/register', async () => {
    const result = await register(data);

    expect(result).toBe(data);
  });

  it('/api/auth/login', async () => {
    const result = await login(data);

    expect(result).toBe(data);
  });

  it('/api/auth/check', async () => {
    const result = await check(data as any);

    expect(result).toBe(data);
  });
});
