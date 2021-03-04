import React from 'react';

import { render } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  const renderLoadingSpinner = (loading) => render((
    <LoadingSpinner
      loading={loading}
    />
  ));

  context('Is loading', () => {
    it('renders Loading spinner', () => {
      const { getByTestId } = renderLoadingSpinner(true);

      expect(getByTestId('loading-spinner')).not.toBeNull();
    });
  });

  context("Isn't loading", () => {
    it('renders Loading spinner', () => {
      const { container } = renderLoadingSpinner(false);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
