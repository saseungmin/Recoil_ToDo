import { atom } from 'recoil';

import { FILTER_ATOM_KEY, TODOS_RESULT_ATOM_KEY } from '../../utils/constants/atomKey';

export type Todo = {
  _id: string;
  task: string;
  isComplete: boolean;
};

export type TodosResultAtomType = {
  todos: Todo[];
  todoError: null | string;
  todoSuccess: null | string;
};

export type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export const filterAtom = atom<FilterType>({
  key: FILTER_ATOM_KEY,
  default: 'ALL',
});

const todosResultAtom = atom<TodosResultAtomType>({
  key: TODOS_RESULT_ATOM_KEY,
  default: {
    todos: [],
    todoError: null,
    todoSuccess: null,
  },
});

export default todosResultAtom;
