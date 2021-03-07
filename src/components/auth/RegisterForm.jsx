import React, { useEffect } from 'react';

import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { useSnackbar } from 'notistack';

import authFieldsAtom, {
  authWithHandle, authResultAtom, authFormStatusAtom, authWithRegisterQuery,
} from '../../recoil/auth';

import { isCheckValidate, isEqualPassword } from '../../utils/utils';
import { EMPTY_AUTH_INPUT, NOT_MATCH_PASSWORD } from '../../utils/constants/constants';

import AuthModalForm from './AuthModalForm';

const RegisterForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const setAuthFields = useSetRecoilState(authFieldsAtom);
  const setRegisterResult = useSetRecoilState(authWithHandle);
  const setLoginVisible = useSetRecoilState(authFormStatusAtom);

  const { auth, authError } = useRecoilValue(authResultAtom);
  const registerLoadable = useRecoilValue(authWithRegisterQuery);

  const setResetAuth = useResetRecoilState(authResultAtom);

  const snackbar = (variant) => (message) => enqueueSnackbar(message, { variant });
  const errorSnackbar = snackbar('error');
  const successSnackbar = snackbar('success');

  const onSubmit = (formData) => {
    if (!isCheckValidate(formData)) {
      errorSnackbar(EMPTY_AUTH_INPUT);

      return;
    }

    if (isEqualPassword(formData)) {
      errorSnackbar(NOT_MATCH_PASSWORD);

      return;
    }

    setAuthFields(formData);
  };

  useEffect(() => {
    if (registerLoadable) {
      setRegisterResult(registerLoadable);
    }
  }, [registerLoadable]);

  useEffect(() => {
    if (auth) {
      successSnackbar('Success Sign up!');
      setResetAuth();
      setAuthFields(null);
      setLoginVisible({ type: 'login', visible: true });
    }

    if (authError) {
      errorSnackbar('Failure Sign up!');
      setResetAuth();
    }
  }, [auth, authError]);

  return (
    <AuthModalForm
      onSubmit={onSubmit}
    />

  );
};

export default RegisterForm;
