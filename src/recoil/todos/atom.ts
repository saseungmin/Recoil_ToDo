import { atom } from 'recoil';

import { FILTER_ATOM_KEY, TODOS_RESULT_ATOM_KEY } from '../../utils/constants/atomKey';

type Todo = {
  _id: string;
  task: string;
  isComplete: boolean;
};

export type TodosResultAtomType = {
  todos: Todo[];
  todoError: null | string;
  todoSuccess: null | string;
};

export const filterAtom = atom({
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
