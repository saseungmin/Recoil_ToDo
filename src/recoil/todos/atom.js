import { atom } from 'recoil';

const todosAtom = atom({
  key: 'todosAtom',
  default: [],
});

export default todosAtom;
