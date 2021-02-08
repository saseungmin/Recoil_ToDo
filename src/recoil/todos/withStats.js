import { selector } from 'recoil';

import todosAtom from './atom';
import { isCompleted, isActive } from '../../utils/utils';

const todosWithStats = selector({
  key: 'todosWithStats',
  get: ({ get }) => {
    const todos = get(todosAtom);

    const totalNum = todos.length;
    const totalCompletedNum = todos.filter(isCompleted).length;
    const totalUnCompletedNum = todos.filter(isActive).length;

    return {
      totalNum,
      totalCompletedNum,
      totalUnCompletedNum,
    };
  },
});

export default todosWithStats;
