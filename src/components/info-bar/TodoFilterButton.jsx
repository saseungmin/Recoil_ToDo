import React from 'react';

import { useSetRecoilState } from 'recoil';

import { filterAtom } from '../../recoil/todos';

const TodoFilterButton = ({ type }) => {
  const setFilter = useSetRecoilState(filterAtom);

  const handleClick = (e) => {
    const { value } = e.target;

    setFilter(value);
  };

  return (
    <button
      value={type}
      type="button"
      onClick={handleClick}
    >
      {type}
    </button>
  );
};

export default TodoFilterButton;
