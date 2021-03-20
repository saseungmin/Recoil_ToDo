import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import { todosResultAtom, todoWithMultipleRemove } from '../recoil/todos';

import { isActive } from '../utils/utils';
import { TODO_SUCCESS } from '../utils/constants/messages';
import { todoErrorMessage } from '../utils/errorMessageHandling';

const useMultipleRemoveCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async (ids) => {
  set(isLoadingAtom, true);

  try {
    await snapshot.getPromise(todoWithMultipleRemove(ids));

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        todos: prevState.todos.filter(isActive),
        todoSuccess: TODO_SUCCESS.MULTIPLE_DELETE,
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

export default useMultipleRemoveCallback;
