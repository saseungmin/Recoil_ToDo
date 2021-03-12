import {
  authStatusHandling, logoutCheckHandling, userCheckHandling, todoStatusHandling,
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

  describe('todoStatusHandling', () => {
    context('Have Success', () => {
      const mock = {
        data: {
          task: 'some task',
        },
      };
      it('Should have todo value', () => {
        const result = todoStatusHandling.success(mock);

        expect(result).toEqual({
          todo: mock.data,
          todoError: null,
        });
      });
    });

    context('Have Error', () => {
      const error = 'error';
      it('There is a error in todoError', () => {
        const result = todoStatusHandling.error(error);

        expect(result).toEqual({
          todoError: error,
        });
      });
    });
  });
});
