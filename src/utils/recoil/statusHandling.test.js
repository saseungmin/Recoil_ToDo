import {
  authStatusHandling, logoutCheckHandling, userCheckHandling,
} from './statusHandling';

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
        const result = userCheckHandling.error(user);

        expect(result).toEqual({
          checkError: user,
        });
      });
    });

    context('Have Success', () => {
      it('There is a value in user.', () => {
        const result = userCheckHandling.success(user);

        expect(result).toEqual({
          user: user.data,
          checkError: null,
        });
      });
    });
  });

  describe('logoutHandling', () => {
    context('Have Success', () => {
      it('When success, user is null', () => {
        const result = logoutCheckHandling.success();

        expect(result).toEqual({
          user: null,
        });
      });
    });

    context('Have Error', () => {
      const error = 'error';
      it('There is a error in checkError', () => {
        const result = logoutCheckHandling.error(error);

        expect(result).toEqual({
          checkError: error,
        });
      });
    });
  });
});
