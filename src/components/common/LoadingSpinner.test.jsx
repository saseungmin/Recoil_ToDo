import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, screen } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('LoadingSpinner', () => {
  const renderLoadingSpinner = () => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        isLoading={given.loading}
      />
      <LoadingSpinner />
    </RecoilRoot>
  ));

  context('Is loading', () => {
    given('loading', () => (true));

    it('renders Loading spinner', () => {
      renderLoadingSpinner();

      expect(screen.getByTestId('loading-spinner')).not.toBeNull();
    });
  });

  context("Isn't loading", () => {
    given('loading', () => (false));
    it('renders Loading spinner', () => {
      const { container } = renderLoadingSpinner();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
