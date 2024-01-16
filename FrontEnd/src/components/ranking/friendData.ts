import friendRank from './friendRank';

interface UserData {
  userId: string;
  username: string;
  percentage: number;
  isFriend: boolean;
}

const friendData: UserData[] = [
  {
    userId: 'a',
    username: '地Zone',
    percentage: 99.1557,
    isFriend: false,
  },
  {
    userId: 'b',
    username: 'castleMin',
    percentage: 81.11112,
    isFriend: false,
  },
  {
    userId: 'c',
    username: 'dodohyung',
    percentage: 78.92152,
    isFriend: false,
  },
  {
    userId: 'd',
    username: 'bill.sanders',
    percentage: 72.11452,
    isFriend: false,
  },
  {
    userId: 'e',
    username: 'SSAFY99thTrainee',
    percentage: 70.56784,
    isFriend: false,
  },
  {
    userId: 'f',
    username: 'debbie.baker',
    percentage: 64.45672,
    isFriend: false,
  },
  {
    userId: 'g',
    username: 'tienlapspktnd',
    percentage: 56.45645,
    isFriend: false,
  },
  {
    userId: 'h',
    username: 'alma.lawson',
    percentage: 51.45645,
    isFriend: false,
  },
  {
    userId: 'i',
    username: 'abc1234',
    percentage: 50.45642,
    isFriend: false,
  },
  {userId: 'j', username: 'def5678', percentage: 49.21652, isFriend: false},
  {userId: 'k', username: 'hmm', percentage: 48.45645, isFriend: false},
  {userId: 'l', username: 'sh..', percentage: 45.45642, isFriend: false},
  {userId: 'm', username: 'sigmund', percentage: 43.21652, isFriend: false},
];

export default friendData;
