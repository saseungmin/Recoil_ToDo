import React, { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import _ from 'lodash';

import { NOTING_TO_DO } from '../../utils/constants/messages';

import userAtom from '../../recoil/user';
import todosResultAtom, { todosWithFilter } from '../../recoil/todos';

import TodoItem from './TodoItem';
import EmptyStatus from './EmptyStatus';
import EmptyMessage from '../../styles/EmptyMessage';
import useLoadCallback from '../../hooks/useLoadCallback';

function TodoList() {
  const loadTodos = useLoadCallback();

  const { user } = useRecoilValue(userAtom);
  const { todos } = useRecoilValue(todosResultAtom);
  const filteredTodos = useRecoilValue(todosWithFilter);

  useEffect(() => {
    if (user) {
      loadTodos();
    }
  }, [user]);

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
        <TodoItem
          key={todo._id}
          item={todo}
        />
      ))}
    </div>
  );
}

export default TodoList;
