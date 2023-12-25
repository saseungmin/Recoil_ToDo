import React from 'react';

import { ThemeProvider } from '@emotion/react';

import { render, screen } from '@testing-library/react';

import { lightTheme } from '../../styles/theme';

import Footer from './Footer';

describe('footer', () => {
  const renderFooter = () => render((
    <ThemeProvider theme={lightTheme}>
      <Footer />
    </ThemeProvider>
  ));

  it('renders footer contents', () => {
    const { container } = renderFooter();

    expect(container).toHaveTextContent('Created by');
    expect(screen.getByText('Seungmin Sa')).toHaveAttribute('href', 'mailto:dbd02169@naver.com');
  });
});
