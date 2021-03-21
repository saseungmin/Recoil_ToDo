import todosResultAtom, { filterAtom } from './atom';

import todosWithFilter from './withFilter';
import todoWithWrite from './withWrite';
import todosWithHandle from './withTodosHandle';
import todosWithListQuery from './withList';
import todoWithRemove from './withRemove';
import todoWithUpdate from './withUpdate';
import todoWithMultipleRemove from './withMultipleRemove';

export {
  filterAtom,
  todosWithFilter,
  todosWithHandle,
  todosWithListQuery,
  todoWithWrite,
  todoWithRemove,
  todoWithUpdate,
  todoWithMultipleRemove,
};

export default todosResultAtom;
