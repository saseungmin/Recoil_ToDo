import React, { useState, useEffect } from 'react';

import {
  useSetRecoilState, useRecoilValue, useRecoilState,
} from 'recoil';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

import { useSnackbar } from 'notistack';
import todosAtom, { todosWithWriteQuery, todosWithHandle, todosResultAtom } from '../../recoil/todos';
import userAtom from '../../recoil/user';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

const TodoInputWrapper = css`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoInputDivWrapper = styled.div`
  ${mq({
    marginBottom: ['2rem', '1.5rem', '2rem'],
  })};

  margin-top: 1rem;
  ${TodoInputWrapper}
`;

const TodoInputFormWrapper = styled.form`
  ${TodoInputWrapper}
`;

const NewTodoInputWrapper = styled.input`
  ${mq({
    width: ['100%', '80vw', '700px'],
    height: ['60%', '45px', '50px'],
    fontSize: ['1rem', '1.2rem', '1.3rem'],
  })};
  
  text-align: center;
  padding: 2px;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  color: #5f5f5f;
  background: #f6f6f6;
  transition-timing-function: ease-in-out;
  transition: all 0.2s cubic-bezier(.65,.33,.65,.33);
  
  @keyframes shake {
      0% { left: -5px; }
      100% { right: -5px; }
  };

  ${({ error }) => error && css`
    position: relative;
    border: 2px solid ${palette.warn[3]};
    animation: shake .1s linear;
    animation-iteration-count: 3;

    &::placeholder {
      color: ${palette.warn[3]};
      transition: color .5s;
    }
  `};

  &:focus {
    ${({ error }) => !error && css`
      border: 2px solid ${palette.active[0]};
    `};

  ${mq({
    height: ['60%', '50px', '55px'],
    fontSize: ['1.2rem', '1.4rem', '1.5rem'],
  })};

    padding: 0;
    box-shadow: ${palette.gray[3]} 0px 4px 9px 0px;
  };
`;

const DisableInput = styled.div`
  ${mq({
    width: ['100%', '80vw', '700px'],
    height: ['60%', '45px', '50px'],
    fontSize: ['1rem', '1.2rem', '1.3rem'],
  })};
  
  color: ${palette.gray[5]};
  cursor: not-allowed;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 2rem 0;
  border: 2px solid ${palette.gray[5]};
  border-radius: 4px;
`;

const TodoInput = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const setTodos = useSetRecoilState(todosAtom);
  const { user } = useRecoilValue(userAtom);
  const [writeLoadable, setTask] = useRecoilState(todosWithWriteQuery);
  const setTodoResult = useSetRecoilState(todosWithHandle);
  const { todo } = useRecoilValue(todosResultAtom);

  const onSubmit = ({ task }) => {
    if (!_.trim(task)) {
      setError(true);
      return;
    }

    setTask(task);

    // TODO - 추후 삭제
    setTodos((oldTodoList) => [
      ...oldTodoList,
      {
        id: uuidv4(),
        task,
        isComplete: false,
      },
    ]);

    setError(false);
    reset();
  };

  const handleResetError = () => {
    setError(false);
  };

  const handleKeyPress = (e) => {
    if (error && e.key === 'Enter') {
      handleResetError();
    }
  };

  useEffect(() => {
    if (writeLoadable) {
      setTodoResult(writeLoadable);
    }
  }, [writeLoadable]);

  useEffect(() => {
    if (todo) {
      enqueueSnackbar('Success in entering To-Do', {
        variant: 'success',
      });
    }
  }, [todo]);

  if (!user) {
    return (
      <DisableInput>
        로그인 후 이용 가능합니다.
      </DisableInput>
    );
  }

  return (
    <TodoInputDivWrapper>
      <TodoInputFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <NewTodoInputWrapper
          name="task"
          error={error}
          ref={register}
          autoComplete="off"
          onBlur={handleResetError}
          onChange={handleResetError}
          onKeyPress={handleKeyPress}
          placeholder="오늘의 할 일을 입력해주세요!"
        />
      </TodoInputFormWrapper>
    </TodoInputDivWrapper>
  );
};

export default TodoInput;
