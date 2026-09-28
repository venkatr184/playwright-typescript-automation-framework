import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { PracticePage } from '../../pages/practice.page';
import { InputFieldsPage } from '../../pages/input-fields.page';
import { movieTestData } from '../../test-data/input-fields.data';

test.describe('Input Fields', () => {
  let homePage: HomePage;
  let practicePage: PracticePage;
  let inputFieldsPage: InputFieldsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    practicePage = new PracticePage(page);
    inputFieldsPage = new InputFieldsPage(page);

    await test.step('Navigate to the Input Fields page', async () => {
      await homePage.navigate();
      await homePage.startPracticing();
      await practicePage.openInputFields();
    });

    await expect(page).toHaveTitle(/Input Field Automation Practice/i);
  });

  for (const data of movieTestData) {
    test(`should accept a ${data.description}`, async () => {
      await test.step(`Enter movie name: ${data.movieName}`, async () => {
        await inputFieldsPage.submitMovie(data.movieName);
      });

      await test.step('Verify the submitted movie name', async () => {
        await expect(inputFieldsPage.resultMessage).toContainText(
          `You entered: ${data.movieName}`,
        );
      });
    });
  }
});