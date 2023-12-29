import { atom } from 'recoil';

import { AUTH_FORM_STATUS_ATOM_KEY, AUTH_RESULT_ATOM_KEY } from '../../utils/constants/atomKey';

export type AuthResultAtomType = {
  auth: any;
  authError: any;
  authSuccess: null | string;
};

export type AuthFormATomType = {
  type: 'login' | 'register' | 'logout';
  visible: boolean;
};

export const authFormStatusAtom = atom<AuthFormATomType>({
  key: AUTH_FORM_STATUS_ATOM_KEY,
  default: {
    type: 'login',
    visible: false,
  },
});

const authResultAtom = atom<AuthResultAtomType>({
  key: AUTH_RESULT_ATOM_KEY,
  default: {
    auth: null,
    authError: null,
    authSuccess: null,
  },
});

export default authResultAtom;
