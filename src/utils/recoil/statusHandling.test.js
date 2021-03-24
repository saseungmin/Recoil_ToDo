import { authStatusHandling, userCheckHandling } from './statusHandling';

describe('statusHandling', () => {
  const user = { data: 'some data' };
  describe('authStatusHandling', () => {
    it('When success, There is a value in auth.', () => {
      const mockData = {
        data: {
          access_token: 'test',
          user: 'test',
        },
      };
      const result = authStatusHandling.success(mockData);

      expect(result).toEqual({
        auth: mockData.data,
        authError: null,
      });
    });
  });

  describe('checkHandling', () => {
    context('Have Error', () => {
      it('There is a error in checkError', () => {
        const result = userCheckHandling.error(user);

        expect(result).toEqual({
          checkError: user,
        });
      });
    });

    context('Have Success', () => {
      it('There is a value in user.', () => {
        const result = userCheckHandling.success({
          data: {
            user: 'test',
          },
        });

        expect(result).toEqual({
          user: 'test',
          checkError: null,
        });
      });
    });
  });
});
