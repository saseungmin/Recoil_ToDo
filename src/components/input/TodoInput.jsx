import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';

import palette from '../../styles/palette';

import todosAtom from '../../recoil/todos/atom';

const TodoInputDivWrapper = styled.div`
  height: 62px;
`;

const NewTodoInputWrapper = styled.input`
  font-size: 1.3rem;
  text-align: center;
  width: 800px;
  height: 50px;
  padding: 2px;
  margin-bottom: 6px;
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

    padding: 0;
    height: 55px;
    font-size:1.5rem;
    box-shadow: ${palette.gray[3]} 0px 4px 9px 0px;
  };
`;

const TodoInput = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const setTodos = useSetRecoilState(todosAtom);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!_.trim(input)) {
      setError(true);
      return;
    }

    setTodos((oldTodoList) => [
      ...oldTodoList,
      {
        id: uuidv4(),
        task: input,
        isComplete: false,
      },
    ]);

    setInput('');
    setError(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setError(false);
    setInput(value);
  };

  const handleBlur = () => {
    setError(false);
  };

  const handleKeyPress = (e) => {
    if (error && e.key === 'Enter') {
      setError(false);
    }
  };

  return (
    <TodoInputDivWrapper>
      <form onSubmit={handleSubmit}>
        <NewTodoInputWrapper
          error={error}
          value={input}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="오늘의 할 일을 입력하세요!"
        />
      </form>
    </TodoInputDivWrapper>
  );
};

export default TodoInput;
