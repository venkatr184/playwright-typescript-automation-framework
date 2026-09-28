import { test as base, expect, type APIRequestContext } from '@playwright/test';
import { PostsClient } from '../api/clients/posts.client';
import { environment } from '../config/environment';
import { HomePage } from '../pages/home.page';
import { InputFieldsPage } from '../pages/input-fields.page';
import { PracticePage } from '../pages/practice.page';

interface PageFixtures {
  homePage: HomePage;
  practicePage: PracticePage;
  inputFieldsPage: InputFieldsPage;
  apiContext: APIRequestContext;
  postsClient: PostsClient;
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

  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: environment.apiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    await use(apiContext);
    await apiContext.dispose();
  },

  postsClient: async ({ apiContext }, use) => {
    await use(new PostsClient(apiContext));
  },
});

export { expect };
