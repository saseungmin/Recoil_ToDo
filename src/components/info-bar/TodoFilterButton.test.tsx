import React from 'react';

import { RecoilRoot } from 'recoil';

import { render } from '@testing-library/react';

import { FilterType } from 'src/recoil/todos/atom';
import TodoFilterButton from './TodoFilterButton';

describe('TodoFilterButton', () => {
  const renderTodoFilterButton = (type: FilterType) => render((
    <RecoilRoot>
      <TodoFilterButton
        type={type}
      />
    </RecoilRoot>
  ));

  it('render filter button', () => {
    const type = 'ALL';

    const { container } = renderTodoFilterButton(type);

    expect(container).toHaveTextContent(type);
  });
});
