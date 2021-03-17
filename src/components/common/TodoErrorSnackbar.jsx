import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { useSnackbar } from 'notistack';

import { todosResultAtom } from '../../recoil/todos/atom';

const TodoErrorSnackbar = () => {
  const [{ todoError }, setTodoState] = useRecoilState(todosResultAtom);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (todoError) {
      enqueueSnackbar(todoError, {
        variant: 'error',
      });

      setTodoState((prevState) => ({
        ...prevState,
        todoError: null,
      }));
    }
  }, [todoError]);

  return null;
};

export default TodoErrorSnackbar;
