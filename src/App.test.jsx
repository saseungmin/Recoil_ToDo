import React from 'react';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import mockAxios from 'axios';

import { SnackbarProvider } from 'notistack';

import { loadItem } from './services/storage';

import mockToken from '../fixtures/token';
import { todoResultState, userState, authState } from '../fixtures/recoil-atom-state';

import App from './App';
import InjectTestingRecoilState from './components/common/InjectTestingRecoilState';

const mockGetApi = (response) => mockAxios.get.mockResolvedValueOnce(response);

const mockPostApi = (response) => mockAxios.post.mockResolvedValueOnce(response);

jest.mock('./services/storage');
describe('App', () => {
  const renderApp = ({ auth = authState, user = userState }) => render((
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

        fireEvent.click(getByText('Sign in'));

        expect(getByPlaceholderText('아이디')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
      });
    });

    context('Is Sign up Modal', () => {
      it('When you click the "Sing in" button, the Sign in modal is shown.', async () => {
        const { getByPlaceholderText, getByText } = renderApp({});

        fireEvent.click(getByText('Sign up'));

        expect(getByPlaceholderText('아이디')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
      });
    });
  });

  describe('When the recoil API call is successful, a success message appears.', () => {
    mockPostApi({
      data: {
        access_token: mockToken,
      },
    });
    mockGetApi({ data: { user: 'test' } });
    mockGetApi({
      data: [
        { _id: '2', task: '할 일2', isComplete: false },
      ],
    });

    const mockUserState = {
      user: 'test',
      checkError: null,
    };

    it('When you click the Clear completed button, the completed todo is deleted.', async () => {
      const todos = [
        { _id: '1', task: '할 일1', isComplete: true },
      ];

      given('todos', () => ({
        ...todoResultState,
        todos,
      }));

      const { container, getByText } = renderApp({});

      expect(container).toHaveTextContent('할 일1');

      await act(async () => {
        fireEvent.click(getByText('CLEAR COMPLETED'));
      });

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).toHaveTextContent('All completed To-Dos have been deleted!');
    });

    it('Success logged in', async () => {
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
        input.forEach(({ placeholder, value }) => {
          fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
        });
      });

      await act(async () => {
        fireEvent.submit(getByTestId('auth-submit-button'));
      });

      expect(container).toHaveTextContent('Successful Sign in!');
    });

    it('render todo list contents', async () => {
      let response;

      await act(async () => {
        response = renderApp({ user: mockUserState });
      });

      expect(response.container).toHaveTextContent('할 일2');
    });

    describe('when logged in have success status', () => {
      const user = {
        id: 'test',
      };

      beforeEach(() => {
        loadItem.mockImplementation(() => user);
      });

      it('It has the user session value, so the Sign out button is visible.', async () => {
        mockGetApi({ data: { user: 'test' } });
        let response;

        await act(async () => {
          response = renderApp({ user: mockUserState });
        });

        expect(response.container).toHaveTextContent('Sign out');
      });
    });

    describe('When submit action todo input is successful', () => {
      const value = '할 일을 입력';

      const mockData = {
        data: {
          _id: '1', task: value, isComplete: false,
        },
      };

      it('Render success message "Success in entering To-Do!"', async () => {
        mockPostApi(mockData);

        const { container, getByPlaceholderText } = renderApp({ user: mockUserState });

        const input = getByPlaceholderText('오늘의 할 일을 입력해주세요!');

        await act(async () => {
          fireEvent.change(input, { target: { value } });

          fireEvent.submit(
            input,
            { key: 'Enter', code: '13' },
          );
        });

        expect(input).toHaveValue('');
        expect(container).toHaveTextContent('Success in entering To-Do!');
      });
    });

    it('Success Sign up', async () => {
      mockPostApi({
        data: {
          access_token: mockToken,
        },
      });

      const props = {
        auth: {
          type: 'register',
          visible: true,
        },
      };

      const input = [
        { placeholder: '아이디', value: 'test' },
        { placeholder: '비밀번호', value: 'test' },
        { placeholder: '비밀번호 확인', value: 'test' },
      ];

      const {
        container, getByTestId, getByPlaceholderText,
      } = renderApp(props);

      await act(async () => {
        input.forEach(({ placeholder, value }) => {
          fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
        });
      });

      await act(async () => {
        fireEvent.submit(getByTestId('auth-submit-button'));
      });

      expect(container).toHaveTextContent('Successful Sign up!');
    });
  });
});
