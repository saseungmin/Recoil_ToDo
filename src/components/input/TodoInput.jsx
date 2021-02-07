import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { v4 as uuidv4 } from 'uuid';

import todosAtom from '../../recoil/todos/atom';

const TodoInput = () => {
  const [input, setInput] = useState('');
  const setTodos = useSetRecoilState(todosAtom);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodos((oldTodoList) => [
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
