import React, { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import mq from './responsive';

const EmptyMessageWrapper = styled.div`
  ${mq({
    fontSize: ['1.1rem', '1.3rem'],
  })};
  
  font-weight: bold;
  text-align: center;
  padding: 70px;
  color: ${({ theme }) => theme.emptyText};
`;

function EmptyMessage({ children }: PropsWithChildren<undefined>) {
  return (
    <EmptyMessageWrapper>
      {children}
    </EmptyMessageWrapper>
  );
}

export default EmptyMessage;
