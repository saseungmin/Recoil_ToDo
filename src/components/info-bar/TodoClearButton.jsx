import React from 'react';

import { useRecoilState } from 'recoil';

import _ from 'lodash';

import { isCompleted, isActive } from '../../utils/utils';
import { COMPLETED_CLEAR_BUTTON } from '../../utils/constants/constants';

import todosAtom from '../../recoil/todos/atom';

const TodoClearButton = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);

  const completedTodos = todos.filter(isCompleted);

  const handleClick = () => {
    setTodos(todos.filter(isActive));
  };

  if (_.isEmpty(completedTodos)) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      {COMPLETED_CLEAR_BUTTON}
    </button>
  );
};

export default TodoClearButton;
