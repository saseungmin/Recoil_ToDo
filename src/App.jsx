import React from 'react';

import { MAIN_TITLE } from './utils/constants/constants';

import TodoList from './components/todo/TodoList';
import TodoInput from './components/input/TodoInput';
import TodoSubInfo from './components/info-bar/TodoSubInfo';

const App = () => (
  <>
    <h1>{MAIN_TITLE}</h1>
    <TodoInput />
    <TodoSubInfo />
    <TodoList />
  </>
);

export default App;
