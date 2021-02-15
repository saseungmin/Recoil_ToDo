import React from 'react';

import styled from '@emotion/styled';

import palette from './palette';
import mq from './responsive';

const EmptyMessageWrapper = styled.div`
  ${mq({
    fontSize: ['1.1rem', '1.3rem'],
  })};
  
  font-weight: bold;
  text-align: center;
  padding: 70px;
  color: ${palette.text[1]};
`;

const EmptyMessage = ({ children }) => (
  <EmptyMessageWrapper>
    {children}
  </EmptyMessageWrapper>
);

export default EmptyMessage;
