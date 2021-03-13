import React from 'react';

import { render, fireEvent, act } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import mockAxios from 'axios';

import { SnackbarProvider } from 'notistack';

import { loadItem } from './services/storage';
import { todoResultState } from '../fixtures/recoil-atom-state';

import App from './App';
import InjectTestingRecoilState from './components/common/InjectTestingRecoilState';

const mockAuth = {
  type: '',
  visible: false,
};

const mockUser = {
  user: null,
  checkError: null,
};

jest.mock('./services/storage');
describe('App', () => {
  const renderApp = ({ auth = mockAuth, user = mockUser }) => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          todos={given.todos}
          auth={auth}
          user={user}
        />
        <App />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  it('renders App text', () => {
    const todos = [
      { _id: '1', task: '할 일1', isComplete: true },
    ];

    given('todos', () => ({
      ...todoResultState,
      todos,
    }));

    const { container } = renderApp({});

    expect(container).toHaveTextContent('What are your plans for today?');
    expect(container).toHaveTextContent('ALL');
    expect(container).toHaveTextContent('할 일1');
    expect(container).toHaveTextContent('CLEAR COMPLETED');
  });

  describe("render according to todo's filter state", () => {
    const todos = [
      { _id: '1', task: 'some task', isComplete: false },
      { _id: '2', task: '할 일2', isComplete: true },
    ];

    given('todos', () => ({
      ...todoResultState,
      todos,
    }));

    it('When the filter is ALL', () => {
      const { container, getByText } = renderApp({});

      fireEvent.click(getByText('ALL'));

      expect(container).toHaveTextContent('some task');
      expect(container).toHaveTextContent('할 일2');
    });

    it('When the filter is ACTIVE', () => {
      const { container, getByText } = renderApp({});

      fireEvent.click(getByText('ACTIVE'));

      expect(container).toHaveTextContent('some task');
      expect(container).not.toHaveTextContent('할 일2');
    });

    it('When the filter is COMPLETED', () => {
      const { container, getByText } = renderApp({});

      fireEvent.click(getByText('COMPLETED'));

      expect(container).not.toHaveTextContent('some task');
      expect(container).toHaveTextContent('할 일2');
    });
  });

  it('When you click the Clear completed button, the completed todo is deleted.', () => {
    const todos = [
      { _id: '1', task: '할 일1', isComplete: true },
    ];

    given('todos', () => ({
      ...todoResultState,
      todos,
    }));

    const { container, getByText } = renderApp({});

    expect(container).toHaveTextContent('할 일1');

    fireEvent.click(getByText('CLEAR COMPLETED'));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  describe('When the button is clicked, the member authentication modal window is displayed.', () => {
    const todos = [
      { _id: '1', task: '할 일1', isComplete: true },
    ];

    given('todos', () => ({
      ...todoResultState,
      todos,
    }));

    context('Is Sign in Modal', () => {
      it('When you click the "Sign in" button, the Sign in modal is shown.', async () => {
        const { getByPlaceholderText, getByText } = renderApp({});

        await act(async () => {
          fireEvent.click(getByText('Sign in'));
        });
        expect(getByPlaceholderText('아이디')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
      });
    });

    context('Is Sign up Modal', () => {
      it('When you click the "Sing in" button, the Sign in modal is shown.', async () => {
        const { getByPlaceholderText, getByText } = renderApp({});

        await act(async () => {
          fireEvent.click(getByText('Sign up'));
        });

        expect(getByPlaceholderText('아이디')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
      });
    });
  });

  it('Success logged in', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: 'test' });
    mockAxios.get.mockResolvedValueOnce({ data: 'test' });

    const props = {
      auth: {
        type: 'login',
        visible: true,
      },
    };

    const input = [
      { placeholder: '아이디', value: 'test' },
      { placeholder: '비밀번호', value: 'test' },
    ];

    const {
      container, getByTestId, getByPlaceholderText,
    } = renderApp(props);

    await act(async () => {
      input.forEach(async ({ placeholder, value }) => {
        await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('auth-submit-button'));
    });

    expect(container).toHaveTextContent('Success Sign in!');
  });

  describe('when logged in', () => {
    const user = {
      id: 'test',
    };

    const mockUserState = {
      user: 'test',
      checkError: null,
    };

    beforeEach(() => {
      loadItem.mockImplementation(() => user);
    });

    context('Have Success', () => {
      it('It has the user session value, so the Sign out button is visible.', async () => {
        mockAxios.get.mockResolvedValueOnce({ data: 'test' });
        let response;

        await act(async () => {
          response = renderApp({ user: mockUserState });
        });

        expect(response.container).toHaveTextContent('Sign out');
      });
    });
  });

  it('success logout', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: 'mock', status: '204' });

    const mockUserState = {
      user: 'test',
      checkError: null,
    };

    const { container, getByText } = renderApp({ user: mockUserState });

    await act(async () => {
      fireEvent.click(getByText('Sign out'));
    });

    expect(container).toHaveTextContent('Success Sign out!');
  });
});
