import React from 'react';

import { render } from '@testing-library/react';

import Footer from './Footer';

describe('footer', () => {
  const renderFooter = () => render((
    <Footer />
  ));

  it('renders footer contents', () => {
    const { container, getByText } = renderFooter();

    expect(container).toHaveTextContent('Created by');
    expect(getByText('Seungmin Sa')).toHaveAttribute('href', 'mailto:dbd02169@naver.com');
  });
});
