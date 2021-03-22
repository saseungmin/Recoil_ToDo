import todosResultAtom, { filterAtom } from './atom';

import todosWithFilter from './withFilter';
import todoWithWrite from './withWrite';
import todosWithLoad from './withLoad';
import todoWithRemove from './withRemove';
import todoWithUpdate from './withUpdate';
import todoWithMultipleRemove from './withMultipleRemove';

export {
  filterAtom,
  todosWithFilter,
  todosWithLoad,
  todoWithWrite,
  todoWithRemove,
  todoWithUpdate,
  todoWithMultipleRemove,
};

export default todosResultAtom;
