import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import todosAtom from '../../recoil/todos/atom';

const TodoInputWrapper = css`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoInputDivWrapper = styled.div`
  ${mq({
    marginBottom: ['1rem', '1.5rem', '2rem'],
  })};

  ${TodoInputWrapper}
`;

const TodoInputFormWrapper = styled.form`
  ${TodoInputWrapper}
`;

const NewTodoInputWrapper = styled.input`
  ${mq({
    width: ['90%', '75vw', '50vw'],
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
      <TodoInputFormWrapper onSubmit={handleSubmit}>
        <NewTodoInputWrapper
          error={error}
          value={input}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="오늘의 할 일을 입력하세요!"
        />
      </TodoInputFormWrapper>
    </TodoInputDivWrapper>
  );
};

export default TodoInput;
