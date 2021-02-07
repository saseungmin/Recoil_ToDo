import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import todosAtom, { filterAtom } from '../../recoil/todos';

const InjectTestingRecoilState = ({ todos, filter = 'All' }) => {
  const setTodosState = useSetRecoilState(todosAtom);
  const setFilterState = useSetRecoilState(filterAtom);

  useEffect(() => {
    setTodosState(todos);
    setFilterState(filter);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
