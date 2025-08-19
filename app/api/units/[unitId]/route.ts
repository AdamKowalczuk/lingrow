import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import db from '@/db/drizzle';
import { units } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ unitId: string }> },
) => {
  const { unitId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, parseInt(unitId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ unitId: string }> },
) => {
  const { unitId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(units)
    .set({ ...body })
    .where(eq(units.id, parseInt(unitId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ unitId: string }> },
) => {
  const { unitId } = await params;
  if (!isAdmin()) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(units)
    .where(eq(units.id, parseInt(unitId)))
    .returning();

  return NextResponse.json(data[0]);
};
