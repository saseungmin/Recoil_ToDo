import React, { useState, createRef, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import _ from 'lodash';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import todosAtom from '../../recoil/todos/atom';

import { isCheckInputTrim, newTodos } from '../../utils/utils';

import TodoItemView from './TodoItemView';

const EditWrapper = styled.div`
  display: flex;
`;

const EditSpaceWrapper = styled.div`
  width: 45px;
  height: auto;
  border-bottom: 1px solid ${palette.border[0]};
`;

const EditItemWrapper = styled.input`
  ${mq({
    fontSize: ['1rem', '1.3rem'],
  })};
  
  width: 100%;
  display: block;
  padding: 18px 13px;
  border: 1px solid #999;
  border-radius: 0px;
  box-shadow: inset 0 -1px 5px 0 rgb(0 0 0 / 20%);
  background: #f1f2f6;
`;

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

  const handleShowEdit = () => {
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
    <>
      {!editToggleState ? (
        <>
          <TodoItemView
            item={item}
            onShowEdit={handleShowEdit}
            onRemove={() => handleRemove(id)}
            onToggle={() => handleToggle(id, isComplete)}
          />
        </>
      )
        : (
          <EditWrapper>
            <EditSpaceWrapper />
            <EditItemWrapper
              value={task}
              ref={editInput}
              onBlur={handleBlurEdit}
              data-testid="todo-edit-input"
              onKeyPress={handleSubmitEdit}
              onChange={(e) => handleChangeEdit(e, id)}
            />
          </EditWrapper>
        )}
    </>
  );
};

export default TodoItem;
