import React from 'react';

const AuthButton = ({ type, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid="sign-out-button"
  >
    {type}
  </button>

);

export default AuthButton;
