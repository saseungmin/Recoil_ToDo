import { atom } from 'recoil';

import { USER_ATOM_KEY } from '../../utils/constants/atomKey';

export type User = {
  id: string;
  password: string;
};

type UserAtom = {
  user: User | null;
  checkError: any;
};

const userAtom = atom<UserAtom>({
  key: USER_ATOM_KEY,
  default: {
    user: null,
    checkError: null,
  },
});

export default userAtom;
