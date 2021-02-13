import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import DeleteSvg from '../../assets/icons/delete.svg';

import Checkbox from '../../styles/Checkbox';
import palette from '../../styles/palette';

const TodoItemViewWrapper = styled.div`
  word-break: break-all;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 13px;
  border-bottom: 1px solid ${palette.border[0]};
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  div {
    display: inherit;
  }
`;

const TodoItemTextWrapper = styled.div`
  font-size: 1.2rem;
  display: block;
  width: 510px;
  margin: 0 1rem;
  transition: color 0.5s;

  ${({ isComplete }) => isComplete && css`
    color: gray;
    text-decoration: line-through;
  `}
`;

const DeleteIcon = styled(DeleteSvg)`
  top: 0;
  right: 12px;
  position: absolute;
  width: 23px;
  height: 23px;
  bottom: 0;
  margin: auto 0;
  margin-bottom: 13px;
  cursor: pointer;
`;

const TodoItemView = ({
  item, onDoubleClick, onRemove, onToggle,
}) => {
  const { task, isComplete } = item;

  return (
    <TodoItemViewWrapper>
      <div>
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
      </div>
      <TodoItemTextWrapper
        isComplete={isComplete}
        data-testid="todo-text"
        onDoubleClick={onDoubleClick}
      >
        {task}
      </TodoItemTextWrapper>
      <div>
        <DeleteIcon
          onClick={onRemove}
          data-testid="todo-delete"
        />
      </div>
    </TodoItemViewWrapper>
  );
};

export default TodoItemView;
