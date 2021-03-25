import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import { authResultAtom } from '../recoil/auth';

import { authErrorMessages } from '../utils/errorMessageHandling';
import { setCookie } from '../services/cookie';

const useAuthCallback = (authType) => useRecoilCallback(({
  snapshot, set, reset,
}) => async (authApi) => {
  set(isLoadingAtom, true);

  try {
    const { data } = await snapshot.getPromise(authApi);

    setCookie('access_token', data.access_token);

    set(
      authResultAtom,
      (prevState) => ({
        ...prevState,
        authSuccess: `Success ${authType}!`,
      }),
    );
  } catch (error) {
    set(authResultAtom, (prevState) => ({
      ...prevState,
      authError: authErrorMessages(error),
    }));
  } finally {
    reset(isLoadingAtom);
  }
}, [authResultAtom, isLoadingAtom]);

export default useAuthCallback;
