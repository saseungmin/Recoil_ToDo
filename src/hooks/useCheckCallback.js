import { useRecoilCallback } from 'recoil';

import userAtom, { userWithCheck } from '../recoil/user';
import isLoadingAtom from '../recoil/common/atom';

import { removeItem } from '../services/storage';
import { removeCookie } from '../services/cookie';

const useCheckCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async () => {
  set(isLoadingAtom, true);

  try {
    const { data } = await snapshot.getPromise(userWithCheck());

    set(userAtom, (prevState) => ({
      ...prevState,
      user: data.user,
    }));

    // TODO - 추후 로직 변경 및 access_token이 있을 때만 추가
    // setCookie('access_token', data.access_token);
  } catch (error) {
    set(userAtom, (prevState) => ({
      ...prevState,
      checkError: error,
    }));

    removeItem('user');
    removeCookie('access_token');
  } finally {
    reset(isLoadingAtom);
  }
}, [userAtom, isLoadingAtom]);

export default useCheckCallback;
