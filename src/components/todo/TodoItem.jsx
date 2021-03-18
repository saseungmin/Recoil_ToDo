import React, { useState, createRef, useEffect } from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import _ from 'lodash';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import useRemoveCallback from '../../hooks/useRemoveCallback';
import useUpdateCallback from '../../hooks/useUpdateCallback';

import { todosResultAtom, todosWithListQuery } from '../../recoil/todos';

import { isCheckInputTrim, newTodos } from '../../utils/utils';

import TodoItemView from './TodoItemView';

const EditWrapper = styled.div`
  display: flex;
`;

const EditSpaceWrapper = styled.div`
  width: 45px;
  border-bottom: 1px solid ${palette.border[0]};
`;

const EditItemWrapper = styled.input`
  ${mq({
    fontSize: ['1rem', '1.3rem'],
  })};
  
  color: ${palette.text[2]};
  width: 100%;
  display: block;
  padding: 18px 13px;
  border: 1px solid #999;
  border-radius: 0px;
  box-shadow: inset 0 -1px 5px 0 rgb(0 0 0 / 20%);
  background: #f1f2f6;
`;

const TodoItem = ({ item }) => {
  const { _id, task, isComplete } = item;

  const editInput = createRef();

  const onRemoveTodo = useRemoveCallback();
  const onUpdateTodo = useUpdateCallback();

  const { todos } = useRecoilValue(todosResultAtom);
  const setTodos = useSetRecoilState(todosWithListQuery);
  const [editToggleState, setEditToggleState] = useState(false);

  const settingTodos = newTodos(todos);

  const handleToggle = (id, toggle) => onUpdateTodo(id, {
    isComplete: !toggle,
  });

  const handleShowEdit = () => setEditToggleState(true);

  const handleBlurEdit = (e, id) => {
    const { value } = e.currentTarget;

    if (isCheckInputTrim(value)) {
      setEditToggleState(false);
      return;
    }

    onRemoveTodo(id);
  };

  const handleChangeEdit = (e, id) => {
    const { value } = e.target;

    setTodos(settingTodos({
      _id: id,
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
        <TodoItemView
          item={item}
          onShowEdit={handleShowEdit}
          onRemove={() => onRemoveTodo(_id)}
          onToggle={() => handleToggle(_id, isComplete)}
        />
      )
        : (
          <EditWrapper>
            <EditSpaceWrapper />
            <EditItemWrapper
              value={task}
              ref={editInput}
              data-testid="todo-edit-input"
              onKeyPress={handleSubmitEdit}
              onBlur={(e) => handleBlurEdit(e, _id)}
              onChange={(e) => handleChangeEdit(e, _id)}
            />
          </EditWrapper>
        )}
    </>
  );
};

export default TodoItem;
