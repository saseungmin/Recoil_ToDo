import { useEffect } from 'react';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { useSnackbar } from 'notistack';

import { AuthResultAtomType } from 'src/recoil/auth/atom';
import authResultAtom from '../../recoil/auth';
import userAtom from '../../recoil/user';

function AuthStatusSnackbar() {
  const [{ authSuccess, authError }, setAuthState] = useRecoilState(authResultAtom);
  const { checkError } = useRecoilValue(userAtom);
  const resetUserState = useResetRecoilState(userAtom);

  const { enqueueSnackbar } = useSnackbar();

  const resetState = (state: Partial<AuthResultAtomType>) => setAuthState((prevState) => ({
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

  useEffect(() => {
    if (checkError) {
      enqueueSnackbar(checkError, {
        variant: 'error',
      });

      resetUserState();
    }
  }, [checkError]);

  return null;
}

export default AuthStatusSnackbar;
