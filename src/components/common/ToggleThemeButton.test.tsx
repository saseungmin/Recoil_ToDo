import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent, screen } from '@testing-library/react';

import ToggleThemeButton from './ToggleThemeButton';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('ToggleThemeButton', () => {
  const renderToggleThemeButton = (theme: boolean) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        theme={theme}
      />
      <ToggleThemeButton />
    </RecoilRoot>
  ));

  context('When theme is Light', () => {
    it('renders Light theme button', () => {
      renderToggleThemeButton(false);

      expect(screen.getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
    });

    it('Change to dark button when clicking theme button', () => {
      renderToggleThemeButton(false);

      expect(screen.getByTestId('theme-toggle')).toHaveAttribute('title', 'light');

      fireEvent.click(screen.getByTestId('theme-toggle'));

      expect(screen.getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
    });
  });

  context('When theme is Dark', () => {
    it('renders Dark theme button', () => {
      renderToggleThemeButton(true);

      expect(screen.getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
    });

    it('Change to Light button when clicking theme button', () => {
      renderToggleThemeButton(true);

      fireEvent.click(screen.getByTestId('theme-toggle'));

      expect(screen.getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
    });
  });
});
