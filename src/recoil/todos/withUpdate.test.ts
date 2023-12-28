import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todoWithUpdate from './withUpdate';
import { Todo } from './atom';

describe('todoWithUpdate', () => {
  const todo: Todo = {
    _id: '1',
    task: 'some task',
    isComplete: false,
  };

  beforeEach(() => {
    (mockAxios.patch as jest.Mock).mockResolvedValueOnce(todo);
  });

  it('Should Call api patch', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(todoWithUpdate({ id: todo._id, value: todo}));

    expect(response).toBe(todo);
  });
});
