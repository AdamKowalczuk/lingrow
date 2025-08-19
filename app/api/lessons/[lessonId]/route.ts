import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import db from '@/db/drizzle';
import { lessons } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) => {
  const { lessonId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, parseInt(lessonId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) => {
  const { lessonId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(lessons)
    .set({ ...body })
    .where(eq(lessons.id, parseInt(lessonId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) => {
  const { lessonId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, parseInt(lessonId)))
    .returning();

  return NextResponse.json(data[0]);
};
