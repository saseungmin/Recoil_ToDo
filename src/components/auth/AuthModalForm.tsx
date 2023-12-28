import React from 'react';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useForm } from 'react-hook-form';

import { AuthForm } from 'src/types/auth';
import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import { FORM_TYPE } from '../../utils/constants/constants';

import { authFormStatusAtom } from '../../recoil/auth';

import CloseIcon from '../../assets/icons/close.svg';
import AuthInput from './AuthInput';

const AuthModalFormWrapper = styled.div<{ visible: boolean; }>`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ visible }) => visible && css`
    animation-name: fade-in;
    animation-duration: .3s;
    animation-fill-mode: both;

    @keyframes fade-in {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  `}
`;

const AuthModalBoxWrapper = styled.div`
  ${mq({
    width: ['300px', '320px'],
  })};

  background: ${palette.twoTone[0]};
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
`;

const FormHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  button {
    background: none;
    height: 22px;
    border: none;
    padding: 0;
  }

  h2 {
    color: ${palette.twoTone[1]};
    margin: 0;
  }
`;

const AuthFormWrapper = styled.form`
  display: grid;
  grid-template-rows: repeat(1,1fr);
  grid-row-gap: 1rem;
`;

const SubmitButton = styled.button`
  font-size: 1.2rem;
  background-color: #E69A8D;
  color: ${palette.twoTone[0]};
  height: 42px;
  border: none;
  border-radius: 3px;
  transition: background-color .3s;

  &:hover {
    color: ${palette.hoverTwoTone[0]};
    background-color: #f0a497;
  }
`;

type Props = {
  onSubmit: (form: AuthForm) => void;
};

function AuthModalForm({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<AuthForm>();

  const { type, visible } = useRecoilValue(authFormStatusAtom);

  const onCloseAuthModal = useResetRecoilState(authFormStatusAtom);

  const formType = FORM_TYPE[type];

  return (
    <AuthModalFormWrapper visible={visible}>
      <AuthModalBoxWrapper>
        <FormHeaderWrapper>
          <h2>{formType}</h2>
          <button
            type="button"
            data-testid="close-button"
            onClick={onCloseAuthModal}
          >
            <CloseIcon />
          </button>
        </FormHeaderWrapper>
        <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            inputRef={register}
            inputName="userId"
          />
          <AuthInput
            inputRef={register}
            inputName="password"
          />
          {type === 'register' && (
            <AuthInput
              inputRef={register}
              inputName="passwordConfirm"
            />
          )}
          <SubmitButton
            type="submit"
            data-testid="auth-submit-button"
          >
            {formType}
          </SubmitButton>
        </AuthFormWrapper>
      </AuthModalBoxWrapper>
    </AuthModalFormWrapper>
  );
}

export default AuthModalForm;
