import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

import { clearPosts, createPost, createUser } from './factories';

describe('PostResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    // clear db
    await clearPosts();
  });

  describe('Mutation #removePost', () => {
    const mutation = `
      mutation removePost($id: ID!) {
        removePost(id: $id) {
          id
        }
      }
    `;

    it('deletes the post if id exists in the database', async () => {
      const post = await createPost();

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          variables: {
            id: post.id,
          },
        });

      expect(body).toEqual({
        data: {
          removePost: {
            id: post.id,
          },
        },
      });
    });

    it("throws an error if id doesn't exist", async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          variables: {
            id: 'i-do-not-exist',
          },
        });

      const error = body.errors[0];
      expect(body.errors.length).toEqual(1);
      expect(error.message).toEqual('No Post found');
    });
  });

  describe('Mutation #createPost', () => {
    const mutation = `
      mutation createPost($createPostInput: CreatePostInput!) {
        createPost(createPostInput: $createPostInput) {
          id
          title
          published
        }
      }
    `;

    it('creates the post if author id exists in the database', async () => {
      const user = await createUser();

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          variables: {
            createPostInput: {
              authorId: user.id,
              published: true,
              title: 'test',
            },
          },
        });

      expect(body).toEqual({
        data: {
          createPost: {
            id: expect.any(String),
            published: true,
            title: 'test',
          },
        },
      });
    });

    it("throws an error if author id doesn't exist", async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          variables: {
            createPostInput: {
              authorId: 'i-do-not-exist',
              title: 'test',
              published: true,
            },
          },
        });

      const error = body.errors[0];

      expect(body.errors.length).toEqual(1);
      expect(error.message).toEqual('No User found');
    });
  });
});
