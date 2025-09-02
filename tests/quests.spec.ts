import { test } from '@playwright/test';

import { navigateToProtectedRoute } from './helpers/auth-helper';

test.describe('Quests Page Tests', () => {
  test('should access /pl/quests when authenticated', async ({ page }) => {
    await navigateToProtectedRoute(page, 'quests');
  });
});
