import _ from 'lodash';

export const newTodos = (todos) => ({ id, key, value }) => todos.map((todo) => {
  if (todo.id === id) {
    return {
      ...todo,
      [key]: value,
    };
  }

  return todo;
});

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
