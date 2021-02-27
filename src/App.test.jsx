import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import App from './App';
import InjectTestingRecoilState from './components/common/InjectTestingRecoilState';

describe('App', () => {
  const renderApp = ({ todos }) => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          todos={todos}
        />
        <App />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  it('renders App text', () => {
    const todos = [
      { id: '1', task: '할 일1', isComplete: true },
    ];

    const { container } = renderApp({ todos });

    expect(container).toHaveTextContent('What are your plans for today?');
    expect(container).toHaveTextContent('ALL');
    expect(container).toHaveTextContent('할 일1');
    expect(container).toHaveTextContent('CLEAR COMPLETED');
  });

  describe("render according to todo's filter state", () => {
    const todos = [
      { id: '1', task: 'some task', isComplete: false },
      { id: '2', task: '할 일2', isComplete: true },
    ];
    it('When the filter is ALL', () => {
      const { container, getByText } = renderApp({ todos });

      fireEvent.click(getByText('ALL'));

      expect(container).toHaveTextContent('some task');
      expect(container).toHaveTextContent('할 일2');
    });

    it('When the filter is ACTIVE', () => {
      const { container, getByText } = renderApp({ todos });

      fireEvent.click(getByText('ACTIVE'));

      expect(container).toHaveTextContent('some task');
      expect(container).not.toHaveTextContent('할 일2');
    });

    it('When the filter is COMPLETED', () => {
      const { container, getByText } = renderApp({ todos });

      fireEvent.click(getByText('COMPLETED'));

      expect(container).not.toHaveTextContent('some task');
      expect(container).toHaveTextContent('할 일2');
    });
  });

  it('When you click the Clear completed button, the completed todo is deleted.', () => {
    const todos = [
      { id: '1', task: '할 일1', isComplete: true },
    ];

    const { container, getByText } = renderApp({ todos });

    expect(container).toHaveTextContent('할 일1');

    fireEvent.click(getByText('CLEAR COMPLETED'));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  describe('When the button is clicked, the member authentication modal window is displayed.', () => {
    const todos = [
      { id: '1', task: '할 일1', isComplete: true },
    ];

    context('Is Sign in Modal', () => {
      it('When you click the "Sign in" button, the Sign in modal is shown.', () => {
        const { getByPlaceholderText, getByText } = renderApp({ todos });

        fireEvent.click(getByText('Sign in'));

        expect(getByPlaceholderText('아이디')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
      });
    });

    context('Is Sign up Modal', () => {
      it('When you click the "Sing in" button, the Sign in modal is shown.', () => {
        const { getByPlaceholderText, getByText } = renderApp({ todos });

        fireEvent.click(getByText('Sign up'));

        expect(getByPlaceholderText('아이디')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
      });
    });
  });
});
