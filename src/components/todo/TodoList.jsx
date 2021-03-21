import React, { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import _ from 'lodash';

import { NOTING_TO_DO } from '../../utils/constants/messages';

import todosResultAtom, {
  todosWithFilter, todosWithListQuery, todosWithHandle,
} from '../../recoil/todos';

import TodoItem from './TodoItem';
import EmptyStatus from './EmptyStatus';
import EmptyMessage from '../../styles/EmptyMessage';

const TodoList = () => {
  const { todos } = useRecoilValue(todosResultAtom);
  const filteredTodos = useRecoilValue(todosWithFilter);
  const loadTodos = useRecoilValue(todosWithListQuery);
  const setTodosResult = useSetRecoilState(todosWithHandle);

  useEffect(() => {
    if (loadTodos) {
      setTodosResult(loadTodos);
    }
  }, [loadTodos]);

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
};

export default TodoList;
