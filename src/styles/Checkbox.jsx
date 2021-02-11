/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import CheckedIcon from '../assets/icons/checked.svg';
import UnCheckedIcon from '../assets/icons/un-checked.svg';

const CheckboxWrapper = ({ click }) => css`
  width: 20px;
  height: 20px;

  ${click && css`
    cursor: pointer;
  `}
`;

const CheckedIConWrapper = styled(CheckedIcon)`
  ${CheckboxWrapper}
`;

const UnCheckedIconWrapper = styled(UnCheckedIcon)`
  ${CheckboxWrapper}
`;

const Checkbox = (props) => {
  const { checked, click } = props;

  return (
    <>
      {checked
        ? <CheckedIConWrapper {...props} click={click && 1} />
        : <UnCheckedIconWrapper {...props} click={click && 1} />}
    </>
  );
};

export default Checkbox;
