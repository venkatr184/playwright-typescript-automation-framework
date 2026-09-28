import { type Locator, type Page } from '@playwright/test';

export class InputFieldsPage {
  readonly page: Page;
  readonly movieNameInput: Locator;
  readonly submitButton: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.movieNameInput = page.getByTestId('input-movie-name');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.resultMessage = page.getByTestId('result-s01');
  }

  async enterMovieName(movieName: string): Promise<void> {
    await this.movieNameInput.fill(movieName);
  }

  async submitMovieName(): Promise<void> {
    await this.submitButton.click();
  }

  async submitMovie(movieName: string): Promise<void> {
    await this.enterMovieName(movieName);
    await this.submitMovieName();
  }
}
