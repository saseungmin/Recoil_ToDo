import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import TodoClearButton from './TodoClearButton';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoClearButton', () => {
  const renderTodoClearButton = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={state}
      />
      <TodoClearButton />
    </RecoilRoot>
  ));

  context('with completed todo', () => {
    const state = [
      { id: '1', task: 'some tasks', isComplete: true },
    ];
    it('render clear button', () => {
      const { container } = renderTodoClearButton(state);

      expect(container).toHaveTextContent('Clear completed');
    });
  });

  context('without completed todo', () => {
    const state = [
      { id: '1', task: 'some tasks', isComplete: false },
    ];
    it('render clear button', () => {
      const { container } = renderTodoClearButton(state);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
