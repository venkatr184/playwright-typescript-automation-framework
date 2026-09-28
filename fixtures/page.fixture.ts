import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PracticePage } from '../pages/practice.page';
import { InputFieldsPage } from '../pages/input-fields.page';

interface PageFixtures {
  homePage: HomePage;
  practicePage: PracticePage;
  inputFieldsPage: InputFieldsPage;
}

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  practicePage: async ({ page }, use) => {
    await use(new PracticePage(page));
  },

  inputFieldsPage: async ({ page }, use) => {
    await use(new InputFieldsPage(page));
  },
});

export { expect };
