import { test } from '@playwright/test';

import { navigateToProtectedRoute } from './helpers/auth-helper';

test.describe('Learn Page Tests', () => {
  test('should access /pl/learn when authenticated', async ({ page }) => {
    await navigateToProtectedRoute(page, 'learn');
  });
});
