import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import db from '@/db/drizzle';
import { courses } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) => {
  const { courseId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, parseInt(courseId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) => {
  const { courseId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({ ...body })
    .where(eq(courses.id, parseInt(courseId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) => {
  const { courseId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, parseInt(courseId)))
    .returning();

  return NextResponse.json(data[0]);
};
