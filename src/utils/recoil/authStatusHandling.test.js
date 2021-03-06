import { registerHandling, loginHandling, logoutHandling } from './authStatusHandling';

describe('registerHandling', () => {
  it('When success, There is a value in auth.', () => {
    const result = registerHandling.success('test');

    expect(result).toEqual({ auth: 'test', loading: false });
  });
});

describe('loginHandling', () => {
  it('When success, There is a value in auth.', () => {
    const result = loginHandling.success({ data: 'test' });

    expect(result).toEqual({
      user: 'test',
      loading: false,
    });
  });
});

describe('logoutHandling', () => {
  it('When success, There is a value in auth.', () => {
    const result = logoutHandling.success();

    expect(result).toEqual({
      user: null,
      loading: false,
    });
  });
});
