import React from 'react';

const TodoFilterButton = ({ onClick, type }) => (
  <button
    value={type}
    type="button"
    onClick={onClick}
  >
    {type}
  </button>
);

export default TodoFilterButton;
