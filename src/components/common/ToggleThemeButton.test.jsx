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
      const { getByTestId } = renderToggleThemeButton(false);

      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
    });

    it('Change to dark button when clicking theme button', () => {
      const { getByTestId } = renderToggleThemeButton(false);

      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'light');

      fireEvent.click(getByTestId('theme-toggle'));

      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
    });
  });

  context('When theme is Dark', () => {
    it('renders Dark theme button', () => {
      const { getByTestId } = renderToggleThemeButton(true);

      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
    });

    it('Change to Light button when clicking theme button', () => {
      const { getByTestId } = renderToggleThemeButton(true);

      fireEvent.click(getByTestId('theme-toggle'));

      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
    });
  });
});
