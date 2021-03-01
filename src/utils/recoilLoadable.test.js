import recoilLoadable from './recoilLoadable';

describe('recoilLoadable', () => {
  context('without state', () => {
    const state = {
      state: null,
      contents: '',
    };
    it('Nothing return', () => {
      const loadableState = recoilLoadable(state);

      expect(loadableState).toBeNull();
    });
  });

  context('with state', () => {
    it('When state is hasValue', () => {
      const state = {
        state: 'hasValue',
        contents: {
          status: 200,
          data: 'mockData',
        },
      };

      const loadableState = recoilLoadable(state);

      const { status, data } = state.contents;

      expect(loadableState).toEqual({
        type: 'success',
        data,
        status,
      });
    });

    it('When state is loading', () => {
      const state = {
        state: 'loading',
        contents: 'loading',
      };

      const loadableState = recoilLoadable(state);

      expect(loadableState).toEqual({
        type: 'loading',
      });
    });

    it('When state is hasError', () => {
      const state = {
        state: 'hasError',
        contents: {
          response: {
            status: 401,
            data: 'error',
          },
        },
      };

      const loadableState = recoilLoadable(state);

      const { status, data } = state.contents.response;

      expect(loadableState).toEqual({
        type: 'error',
        status,
        data,
      });
    });
  });
});
