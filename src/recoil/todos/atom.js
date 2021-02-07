import { atom } from 'recoil';

const todosAtom = atom({
  key: 'todosAtom',
  default: [],
});

export const filterAtom = atom({
  key: 'filterAtom',
  default: 'All',
});

export default todosAtom;
