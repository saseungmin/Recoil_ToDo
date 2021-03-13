import React from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import { isCompleted, isActive } from '../../utils/utils';
import { COMPLETED_CLEAR_BUTTON } from '../../utils/constants/constants';

import { todosWithListQuery, todosResultAtom } from '../../recoil/todos';

const ClearButtonWrapper = styled.button`
  ${mq({
    fontSize: ['0.9rem', '1.2rem'],
    marginLeft: ['0px', '9px'],

  })};
  
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
  const { todos } = useRecoilValue(todosResultAtom);
  const setTodos = useSetRecoilState(todosWithListQuery);

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
