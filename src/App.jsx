import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { useRecoilValue } from 'recoil';

import { MAIN_TITLE, TODOS_ATOM_KEY } from './utils/constants/constants';

import todosAtom from './recoil/todos/atom';
import { saveItem } from './services/storage';

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
  margin-bottom: 5rem;
  border: 2px solid ${palette.border[0]};
  box-shadow: ${palette.border[0]} 0px 4px 16px 0px;
`;

const App = () => {
  const todosState = useRecoilValue(todosAtom);

  useEffect(() => {
    saveItem(TODOS_ATOM_KEY, todosState);
  }, [todosState]);

  return (
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
};

export default App;
