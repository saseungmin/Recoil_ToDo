import atom, { filterAtom, taskInputAtom, todosResultAtom } from './atom';

import todosWithFilter from './withFilter';
import todosWithWriteQuery from './withWrite';
import todosWithHandle from './withTodosHandle';
import todosWithListQuery from './withList';

export {
  filterAtom,
  todosWithFilter,
  todosWithWriteQuery,
  taskInputAtom,
  todosResultAtom,
  todosWithHandle,
  todosWithListQuery,
};

export default atom;
