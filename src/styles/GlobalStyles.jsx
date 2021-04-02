import React from 'react';

import reset from 'styled-reset';

import { Global, useTheme, css } from '@emotion/react';

const setGlobalStyles = (theme) => css`
  ${reset}

  * {
    box-sizing: inherit;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    transition: all 0.25s linear 0s;
    background: ${theme.baseTone};
  }

  input {
    outline: none;
  }

  button {
    outline: none;
    cursor: pointer;
  }
`;

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global styles={setGlobalStyles(theme)} />
  );
};

export default GlobalStyles;
