import React from 'react';

import { useRecoilValue } from 'recoil';

import todosWithStats from '../../recoil/todos/withStats';

const TodoStats = () => {
  const { totalCompletedNum, totalUnCompletedNum } = useRecoilValue(todosWithStats);

  return (
    <>
      <label htmlFor="active">남은 할 일</label>
      <span id="active" data-testid="active">{totalUnCompletedNum}</span>
      <label htmlFor="completed">완료된 할 일</label>
      <span id="completed" data-testid="completed">{totalCompletedNum}</span>
    </>
  );
};

export default TodoStats;
