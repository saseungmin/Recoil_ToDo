import _ from 'lodash';

export const toggleTodo = (todo) => (id) => {
  if (todo.id === id) {
    return {
      ...todo,
      isComplete: !todo.isComplete,
    };
  }

  return todo;
};

export const isCheckInputTrim = (value) => _.trim(value).length > 0;
