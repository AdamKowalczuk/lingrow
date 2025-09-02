import { test } from '@playwright/test';

import { navigateToProtectedRoute } from './helpers/auth-helper';

test.describe('Leaderboard Page Tests', () => {
  test('should access /pl/leaderboard when authenticated', async ({ page }) => {
    await navigateToProtectedRoute(page, 'leaderboard');
  });
});
