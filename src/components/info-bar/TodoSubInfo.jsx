import React from 'react';

import styled from '@emotion/styled';

import { FILTER_TYPE_BUTTON } from '../../utils/constants/constants';

import TodoStats from './TodoStats';
import TodoClearButton from './TodoClearButton';
import TodoFilterButton from './TodoFilterButton';

const { ALL, ACTIVE, COMPLETED } = FILTER_TYPE_BUTTON;

const TodoSubInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 10px;
  border-bottom: 2px solid #fab1a0;
  box-shadow: inset 0 0px 40px #fdcb6e;
`;

const TodoFilterButtonWrapper = styled.div`
`;

const TodoSubInfo = () => (
  <TodoSubInfoWrapper>
    <TodoClearButton />
    <TodoFilterButtonWrapper>
      <TodoFilterButton type={ALL} />
      <TodoFilterButton type={ACTIVE} />
      <TodoFilterButton type={COMPLETED} />
    </TodoFilterButtonWrapper>
    <TodoStats />
  </TodoSubInfoWrapper>
);

export default TodoSubInfo;
