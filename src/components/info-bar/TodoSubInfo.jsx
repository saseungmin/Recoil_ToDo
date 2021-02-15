import React from 'react';

import styled from '@emotion/styled';

import { FILTER_TYPE_BUTTON } from '../../utils/constants/constants';

import mq from '../../styles/responsive';

import TodoStats from './TodoStats';
import TodoClearButton from './TodoClearButton';
import TodoFilterButton from './TodoFilterButton';

const { ALL, ACTIVE, COMPLETED } = FILTER_TYPE_BUTTON;

const TodoSubInfoWrapper = styled.div`
  ${mq({
    padding: ['17px 12px', '17px 15px'],
  })};
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #fab1a0;
  box-shadow: inset 0 0px 40px #fdcb6e;
`;

const TodoFilterButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TodoSubInfo = () => (
  <TodoSubInfoWrapper>
    <TodoClearButton />
    <TodoFilterButtonsWrapper>
      <TodoFilterButton type={ALL} />
      <TodoFilterButton type={ACTIVE} />
      <TodoFilterButton type={COMPLETED} />
    </TodoFilterButtonsWrapper>
    <TodoStats />
  </TodoSubInfoWrapper>
);

export default TodoSubInfo;
