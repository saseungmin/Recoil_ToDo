import React from 'react';

import { useRecoilValue } from 'recoil';

import Checkbox from '../../styles/Checkbox';
import todosWithStats from '../../recoil/todos/withStats';

const TodoStats = () => {
  const { totalCompletedNum, totalUnCompletedNum } = useRecoilValue(todosWithStats);

  return (
    <>
      <Checkbox checked />
      <span
        id="completed"
        data-testid="completed"
      >
        {totalCompletedNum}
      </span>
      <Checkbox />
      <span
        id="active"
        data-testid="active"
      >
        {totalUnCompletedNum}

      </span>
    </>
  );
};

export default TodoStats;
