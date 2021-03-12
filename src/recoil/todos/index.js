import atom, { filterAtom, taskInputAtom, todosResultAtom } from './atom';

import todosWithFilter from './withFilter';
import todosWithWriteQuery from './withWrite';
import todosWithHandle from './withTodosHandle';

export {
  filterAtom,
  todosWithFilter,
  todosWithWriteQuery,
  taskInputAtom,
  todosResultAtom,
  todosWithHandle,
};

export default atom;
