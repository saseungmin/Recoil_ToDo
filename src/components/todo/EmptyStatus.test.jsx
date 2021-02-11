import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import EmptyStatus from './EmptyStatus';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('EmptyStatus', () => {
  const renderEmptyStatus = (filter) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        filter={filter}
      />
      <EmptyStatus />
    </RecoilRoot>
  ));

  context('with filter status "active"', () => {
    const EMPTY_MESSAGE = '모든 할 일을 완료했네요!';
    const state = 'ACTIVE';

    it('render empty status message "모든 할 일이 완료했네요!"', () => {
      const { container } = renderEmptyStatus(state);

      expect(container).toHaveTextContent(EMPTY_MESSAGE);
    });
  });

  context('without filter status "active"', () => {
    const EMPTY_MESSAGE = '완료된 할 일이 없어요!';
    const state = 'COMPLETED';

    it('render empty status message "완료된 할 일이 없어요!"', () => {
      const { container } = renderEmptyStatus(state);

      expect(container).toHaveTextContent(EMPTY_MESSAGE);
    });
  });
});
