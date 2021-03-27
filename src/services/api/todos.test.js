import mockAxios from 'axios';

import {
  write, list, remove, update, multipleRemove,
} from './todos';

describe('todos api', () => {
  const data = { id: '1', task: 'task', isComplete: false };
  const task = 'some task';

  beforeEach(() => {
    mockAxios.post.mockResolvedValueOnce(task);
    mockAxios.get.mockResolvedValueOnce(data);
    mockAxios.delete.mockResolvedValueOnce(data);
    mockAxios.patch.mockResolvedValueOnce(data);
  });
  it('POST /api/todos', async () => {
    const result = await write(task);

    expect(result).toBe(task);
    expect(mockAxios.post).toBeCalledWith('/api/todos', {
      task,
    });
  });

  it('GET /api/todos', async () => {
    const result = await list('token');

    expect(result).toBe(data);
    expect(mockAxios.get).toBeCalledWith('/api/todos', {
      headers: {
        Authorization: 'token',
      },
    });
  });

  it('DELETE /api/todos/', async () => {
    const ids = ['1', '2'];

    const result = await multipleRemove(ids);

    expect(result).toBe(data);
    expect(mockAxios.delete).toBeCalledWith('/api/todos', {
      data: { ids },
    });
  });

  it('DELETE /api/todos/:id', async () => {
    const id = '1';

    const result = await remove(id);

    expect(result).toBe(data);
    expect(mockAxios.delete).toBeCalledWith('/api/todos/1');
  });

  it('PATCH /api/todos/:id', async () => {
    const todo = {
      id: '1',
      task: 'some task',
      isComplete: true,
    };

    const result = await update('1', todo);

    expect(result).toBe(data);
    expect(mockAxios.patch).toBeCalledWith('/api/todos/1', todo);
  });
});
