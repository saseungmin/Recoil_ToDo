import { atom } from 'recoil';

import { IS_LOADING_ATOM_KEY } from '../../utils/constants/atomKey';

const isLoadingAtom = atom({
  key: IS_LOADING_ATOM_KEY,
  default: false,
});

export default isLoadingAtom;
