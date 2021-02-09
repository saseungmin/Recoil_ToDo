import React from 'react';

import { useRecoilValue } from 'recoil';

import _ from 'lodash';

import todosAtom, { todosWithFilter } from '../../recoil/todos';
import { NOTING_TO_DO } from '../../utils/constants/constants';

import Todo from './TodoItem';

const TodoList = () => {
  const filteredTodos = useRecoilValue(todosWithFilter);
  const todos = useRecoilValue(todosAtom);

  if (_.isEmpty(todos)) {
    return (
      <div>{NOTING_TO_DO}</div>
    );
  }

  return (
    <div>
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          item={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
