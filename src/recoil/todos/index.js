import atom, { filterAtom, taskInputAtom, todosResultAtom } from './atom';

import todosWithFilter from './withFilter';
import todosWithWriteQuery from './withWrite';
import todosWithHandle from './withTodosHandle';
import todosWithListQuery from './withList';
import todoWithRemove from './withRemove';
import todoWithUpdate from './withUpdate';
import todoWithMultipleRemove from './withMultipleRemove';

export {
  filterAtom,
  todosWithFilter,
  todosWithWriteQuery,
  taskInputAtom,
  todosResultAtom,
  todosWithHandle,
  todosWithListQuery,
  todoWithRemove,
  todoWithUpdate,
  todoWithMultipleRemove,
};

export default atom;
