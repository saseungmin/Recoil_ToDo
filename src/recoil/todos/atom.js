import { atom } from 'recoil';

import { loadItem } from '../../services/storage';

import { FILTER_ATOM_KEY, TASK_INPUT_ATOM_KEY, TODOS_RESULT_ATOM_KEY } from '../../utils/constants/atomKey';

export const filterAtom = atom({
  key: FILTER_ATOM_KEY,
  default: 'ALL',
});

export const taskInputAtom = atom({
  key: TASK_INPUT_ATOM_KEY,
  default: '',
});

export const todosResultAtom = atom({
  key: TODOS_RESULT_ATOM_KEY,
  default: {
    todos: loadItem(TODOS_RESULT_ATOM_KEY) || [],
    todo: null,
    todoError: null,
  },
});

export default todosResultAtom;
