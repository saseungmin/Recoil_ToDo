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
  
  background: ${({ theme }) => theme.subTone};
  display: flex;
  align-items: center;
  justify-content: space-between;
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
