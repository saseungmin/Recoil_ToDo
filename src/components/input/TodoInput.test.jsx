import React from 'react';

import mockAxios from 'axios';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import TodoInput from './TodoInput';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoInput', () => {
  const renderTodoInput = () => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          user={given.user}
        />
        <TodoInput />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  context('With user', () => {
    const INPUT = '오늘의 할 일을 입력해주세요!';
    given('user', () => ({
      user: 'test',
      checkError: null,
    }));

    it('renders input placeholder text', () => {
      const { getByPlaceholderText } = renderTodoInput();

      expect(getByPlaceholderText(INPUT)).not.toBeNull();
    });

    describe('Listen event form submit', () => {
      context('With input value', () => {
        const value = '할 일1';
        it('The input value disappears and Renders Success message', async () => {
          const mockData = {
            data: 'mockData',
          };

          mockAxios.post.mockResolvedValueOnce(mockData);

          const { getByPlaceholderText, container } = renderTodoInput();
          const input = getByPlaceholderText(INPUT);

          await act(async () => {
            fireEvent.change(input, { target: { value } });
          });

          expect(input).toHaveValue(value);

          await act(async () => {
            fireEvent.submit(
              input,
              { key: 'Enter', code: '13' },
            );
          });

          expect(input).toHaveValue('');
          expect(container).toHaveTextContent('Success in entering To-Do');
        });

        it('When the input value is present, the keypress action does not occur.', async () => {
          const { getByPlaceholderText } = renderTodoInput();
          const input = getByPlaceholderText(INPUT);

          expect(input).toHaveStyle('border: none;');

          await act(async () => {
            fireEvent.change(input, { target: { value } });
          });

          expect(input).toHaveValue(value);

          await act(async () => {
            fireEvent.keyPress(input, {
              key: 'Enter',
              code: 13,
              charCode: 13,
            });
          });

          expect(input).toHaveStyle('border: none;');
        });
      });

      context('Without input value', () => {
        it('The color of the input placeholder changes to red.', async () => {
          const { getByPlaceholderText } = renderTodoInput();
          const input = getByPlaceholderText(INPUT);

          await act(async () => {
            fireEvent.submit(
              input,
              { key: 'Enter', code: '13' },
            );
          });

          expect(input).toHaveStyle('border: 2px solid #f19066;');
        });

        it('When the input focus is out, the border of the input changes.', async () => {
          const { getByPlaceholderText } = renderTodoInput();
          const input = getByPlaceholderText(INPUT);

          await act(async () => {
            fireEvent.submit(
              input,
              { key: 'Enter', code: '13' },
            );
          });

          expect(input).toHaveStyle('border: 2px solid #f19066;');

          await act(async () => {
            fireEvent.blur(input);
          });

          expect(input).toHaveStyle('border: none;');
        });

        it('When you press the enter key the input border changes.', async () => {
          const { getByPlaceholderText } = renderTodoInput();
          const input = getByPlaceholderText(INPUT);

          await act(async () => {
            fireEvent.submit(
              input,
              { key: 'Enter', code: '13' },
            );
          });

          expect(input).toHaveStyle('border: 2px solid #f19066;');

          await act(async () => {
            fireEvent.focus(input);

            fireEvent.keyPress(input, {
              key: 'Enter',
              code: 13,
              charCode: 13,
            });
          });

          expect(input).toHaveStyle('border: none;');
        });
      });
    });

    it('listens event call input change', () => {
      const { getByPlaceholderText } = renderTodoInput();
      const input = getByPlaceholderText(INPUT);

      fireEvent.change(
        input,
        { target: { value: '할 일1' } },
      );

      expect(input).toHaveValue('할 일1');
    });
  });

  context('Without user', () => {
    given('user', () => ({
      user: null,
      checkError: null,
    }));

    it('renders "Available after login."', () => {
      const { container } = renderTodoInput();

      expect(container).toHaveTextContent('로그인 후 이용 가능합니다.');
    });
  });
});
