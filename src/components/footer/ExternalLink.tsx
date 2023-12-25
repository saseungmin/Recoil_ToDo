import React, { PropsWithChildren } from 'react';

type Props = {
  link: string;
};

function ExternalLink({ children, link }: PropsWithChildren<Props>) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default ExternalLink;
