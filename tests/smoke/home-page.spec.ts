import { test, expect } from '../../fixtures/page.fixture';

test.describe('QA Playground home page', () => {
  test('should display the practice application', async ({
    page,
    homePage,
  }) => {
    await test.step('Navigate to QA Playground', async () => {
      await homePage.navigate();
    });

    await test.step('Verify the page title', async () => {
      await expect(page).toHaveTitle(/QA Playground/i);
    });

    await test.step('Verify the practice link is visible', async () => {
      await expect(homePage.startPracticingLink).toBeVisible();
    });
  });
});
