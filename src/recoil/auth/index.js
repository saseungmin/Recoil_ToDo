import authFieldsAtom, { authFormStatusAtom, authResultAtom, userAtom } from './atom';

import authWithLoginHandle, { authWithLoginQuery } from './withLogin';
import authWithLogoutHandle, { authWithLogoutQuery } from './withLogout';
import authWithRegisterHandle, { authWithRegisterQuery } from './withRegister';

export {
  userAtom,
  authResultAtom,
  authWithLogoutHandle,
  authFormStatusAtom,
  authWithLogoutQuery,
  authWithLoginHandle,
  authWithLoginQuery,
  authWithRegisterQuery,
  authWithRegisterHandle,
};

export default authFieldsAtom;
