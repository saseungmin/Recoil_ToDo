import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import InjectTestingRecoilState from '../components/common/InjectTestingRecoilState';

import TodoPage from './TodoPage';

describe('TodoPage', () => {
  const renderTodoPage = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        state={state}
      />
      <TodoPage />
    </RecoilRoot>
  ));

  it('renders Todo Page text contents', () => {
    const initialState = [
      { id: 1, task: '할 일1', isComplete: false },
    ];

    const { container } = renderTodoPage(initialState);

    expect(container).toHaveTextContent('What are your plans for today?');
  });
});
