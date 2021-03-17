import mockAxios from 'axios';

import { write, list, remove } from './todos';

jest.mock('axios');

describe('todos api', () => {
  const data = { id: '1', task: 'task', isComplete: false };

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(data);
    mockAxios.get.mockResolvedValueOnce(data);
    mockAxios.delete.mockResolvedValueOnce(data);
  });
  it('POST /api/todos', async () => {
    const result = await write(data);

    expect(result).toBe(data);
  });

  it('GET /api/todos', async () => {
    const result = await list(data);

    expect(result).toBe(data);
  });

  it('GET /api/todos', async () => {
    const result = await list(data);

    expect(result).toBe(data);
  });

  it('DELETE /api/todos/:id', async () => {
    const id = '1';

    const result = await remove(id);

    expect(result).toBe(data);
  });
});
