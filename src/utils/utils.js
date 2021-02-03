export const toggleTodo = (todo) => (id) => {
  if (todo.id === id) {
    return {
      ...todo,
      isComplete: !todo.isComplete,
    };
  }

  return todo;
};

export const temp = [];
