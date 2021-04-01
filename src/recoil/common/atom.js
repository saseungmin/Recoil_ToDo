import { atom } from 'recoil';

import { IS_LOADING_ATOM_KEY, THEME_MODE_ATOM_KEY } from '../../utils/constants/atomKey';
import { getTheme } from '../../utils/utils';

import { loadItem } from '../../services/storage';

const isLoadingAtom = atom({
  key: IS_LOADING_ATOM_KEY,
  default: false,
});

export const themeModeAtom = atom({
  key: THEME_MODE_ATOM_KEY,
  default: getTheme(loadItem('theme')),
});

export default isLoadingAtom;
