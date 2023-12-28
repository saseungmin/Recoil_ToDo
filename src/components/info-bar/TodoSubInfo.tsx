import React from 'react';

import styled from '@emotion/styled';

import facepaint from 'facepaint';

import TodoStats from './TodoStats';
import TodoClearButton from './TodoClearButton';
import TodoFilterButton from './TodoFilterButton';

const mq = facepaint([
  '@media(min-width: 383px)',
  '@media(min-width: 450px)',
  '@media(min-width: 760px)',
]);

const TodoSubInfoWrapper = styled.div`
  ${mq({
    padding: ['9px 10px', '17px 10px', '17px 15px'],
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

function TodoSubInfo() {
  return (
    <TodoSubInfoWrapper>
      <TodoClearButton />
      <TodoFilterButtonsWrapper>
        <TodoFilterButton type="ALL" />
        <TodoFilterButton type="ACTIVE" />
        <TodoFilterButton type="COMPLETED" />
      </TodoFilterButtonsWrapper>
      <TodoStats />
    </TodoSubInfoWrapper>
  );
}

export default TodoSubInfo;
