import { selector } from 'recoil';

import { themeModeAtom } from './atom';

import { saveItem } from '../../services/storage';
import { LIGHT, DARK } from '../../utils/constants/theme';

const themeWithChange = selector({
  key: 'themeWithChange',
  get: ({ get }) => get(themeModeAtom),
  set: ({ set, get }) => {
    const theme = get(themeModeAtom);

    if (theme) {
      saveItem('theme', LIGHT);
      set(themeModeAtom, LIGHT);
      return;
    }

    saveItem('theme', DARK);
    set(themeModeAtom, DARK);
  },
});

export default themeWithChange;
