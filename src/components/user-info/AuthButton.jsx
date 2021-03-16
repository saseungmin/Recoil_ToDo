import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

const Button = styled.button`
  ${mq({
    fontSize: ['0.8rem', '0.9rem', '1rem'],
    padding: ['0.3rem 0.7rem', '0.5rem 1rem'],
  })};

  background: ${palette.twoTone[0]};
  color: ${palette.twoTone[1]};
  border: none;
  border-radius: 5rem;
  transition: background-color 0.3s;

  &:hover {
    color: ${palette.hoverTwoTone[1]};
    background: ${palette.hoverTwoTone[0]};
  }
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
