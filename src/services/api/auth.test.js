import mockAxios from 'axios';

import { register, login } from './auth';

jest.mock('axios');

describe('auth api', () => {
  const data = { userId: 'id', password: 'test' };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
  });
  it('/api/auth/register', async () => {
    const result = await register(data);

    expect(result).toBe(data);
  });

  it('/api/auth/login', async () => {
    const result = await login(data);

    expect(result).toBe(data);
  });
});
