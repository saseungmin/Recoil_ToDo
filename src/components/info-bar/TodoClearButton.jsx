import React from 'react';

import { useRecoilValue } from 'recoil';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import { isCompleted } from '../../utils/utils';
import { COMPLETED_CLEAR_BUTTON } from '../../utils/constants/constants';

import todosResultAtom from '../../recoil/todos';

import useMultipleRemoveCallback from '../../hooks/useMultipleRemoveCallback';

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
    color: ${palette.gray[5]};

    cursor: unset;
  `};

  ${({ disabled }) => !disabled && css`
    color: ${palette.twoTone[1]};

    &:hover {
      color: ${palette.active[0]};
    }
  `};
`;

const separateObjectId = (todos) => todos
  .filter(isCompleted)
  .map(({ _id }) => _id);

const TodoClearButton = () => {
  const multipleRemove = useMultipleRemoveCallback();

  const { todos } = useRecoilValue(todosResultAtom);

  const handleClick = () => multipleRemove(separateObjectId(todos));

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
