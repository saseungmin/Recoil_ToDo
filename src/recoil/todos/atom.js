import { atom } from 'recoil';

import { FILTER_ATOM_KEY, TODOS_RESULT_ATOM_KEY } from '../../utils/constants/atomKey';

export const filterAtom = atom({
  key: FILTER_ATOM_KEY,
  default: 'ALL',
});

const todosResultAtom = atom({
  key: TODOS_RESULT_ATOM_KEY,
  default: {
    todos: [],
    todoError: null,
    todoSuccess: null,
  },
});

export default todosResultAtom;
