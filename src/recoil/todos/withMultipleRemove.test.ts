import { snapshot_UNSTABLE } from 'recoil';

import mockAxios from 'axios';

import todoWithMultipleRemove from './withMultipleRemove';

describe('todoWithMultipleRemove', () => {
  const data = {
    status: 204,
  };

  beforeEach(() => {
    (mockAxios.delete as jest.Mock).mockResolvedValueOnce(data);
  });

  it('Should Call api multipleDelete', async () => {
    const initialSnapshot = snapshot_UNSTABLE();

    const response = await initialSnapshot.getPromise(todoWithMultipleRemove(['1', '2']));

    expect(response).toBe(data);
  });
});
