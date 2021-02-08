import React from 'react';

import { FILTER_TYPE_BUTTON } from '../../utils/constants/constants';

import TodoStats from './TodoStats';
import TodoClearButton from './TodoClearButton';
import TodoFilterButton from './TodoFilterButton';

const { ALL, ACTIVE, COMPLETED } = FILTER_TYPE_BUTTON;

const TodoSubInfo = () => (
  <div>
    <TodoClearButton />
    <TodoFilterButton type={ALL} />
    <TodoFilterButton type={ACTIVE} />
    <TodoFilterButton type={COMPLETED} />
    <TodoStats />
  </div>
);

export default TodoSubInfo;
