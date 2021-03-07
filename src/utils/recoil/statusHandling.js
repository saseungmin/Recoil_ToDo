export const authStatusHandling = {
  success: (auth) => ({
    auth,
    authError: null,
  }),
  error: (authError) => ({
    authError,
  }),
};

const userStatusHandling = (success) => ({
  success,
  error: (checkError) => ({
    checkError,
  }),
});

export const checkHandling = userStatusHandling(({ data }) => ({
  user: data,
  checkError: null,
}));

export const logoutHandling = userStatusHandling(() => ({
  user: null,
}));
