import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import todosResultAtom, { todoWithRemove } from '../recoil/todos';

import { TODO_SUCCESS } from '../utils/constants/messages';
import { todoErrorMessage } from '../utils/errorMessageHandling';

const useRemoveCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async (id: string) => {
  set(isLoadingAtom, true);

  try {
    await snapshot.getPromise(todoWithRemove(id));

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        todos: prevState.todos.filter((todo) => todo._id !== id),
        todoSuccess: TODO_SUCCESS.DELETE,
      }),
    );
  } catch (error: any) {
    set(todosResultAtom, (prevState) => ({
      ...prevState,
      todoError: todoErrorMessage(error),
    }));
  } finally {
    reset(isLoadingAtom);
  }
}, [todosResultAtom, isLoadingAtom]);

export default useRemoveCallback;
