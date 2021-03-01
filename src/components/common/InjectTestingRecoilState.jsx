import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import todosAtom, { filterAtom } from '../../recoil/todos';
import authFieldsAtom, { authFormStatusAtom, authResultAtom } from '../../recoil/auth';

const authState = {
  type: '',
  visible: false,
};

const authResultState = {
  auth: null,
  authError: null,
};

const InjectTestingRecoilState = ({
  todos = [],
  filter = 'ALL',
  auth = authState,
  authFields = null,
  authResult = authResultState,
}) => {
  const setTodosState = useSetRecoilState(todosAtom);
  const setFilterState = useSetRecoilState(filterAtom);
  const setAuthState = useSetRecoilState(authFormStatusAtom);
  const setAuthFieldsState = useSetRecoilState(authFieldsAtom);
  const setAuthResultState = useSetRecoilState(authResultAtom);

  useEffect(() => {
    setTodosState(todos);
    setFilterState(filter);
    setAuthState(auth);
    setAuthFieldsState(authFields);
    setAuthResultState(authResult);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
