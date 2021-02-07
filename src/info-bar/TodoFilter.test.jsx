import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import InjectTestingRecoilState from '../components/common/InjectTestingRecoilState';
import TodoFilter from './TodoFilter';

describe('TodoFilter', () => {
  const renderTodoFilter = ({ state }) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        state={state}
      />
      <TodoFilter />
    </RecoilRoot>
  ));

  const initialState = [
    { id: 1, task: '할 일1', isComplete: false },
    { id: 2, task: '할 일2', isComplete: true },
  ];

  it('render filter bar content', () => {
    const { container } = renderTodoFilter(initialState);

    expect(container).toHaveTextContent('All');
    expect(container).toHaveTextContent('Active');
    expect(container).toHaveTextContent('Completed');
  });

  it('Click filter buttons call event set value', () => {
    const { getByText } = renderTodoFilter(initialState);

    fireEvent.click(getByText('Active'));
  });
});
