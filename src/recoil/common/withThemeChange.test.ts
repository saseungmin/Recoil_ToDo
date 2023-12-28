import { snapshot_UNSTABLE } from 'recoil';

import { themeModeAtom } from './atom';
import themeWithChange from './withThemeChange';

describe('themeWithChange', () => {
  it('Should be return true', () => {
    const initialSnapshot = snapshot_UNSTABLE(({ set }) => set(themeModeAtom, true));

    const result = initialSnapshot.getLoadable(themeWithChange).valueOrThrow();

    expect(result).toBe(true);
  });
});
