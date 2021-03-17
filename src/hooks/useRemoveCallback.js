import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import { todosResultAtom, todoWithRemove } from '../recoil/todos';

import { todoErrorMessage } from '../utils/utils';

const useRemoveCallback = () => useRecoilCallback(({ snapshot, set, reset }) => async (id) => {
  set(isLoadingAtom, true);

  try {
    await snapshot.getPromise(todoWithRemove(id));

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        todos: prevState.todos.filter((todo) => todo._id !== id),
      }),
    );
  } catch (error) {
    set(todosResultAtom, (prevState) => ({
      ...prevState,
      todoError: todoErrorMessage(error),
    }));
  } finally {
    reset(isLoadingAtom);
  }
}, [todosResultAtom, isLoadingAtom]);

export default useRemoveCallback;
