import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';

import { INPUT_ERROR_MESSAGE } from '../../utils/constants/constants';

import todosAtom from '../../recoil/todos/atom';

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

    setInput(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleChange}
          placeholder="오늘의 할 일을 입력하세요!"
        />
      </form>
      {error && <div>{INPUT_ERROR_MESSAGE}</div>}
    </>
  );
};

export default TodoInput;
