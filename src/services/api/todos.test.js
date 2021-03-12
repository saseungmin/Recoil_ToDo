import mockAxios from 'axios';

import { write, list } from './todos';

jest.mock('axios');

describe('todos api', () => {
  const data = { id: '1', task: 'task', isComplete: false };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
    mockAxios.get.mockResolvedValueOnce(data);
  });
  it('POST /api/todos', async () => {
    const result = await write(data);

    expect(result).toBe(data);
  });

  it('GET /api/todos', async () => {
    const result = await list(data);

    expect(result).toBe(data);
  });
});
