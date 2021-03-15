import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { useRecoilValue, useRecoilCallback } from 'recoil';

import { userCheckErrorHandling } from './utils/utils';
import { MAIN_TITLE } from './utils/constants/constants';
import { TODOS_RESULT_ATOM_KEY } from './utils/constants/atomKey';

import userAtom, { userWithCheck } from './recoil/user';
import { todosResultAtom } from './recoil/todos';

import { saveItem, loadItem } from './services/storage';

import mq from './styles/responsive';
import palette from './styles/palette';
import AppBlock from './styles/AppBlock';

import Footer from './components/footer/Footer';
import TodoList from './components/todo/TodoList';
import TodoInput from './components/input/TodoInput';
import AuthStatus from './components/auth/AuthStatus';
import TodoSubInfo from './components/info-bar/TodoSubInfo';
import UserStatus from './components/user-info/UserStatus';
import LoadingSpinner from './components/common/LoadingSpinner';

const HeaderWrapper = styled.h1`
  ${mq({
    margin: ['1.2rem 0', '2rem 0', '3rem 0'],
    fontSize: ['1.4rem', '1.6rem', '2rem'],
  })};
  
  font-family: 'Hachi Maru Pop', cursive;
  color: ${palette.twoTone[0]};
  text-align: center;
`;

const TodoContentWrapper = styled.div`
  ${mq({
    width: ['100%', '80vw', '700px'],
  })};

  margin-bottom: 3rem;
  border: 2px solid ${palette.twoTone[0]};
  box-shadow: ${palette.hoverTwoTone[0]} 0px 2px 10px 0px;
`;

const App = () => {
  const user = loadItem('user');

  const { todos } = useRecoilValue(todosResultAtom);
  const checkUser = useRecoilCallback(({ snapshot, set }) => async () => {
    const { data } = await userCheckErrorHandling(snapshot.getPromise(userWithCheck()));
    set(userAtom, { user: data });
  }, []);

  useEffect(() => {
    saveItem(TODOS_RESULT_ATOM_KEY, todos);
  }, [todos]);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, []);

  return (
    <AppBlock>
      <HeaderWrapper>
        {MAIN_TITLE}
      </HeaderWrapper>
      <UserStatus />
      <TodoInput />
      <TodoContentWrapper>
        <TodoSubInfo />
        <TodoList />
      </TodoContentWrapper>
      <Footer />
      <AuthStatus />
      <LoadingSpinner />
    </AppBlock>
  );
};

export default App;
