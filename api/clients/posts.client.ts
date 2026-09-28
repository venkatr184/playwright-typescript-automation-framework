import type { APIRequestContext } from '@playwright/test';
import type {
  ApiResult,
  CreatePostRequest,
} from '../models/post.model';

export class PostsClient {
  constructor(private readonly apiContext: APIRequestContext) {}

  async getPost(postId: number): Promise<ApiResult> {
    const response = await this.apiContext.get(`/posts/${postId}`);
    const body: unknown = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  async createPost(post: CreatePostRequest): Promise<ApiResult> {
    const response = await this.apiContext.post('/posts', {
      data: post,
    });

    const body: unknown = await response.json();

    return {
      status: response.status(),
      body,
    };
  }
}