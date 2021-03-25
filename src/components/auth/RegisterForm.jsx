import React, { useEffect } from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import { useSnackbar } from 'notistack';

import { authResultAtom, authFormStatusAtom, authWithRegister } from '../../recoil/auth';

import useAuthCallback from '../../hooks/useAuthCallback';

import { FORM_TYPE } from '../../utils/constants/constants';
import { isCheckValidate, isEqualPassword } from '../../utils/utils';
import { EMPTY_AUTH_INPUT, NOT_MATCH_PASSWORD } from '../../utils/constants/messages';

import AuthModalForm from './AuthModalForm';

const RegisterForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const registerCallback = useAuthCallback(FORM_TYPE.register);

  const setLoginVisible = useSetRecoilState(authFormStatusAtom);
  const { authSuccess } = useRecoilValue(authResultAtom);

  const errorSnackbar = (message) => enqueueSnackbar(message, {
    variant: 'error',
  });

  const onSubmit = (formData) => {
    if (!isCheckValidate(formData)) {
      errorSnackbar(EMPTY_AUTH_INPUT);

      return;
    }

    if (isEqualPassword(formData)) {
      errorSnackbar(NOT_MATCH_PASSWORD);

      return;
    }

    registerCallback(authWithRegister(formData));
  };

  useEffect(() => {
    if (authSuccess) {
      setLoginVisible({ type: 'login', visible: true });
    }
  }, [authSuccess]);

  return (
    <AuthModalForm
      onSubmit={onSubmit}
    />

  );
};

export default RegisterForm;
