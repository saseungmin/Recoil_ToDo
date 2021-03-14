import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

const Button = styled.button`
  ${mq({
    fontSize: ['0.8rem', '0.9rem', '1rem'],
    padding: ['0.3rem 0.7rem', '0.4rem 1rem'],
  })};

  border: none;
  color: #FFDFDE;
  background: #6A7BA2;
  border-radius: 5rem;

  &:hover {
    background: #7687ae;
    color: #ffe9e6;
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
