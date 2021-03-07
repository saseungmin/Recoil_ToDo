import { authStatusHandling, checkHandling, logoutHandling } from './statusHandling';

describe('statusHandling', () => {
  const user = { data: 'some data' };
  describe('authStatusHandling', () => {
    it('When success, There is a value in auth.', () => {
      const result = authStatusHandling.success('test');

      expect(result).toEqual({
        auth: 'test',
        authError: null,
      });
    });
  });

  describe('checkHandling', () => {
    context('Have Error', () => {
      it('There is a error in checkError', () => {
        const result = checkHandling.error(user);

        expect(result).toEqual({
          checkError: user,
        });
      });
    });

    context('Have Success', () => {
      it('There is a value in user.', () => {
        const result = checkHandling.success(user);

        expect(result).toEqual({
          user: user.data,
          checkError: null,
        });
      });
    });
  });

  describe('logoutHandling', () => {
    it('When success, user is null', () => {
      const result = logoutHandling.success();

      expect(result).toEqual({
        user: null,
      });
    });
  });
});
