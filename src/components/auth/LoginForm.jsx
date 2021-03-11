import React, { useEffect } from 'react';

import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import { useUnmount } from 'react-use';

import { useSnackbar } from 'notistack';

import { isCheckValidate } from '../../utils/utils';
import { userCheckHandling } from '../../utils/recoil/statusHandling';
import { EMPTY_AUTH_INPUT } from '../../utils/constants/constants';

import userAtom, { userWithHandle, userWithCheckQuery } from '../../recoil/user';
import authFieldsAtom, {
  authResultAtom, authFormStatusAtom, authWithLoginQuery, authWithHandle,
} from '../../recoil/auth';

import AuthModalForm from './AuthModalForm';

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const setAuthFields = useSetRecoilState(authFieldsAtom);
  const setLoginResult = useSetRecoilState(authWithHandle);
  const setUserResult = useSetRecoilState(userWithHandle);

  const authLoadable = useRecoilValue(authWithLoginQuery);
  const checkLoadable = useRecoilValue(userWithCheckQuery);
  const { authError } = useRecoilValue(authResultAtom);
  const { user, checkError } = useRecoilValue(userAtom);

  const setResetUser = useResetRecoilState(userAtom);
  const setResetAuth = useResetRecoilState(authResultAtom);
  const resetAuthStatusState = useResetRecoilState(authFormStatusAtom);

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
    if (authLoadable) {
      setLoginResult(authLoadable);
    }
  }, [authLoadable]);

  useEffect(() => {
    if (checkLoadable) {
      setUserResult({
        loadable: checkLoadable,
        handling: userCheckHandling,
      });
    }
  }, [checkLoadable]);

  useEffect(() => {
    if (authError) {
      errorSnackbar('Failure Sign in!');
      setResetAuth();
    }
  }, [authError]);

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

  useUnmount(() => {
    setResetAuth();
    setAuthFields(null);
  });

  return (
    <AuthModalForm
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
