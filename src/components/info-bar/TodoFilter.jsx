import React from 'react';

import { useSetRecoilState } from 'recoil';

import { filterAtom } from '../../recoil/todos/atom';
import { FILTER_TYPE_BUTTON } from '../../utils/constants/constants';

import TodoFilterButton from './TodoFilterButton';

const { ALL, ACTIVE, COMPLETED } = FILTER_TYPE_BUTTON;

const TodoFilter = () => {
  const setFilter = useSetRecoilState(filterAtom);

  const updateFilter = (e) => {
    const { value } = e.target;

    setFilter(value);
  };

  return (
    <div>
      <TodoFilterButton type={ALL} onClick={updateFilter} />
      <TodoFilterButton type={ACTIVE} onClick={updateFilter} />
      <TodoFilterButton type={COMPLETED} onClick={updateFilter} />
    </div>
  );
};

export default TodoFilter;
