import {
  newTodos, filteredTodos, setPath, userCheckErrorHandling, authSetErrorMessage, todoErrorMessage,
} from './utils';

import { BASE_URL } from './constants/url';

import { removeItem } from '../services/storage';

jest.mock('../services/storage');
describe('newTodos', () => {
  const initialState = [
    { _id: '1', task: 'task', isComplete: false },
    { _id: '2', task: 'task', isComplete: false },
  ];

  it('Change the value of the key of the array', () => {
    const todos = newTodos(initialState)({
      _id: '1',
      key: 'task',
      value: 'some task',
    });

    expect(todos).toEqual([
      { ...initialState[0], task: 'some task' },
      { ...initialState[1] },
    ]);
  });
});

describe('filteredTodos', () => {
  const initialState = [
    { id: '1', task: 'task', isComplete: false },
    { id: '2', task: 'task', isComplete: true },
  ];

  it('When All todos', () => {
    const result = filteredTodos.ALL(initialState);

    expect(result).toEqual(initialState);
  });

  it('When is completed todos', () => {
    const result = filteredTodos.COMPLETED(initialState);

    expect(result).toEqual([initialState[1]]);
  });

  it("When isn't completed todos", () => {
    const result = filteredTodos.ACTIVE(initialState);

    expect(result).toEqual([initialState[0]]);
  });
});

describe('setPath', () => {
  it('When env "development"', () => {
    const result = setPath('development');

    expect(result).toEqual({
      baseURL: '/',
    });
  });

  it('When another env', () => {
    const result = setPath('production');

    expect(result).toEqual({
      baseURL: BASE_URL,
      withCredentials: true,
    });
  });
});

describe('userCheckErrorHandling', () => {
  context('Have Error', () => {
    it('Call localStorage removeItem', () => {
      try {
        userCheckErrorHandling(new Promise((_, reject) => reject(new Error('error'))));
      } catch (error) {
        expect(removeItem).toBeCalledTimes(1);
      }
    });
  });

  context('Have Success', () => {
    it('should response data', async () => {
      const response = await userCheckErrorHandling(new Promise((resolve) => resolve('success')));

      expect(response).toBe('success');
    });
  });
});

describe('authSetErrorMessage', () => {
  const setErrorMessage = authSetErrorMessage('Sign in');

  describe('status is 400', () => {
    const errorStatus = {
      status: 400,
      data: {
        details: [{
          message: '빈 값이 존재합니다.',
        }],
      },
    };

    it('Error message should be "빈 값이 존재합니다."', () => {
      const errorMessage = setErrorMessage(errorStatus);

      expect(errorMessage).toBe(errorStatus.data.details[0].message);
    });
  });

  describe('status is 409', () => {
    const errorStatus = {
      status: 409,
      data: '',
    };

    it('Error message should be "이미 존재하는 아이디입니다."', () => {
      const errorMessage = setErrorMessage(errorStatus);

      expect(errorMessage).toBe('이미 존재하는 아이디입니다.');
    });
  });

  describe('status is 401', () => {
    const errorStatus = {
      status: 401,
      data: '',
    };

    it('Error message should be "아이디 또는 비밀번호가 다릅니다."', () => {
      const errorMessage = setErrorMessage(errorStatus);

      expect(errorMessage).toBe('아이디 또는 비밀번호가 다릅니다.');
    });
  });

  describe('status is 500', () => {
    const errorStatus = {
      status: 500,
      data: '',
    };

    it('Error message should be "서버에 문제가 발생하였습니다. 관리자에게 문의하세요."', () => {
      const errorMessage = setErrorMessage(errorStatus);

      expect(errorMessage).toBe('서버에 문제가 발생하였습니다. 관리자에게 문의하세요.');
    });
  });

  describe('Another status', () => {
    const errorStatus = {
      status: 403,
      data: '',
    };

    it('Error message should be "Failure Sign in!"', () => {
      const errorMessage = setErrorMessage(errorStatus);

      expect(errorMessage).toBe('Failure Sign in!');
    });
  });
});

describe('todoErrorMessage', () => {
  const setErrorStatus = (status) => ({
    response: {
      status,
    },
  });

  describe('status is 400 and 404', () => {
    it('Error message should be "해당 할 일은 이미 삭제되었거나, 존재하지 않습니다."', () => {
      const errorMessage = todoErrorMessage(setErrorStatus(400));

      expect(errorMessage).toBe('해당 할 일은 이미 삭제되었거나, 존재하지 않습니다.');
    });
  });

  describe('status is 403', () => {
    it('Error message should be "해당 할 일에 대한 권한이 없습니다."', () => {
      const errorMessage = todoErrorMessage(setErrorStatus(403));

      expect(errorMessage).toBe('해당 할 일에 대한 권한이 없습니다.');
    });
  });

  describe('status is 500', () => {
    it('Error message should be "서버에 문제가 발생하였습니다. 관리자에게 문의하세요."', () => {
      const errorMessage = todoErrorMessage(setErrorStatus(500));

      expect(errorMessage).toBe('서버에 문제가 발생하였습니다. 관리자에게 문의하세요.');
    });
  });

  describe('Another status', () => {
    it('Error message should be "알 수 없는 오류가 생겼습니다.. 잠시 후 다시 시도해주세요!"', () => {
      const errorMessage = todoErrorMessage(setErrorStatus(402));

      expect(errorMessage).toBe('알 수 없는 오류가 생겼습니다.. 잠시 후 다시 시도해주세요!');
    });
  });
});
