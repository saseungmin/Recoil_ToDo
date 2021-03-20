import { selector, selectorFamily, noWait } from 'recoil';

import { list } from '../../services/api/todos';
import recoilLoadable from '../../utils/recoil/recoilLoadable';

import userAtom from '../user';
import { filterAtom } from './atom';

export const todosWithList = selectorFamily({
  key: 'todosWithList',
  get: (filter) => async () => {
    const response = await list(filter);

    return response;
  },
});

const todosWithListQuery = selector({
  key: 'todosWithListQuery',
  get: ({ get }) => {
    const { user } = get(userAtom);
    const filter = get(filterAtom);

    if (!user) {
      return null;
    }

    const loadable = recoilLoadable(get(noWait(todosWithList(filter))));

    return loadable;
  },
});

export default todosWithListQuery;
