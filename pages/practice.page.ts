import { type Locator, type Page } from '@playwright/test';

export class PracticePage {
  readonly page: Page;
  readonly inputFieldsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputFieldsHeading = page.getByRole('heading', {name: 'Input Fields'});
  }

  async openInputFields(): Promise<void> {
    await this.inputFieldsHeading.click();
  }
}