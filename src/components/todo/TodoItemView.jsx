import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import ReactTooltip from 'react-tooltip';

import DeleteSvg from '../../assets/icons/delete.svg';
import PencilSvg from '../../assets/icons/pencil.svg';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';
import Checkbox from '../../styles/Checkbox';

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
    width: ['82%', '87%', '90%'],
    fontSize: ['1.1rem', '1.3rem'],
  })};

  display: block;
  margin: 0 1rem;
  transition: color 0.5s;
  cursor: pointer;
  user-select: none;

  ${({ isComplete }) => isComplete && css`
    color: gray;
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

const PencilIcon = styled(PencilSvg)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-bottom: 3px;
`;

const EditTooltip = styled(ReactTooltip)`
  background: #91a7ff !important;
  opacity: 0.8 !important;

  &.place-top {
    &:after {
      border-top-color: #91a7ff !important;
      border-top-style: solid !important;
      border-top-width: 6px !important;
    }
  }

  & p {
    font-size: 0.9rem;
  }
`;

const EditTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TodoItemView = ({
  item, onDoubleClick, onRemove, onToggle,
}) => {
  const { task, isComplete, id } = item;

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
        data-tip
        data-for={id}
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
      <EditTooltip
        id={id}
      >
        <EditTooltipWrapper>
          <PencilIcon />
          <p>
            수정하려면 더블 클릭해주세요!
          </p>
        </EditTooltipWrapper>
      </EditTooltip>
    </TodoItemViewWrapper>
  );
};

export default TodoItemView;
