import React from 'react';

const Todo = ({ item }) => {
  const { task } = item;

  return (
    <div>
      {task}
    </div>
  );
};

export default Todo;
