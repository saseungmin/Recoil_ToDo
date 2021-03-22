import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import todosResultAtom, { todosWithLoad } from '../recoil/todos';

import { todoErrorMessage } from '../utils/errorMessageHandling';

const useLoadCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async () => {
  set(isLoadingAtom, true);

  try {
    const { data } = await snapshot.getPromise(todosWithLoad);

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        todos: data,
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

export default useLoadCallback;
