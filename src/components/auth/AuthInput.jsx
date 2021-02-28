import React from 'react';

const authFieldsProperty = {
  userId: {
    inputType: 'text',
    placeholder: '아이디',
    autoComplete: 'username',
  },
  password: {
    inputType: 'password',
    placeholder: '비밀번호',
    autoComplete: 'new-password',
  },
  passwordConfirm: {
    inputType: 'password',
    placeholder: '비밀번호 확인',
    autoComplete: 'new-password',
  },
};

const AuthInput = ({ inputRef, inputName }) => {
  const { inputType, placeholder, autoComplete } = authFieldsProperty[inputName];

  return (
    <input
      ref={inputRef}
      type={inputType}
      name={inputName}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
};

export default AuthInput;
