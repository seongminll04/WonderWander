export const setLogin = (value: {
  UserIdx:Number;
  Nickname:string|null;
  Image:string|null;
  Alarm:Boolean;
  Follower:Number;
  Following:Number;
  Intro:string;
}|null) => ({
  type: "SET_LOGIN",
  payload: value,
});

export const setModal = (value: string | null) => ({
  type: 'SET_MODAL',
  payload: value,
});

export const updateNickname = (value: string ) => ({
  type: "UPDATE_NICKNAME",
  payload: value,
});


export const setUserDetail = (isUserDetail: string | null) => ({
  type: 'SET_USER',
  payload: isUserDetail,
});
