import Cookies from 'universal-cookie';

import { setCookie, getCookie, removeCookie } from './cookie';

describe('cookie', () => {
  const cookies = new Cookies();
  cookies.set = jest.fn();

  it('setCookie', () => {
    const result = setCookie('key', 'value');

    expect(result).toBeUndefined();
  });

  it('getCookie', () => {
    const result = getCookie('key');

    expect(result).toBe('value');
  });

  it('removeCookie', () => {
    const result = removeCookie('key');

    expect(result).toBeUndefined();
  });
});
