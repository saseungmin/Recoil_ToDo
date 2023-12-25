import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { useSnackbar } from 'notistack';

import todosResultAtom, { TodosResultAtomType } from '../../recoil/todos/atom';

function TodoStatusSnackbar() {
  const [{ todoError, todoSuccess }, setTodoState] = useRecoilState(todosResultAtom);

  const { enqueueSnackbar } = useSnackbar();

  const resetState = (state: Partial<TodosResultAtomType>) => setTodoState((prevState) => ({
    ...prevState,
    ...state,
  }));

  useEffect(() => {
    if (todoError) {
      enqueueSnackbar(todoError, {
        variant: 'error',
      });

      resetState({ todoError: null });
    }
  }, [todoError]);

  useEffect(() => {
    if (todoSuccess) {
      enqueueSnackbar(todoSuccess, {
        variant: 'success',
      });

      resetState({ todoSuccess: null });
    }
  }, [todoSuccess]);

  return null;
}

export default TodoStatusSnackbar;
