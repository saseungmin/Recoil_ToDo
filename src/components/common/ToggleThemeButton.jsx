import React, { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { themeWithChange } from '../../recoil/common';

import mq from '../../styles/responsive';

const ThemeButtonWrapper = styled.div`
  ${mq({
    width: ['100%', '80vw', '700px'],
  })};

  display: flex;
  justify-content: flex-end;  
`;

const ToggleThemeButton = () => {
  const [theme, setTheme] = useRecoilState(themeWithChange);

  const handleToggle = useCallback(() => setTheme(), [setTheme]);

  return (
    <ThemeButtonWrapper>
      <button
        type="button"
        onClick={handleToggle}
      >
        {theme ? 'Dark' : 'Light'}
      </button>
    </ThemeButtonWrapper>
  );
};

export default ToggleThemeButton;
