import { test, expect } from '../../fixtures/page.fixture';
import type { CreatePostRequest, Post } from '../../api/models/post.model';

function isPost(value: unknown): value is Post {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.userId === 'number' &&
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string' &&
    typeof candidate.body === 'string'
  );
}

test.describe('Posts API', () => {
  test(
    'should retrieve an existing post',
    {
      tag: ['@smoke', '@api'],
    },
    async ({ postsClient }) => {
      const result = await postsClient.getPost(1);

      expect(result.status).toBe(200);
      expect(isPost(result.body)).toBe(true);

      if (!isPost(result.body)) {
        throw new Error('The API response does not match the Post contract.');
      }

      expect(result.body.id).toBe(1);
      expect(result.body.userId).toBe(1);
      expect(result.body.title).not.toBe('');
      expect(result.body.body).not.toBe('');
    },
  );

  test(
    'should create a post',
    {
      tag: ['@regression', '@api'],
    },
    async ({ postsClient }) => {
      const newPost: CreatePostRequest = {
        userId: 1,
        title: 'Playwright API automation',
        body: 'Created from the portfolio automation framework',
      };

      const result = await postsClient.createPost(newPost);

      expect(result.status).toBe(201);
      expect(isPost(result.body)).toBe(true);

      if (!isPost(result.body)) {
        throw new Error('The API response does not match the Post contract.');
      }

      expect(result.body.userId).toBe(newPost.userId);
      expect(result.body.title).toBe(newPost.title);
      expect(result.body.body).toBe(newPost.body);
      expect(result.body.id).toBeGreaterThan(0);
    },
  );
});
