import React from 'react';

import { MAIN_TITLE } from '../utils/constants/constants';

import TodoInput from '../components/todo/TodoInput';
import TodoList from '../components/todo/TodoList';

const TodoPage = () => (
  <div>
    <h1>{MAIN_TITLE}</h1>
    <TodoInput />
    <TodoList />
  </div>
);

export default TodoPage;
