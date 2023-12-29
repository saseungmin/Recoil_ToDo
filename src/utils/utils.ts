import _ from 'lodash';

import { Todo } from 'src/recoil/todos/atom';
import { AuthForm } from 'src/types/auth';
import { BASE_URL } from './constants/url';
import { DARK, LIGHT } from './constants/theme';

export const updateTodos = (todos: Todo[], newTodo: Todo) => todos.map((todo) => {
  if (todo._id === newTodo._id) {
    return newTodo;
  }

  return todo;
});

export const setPath = (env?: string) => {
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

export const isCheckInputTrim = (value: string) => _.trim(value).length > 0;

export const isActive = (todo: Todo) => !todo.isComplete;
export const isCompleted = (todo: Todo) => todo.isComplete;

export const filteredTodos = {
  ALL: (state: Todo[]) => (state),
  ACTIVE: (state: Todo[]) => (state.filter(isActive)),
  COMPLETED: (state: Todo[]) => (state.filter(isCompleted)),
};

export const isCheckValidate = (inputValue: AuthForm) => Object
  .entries(inputValue)
  .every((value) => _.trim(value[1]));

export const isEqualPassword = ({ password, passwordConfirm }: AuthForm) => passwordConfirm
  && (password !== passwordConfirm);

export const getExpire = (token: string) => new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);

export const getTheme = (theme?: boolean) => {
  if (theme === DARK) {
    return DARK;
  }

  return LIGHT;
};
