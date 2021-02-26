import React from 'react';

import { useRecoilState } from 'recoil';

import { authWithFields } from '../../recoil/auth';

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

const AuthInput = ({ formType, inputName }) => {
  const [authFieldsState, setAuthFieldsState] = useRecoilState(authWithFields);

  const { inputType, placeholder, autoComplete } = authFieldsProperty[inputName];

  const onChange = (e, type) => {
    const { name, value } = e.target;

    setAuthFieldsState({ name, type, value });
  };

  return (
    <input
      type={inputType}
      name={inputName}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={authFieldsState[inputName]}
      onChange={(e) => onChange(e, formType)}
    />
  );
};

export default AuthInput;
