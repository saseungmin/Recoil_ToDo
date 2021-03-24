import { removeItem, saveItem } from '../../services/storage';

import { setCookie, removeCookie } from '../../services/cookie';

export const authStatusHandling = {
  success: ({ data }) => {
    setCookie('access_token', data.access_token);

    return {
      auth: data,
      authError: null,
    };
  },
  error: (authError) => ({
    authError,
  }),
};

export const userCheckHandling = {
  success: ({ data }) => {
    saveItem('user', data.user);
    // TODO - 추후 로직 추가 access_token이 있을 때만 추가
    // setCookie('access_token', data.access_token);

    return {
      user: data.user,
      checkError: null,
    };
  },
  error: (checkError) => {
    removeItem('user');
    removeCookie('access_token');

    return {
      checkError,
    };
  },
};
