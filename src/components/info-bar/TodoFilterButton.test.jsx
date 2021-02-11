import React from 'react';

import { RecoilRoot } from 'recoil';

import { render } from '@testing-library/react';

import TodoFilterButton from './TodoFilterButton';

describe('TodoFilterButton', () => {
  const renderTodoFilterButton = (type) => render((
    <RecoilRoot>
      <TodoFilterButton
        type={type}
      />
    </RecoilRoot>
  ));

  it('render filter button', () => {
    const type = 'All';

    const { container } = renderTodoFilterButton(type);

    expect(container).toHaveTextContent(type);
  });
});
