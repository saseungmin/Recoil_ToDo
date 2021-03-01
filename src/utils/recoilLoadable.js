const recoilLoadableStatus = {
  hasValue: ({ status, data }) => ({
    data,
    status,
    type: 'success',
  }),
  loading: () => ({
    type: 'loading',
  }),
  hasError: ({ response }) => {
    const { status, data } = response;

    return {
      data,
      status,
      type: 'error',
    };
  },
};

const recoilLoadable = ({ state, contents }) => {
  if (!state || !contents) {
    return null;
  }

  return recoilLoadableStatus[state](contents);
};

export default recoilLoadable;
