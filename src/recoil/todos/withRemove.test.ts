import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todoWithRemove from './withRemove';

describe('todoWithRemove', () => {
  const data = {
    status: 204,
  };

  beforeEach(() => {
    (mockAxios.delete as jest.Mock).mockResolvedValueOnce(data);
  });

  it('Should Call api delete', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(todoWithRemove('1'));

    expect(response).toBe(data);
  });
});
