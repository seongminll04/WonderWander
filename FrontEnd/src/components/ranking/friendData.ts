import friendRank from './friendRank';

interface UserData {
  userId: string;
  username: string;
  percentage: number;
}

const friendData: UserData[] = [
  {
    userId: 'a',
    username: '地Zone',
    percentage: 99.1557,
  },
  {
    userId: 'b',
    username: 'castleMin',
    percentage: 81.11112,
  },
  {
    userId: 'c',
    username: 'dodohyung',
    percentage: 78.92152,
  },
  {
    userId: 'd',
    username: 'bill.sanders',
    percentage: 72.11452,
  },
  {
    userId: 'e',
    username: 'SSAFY99thTrainee',
    percentage: 70.56784,
  },
  {
    userId: 'f',
    username: 'debbie.baker',
    percentage: 64.45672,
  },
  {
    userId: 'g',
    username: 'tienlapspktnd',
    percentage: 56.45645,
  },
  {
    userId: 'h',
    username: 'alma.lawson',
    percentage: 51.45645,
  },
  {
    userId: 'i',
    username: 'abc1234',
    percentage: 50.45642,
  },
  {userId: 'j', username: 'def5678', percentage: 49.21652},
  {userId: 'k', username: 'hmm', percentage: 48.45645},
  {userId: 'l', username: 'sh..', percentage: 45.45642},
  {userId: 'm', username: 'sigmund', percentage: 43.21652},
];

export default friendData;
