import { atom } from 'recoil';

import {
  AUTH_FIELDS_ATOM_KEY, AUTH_FORM_STATUS_ATOM_KEY, AUTH_RESULT_ATOM_KEY, USER_ATOM_KEY,
} from '../../utils/constants/atomKey';

export const authFormStatusAtom = atom({
  key: AUTH_FORM_STATUS_ATOM_KEY,
  default: {
    type: '',
    visible: false,
  },
});

export const authResultAtom = atom({
  key: AUTH_RESULT_ATOM_KEY,
  default: {
    auth: null,
    authError: null,
    loading: false,
  },
});

export const userAtom = atom({
  key: USER_ATOM_KEY,
  default: null,
});

const authFieldsAtom = atom({
  key: AUTH_FIELDS_ATOM_KEY,
  default: null,
});

export default authFieldsAtom;
