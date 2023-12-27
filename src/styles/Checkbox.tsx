/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import mq from './responsive';

import CheckedIcon from '../assets/icons/checked.svg';
import UnCheckedIcon from '../assets/icons/un-checked.svg';

const CheckboxWrapper = ({ click }: { click?: boolean; }) => css`
  ${mq({
    width: ['20px', '25px'],
    height: ['20px', '25px'],
  })};

  ${!!click && css`
    cursor: pointer;
  `}
`;

const CheckedIConWrapper = styled(CheckedIcon)`
  ${CheckboxWrapper}
`;

const UnCheckedIconWrapper = styled(UnCheckedIcon)`
  ${CheckboxWrapper}
`;

type Props = {
  checked?: boolean;
  click?: boolean;
  onClick?: () => void;
};

function Checkbox({
  checked, click, onClick, ...rest
}: Props) {
  if (checked) {
    return <CheckedIConWrapper {...rest} onClick={onClick} click={click && !!1} />;
  }

  return (
    <UnCheckedIconWrapper {...rest} onClick={onClick} click={click && !!1} />
  );
}

export default Checkbox;
