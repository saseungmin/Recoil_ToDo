import atom, { filterAtom, taskInputAtom, todosResultAtom } from './atom';

import todosWithFilter from './withFilter';
import todosWithWriteQuery from './withWrite';
import todosWithHandle from './withTodosHandle';
import todosWithListQuery from './withList';
import todoWithRemove from './withRemove';

export {
  filterAtom,
  todosWithFilter,
  todosWithWriteQuery,
  taskInputAtom,
  todosResultAtom,
  todosWithHandle,
  todosWithListQuery,
  todoWithRemove,
};

export default atom;
