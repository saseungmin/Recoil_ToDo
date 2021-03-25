import authResultAtom, { authFormStatusAtom } from './atom';

import authWithLogin from './withLogin';
import authWithLogout from './withLogout';
import authWithRegister from './withRegister';

export {
  authFormStatusAtom,
  authWithLogout,
  authWithLogin,
  authWithRegister,
};

export default authResultAtom;
