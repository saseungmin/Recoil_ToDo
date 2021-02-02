import React from 'react';

import { NOTING_TO_DO } from '../../utils/constants/constants';

import Todo from './Todo';

const TodoList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div>{NOTING_TO_DO}</div>
    );
  }

  return (
    <div>
      {tasks && tasks.map(({ id, task }) => (
        <Todo
          task={task}
          key={id}
        />
      ))}
    </div>
  );
};

export default TodoList;
