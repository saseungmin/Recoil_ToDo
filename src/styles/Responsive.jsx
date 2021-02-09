/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import facepaint from 'facepaint';
import styled from '@emotion/styled';

const mq = facepaint([
  '@media(min-width: 760px)',
]);

const ResponsiveWrapper = styled.div(() => mq({
  display: 'grid',
  gridTemplateRows: 'repeat(1,1fr)',
  gridRowGap: '1rem',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: ['calc(100% - 2rem)', '550px'],
  marginTop: '32px',
}));

const Responsive = ({ children, ...rest }) => (
  <ResponsiveWrapper {...rest}>
    {children}
  </ResponsiveWrapper>
);

export default Responsive;
