import { auth } from '@clerk/nextjs/server';

const allowedId = ['user_318Z77j0Oc6x3kLwgT9MI5KMoUR'];

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  return allowedId.indexOf(userId) !== -1;
};
