import React from 'react';

import { useRecoilValue } from 'recoil';

import _ from 'lodash';

import todosAtom, { todosWithFilter } from '../../recoil/todos';
import { NOTING_TO_DO } from '../../utils/constants/constants';

import Todo from './TodoItem';
import EmptyStatus from './EmptyStatus';
import EmptyMessage from '../../styles/EmptyMessage';

const TodoList = () => {
  const todos = useRecoilValue(todosAtom);
  const filteredTodos = useRecoilValue(todosWithFilter);

  if (_.isEmpty(todos)) {
    return (
      <EmptyMessage>
        {NOTING_TO_DO}
      </EmptyMessage>
    );
  }

  if (_.isEmpty(filteredTodos)) {
    return <EmptyStatus />;
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
