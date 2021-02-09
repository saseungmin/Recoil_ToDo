import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import TodoInput from './TodoInput';

describe('TodoInput', () => {
  const renderTodoInput = () => render((
    <RecoilRoot>
      <TodoInput />
    </RecoilRoot>
  ));

  it('renders input placeholder text', () => {
    const { getByPlaceholderText } = renderTodoInput();

    expect(getByPlaceholderText('오늘의 할 일을 입력하세요!')).not.toBeNull();
  });

  describe('Listen event form submit', () => {
    context('With input value', () => {
      const value = '할 일1';
      it('The input value disappears', () => {
        const { getByPlaceholderText } = renderTodoInput();
        const input = getByPlaceholderText('오늘의 할 일을 입력하세요!');

        fireEvent.change(input, { target: { value } });

        expect(input).toHaveValue(value);

        fireEvent.submit(
          input,
          { key: 'Enter', code: '13' },
        );

        expect(input).toHaveValue('');
      });
    });

    context('Without input value', () => {
      it('renders input error message "할 일을 입력하세요!"', () => {
        const { getByPlaceholderText } = renderTodoInput();
        const input = getByPlaceholderText('오늘의 할 일을 입력하세요!');

        fireEvent.submit(
          input,
          { key: 'Enter', code: '13' },
        );

        expect(input).toHaveStyle('border: 2px solid #ff8787;');
      });
    });
  });

  it('listens event call input change', () => {
    const { getByPlaceholderText } = renderTodoInput();
    const input = getByPlaceholderText('오늘의 할 일을 입력하세요!');

    fireEvent.change(
      input,
      { target: { value: '할 일1' } },
    );

    expect(input).toHaveValue('할 일1');
  });
});
