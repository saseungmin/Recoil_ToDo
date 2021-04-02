import React, { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

import { MAIN_TITLE } from './utils/constants/constants';

import { loadItem } from './services/storage';

import { themeModeAtom } from './recoil/common';
import useCheckCallback from './hooks/useCheckCallback';

import mq from './styles/responsive';
import AppBlock from './styles/AppBlock';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

import Footer from './components/footer/Footer';
import TodoList from './components/todo/TodoList';
import TodoInput from './components/input/TodoInput';
import AuthStatus from './components/auth/AuthStatus';
import TodoSubInfo from './components/info-bar/TodoSubInfo';
import UserStatus from './components/user-info/UserStatus';
import LoadingSpinner from './components/common/LoadingSpinner';
import ToggleThemeButton from './components/common/ToggleThemeButton';
import TodoStatusSnackbar from './components/common/TodoStatusSnackbar';
import AuthStatusSnackbar from './components/common/AuthStatusSnackbar';

const HeaderWrapper = styled.h1`
  ${mq({
    margin: ['1.2rem 0', '2rem 0', '3rem 0'],
    fontSize: ['1.4rem', '1.6rem', '2rem'],
  })};
  
  font-family: 'Hachi Maru Pop', cursive;
  color: ${({ theme }) => theme.subTone};
  text-align: center;
`;

const TodoContentWrapper = styled.div`
  ${mq({
    width: ['100%', '80vw', '700px'],
  })};

  margin-bottom: 3rem;
  border: 2px solid ${({ theme }) => theme.subTone};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const App = () => {
  const user = loadItem('user');

  const checkUser = useCheckCallback();
  const theme = useRecoilValue(themeModeAtom);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, []);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppBlock>
        <ToggleThemeButton />
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
        <AuthStatusSnackbar />
        <TodoStatusSnackbar />
      </AppBlock>
    </ThemeProvider>
  );
};

export default App;
