export const POINTS_TO_REFILL = 10;

export const quests = [
  {
    title: 'Earn 20 XP',
    value: 20,
    reward: {
      type: 'hearts' as const,
      amount: 1,
    },
  },
  {
    title: 'Earn 50 XP',
    value: 50,
    reward: {
      type: 'hearts' as const,
      amount: 2,
    },
  },
  {
    title: 'Earn 100 XP',
    value: 100,
    reward: {
      type: 'hearts' as const,
      amount: 3,
    },
  },
  {
    title: 'Earn 200 XP',
    value: 200,
    reward: {
      type: 'hearts' as const,
      amount: 5,
    },
  },
];

export type Quest = (typeof quests)[0];
