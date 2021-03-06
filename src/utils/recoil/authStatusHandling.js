const authStatusHandling = (success) => ({
  success,
  error: (authError) => ({
    authError,
    loading: false,
  }),
  loading: () => ({
    loading: true,
  }),
});

export const registerHandling = authStatusHandling((auth) => ({
  auth,
  loading: false,
}));

export const loginHandling = authStatusHandling(({ data }) => ({
  user: data,
  loading: false,
}));

export const logoutHandling = authStatusHandling(() => ({
  user: null,
  loading: false,
}));
