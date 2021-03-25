import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { useSnackbar } from 'notistack';

import authResultAtom from '../../recoil/auth';

const AuthStatusSnackbar = () => {
  const [{ authSuccess, authError }, setAuthState] = useRecoilState(authResultAtom);

  const { enqueueSnackbar } = useSnackbar();

  const resetState = (state) => setAuthState((prevState) => ({
    ...prevState,
    ...state,
  }));

  useEffect(() => {
    if (authSuccess) {
      enqueueSnackbar(authSuccess, {
        variant: 'success',
      });

      resetState({ authSuccess: null });
    }
  }, [authSuccess]);

  useEffect(() => {
    if (authError) {
      enqueueSnackbar(authError, {
        variant: 'error',
      });

      resetState({ authError: null });
    }
  }, [authError]);

  return null;
};

export default AuthStatusSnackbar;
