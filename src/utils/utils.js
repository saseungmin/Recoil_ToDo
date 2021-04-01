import _ from 'lodash';

import { BASE_URL } from './constants/url';
import { DARK, LIGHT } from './constants/theme';

export const updateTodos = (todos, newTodo) => todos.map((todo) => {
  if (todo._id === newTodo._id) {
    return newTodo;
  }

  return todo;
});

export const setPath = (env) => {
  if (env === 'development') {
    return {
      baseURL: '/',
    };
  }

  return {
    baseURL: BASE_URL,
    withCredentials: true,
  };
};

export const isCheckInputTrim = (value) => _.trim(value).length > 0;

export const isActive = (todo) => !todo.isComplete;
export const isCompleted = (todo) => todo.isComplete;

export const filteredTodos = {
  ALL: (state) => (state),
  ACTIVE: (state) => (state.filter(isActive)),
  COMPLETED: (state) => (state.filter(isCompleted)),
};

export const isCheckValidate = (inputValue) => Object
  .entries(inputValue)
  .every((value) => _.trim(value[1]));

export const isEqualPassword = ({ password, passwordConfirm }) => passwordConfirm
  && (password !== passwordConfirm);

export const getExpire = (token) => new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);

export const getTheme = (theme) => {
  if (theme === DARK) {
    return DARK;
  }

  return LIGHT;
};
