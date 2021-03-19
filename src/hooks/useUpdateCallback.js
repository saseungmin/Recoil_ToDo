import { useRecoilCallback } from 'recoil';

import isLoadingAtom from '../recoil/common/atom';
import { todosResultAtom, todoWithUpdate } from '../recoil/todos';

import { updateTodos } from '../utils/utils';
import { todoErrorMessage } from '../utils/errorMessageHandling';

const useUpdateCallback = () => useRecoilCallback(({
  snapshot, set, reset,
}) => async (id, value) => {
  set(isLoadingAtom, true);

  try {
    const { data } = await snapshot.getPromise(todoWithUpdate({ id, value }));

    set(
      todosResultAtom,
      (prevState) => ({
        ...prevState,
        // TODO - 추후 메시지 변경
        todoSuccess: 'success update!',
        todos: updateTodos(prevState.todos, data),
      }),
    );
  } catch (error) {
    set(todosResultAtom, (prevState) => ({
      ...prevState,
      // TODO - 에러 메시지 정보 수정
      todoError: todoErrorMessage(error),
    }));
  } finally {
    reset(isLoadingAtom);
  }
}, [isLoadingAtom, todosResultAtom]);

export default useUpdateCallback;
