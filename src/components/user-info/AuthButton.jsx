import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

const Button = styled.button`
  ${mq({
    fontSize: ['0.8rem', '0.9rem', '1rem'],
    padding: ['0.3rem 0.7rem', '0.5rem 1rem'],
  })};

  border: none;
  color: ${palette.twoTone[1]};
  background: ${palette.twoTone[0]};
  border-radius: 5rem;

  &:hover {
    color: ${palette.hoverTwoTone[1]};
    background: ${palette.hoverTwoTone[0]};
  }

  transition: background 0.3s;
`;

const AuthButton = ({ type, onClick }) => (
  <Button
    type="button"
    onClick={onClick}
    data-testid="sign-out-button"
  >
    {type}
  </Button>

);

export default AuthButton;
