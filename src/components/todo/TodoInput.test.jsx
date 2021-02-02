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

  it('listen event form submit', () => {
    const { getByPlaceholderText } = renderTodoInput();
    const input = getByPlaceholderText('오늘의 할 일을 입력하세요!');

    fireEvent.submit(
      input,
      { key: 'Enter', code: '13' },
    );

    expect(input).toHaveValue('');
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
