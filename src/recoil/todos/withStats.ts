import { selector } from 'recoil';

import todosResultAtom from './atom';

import { isCompleted, isActive } from '../../utils/utils';

const todosWithStats = selector({
  key: 'todosWithStats',
  get: ({ get }) => {
    const { todos } = get(todosResultAtom);

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
