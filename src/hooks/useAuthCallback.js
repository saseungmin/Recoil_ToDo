import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import authResultAtom from '../recoil/auth';

import { getExpire } from '../utils/utils';
import { authErrorMessage } from '../utils/errorMessageHandling';

import { setCookie } from '../services/cookie';

const useAuthCallback = (authType) => useRecoilCallback(({
  snapshot, set, reset,
}) => async (authApi) => {
  set(isLoadingAtom, true);

  try {
    const { data: { access_token } } = await snapshot.getPromise(authApi);

    setCookie('access_token', access_token, getExpire(access_token));

    set(
      authResultAtom,
      (prevState) => ({
        ...prevState,
        authSuccess: `Successful ${authType}!`,
      }),
    );
  } catch (error) {
    set(authResultAtom, (prevState) => ({
      ...prevState,
      authError: authErrorMessage(error),
    }));
  } finally {
    reset(isLoadingAtom);
  }
}, [authResultAtom, isLoadingAtom]);

export default useAuthCallback;
