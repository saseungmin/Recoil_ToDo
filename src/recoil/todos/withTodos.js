import { selector } from 'recoil';

import todosAtom, { filterAtom } from './atom';

import { filteredTodos } from '../../utils/utils';

const filterWithTodos = selector({
  key: 'filterWithTodos',
  get: ({ get }) => {
    const filter = get(filterAtom);
    const todos = get(todosAtom);

    return filteredTodos[filter](todos);
  },
});

export default filterWithTodos;
