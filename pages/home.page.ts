import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly startPracticingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startPracticingLink = page.getByRole('link', {
      name: /Start Practicing →/,
    });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async startPracticing(): Promise<void> {
    await this.startPracticingLink.click();
  }
}
