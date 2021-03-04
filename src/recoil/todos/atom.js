import { atom } from 'recoil';

import { loadItem } from '../../services/storage';

import { TODOS_ATOM_KEY, FILTER_ATOM_KEY } from '../../utils/constants/atomKey';

const todosAtom = atom({
  key: TODOS_ATOM_KEY,
  default: loadItem(TODOS_ATOM_KEY) || [],
});

export const filterAtom = atom({
  key: FILTER_ATOM_KEY,
  default: 'ALL',
});

export default todosAtom;