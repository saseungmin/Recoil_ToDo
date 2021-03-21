import { useRecoilCallback } from 'recoil';

import userAtom, { userWithCheck } from '../recoil/user';
import isLoadingAtom from '../recoil/common/atom';

import { userCheckErrorHandling } from '../utils/utils';

const useCheckCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async () => {
  set(isLoadingAtom, true);

  const { data } = await userCheckErrorHandling(snapshot.getPromise(userWithCheck()));

  set(userAtom, { user: data });
  reset(isLoadingAtom);
}, []);

export default useCheckCallback;
