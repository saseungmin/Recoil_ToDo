import React from 'react';

import { MAIN_TITLE } from './utils/constants/constants';

import TodoList from './components/todo/TodoList';
import TodoInput from './components/input/TodoInput';
import TodoFilter from './components/info-bar/TodoFilter';

const App = () => (
  <>
    <h1>{MAIN_TITLE}</h1>
    <TodoInput />
    <TodoFilter />
    <TodoList />
  </>
);

export default App;
