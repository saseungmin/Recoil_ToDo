import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import todosResultAtom, { todoWithWrite } from '../recoil/todos';

import { TODO_SUCCESS } from '../utils/constants/messages';
import { todoErrorMessage } from '../utils/errorMessageHandling';

const useWriteCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async (task) => {
  set(isLoadingAtom, true);

  try {
    const { data } = await snapshot.getPromise(todoWithWrite(task));

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        todoSuccess: TODO_SUCCESS.WRITE,
        todos: [
          data,
          ...prevState.todos,
        ],
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
}, [isLoadingAtom, todosResultAtom]);

export default useWriteCallback;
