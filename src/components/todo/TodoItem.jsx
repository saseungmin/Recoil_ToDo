import React, { useState, createRef, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import _ from 'lodash';

import styled from '@emotion/styled';

import todosAtom from '../../recoil/todos/atom';
import { isCheckInputTrim, newTodos } from '../../utils/utils';

const ViewItemWrapper = styled.div``;

const EditItemWrapper = styled.input``;

const TodoItem = ({ item }) => {
  const { id, task, isComplete } = item;

  const editInput = createRef();

  const [editToggleState, setEditToggleState] = useState(false);
  const [todos, setTodos] = useRecoilState(todosAtom);

  const settingTodos = newTodos(todos);

  const handleRemove = (nowId) => {
    setTodos(todos.filter((todo) => todo.id !== nowId));
  };

  const handleToggle = (nowId, toggle) => {
    setTodos(settingTodos({
      id: nowId,
      key: 'isComplete',
      value: !toggle,
    }));
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

    setTodos(settingTodos({
      id: nowId,
      key: 'task',
      value,
    }));
  };

  const handleSubmitEdit = (e) => {
    const { key, currentTarget } = e;

    if (key === 'Enter' || key === 'Escape') {
      // eslint-disable-next-line no-unused-expressions
      isCheckInputTrim(currentTarget.value) && setEditToggleState(false);
    }
  };

  useEffect(() => {
    if (_.eq(editToggleState, true) && !_.isNull(editInput.current)) {
      editInput.current.focus();
    }
  }, [editToggleState, editInput]);

  return (
    <li>
      {!editToggleState ? (
        <ViewItemWrapper>
          <input
            type="checkbox"
            data-testid="todo-item"
            checked={isComplete}
            onChange={() => handleToggle(id, isComplete)}
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
        </ViewItemWrapper>
      )
        : (
          <EditItemWrapper
            value={task}
            ref={editInput}
            onBlur={handleBlurEdit}
            data-testid="todo-edit-input"
            onKeyPress={handleSubmitEdit}
            onChange={(e) => handleChangeEdit(e, id)}
          />
        )}
    </li>
  );
};

export default TodoItem;
