import React from 'react';

import styled from '@emotion/styled';

import { MAIN_TITLE } from './utils/constants/constants';

import palette from './styles/palette';
import Responsive from './styles/Responsive';

import TodoList from './components/todo/TodoList';
import TodoInput from './components/input/TodoInput';
import TodoSubInfo from './components/info-bar/TodoSubInfo';

const HeaderWrapper = styled.h1`
  margin: 3rem 0;
  text-align: center;
`;

const TodoContentWrapper = styled.div`
  border: 2px solid ${palette.border[0]};
  padding: 3rem;
  box-shadow: ${palette.border[0]} 0px 4px 16px 0px;
`;

const App = () => (
  <Responsive>
    <HeaderWrapper>
      {MAIN_TITLE}
    </HeaderWrapper>
    <TodoInput />
    <TodoContentWrapper>
      <TodoSubInfo />
      <TodoList />
    </TodoContentWrapper>
  </Responsive>
);

export default App;
