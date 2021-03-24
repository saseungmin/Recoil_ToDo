import authFieldsAtom, { authFormStatusAtom, authResultAtom } from './atom';

import authWithLoginQuery from './withLogin';
import authWithLogout from './withLogout';
import authWithRegisterQuery from './withRegister';
import authWithHandle from './withAuthHandle';

export {
  authResultAtom,
  authFormStatusAtom,
  authWithLoginQuery,
  authWithRegisterQuery,
  authWithHandle,
  authWithLogout,
};

export default authFieldsAtom;
