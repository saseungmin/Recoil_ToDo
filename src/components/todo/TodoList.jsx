import React from 'react';

import { useRecoilValue } from 'recoil';

import _ from 'lodash';

import todosAtom, { filterWithTodos } from '../../recoil/todos';
import { NOTING_TO_DO } from '../../utils/constants/constants';

import Todo from './TodoItem';

const TodoList = () => {
  const filteredTodos = useRecoilValue(filterWithTodos);
  const todos = useRecoilValue(todosAtom);

  if (_.isEmpty(todos)) {
    return (
      <div>{NOTING_TO_DO}</div>
    );
  }

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          item={todo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
