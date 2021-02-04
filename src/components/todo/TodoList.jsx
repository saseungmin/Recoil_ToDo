import React from 'react';

import { useRecoilValue } from 'recoil';

import _ from 'lodash';

import todosAtom from '../../recoil/todos/atom';
import { NOTING_TO_DO } from '../../utils/constants/constants';

import Todo from './TodoItem';

const TodoList = () => {
  const todos = useRecoilValue(todosAtom);

  if (_.isEmpty(todos)) {
    return (
      <div>{NOTING_TO_DO}</div>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          item={todo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
