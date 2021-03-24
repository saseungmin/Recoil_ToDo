import { useRecoilCallback } from 'recoil';

import userAtom, { userWithCheck } from '../recoil/user';
import isLoadingAtom from '../recoil/common/atom';

import { userCheckErrorHandling } from '../utils/utils';

const useCheckCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async () => {
  set(isLoadingAtom, true);

  const { data } = await userCheckErrorHandling(snapshot.getPromise(userWithCheck()));

  set(userAtom, { user: data.user });

  // TODO - 추후 로직 변경 및 access_token이 있을 때만 추가
  // setCookie('access_token', data.access_token);

  reset(isLoadingAtom);
}, [userAtom, isLoadingAtom]);

export default useCheckCallback;
