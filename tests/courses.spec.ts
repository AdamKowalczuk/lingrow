import { test } from '@playwright/test';

import { navigateToProtectedRoute } from './helpers/auth-helper';

test.describe('Courses Page Tests', () => {
  test('should access /pl/courses when authenticated', async ({ page }) => {
    await navigateToProtectedRoute(page, 'courses');
  });
});
