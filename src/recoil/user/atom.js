import { atom } from 'recoil';

import { USER_ATOM_KEY } from '../../utils/constants/atomKey';

const userAtom = atom({
  key: USER_ATOM_KEY,
  default: {
    user: null,
    checkError: null,
  },
});

export default userAtom;
