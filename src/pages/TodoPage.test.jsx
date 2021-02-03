import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import TodoPage from './TodoPage';

describe('TodoPage', () => {
  const renderTodoPage = () => render((
    <RecoilRoot>
      <TodoPage />
    </RecoilRoot>
  ));

  it('renders Todo Page text contents', () => {
    const { container } = renderTodoPage();

    expect(container).toHaveTextContent('What are your plans for today?');
  });
});
