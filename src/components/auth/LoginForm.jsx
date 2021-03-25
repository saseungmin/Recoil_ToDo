import React, { useEffect } from 'react';

import { useResetRecoilState, useRecoilValue } from 'recoil';

import { useSnackbar } from 'notistack';

import { isCheckValidate } from '../../utils/utils';
import { FORM_TYPE } from '../../utils/constants/constants';
import { EMPTY_AUTH_INPUT } from '../../utils/constants/messages';

import userAtom from '../../recoil/user';
import {
  authResultAtom, authFormStatusAtom, authWithLogin,
} from '../../recoil/auth';

import useAuthCallback from '../../hooks/useAuthCallback';
import useCheckCallback from '../../hooks/useCheckCallback';

import AuthModalForm from './AuthModalForm';

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const loginCallback = useAuthCallback(FORM_TYPE.login);
  const checkCallback = useCheckCallback();

  const { authSuccess } = useRecoilValue(authResultAtom);
  const { user, checkError } = useRecoilValue(userAtom);

  const setResetUser = useResetRecoilState(userAtom);
  const resetAuthStatusState = useResetRecoilState(authFormStatusAtom);

  const snackbar = (variant) => (message) => enqueueSnackbar(message, { variant });
  const errorSnackbar = snackbar('error');
  const successSnackbar = snackbar('success');

  const onSubmit = (formData) => {
    if (!isCheckValidate(formData)) {
      errorSnackbar(EMPTY_AUTH_INPUT);

      return;
    }

    loginCallback(authWithLogin(formData));
  };

  useEffect(() => {
    if (authSuccess) {
      checkCallback();
    }
  }, [authSuccess]);

  useEffect(() => {
    if (user) {
      successSnackbar('Success Sign in!');
      resetAuthStatusState();
    }

    if (checkError) {
      errorSnackbar('Failure Sign in!');
      setResetUser();
    }
  }, [user, checkError]);

  return (
    <AuthModalForm
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
