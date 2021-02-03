import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import todosAtom from '../../recoil/todos/atom';

const InjectTestingRecoilState = ({ state }) => {
  const setState = useSetRecoilState(todosAtom);

  useEffect(() => {
    setState(state);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
