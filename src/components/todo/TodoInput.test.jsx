import React from 'react';

import { render } from '@testing-library/react';

import TodoInput from './TodoInput';

describe('TodoInput', () => {
  const renderTodoInput = () => render(<TodoInput />);

  it('renders input placeholder text', () => {
    const { getByPlaceholderText } = renderTodoInput();

    expect(getByPlaceholderText('오늘의 할 일을 입력하세요!')).not.toBeNull();
  });
});
