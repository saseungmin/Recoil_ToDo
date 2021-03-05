import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import todosAtom, { filterAtom } from '../../recoil/todos';
import authFieldsAtom, { authFormStatusAtom, authResultAtom, userAtom } from '../../recoil/auth';

const authState = {
  type: '',
  visible: false,
};

const authResultState = {
  auth: null,
  user: null,
  authError: null,
  loading: false,
};

const InjectTestingRecoilState = ({
  todos = [],
  filter = 'ALL',
  user = null,
  auth = authState,
  authFields = null,
  authResult = authResultState,
}) => {
  const setTodosState = useSetRecoilState(todosAtom);
  const setFilterState = useSetRecoilState(filterAtom);
  const setUserState = useSetRecoilState(userAtom);
  const setAuthState = useSetRecoilState(authFormStatusAtom);
  const setAuthFieldsState = useSetRecoilState(authFieldsAtom);
  const setAuthResultState = useSetRecoilState(authResultAtom);

  useEffect(() => {
    setUserState(user);
    setAuthState(auth);
    setTodosState(todos);
    setFilterState(filter);
    setAuthFieldsState(authFields);
    setAuthResultState(authResult);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
