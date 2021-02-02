import React from 'react';

import { render } from '@testing-library/react';

import TodoPage from './TodoPage';

describe('TodoPage', () => {
  const renderTodoPage = () => render(<TodoPage />);

  it('renders Todo Page text contents', () => {
    const { container } = renderTodoPage();

    expect(container).toHaveTextContent('What are your plans for today?');
  });
});
