import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import userAtom from '../../recoil/user';
import todosResultAtom, { filterAtom } from '../../recoil/todos';
import authResultAtom, { authFormStatusAtom } from '../../recoil/auth';
import isLoadingAtom, { themeModeAtom } from '../../recoil/common/atom';

import {
  todoResultState, userState, authState, authResultState,
} from '../../../fixtures/recoil-atom-state';

function InjectTestingRecoilState({
  todos = todoResultState,
  filter = 'ALL',
  user = userState,
  auth = authState,
  authResult = authResultState,
  isLoading = false,
  theme = false,
}) {
  const setTodosState = useSetRecoilState(todosResultAtom);
  const setFilterState = useSetRecoilState(filterAtom);
  const setUserState = useSetRecoilState(userAtom);
  const setAuthState = useSetRecoilState(authFormStatusAtom);
  const setAuthResultState = useSetRecoilState(authResultAtom);
  const setLoadingState = useSetRecoilState(isLoadingAtom);
  const setThemeState = useSetRecoilState(themeModeAtom);

  useEffect(() => {
    setUserState(user as any);
    setAuthState(auth as any);
    setTodosState(todos);
    setFilterState(filter as any);
    setAuthResultState(authResult);
    setLoadingState(isLoading);
    setThemeState(theme);
  }, []);

  return null;
}

export default InjectTestingRecoilState;
