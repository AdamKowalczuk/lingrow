import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/:locale/courses(.*)',
  '/:locale/learn(.*)',
  '/:locale/quests(.*)',
  '/:locale/shop(.*)',
  '/:locale/leaderboard(.*)',

  '/:locale/lesson(.*)',

  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      const url = req.nextUrl.clone();
      url.pathname = '/pl';
      return NextResponse.redirect(url);
    }
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: ['/', '/(pl|en|jp)/:path*'],
};
