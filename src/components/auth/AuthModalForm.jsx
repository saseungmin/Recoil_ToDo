import React from 'react';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import authFieldsAtom, { authStatusAtom } from '../../recoil/auth';
import { FORM_TYPE } from '../../utils/constants/constants';

import AuthInput from './AuthInput';

const AuthModalFormWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);

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
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  background: white;

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const AuthFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AuthModalForm = () => {
  const { type, visible } = useRecoilValue(authStatusAtom);

  const resetAuthStatusState = useResetRecoilState(authStatusAtom);
  const resetAuthFieldsState = useResetRecoilState(authFieldsAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onCloseAuthModal = () => {
    resetAuthStatusState();
    resetAuthFieldsState();
  };

  if (!visible) {
    return null;
  }

  const formType = FORM_TYPE[type];

  return (
    <AuthModalFormWrapper visible={visible}>
      <AuthModalBoxWrapper>
        <h2>{formType}</h2>
        <AuthFormWrapper onSubmit={handleSubmit}>
          <AuthInput
            formType={type}
            inputName="userId"
          />
          <AuthInput
            formType={type}
            inputName="password"
          />
          {type === 'register' && (
            <AuthInput
              formType={type}
              inputName="passwordConfirm"
            />
          )}
          <button
            type="submit"
            data-testid="auth-submit-button"
          >
            {formType}
          </button>
          <button
            type="button"
            onClick={onCloseAuthModal}
          >
            닫기
          </button>
        </AuthFormWrapper>
      </AuthModalBoxWrapper>
    </AuthModalFormWrapper>
  );
};

export default AuthModalForm;
