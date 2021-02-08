import React from 'react';

import { render } from '@testing-library/react';

import TodoFilterButton from './TodoFilterButton';

describe('TodoFilterButton', () => {
  const renderTodoFilterButton = (type) => render((
    <TodoFilterButton
      type={type}
    />
  ));

  it('render filter button', () => {
    const type = 'All';

    const { container } = renderTodoFilterButton(type);

    expect(container).toHaveTextContent(type);
  });
});
