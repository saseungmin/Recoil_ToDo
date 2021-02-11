import React from 'react';

import { useRecoilState } from 'recoil';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { isCompleted, isActive } from '../../utils/utils';
import { COMPLETED_CLEAR_BUTTON } from '../../utils/constants/constants';

import todosAtom from '../../recoil/todos/atom';
import palette from '../../styles/palette';

const ClearButtonWrapper = styled.button`
  font-size: 1.1rem;
  border: none;
  padding: 0;
  background: none;
  transition: color 0.3s;
  
  ${({ disabled }) => disabled && css`
    cursor: unset;
  `};

  ${({ disabled }) => !disabled && css`
    &:hover {
      color: ${palette.active[0]};
    }
  `};
`;

const TodoClearButton = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);

  const handleClick = () => {
    setTodos(todos.filter(isActive));
  };

  if (_.isEmpty(todos.filter(isCompleted))) {
    return (
      <ClearButtonWrapper type="button" disabled>
        {COMPLETED_CLEAR_BUTTON}
      </ClearButtonWrapper>
    );
  }

  return (
    <ClearButtonWrapper
      type="button"
      onClick={handleClick}
    >
      {COMPLETED_CLEAR_BUTTON}
    </ClearButtonWrapper>
  );
};

export default TodoClearButton;
