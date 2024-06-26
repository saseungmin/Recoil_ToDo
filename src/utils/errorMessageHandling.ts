import { TODO_ERROR, AUTH_ERROR } from './constants/messages';

type Response = {
  status: number;
  data?: {
    details: [{ message: string; }];
  };
};

export const authErrorMessage = ({ response }: { response: Response; }) => {
  const {
    UNAUTHORIZED, CONFLICT, INTERNAL_SERVER_ERROR, SOMETHING_WRONG,
  } = AUTH_ERROR;

  const { status, data } = response;

  if (status === 400) {
    return data?.details[0].message;
  }

  if (status === 401) {
    return UNAUTHORIZED;
  }

  if (status === 409) {
    return CONFLICT;
  }

  if (status === 500) {
    return INTERNAL_SERVER_ERROR;
  }

  return SOMETHING_WRONG;
};

export const todoErrorMessage = ({ response }: { response: Response; }) => {
  const {
    NOT_FOUND, INTERNAL_SERVER_ERROR, UNAUTHORIZED, SOMETHING_WRONG,
  } = TODO_ERROR;

  const { status } = response;

  if (status === 400 || status === 404) {
    return NOT_FOUND;
  }

  if (status === 403 || status === 401) {
    return UNAUTHORIZED;
  }

  if (status === 500) {
    return INTERNAL_SERVER_ERROR;
  }

  return SOMETHING_WRONG;
};
