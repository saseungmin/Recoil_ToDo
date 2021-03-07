import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import userAtom from '../../recoil/user';
import todosAtom, { filterAtom } from '../../recoil/todos';
import authFieldsAtom, { authFormStatusAtom, authResultAtom } from '../../recoil/auth';
import isLoadingAtom from '../../recoil/common/atom';

const authState = {
  type: '',
  visible: false,
};

const authResultState = {
  user: null,
  authError: null,
};

const userState = {
  user: null,
  checkError: null,
};

const InjectTestingRecoilState = ({
  todos = [],
  filter = 'ALL',
  user = userState,
  auth = authState,
  authFields = null,
  authResult = authResultState,
  isLoading = false,
}) => {
  const setTodosState = useSetRecoilState(todosAtom);
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
