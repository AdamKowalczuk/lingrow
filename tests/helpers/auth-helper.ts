import { Page, expect } from '@playwright/test';

export async function navigateToProtectedRoute(page: Page, route: string) {
  await page.goto(`http://localhost:3000/pl/${route}`);

  await expect(page).toHaveURL(`http://localhost:3000/pl/${route}`);
}
