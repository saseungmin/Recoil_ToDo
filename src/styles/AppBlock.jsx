/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';

import mq from './responsive';

const AppWrapper = styled.div`
  ${mq({
    marginTop: ['24px', '32px'],
  })};

  width: calc(100% - 1rem);
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
`;

const AppBlock = ({ children, ...rest }) => (
  <AppWrapper {...rest}>
    {children}
  </AppWrapper>
);

export default AppBlock;
