import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (key, value, expires) => cookies.set(key, value, {
  path: '/',
  expires,
});

export const getCookie = (key) => cookies.get(key);

export const removeCookie = (key) => cookies.remove(key);
