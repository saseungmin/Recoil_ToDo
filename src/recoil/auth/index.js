import authFieldsAtom, { authFormStatusAtom, authResultAtom } from './atom';

import authWithLogin from './withLogin';
import authWithLogout from './withLogout';
import authWithRegister from './withRegister';

export {
  authResultAtom,
  authFormStatusAtom,
  authWithLogout,
  authWithLogin,
  authWithRegister,
};

export default authFieldsAtom;
