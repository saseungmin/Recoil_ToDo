import { atom } from 'recoil';

import { AUTH_FIELDS_ATOM_KEY, AUTH_STATUS_ATOM_KEY } from '../../utils/constants/atomKey';

export const authStatusAtom = atom({
  key: AUTH_STATUS_ATOM_KEY,
  default: {
    type: '',
    visible: false,
  },
});

const authFieldsAtom = atom({
  key: AUTH_FIELDS_ATOM_KEY,
  default: {
    register: {
      userId: '',
      password: '',
      passwordConfirm: '',
    },
    login: {
      userId: '',
      password: '',
    },
  },
});

export default authFieldsAtom;
