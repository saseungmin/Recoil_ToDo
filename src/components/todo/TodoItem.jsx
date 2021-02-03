import React from 'react';

import { useRecoilState } from 'recoil';

import { toggleTodo } from '../../utils/utils';

import todosAtom from '../../recoil/todos/atom';

const Todo = ({ item }) => {
  const { id, task, isComplete } = item;

  const [todos, setTodos] = useRecoilState(todosAtom);

  const handleRemove = (nowId) => {
    setTodos(todos.filter((todo) => todo.id !== nowId));
  };

  const handleToggle = (nowId) => {
    setTodos(todos.map((todo) => toggleTodo(todo)(nowId)));
  };

  return (
    <div>
      <input
        type="checkbox"
        data-testid="todo-item"
        checked={isComplete}
        onChange={() => handleToggle(id)}
      />
      <span>
        {task}
      </span>
      <button
        type="button"
        onClick={() => handleRemove(id)}
      >
        X
      </button>
    </div>
  );
};

export default Todo;
