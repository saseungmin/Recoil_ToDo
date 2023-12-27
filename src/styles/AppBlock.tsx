import React, { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import mq from './responsive';

const AppWrapper = styled.div`
  ${mq({
    marginTop: ['24px', '32px'],
  })};

  width: calc(100% - 2rem);
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
`;

function AppBlock({ children, ...rest }: PropsWithChildren) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AppWrapper {...rest}>
      {children}
    </AppWrapper>
  );
}

export default AppBlock;
