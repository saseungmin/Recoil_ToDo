import React from 'react';

import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import BounceLoader from 'react-spinners/BounceLoader';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import isLoadingAtom from '../../recoil/common/atom';

const LoadingSpinnerWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
`;

const loaderSpinners = css`
  display: block;
  margin: 0 auto;

  ${mq({
    top: ['-50px', '-100px'],
  })}
`;

const LoadingSpinner = () => {
  const isLoading = useRecoilValue(isLoadingAtom);

  if (!isLoading) {
    return null;
  }

  return (
    <LoadingSpinnerWrapper
      data-testid="loading-spinner"
    >
      <BounceLoader
        size={100}
        color={palette.hoverTwoTone[0]}
        css={loaderSpinners}
        loading={isLoading}
      />
    </LoadingSpinnerWrapper>
  );
};

export default LoadingSpinner;
