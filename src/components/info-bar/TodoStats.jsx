import React from 'react';

import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import Checkbox from '../../styles/Checkbox';
import todosWithStats from '../../recoil/todos/withStats';
import mq from '../../styles/responsive';

const StatsWrapper = styled.div`
  ${mq({
    position: ['absolute', 'unset'],
    right: ['9px', 'unset'],
    top: ['185px', 'unset'],
  })};

  display:flex;
  flex-direction: row;
  align-items: center;
`;

const StatsTextWrapper = styled.div`
  ${mq({
    fontSize: ['1.1rem', '1.2rem'],
  })};

  margin: 5px 9px 0 7px;
  user-select: none;
`;

const TodoStats = () => {
  const { totalCompletedNum, totalUnCompletedNum } = useRecoilValue(todosWithStats);

  return (
    <StatsWrapper>
      <Checkbox checked />
      <StatsTextWrapper
        data-testid="completed"
      >
        {totalCompletedNum}
      </StatsTextWrapper>
      <Checkbox />
      <StatsTextWrapper
        data-testid="active"
      >
        {totalUnCompletedNum}

      </StatsTextWrapper>
    </StatsWrapper>
  );
};

export default TodoStats;