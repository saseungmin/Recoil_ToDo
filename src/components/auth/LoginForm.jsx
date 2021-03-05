import React, { useEffect } from 'react';

import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import { useSnackbar } from 'notistack';

import { saveItem } from '../../services/storage';
import { isCheckValidate } from '../../utils/utils';
import { EMPTY_AUTH_INPUT } from '../../utils/constants/constants';

import authFieldsAtom, {
  authWithLoginHandle, authResultAtom, authFormStatusAtom, authWithLoginQuery,
} from '../../recoil/auth';

import AuthModalForm from './AuthModalForm';

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const setResetAuth = useResetRecoilState(authResultAtom);
  const setAuthFields = useSetRecoilState(authFieldsAtom);
  const setLogin = useSetRecoilState(authWithLoginHandle);
  const loginResult = useRecoilValue(authWithLoginQuery);
  const resetAuthStatusState = useResetRecoilState(authFormStatusAtom);
  const { user, authError } = useRecoilValue(authResultAtom);

  const snackbar = (variant) => (message) => enqueueSnackbar(message, { variant });
  const errorSnackbar = snackbar('error');
  const successSnackbar = snackbar('success');

  const onSubmit = (formData) => {
    if (!isCheckValidate(formData)) {
      errorSnackbar(EMPTY_AUTH_INPUT);

      return;
    }

    setAuthFields(formData);
  };

  useEffect(() => {
    if (loginResult) {
      setLogin(loginResult);
    }
  }, [loginResult]);

  useEffect(() => {
    if (user) {
      successSnackbar('Success Sign in!');
      saveItem('user', user);
      setAuthFields(null);
      resetAuthStatusState();
    }

    if (authError) {
      errorSnackbar('Failure Sign in!');
      setResetAuth();
    }
  }, [user, authError]);

  return (
    <AuthModalForm
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
