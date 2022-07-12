import { bool, object, string } from 'yup';

export const createUserSchema = object({
  email: string().email().required(),
  name: string().required(),
});

export const updateUserSchema = object({
  email: string().email(),
  name: string(),
});

export const createPostSchema = object({
  published: bool().required(),
  authorId: string().required(),
  title: string().required(),
});

export const updatePostSchema = object({
  id: string().required(),
  published: bool(),
  title: string(),
});
