import { test, expect } from '@playwright/test';

test.describe('QA Playground home page', () => {
  test('should display the practice application', async ({ page }) => {
    await test.step('Navigate to QA Playground', async () => {
      await page.goto('/');
    });

    await test.step('Verify the page title', async () => {
      await expect(page).toHaveTitle(/QA Playground/i);
    });

    await test.step('Verify the practice link is visible', async () => {
      const startPracticingLink = await page.getByRole('link', { name: 'Start Practicing →' })
      await expect(startPracticingLink).toBeVisible();
    });
  });
});