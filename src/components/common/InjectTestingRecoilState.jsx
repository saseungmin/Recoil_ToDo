import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import todosAtom, { filterAtom } from '../../recoil/todos';
import authFieldsAtom, { authStatusAtom } from '../../recoil/auth';

const authState = {
  type: '',
  visible: false,
};

const authFieldsState = {
  register: {
    userId: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    userId: '',
    password: '',
  },
};

const InjectTestingRecoilState = ({
  todos = [],
  filter = 'ALL',
  auth = authState,
  authFields = authFieldsState,
}) => {
  const setTodosState = useSetRecoilState(todosAtom);
  const setFilterState = useSetRecoilState(filterAtom);
  const setAuthState = useSetRecoilState(authStatusAtom);
  const setAuthFieldsState = useSetRecoilState(authFieldsAtom);

  useEffect(() => {
    setTodosState(todos);
    setFilterState(filter);
    setAuthState(auth);
    setAuthFieldsState(authFields);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
