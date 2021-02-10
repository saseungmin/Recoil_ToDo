import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Checkbox from '../../styles/Checkbox';

const TodoItemViewWrapper = styled.div`
  line-height: 1.2;
  word-break: break-all;
  display: block;
`;

const TodoItemTextWrapper = styled.span`
  ${({ isComplete }) => isComplete && css`
    color: gray;
    text-decoration: line-through;
  `}
  transition: color 0.5s;
`;

const TodoItemView = ({
  item, onDoubleClick, onRemove, onToggle,
}) => {
  const { task, isComplete } = item;

  return (
    <TodoItemViewWrapper>
      {isComplete
        ? (
          <Checkbox
            click
            checked
            onClick={onToggle}
            data-testid="todo-item"
          />
        )
        : (
          <Checkbox
            click
            onClick={onToggle}
            data-testid="todo-item"
          />
        )}
      <TodoItemTextWrapper
        isComplete={isComplete}
        data-testid="todo-text"
        onDoubleClick={onDoubleClick}
      >
        {task}
      </TodoItemTextWrapper>
      <button
        type="button"
        onClick={onRemove}
      >
        X
      </button>
    </TodoItemViewWrapper>
  );
};

export default TodoItemView;
