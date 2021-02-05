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
