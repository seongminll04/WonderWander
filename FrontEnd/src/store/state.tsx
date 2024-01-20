export interface AppState {
  // 로그인 여부
  isLogin:boolean;
  // isLogin:{
  //   UserIdx:number;
  //   Nickname:string|null;
  //   Image:string|null;
  //   Alarm:boolean;
  //   Follower:number;
  //   Following:number;
  //   Intro:string;
  // }|null;
  // 모달 오픈 (로그인 , 마이페이지, 음악 상세정보)
  isModalOpen: string | null;
  // 상세 정보
  isUserDetail: string | null;
}
