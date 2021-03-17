import _ from 'lodash';

import { BASE_URL } from './constants/url';
import { removeItem } from '../services/storage';
import { AUTH_ERROR } from './constants/messages';

const { UNAUTHORIZED, CONFLICT, INTERNAL_SERVER_ERROR } = AUTH_ERROR;

export const newTodos = (todos) => ({ _id, key, value }) => todos.map((todo) => {
  if (todo._id === _id) {
    return {
      ...todo,
      [key]: value,
    };
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

export const userCheckErrorHandling = async (userCheck) => {
  try {
    const response = await userCheck;

    return response;
  } catch (error) {
    removeItem('user');

    return {
      data: null,
    };
  }
};

export const authSetErrorMessage = (auth) => ({ status, data }) => {
  if (status === 400) {
    return data.details[0].message;
  }

  if (status === 401) {
    return UNAUTHORIZED;
  }

  if (status === 409) {
    return CONFLICT;
  }

  if (status === 500) {
    return INTERNAL_SERVER_ERROR;
  }

  return `Failure ${auth}!`;
};
