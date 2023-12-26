import React from 'react';

import styled from '@emotion/styled';
import { RegisterOptions } from 'react-hook-form';
import palette from '../../styles/palette';

const AuthInputWrapper = styled.input`
  height: 42px;
  border-radius: 3px;
  font-size: 1rem;
  color: #5f5f5f;
  background: ${palette.twoTone[1]};
  border: 2px solid transparent;
  padding: 0 0.5rem;
  transition: border-color .3s;

  &:focus {
    border: 2px solid #5F4B8B;
  }

  &:-webkit-autofill {
    border: 2px solid ${palette.twoTone[1]};
    transition: border-color .3s;
    box-shadow: 0 0 0px 1000px ${palette.twoTone[1]} inset;
    -webkit-box-shadow: 0 0 0px 1000px ${palette.twoTone[1]} inset;
    -webkit-text-fill-color: #5f5f5f;

    &:focus {
      border: 2px solid #5F4B8B;
    }
  }
`;

const authFieldsProperty = {
  userId: {
    inputType: 'text',
    placeholder: '아이디',
    autoComplete: 'username',
  },
  password: {
    inputType: 'password',
    placeholder: '비밀번호',
    autoComplete: 'new-password',
  },
  passwordConfirm: {
    inputType: 'password',
    placeholder: '비밀번호 확인',
    autoComplete: 'new-password',
  },
};

type Props = {
  inputRef: any;
  inputName: 'userId' | 'password' | 'passwordConfirm';
};

function AuthInput({ inputRef, inputName }: Props) {
  const { inputType, placeholder, autoComplete } = authFieldsProperty[inputName];

  return (
    <AuthInputWrapper
      ref={inputRef}
      type={inputType}
      name={inputName}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
}

export default AuthInput;
