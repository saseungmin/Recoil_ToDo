import React from 'react';

import { RecoilRoot } from 'recoil';

import { render } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('LoadingSpinner', () => {
  const renderLoadingSpinner = () => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        authResult={given.result}
      />
      <LoadingSpinner />
    </RecoilRoot>
  ));

  context('Is loading', () => {
    given('result', () => ({
      loading: true,
    }));

    it('renders Loading spinner', () => {
      const { getByTestId } = renderLoadingSpinner();

      expect(getByTestId('loading-spinner')).not.toBeNull();
    });
  });

  context("Isn't loading", () => {
    given('result', () => ({
      loading: false,
    }));
    it('renders Loading spinner', () => {
      const { container } = renderLoadingSpinner();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
