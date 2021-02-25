import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import todosAtom, { filterAtom } from '../../recoil/todos';
import { authStatusAtom } from '../../recoil/auth';

const authState = {
  type: '',
  visible: false,
};

const InjectTestingRecoilState = ({ todos = [], filter = 'ALL', auth = authState }) => {
  const setTodosState = useSetRecoilState(todosAtom);
  const setFilterState = useSetRecoilState(filterAtom);
  const setAuthState = useSetRecoilState(authStatusAtom);

  useEffect(() => {
    setTodosState(todos);
    setFilterState(filter);
    setAuthState(auth);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
