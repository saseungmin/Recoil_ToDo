import React from 'react';

import emotionReset from 'emotion-reset';

import {
  Global, useTheme, css, Theme,
} from '@emotion/react';

const setGlobalStyles = (theme: Theme) => css`
  ${emotionReset}

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

function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global styles={setGlobalStyles(theme)} />
  );
}

export default GlobalStyles;
