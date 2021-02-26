import { selector } from 'recoil';

import authFieldsAtom, { authStatusAtom } from './atom';

const authWithFields = selector({
  key: 'authWithFields',
  get: ({ get }) => {
    const { type } = get(authStatusAtom);
    const authFields = get(authFieldsAtom);

    return authFields[type];
  },
  set: ({ set }, { name, value, type }) => {
    set(
      authFieldsAtom,
      (prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          [name]: value,
        },
      }),
    );
  },
});

export default authWithFields;
