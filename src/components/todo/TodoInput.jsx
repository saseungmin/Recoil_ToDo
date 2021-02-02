import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { v4 as uuidv4 } from 'uuid';

import { initialTodoState } from '../../utils/recoil/atomState';

const TodoInput = () => {
  const [input, setInput] = useState('');
  const setTodo = useSetRecoilState(initialTodoState);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodo((oldTodoList) => [
      ...oldTodoList,
      {
        id: uuidv4(),
        task: input,
        isComplete: false,
      },
    ]);

    setInput('');
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
    </>
  );
};

export default TodoInput;
