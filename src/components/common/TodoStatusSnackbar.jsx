import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { useSnackbar } from 'notistack';

import todosResultAtom from '../../recoil/todos/atom';

const TodoStatusSnackbar = () => {
  const [{ todoError, todoSuccess }, setTodoState] = useRecoilState(todosResultAtom);

  const { enqueueSnackbar } = useSnackbar();

  const resetState = (state) => setTodoState((prevState) => ({
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
};

export default TodoStatusSnackbar;
