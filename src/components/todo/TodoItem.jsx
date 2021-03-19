import React, { useState, createRef, useEffect } from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import useRemoveCallback from '../../hooks/useRemoveCallback';
import useUpdateCallback from '../../hooks/useUpdateCallback';

import { isCheckInputTrim } from '../../utils/utils';

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

  const onRemoveTodo = useRemoveCallback();
  const onUpdateTodo = useUpdateCallback();

  const editInput = createRef();
  const [editToggleState, setEditToggleState] = useState(false);

  const checkKeyPress = (key) => (key === 'Enter' || key === 'Escape');

  const handleToggle = (id, toggle) => onUpdateTodo(id, {
    isComplete: !toggle,
  });

  const handleShowEdit = () => setEditToggleState(true);

  const handleBlurEdit = (e, id) => {
    const { value } = e.currentTarget;

    if (isCheckInputTrim(value)) {
      onUpdateTodo(id, {
        task: value,
      });

      setEditToggleState(false);
      return;
    }

    onRemoveTodo(id);
  };

  const handleSubmitEdit = (e, id) => {
    const { key, currentTarget: { value } } = e;

    if (checkKeyPress(key) && isCheckInputTrim(value)) {
      onUpdateTodo(id, {
        task: value,
      });

      setEditToggleState(false);
    }
  };

  useEffect(() => {
    const { current } = editInput;

    if (_.eq(editToggleState, true) && !_.isNull(current)) {
      current.focus();
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
              ref={editInput}
              defaultValue={task}
              data-testid="todo-edit-input"
              onBlur={(e) => handleBlurEdit(e, _id)}
              onKeyPress={(e) => handleSubmitEdit(e, _id)}
            />
          </EditWrapper>
        )}
    </>
  );
};

export default TodoItem;
