import mockAxios from 'axios';

import {
  write, list, remove, update, multipleRemove,
} from './todos';

describe('todos api', () => {
  const data = { id: '1', task: 'task', isComplete: false };
  const task = 'some task';

  beforeEach(() => {
    (mockAxios.post as jest.Mock).mockResolvedValueOnce(task);
    (mockAxios.get as jest.Mock).mockResolvedValueOnce(data);
    (mockAxios.delete as jest.Mock).mockResolvedValueOnce(data);
    (mockAxios.patch as jest.Mock).mockResolvedValueOnce(data);
  });
  it('POST /api/todos', async () => {
    const result = await write(task);

    expect(result).toBe(task);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/todos', {
      task,
    });
  });

  it('GET /api/todos', async () => {
    const result = await list('token');

    expect(result).toBe(data);
    expect(mockAxios.get).toHaveBeenCalledWith('/api/todos', {
      headers: {
        Authorization: 'token',
      },
    });
  });

  it('DELETE /api/todos/', async () => {
    const ids = ['1', '2'];

    const result = await multipleRemove(ids);

    expect(result).toBe(data);
    expect(mockAxios.delete).toHaveBeenCalledWith('/api/todos', {
      data: { ids },
    });
  });

  it('DELETE /api/todos/:id', async () => {
    const id = '1';

    const result = await remove(id);

    expect(result).toBe(data);
    expect(mockAxios.delete).toHaveBeenCalledWith('/api/todos/1');
  });

  it('PATCH /api/todos/:id', async () => {
    const todo = {
      _id: '1',
      task: 'some task',
      isComplete: true,
    };

    const result = await update('1', todo);

    expect(result).toBe(data);
    expect(mockAxios.patch).toHaveBeenCalledWith('/api/todos/1', todo);
  });
});
