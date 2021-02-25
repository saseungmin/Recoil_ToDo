import React from 'react';

const AuthButton = ({ type, onClick }) => (
  <button
    type="button"
    onClick={onClick}
  >
    {type}
  </button>

);

export default AuthButton;
