import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

const Button = styled.button`
  ${mq({
    fontSize: ['0.8rem', '0.9rem', '1rem'],
    padding: ['0.3rem 0.7rem', '0.5rem 1rem'],
  })};

  color: ${({ theme }) => theme.baseTone};
  background: ${({ theme }) => theme.subTone};
  border: none;
  border-radius: 5rem;
  transition: background-color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.lightBaseTone};
    background: ${({ theme }) => theme.lightSubTone};
  }
`;

type Props = {
  type: string;
  onClick: () => void;
};

function AuthButton({ type, onClick }: Props) {
  return (
    <Button
      type="button"
      onClick={onClick}
      data-testid="sign-out-button"
    >
      {type}
    </Button>
  );
}

export default AuthButton;
