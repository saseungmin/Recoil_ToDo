import { RecoilValueReadOnly, useRecoilCallback } from 'recoil';

import { AxiosResponse } from 'axios';
import isLoadingAtom from '../recoil/common/atom';
import authResultAtom from '../recoil/auth';

import { getExpire } from '../utils/utils';
import { authErrorMessage } from '../utils/errorMessageHandling';

import { setCookie } from '../services/cookie';

const useAuthCallback = (authType: string) => useRecoilCallback(({
  snapshot, set, reset,
}) => async (authApi: RecoilValueReadOnly<AxiosResponse<any>>) => {
  set(isLoadingAtom, true);

  try {
    const {
      data: {
        access_token,
      },
    } = await snapshot.getPromise<{ data: { access_token: string } }>(authApi);

    setCookie('access_token', access_token, getExpire(access_token));

    set(
      authResultAtom,
      (prevState) => ({
        ...prevState,
        authSuccess: `Successful ${authType}!`,
      }),
    );
  } catch (error: any) {
    set(authResultAtom, (prevState) => ({
      ...prevState,
      authError: authErrorMessage(error),
    }));
  } finally {
    reset(isLoadingAtom);
  }
}, [authResultAtom, isLoadingAtom]);

export default useAuthCallback;
