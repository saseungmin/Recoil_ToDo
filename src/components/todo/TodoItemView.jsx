import React from 'react';

import { useMediaQuery } from 'react-responsive';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import DeleteSvg from '../../assets/icons/delete.svg';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';
import Checkbox from '../../styles/Checkbox';

import EditShowTool from './EditShowTool';

const TodoItemViewWrapper = styled.div`
  word-break: break-all;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 18px 13px;
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
  ${mq({
    width: ['73%', '87%', '90%'],
    fontSize: ['1rem', '1.3rem'],
  })};

  color: ${palette.text[2]};
  user-select: none;
  display: block;
  margin: 0 1rem;
  transition: color 0.5s;
  cursor: pointer;

  ${({ onDoubleClick }) => !onDoubleClick && css`
    cursor: unset;
  `}

  ${({ isComplete }) => isComplete && css`
    color: ${palette.gray[6]};
    text-decoration: line-through;
  `}
`;

const DeleteIcon = styled(DeleteSvg)`
  ${mq({
    width: ['23px', '25px'],
    height: ['23px', '25px'],
  })};

  top: 0;
  right: 15px;
  position: absolute;
  bottom: 0;
  margin: auto 0;
  margin-bottom: 18px;
  cursor: pointer;
`;

const TodoItemView = ({
  item, onShowEdit, onRemove, onToggle,
}) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 450px)' });

  const { task, isComplete, _id } = item;

  return (
    <TodoItemViewWrapper>
      <Checkbox
        click
        checked={isComplete}
        onClick={onToggle}
        data-testid="todo-item"
      />
      <TodoItemTextWrapper
        isComplete={isComplete}
        data-tip
        data-for={_id}
        data-testid="todo-text"
        onDoubleClick={isMobileScreen ? undefined : onShowEdit}
      >
        {task}
      </TodoItemTextWrapper>
      <EditShowTool
        id={_id}
        isMobile={isMobileScreen}
        onShowEdit={onShowEdit}
      />
      <DeleteIcon
        onClick={onRemove}
        data-testid="todo-delete"
      />
    </TodoItemViewWrapper>
  );
};

export default TodoItemView;
