import authFieldsAtom, { authFormStatusAtom, authResultAtom } from './atom';

import authWithLoginQuery from './withLogin';
import authWithLogoutQuery from './withLogout';
import authWithRegisterQuery from './withRegister';
import authWithHandle from './withAuthHandle';

export {
  authResultAtom,
  authFormStatusAtom,
  authWithLogoutQuery,
  authWithLoginQuery,
  authWithRegisterQuery,
  authWithHandle,
};

export default authFieldsAtom;
