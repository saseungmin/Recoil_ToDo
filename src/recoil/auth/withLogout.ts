import { selector } from 'recoil';

import userAtom from '../user/atom';
import todosResultAtom from '../todos';
import { authFormStatusAtom } from './atom';

import { removeItem } from '../../services/storage';
import { removeCookie } from '../../services/cookie';

const authWithLogout = selector({
  key: 'authWithLogout',
  get: () => {},
  set: ({ reset }) => {
    reset(userAtom);
    reset(authFormStatusAtom);
    reset(todosResultAtom);
    removeItem('user');
    removeCookie('access_token');
  },
});

export default authWithLogout;
