import React from 'react';

const ExternalLink = ({ children, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default ExternalLink;
