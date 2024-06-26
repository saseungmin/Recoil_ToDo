import React, {
  useState, createRef, useEffect, FocusEvent, KeyboardEvent,
} from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import { Todo } from 'src/recoil/todos/atom';
import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import useRemoveCallback from '../../hooks/useRemoveCallback';
import useUpdateCallback from '../../hooks/useUpdateCallback';

import { isCheckInputTrim } from '../../utils/utils';

import TodoItemView from './TodoItemView';

const EditWrapper = styled.div`
  ${mq({
    height: ['57px', '62px'],
  })};

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
  margin: 0px;
  padding: 0 13px;
  border: 1px solid #999;
  border-radius: 0px;
  box-shadow: inset 0 -1px 5px 0 rgb(0 0 0 / 20%);
  background: ${({ theme }) => theme.edit};
`;

type Props = {
  item: Todo;
};

function TodoItem({ item }: Props) {
  const { task, isComplete } = item;

  const onRemoveTodo = useRemoveCallback();
  const onUpdateTodo = useUpdateCallback();

  const editInput = createRef<HTMLInputElement>();
  const [editToggleState, setEditToggleState] = useState(false);

  const checkKeyPress = (key: string) => (key === 'Enter' || key === 'Escape');

  const handleToggle = (id: string, toggle: boolean) => onUpdateTodo(id, {
    isComplete: !toggle,
  });

  const handleShowEdit = () => setEditToggleState(true);

  const handleBlurEdit = (e: FocusEvent<HTMLInputElement>, id: string) => {
    const { value } = e.currentTarget;

    if (isCheckInputTrim(value)) {
      setEditToggleState(false);
      return;
    }

    onRemoveTodo(id);
  };

  const handleSubmitEdit = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
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

  if (!editToggleState) {
    return (
      <TodoItemView
        item={item}
        onShowEdit={handleShowEdit}
        onRemove={() => onRemoveTodo(item._id)}
        onToggle={() => handleToggle(item._id, isComplete)}
      />
    );
  }

  return (
    <EditWrapper>
      <EditSpaceWrapper />
      <EditItemWrapper
        ref={editInput}
        defaultValue={task}
        data-testid="todo-edit-input"
        onBlur={(e) => handleBlurEdit(e, item._id)}
        onKeyPress={(e) => handleSubmitEdit(e, item._id)}
      />
    </EditWrapper>
  );
}

export default TodoItem;
