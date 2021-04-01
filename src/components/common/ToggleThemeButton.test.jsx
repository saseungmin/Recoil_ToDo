import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import ToggleThemeButton from './ToggleThemeButton';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('ToggleThemeButton', () => {
  const renderToggleThemeButton = (theme) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        theme={theme}
      />
      <ToggleThemeButton />
    </RecoilRoot>
  ));

  context('When theme is Light', () => {
    it('renders Light theme button', () => {
      const { container } = renderToggleThemeButton(0);

      expect(container).toHaveTextContent('Light');
    });

    it('Change to dark button when clicking theme button', () => {
      const { container, getByText } = renderToggleThemeButton(0);

      fireEvent.click(getByText('Light'));

      expect(container).toHaveTextContent('Dark');
    });
  });

  context('When theme is Dark', () => {
    it('renders Dark theme button', () => {
      const { container } = renderToggleThemeButton(1);

      expect(container).toHaveTextContent('Dark');
    });

    it('Change to Light button when clicking theme button', () => {
      const { container, getByText } = renderToggleThemeButton(1);

      fireEvent.click(getByText('Dark'));

      expect(container).toHaveTextContent('Light');
    });
  });
});
