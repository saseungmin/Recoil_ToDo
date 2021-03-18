// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todoWithUpdate from './withUpdate';

describe('todoWithUpdate', () => {
  const todo = {
    id: '1',
    task: 'some task',
    isComplete: false,
  };

  beforeEach(() => {
    mockAxios.patch.mockResolvedValueOnce(todo);
  });

  it('Should Call api patch', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(todoWithUpdate('1', todo));

    expect(response).toBe(todo);
  });
});
