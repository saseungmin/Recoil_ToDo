import React from 'react';

import { ThemeProvider } from '@emotion/react';

import { render } from '@testing-library/react';

import { lightTheme } from '../../styles/theme';

import Footer from './Footer';

describe('footer', () => {
  const renderFooter = () => render((
    <ThemeProvider theme={lightTheme}>
      <Footer />
    </ThemeProvider>
  ));

  it('renders footer contents', () => {
    const { container, getByText } = renderFooter();

    expect(container).toHaveTextContent('Created by');
    expect(getByText('Seungmin Sa')).toHaveAttribute('href', 'mailto:dbd02169@naver.com');
  });
});
