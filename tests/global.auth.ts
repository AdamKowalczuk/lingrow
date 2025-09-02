import { expect, test as setup } from '@playwright/test';
import { chromium as chromiumExtra } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

chromiumExtra.use(stealth() as any);

const authFile = './tests/state.json';

setup('Setup Auth', async ({ page }) => {
  await page.setExtraHTTPHeaders({
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  await page.goto('http://localhost:3000/pl');

  await page.waitForLoadState('networkidle');

  const logo = await page.locator('img[alt="Hero"]');
  await expect(logo).toBeVisible();

  const userEmail = process.env.PLAYWRIGHT_E2E_USER_EMAIL || '';
  const userPassword = process.env.PLAYWRIGHT_E2E_USER_PASSWORD || '';

  if (!userEmail || !userPassword) {
    console.log('⚠️  No test credentials provided, skipping authentication');
    console.log(
      '💡 Please create .env.test file with PLAYWRIGHT_E2E_USER_EMAIL and PLAYWRIGHT_E2E_USER_PASSWORD',
    );
    return;
  }

  try {
    await page.locator('[data-testid="sign-in-button"]').click();

    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'clerk-modal-debug.png' });

    let googleButton = null;
    const possibleSelectors = [
      '[data-clerk-provider="google_oauth2"]',
      '[data-provider="google_oauth2"]',
      'button[aria-label*="Google"]',
      'button:has-text("Google")',
      '[data-testid="google-oauth"]',
      'button:has-text("Continue with Google")',
      'button:has-text("Sign in with Google")',
    ];

    for (const selector of possibleSelectors) {
      try {
        const element = page.locator(selector);
        if (await element.isVisible({ timeout: 1000 })) {
          googleButton = element;

          break;
        }
      } catch (error) {
        console.log(`❌ Selector ${selector} not found`);
      }
    }

    if (!googleButton) {
      throw new Error('Google OAuth button not found');
    }

    await googleButton.click();

    await page.waitForURL('**/accounts.google.com/**');

    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'google-form-debug.png' });

    await page.waitForSelector('input[type="email"]', { timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.fill('input[type="email"]', userEmail);

    await page.waitForTimeout(1500);
    await page.locator('#identifierNext >> button').click();

    try {
      await page.waitForLoadState('networkidle');

      const currentUrl = await page.url();

      if (currentUrl.includes('localhost:3000')) {
      } else if (currentUrl.includes('accounts.google.com')) {
        try {
          await page.waitForSelector('input[type="password"]', {
            timeout: 5000,
          });

          await page.waitForTimeout(1000);
          await page.fill('input[type="password"]', userPassword);

          await page.waitForTimeout(1500);
          await page.locator('button >> nth=1').click();
        } catch (passwordError) {
          const pageTitle = await page.title();

          if (
            pageTitle.includes('Security') ||
            currentUrl.includes('challenge')
          ) {
            await page.screenshot({ path: 'google-security-page.png' });
            throw new Error(
              'Google security page detected - may need manual intervention',
            );
          }

          try {
            const nextButton = page.locator(
              'button:has-text("Next"), button:has-text("Continue"), button[type="submit"]',
            );
            await nextButton.waitFor({ state: 'visible', timeout: 3000 });
            await nextButton.click();
          } catch (buttonError) {
            console.log(
              '🔍 No next button found - may already be authenticated',
            );
          }
        }
      }
    } catch (error) {
      console.log(
        '🔍 Error during password/redirect check:',
        (error as Error).message,
      );
    }

    await page.waitForURL('**/localhost:3000/**', { timeout: 30000 });

    await page.waitForFunction(
      () => {
        return (window as any).Clerk && (window as any).Clerk.session;
      },
      { timeout: 15000 },
    );

    const pageContext = await page.context();
    let cookies = await pageContext.cookies();

    while (!cookies.some(c => c.name === '__session')) {
      await page.waitForTimeout(100);
      cookies = await pageContext.cookies();
    }

    await pageContext.storageState({ path: authFile });
  } catch (error) {
    console.error('❌ Authentication failed:', error);

    throw error;
  }
});
