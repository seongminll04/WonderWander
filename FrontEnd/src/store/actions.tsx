export const setLogin = (value: boolean) => ({
  type: "SET_LOGIN",
  payload: value,
});

export const setModal = (value: string | null) => ({
  type: 'SET_MODAL',
  payload: value,
});

export const setUserDetail = (isUserDetail: string | null) => ({
  type: 'SET_USER',
  payload: isUserDetail,
});
