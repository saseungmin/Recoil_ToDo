import { todoErrorMessage, authErrorMessage, authErrorMessages } from './errorMessageHandling';

describe('authErrorMessage', () => {
  const setErrorMessage = authErrorMessage('Sign in');

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

describe('authErrorMessages', () => {
  const setErrorStatus = (status, data) => ({
    response: {
      status,
      data,
    },
  });
  describe('status is 400', () => {
    const errorStatus = setErrorStatus(400, {
      details: [{
        message: '빈 값이 존재합니다.',
      }],
    });

    it('Error message should be "빈 값이 존재합니다."', () => {
      const errorMessage = authErrorMessages(errorStatus);

      expect(errorMessage).toBe('빈 값이 존재합니다.');
    });
  });

  describe('status is 409', () => {
    const errorStatus = setErrorStatus(409, '');

    it('Error message should be "이미 존재하는 아이디입니다."', () => {
      const errorMessage = authErrorMessages(errorStatus);

      expect(errorMessage).toBe('이미 존재하는 아이디입니다.');
    });
  });

  describe('status is 401', () => {
    const errorStatus = setErrorStatus(401, '');

    it('Error message should be "아이디 또는 비밀번호가 다릅니다."', () => {
      const errorMessage = authErrorMessages(errorStatus);

      expect(errorMessage).toBe('아이디 또는 비밀번호가 다릅니다.');
    });
  });

  describe('status is 500', () => {
    const errorStatus = setErrorStatus(500, '');

    it('Error message should be "서버에 문제가 발생하였습니다. 관리자에게 문의하세요."', () => {
      const errorMessage = authErrorMessages(errorStatus);

      expect(errorMessage).toBe('서버에 문제가 발생하였습니다. 관리자에게 문의하세요.');
    });
  });

  describe('Another status', () => {
    const errorStatus = setErrorStatus(403, '');

    it('Error message should be "알 수 없는 오류가 생겼습니다.. 잠시 후 다시 시도해주세요!"', () => {
      const errorMessage = authErrorMessages(errorStatus);

      expect(errorMessage).toBe('알 수 없는 오류가 생겼습니다.. 잠시 후 다시 시도해주세요!');
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
