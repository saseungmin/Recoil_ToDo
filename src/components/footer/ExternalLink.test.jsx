import React from 'react';

import { render } from '@testing-library/react';

import ExternalLink from './ExternalLink';

describe('Link', () => {
  const renderLink = (url) => render((
    <ExternalLink
      link={url}
    >
      Seungmin
    </ExternalLink>
  ));

  it('renders Link', () => {
    const { container } = renderLink('http://www.example.com');

    expect(container).toHaveTextContent('Seungmin');
  });
});
