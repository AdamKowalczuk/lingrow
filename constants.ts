export const POINTS_TO_REFILL = 10;

export const quests = [
  {
    title: 'earn20Xp',
    value: 20,
    reward: {
      type: 'hearts' as const,
      amount: 1,
    },
  },
  {
    title: 'earn50Xp',
    value: 50,
    reward: {
      type: 'hearts' as const,
      amount: 2,
    },
  },
  {
    title: 'earn100Xp',
    value: 100,
    reward: {
      type: 'hearts' as const,
      amount: 3,
    },
  },
  {
    title: 'earn200Xp',
    value: 200,
    reward: {
      type: 'hearts' as const,
      amount: 5,
    },
  },
];

export type Quest = (typeof quests)[0];
