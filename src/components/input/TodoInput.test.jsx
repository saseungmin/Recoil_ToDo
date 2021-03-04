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

  const INPUT = '오늘의 할 일을 입력해주세요!';

  it('renders input placeholder text', () => {
    const { getByPlaceholderText } = renderTodoInput();

    expect(getByPlaceholderText(INPUT)).not.toBeNull();
  });

  describe('Listen event form submit', () => {
    context('With input value', () => {
      const value = '할 일1';
      it('The input value disappears', () => {
        const { getByPlaceholderText } = renderTodoInput();
        const input = getByPlaceholderText(INPUT);

        fireEvent.change(input, { target: { value } });

        expect(input).toHaveValue(value);

        fireEvent.submit(
          input,
          { key: 'Enter', code: '13' },
        );

        expect(input).toHaveValue('');
      });

      it('When the input value is present, the keypress action does not occur.', () => {
        const { getByPlaceholderText } = renderTodoInput();
        const input = getByPlaceholderText(INPUT);

        expect(input).toHaveStyle('border: none;');

        fireEvent.change(input, { target: { value } });

        expect(input).toHaveValue(value);

        fireEvent.keyPress(input, {
          key: 'Enter',
          code: 13,
          charCode: 13,
        });

        expect(input).toHaveStyle('border: none;');
      });
    });

    context('Without input value', () => {
      it('The color of the input placeholder changes to red.', () => {
        const { getByPlaceholderText } = renderTodoInput();
        const input = getByPlaceholderText(INPUT);

        fireEvent.submit(
          input,
          { key: 'Enter', code: '13' },
        );

        expect(input).toHaveStyle('border: 2px solid #f19066;');
      });

      it('When the input focus is out, the border of the input changes.', () => {
        const { getByPlaceholderText } = renderTodoInput();
        const input = getByPlaceholderText(INPUT);

        fireEvent.submit(
          input,
          { key: 'Enter', code: '13' },
        );

        expect(input).toHaveStyle('border: 2px solid #f19066;');

        fireEvent.blur(input);

        expect(input).toHaveStyle('border: none;');
      });

      it('When you press the enter key the input border changes.', () => {
        const { getByPlaceholderText } = renderTodoInput();
        const input = getByPlaceholderText(INPUT);

        fireEvent.submit(
          input,
          { key: 'Enter', code: '13' },
        );

        expect(input).toHaveStyle('border: 2px solid #f19066;');

        fireEvent.focus(input);

        fireEvent.keyPress(input, {
          key: 'Enter',
          code: 13,
          charCode: 13,
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