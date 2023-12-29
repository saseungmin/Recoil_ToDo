import { selector } from 'recoil';

import todosResultAtom, { filterAtom } from './atom';

import { filteredTodos } from '../../utils/utils';

const todosWithFilter = selector({
  key: 'todosWithFilter',
  get: ({ get }) => {
    const filter = get(filterAtom);
    const { todos } = get(todosResultAtom);

    return filteredTodos[filter](todos);
  },
});

export default todosWithFilter;
