import authFieldsAtom, { authFormStatusAtom, authResultAtom, userAtom } from './atom';

import authWithEnterUser from './withEnterUser';
import authWithResult from './withResult';
import authWithLogoutQuery from './withLogout';

export {
  authResultAtom,
  authWithEnterUser,
  authFormStatusAtom,
  authWithResult,
  userAtom,
  authWithLogoutQuery,
};

export default authFieldsAtom;
