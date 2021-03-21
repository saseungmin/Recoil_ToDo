import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import userAtom from '../../recoil/user';
import todosResultAtom, { filterAtom } from '../../recoil/todos';
import authFieldsAtom, { authFormStatusAtom, authResultAtom } from '../../recoil/auth';
import isLoadingAtom from '../../recoil/common/atom';

import {
  todoResultState, userState, authState, authResultState,
} from '../../../fixtures/recoil-atom-state';

const InjectTestingRecoilState = ({
  todos = todoResultState,
  filter = 'ALL',
  user = userState,
  auth = authState,
  authFields = null,
  authResult = authResultState,
  isLoading = false,
}) => {
  const setTodosState = useSetRecoilState(todosResultAtom);
  const setFilterState = useSetRecoilState(filterAtom);
  const setUserState = useSetRecoilState(userAtom);
  const setAuthState = useSetRecoilState(authFormStatusAtom);
  const setAuthFieldsState = useSetRecoilState(authFieldsAtom);
  const setAuthResultState = useSetRecoilState(authResultAtom);
  const setLoadingState = useSetRecoilState(isLoadingAtom);

  useEffect(() => {
    setUserState(user);
    setAuthState(auth);
    setTodosState(todos);
    setFilterState(filter);
    setAuthFieldsState(authFields);
    setAuthResultState(authResult);
    setLoadingState(isLoading);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
