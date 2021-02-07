import React from 'react';

import { render } from '@testing-library/react';

import TodoFilterButton from './TodoFilterButton';

describe('TodoFilterButton', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderTodoFilterButton = (type) => render((
    <TodoFilterButton
      type={type}
      onClick={handleClick}
    />
  ));

  it('render filter button', () => {
    const type = 'All';

    const { container } = renderTodoFilterButton(type);

    expect(container).toHaveTextContent(type);
  });
});
