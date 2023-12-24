import React, { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { themeWithChange } from '../../recoil/common';

import mq from '../../styles/responsive';
import ThemeToggle from '../../styles/ThemeToggle';

const ThemeButtonWrapper = styled.div`
  ${mq({
    width: ['100%', '80vw', '700px'],
  })};

  display: flex;
  justify-content: flex-end;  
`;

function ToggleThemeButton() {
  const [theme, setTheme] = useRecoilState(themeWithChange);

  const handleToggle = useCallback(() => setTheme(), [setTheme]);

  return (
    <ThemeButtonWrapper>
      <ThemeToggle
        theme={theme}
        onChange={handleToggle}
      />
    </ThemeButtonWrapper>
  );
}

export default ToggleThemeButton;
