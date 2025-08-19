import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import db from '@/db/drizzle';
import { challenges } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) => {
  const { challengeId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db.query.units.findFirst({
    where: eq(challenges.id, parseInt(challengeId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) => {
  const { challengeId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({ ...body })
    .where(eq(challenges.id, parseInt(challengeId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) => {
  const { challengeId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, parseInt(challengeId)))
    .returning();

  return NextResponse.json(data[0]);
};
