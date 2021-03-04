import React, { useEffect, useState } from 'react';

import {
  useRecoilValue, useResetRecoilState, useSetRecoilState, useRecoilValueLoadable, useRecoilState,
} from 'recoil';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useForm } from 'react-hook-form';

import { useSnackbar } from 'notistack';

import recoilLoadable from '../../utils/recoilLoadable';
import { isCheckValidate, isEqualPassword } from '../../utils/utils';
import { FORM_TYPE, EMPTY_AUTH_INPUT, NOT_MATCH_PASSWORD } from '../../utils/constants/constants';

import authFieldsAtom, {
  authFormStatusAtom, authWithEnterUser, authWithResult, authResultAtom, userAtom,
} from '../../recoil/auth';
import { saveItem } from '../../services/storage';

import AuthInput from './AuthInput';
import LoadingSpinner from '../common/LoadingSpinner';

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
  const [authLoading, setAuthLoading] = useState();

  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const setAuthFields = useSetRecoilState(authFieldsAtom);
  const setResetAuth = useResetRecoilState(authResultAtom);
  const [authResult, setAuthResult] = useRecoilState(authWithResult);
  const setUser = useSetRecoilState(userAtom);

  const { type, visible } = useRecoilValue(authFormStatusAtom);

  const resetAuthStatusState = useResetRecoilState(authFormStatusAtom);
  const resetAuthFieldsState = useResetRecoilState(authFieldsAtom);

  const authLoadable = useRecoilValueLoadable(authWithEnterUser);

  const snackbar = (variant) => (message) => enqueueSnackbar(message, { variant });
  const errorSnackbar = snackbar('error');
  const successSnackbar = snackbar('success');

  const onSubmit = (data) => {
    if (!isCheckValidate(data)) {
      errorSnackbar(EMPTY_AUTH_INPUT);

      return;
    }

    if (isEqualPassword(data)) {
      errorSnackbar(NOT_MATCH_PASSWORD);

      return;
    }

    setAuthFields(data);
  };

  const onCloseAuthModal = () => {
    resetAuthStatusState();
    resetAuthFieldsState();
  };

  const formType = FORM_TYPE[type];

  useEffect(() => {
    const authStatus = recoilLoadable(authLoadable);

    if (authStatus) {
      setAuthResult(authStatus);
    }
  }, [authLoadable]);

  useEffect(() => {
    const { loading } = authResult;

    if (loading) {
      setAuthLoading(loading);
      return;
    }

    setAuthLoading(loading);
  }, [authResult.loading]);

  useEffect(() => {
    const { auth, authError } = authResult;

    if (auth) {
      successSnackbar(`Success ${formType}!`);
      saveItem('user', auth.data);
      setUser(auth.data);
      setResetAuth();
      onCloseAuthModal();
    }

    if (authError) {
      errorSnackbar(`Failure ${formType}!`);
      setResetAuth();
    }
  }, [authResult]);

  if (!visible) {
    return null;
  }

  return (
    <AuthModalFormWrapper visible={visible}>
      <AuthModalBoxWrapper>
        <h2>{formType}</h2>
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
        <LoadingSpinner
          loading={authLoading}
        />
      </AuthModalBoxWrapper>
    </AuthModalFormWrapper>
  );
};

export default AuthModalForm;
