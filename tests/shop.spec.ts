import { test } from '@playwright/test';

import { navigateToProtectedRoute } from './helpers/auth-helper';

test.describe('Shop Page Tests', () => {
  test('should access /pl/shop when authenticated', async ({ page }) => {
    await navigateToProtectedRoute(page, 'shop');
  });
});
