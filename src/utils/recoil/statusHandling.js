import { removeItem, saveItem } from '../../services/storage';

export const authStatusHandling = {
  success: (auth) => ({
    auth,
    authError: null,
  }),
  error: (authError) => ({
    authError,
  }),
};

export const userCheckHandling = {
  success: ({ data }) => {
    saveItem('user', data);

    return {
      user: data,
      checkError: null,
    };
  },
  error: (checkError) => {
    removeItem('user');

    return {
      checkError,
    };
  },
};

export const todoStatusHandling = {
  success: ({ data }) => ({
    todo: data,
    todoError: null,
  }),
  error: (todoError) => ({
    todoError,
  }),
};

export const loadTodosHandling = {
  success: ({ data }) => ({
    todos: data,
    todoError: null,
  }),
  error: (todoError) => ({
    todoError,
  }),
};

export const logoutCheckHandling = {
  success: () => {
    removeItem('user');

    return {
      user: null,
    };
  },
  error: (checkError) => ({
    checkError,
  }),
};
