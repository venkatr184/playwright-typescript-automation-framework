import { test, expect } from '../../fixtures/page.fixture';
import { movieTestData } from '../../test-data/input-fields.data';

test.describe(
  'Input Fields',
  {
    tag: ['@regression', '@ui'],
  },
  () => {
    test.beforeEach(async ({ page, homePage, practicePage }) => {
      await test.step('Navigate to the Input Fields page', async () => {
        await homePage.navigate();
        await homePage.startPracticing();
        await practicePage.openInputFields();
      });

      await expect(page).toHaveTitle(/Input Field Automation Practice/i);
    });

    for (const data of movieTestData) {
      test(`should accept a ${data.description}`, async ({
        inputFieldsPage,
      }) => {
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
  },
);
