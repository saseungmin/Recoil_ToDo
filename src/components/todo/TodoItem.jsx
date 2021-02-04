import React, { useState, createRef, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import _ from 'lodash';

import todosAtom from '../../recoil/todos/atom';
import { toggleTodo, isCheckInputTrim } from '../../utils/utils';

const TodoItem = ({ item }) => {
  const { id, task, isComplete } = item;

  const editInput = createRef();

  const [editToggleState, setEditToggleState] = useState(false);
  const [todos, setTodos] = useRecoilState(todosAtom);

  useEffect(() => {
    if (_.eq(editToggleState, true) && !_.isNull(editInput.current)) {
      editInput.current.focus();
    }
  }, [editToggleState, editInput]);

  const handleRemove = (nowId) => {
    setTodos(todos.filter((todo) => todo.id !== nowId));
  };

  const handleToggle = (nowId) => {
    setTodos(todos.map((todo) => toggleTodo(todo)(nowId)));
  };

  const onDoubleClick = () => {
    setEditToggleState(true);
  };

  const handleBlurEdit = (e) => {
    const { value } = e.currentTarget;

    if (isCheckInputTrim(value)) {
      setEditToggleState(false);
      return;
    }

    handleRemove(id);
  };

  const handleChangeEdit = (e, nowId) => {
    const { value } = e.target;

    const newTodos = todos.map((todo) => {
      if (todo.id === nowId) {
        return {
          ...todo,
          task: value,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleSubmitEdit = (e) => {
    const { key, currentTarget } = e;

    if (key === 'Enter' || key === 'Escape') {
      // eslint-disable-next-line no-unused-expressions
      isCheckInputTrim(currentTarget.value) && setEditToggleState(false);
    }
  };

  return (
    <li>
      <div>
        <input
          type="checkbox"
          data-testid="todo-item"
          checked={isComplete}
          onChange={() => handleToggle(id)}
        />
        <span
          data-testid="todo-span"
          onDoubleClick={onDoubleClick}
        >
          {task}
        </span>
        <button
          type="button"
          onClick={() => handleRemove(id)}
        >
          X
        </button>
      </div>
      <input
        value={task}
        ref={editInput}
        onBlur={handleBlurEdit}
        data-testid="todo-edit-input"
        onKeyPress={handleSubmitEdit}
        onChange={(e) => handleChangeEdit(e, id)}
      />
    </li>
  );
};

export default TodoItem;
