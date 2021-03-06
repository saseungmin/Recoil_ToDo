import authFieldsAtom, { authFormStatusAtom, authResultAtom, userAtom } from './atom';

import authWithLoginQuery from './withLogin';
import authWithLogoutQuery from './withLogout';
import authWithRegisterQuery from './withRegister';
import authWithHandle from './withAuthHandle';

export {
  userAtom,
  authResultAtom,
  authFormStatusAtom,
  authWithLogoutQuery,
  authWithLoginQuery,
  authWithRegisterQuery,
  authWithHandle,
};

export default authFieldsAtom;
