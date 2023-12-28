import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, value: string, expires?: Date) => cookies.set(key, value, {
  path: '/',
  expires,
});

export const getCookie = (key: string) => cookies.get(key);

export const removeCookie = (key: string) => cookies.remove(key);
