import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPost = () => {
  return prisma.post.create({
    data: {
      title: faker.lorem.sentence(),
      author: {
        create: {
          name: faker.name.findName(),
          email: faker.internet.email(),
        },
      },
    },
    include: {
      author: true,
    },
  });
};

export const clearPosts = async () => {
  return prisma.$transaction([prisma.post.deleteMany({}), clearUsers()]);
};

export const createUser = () => {
  return prisma.user.create({
    data: {
      name: faker.name.findName(),
      email: faker.internet.email(),
    },
  });
};

export const clearUsers = () => {
  return prisma.user.deleteMany({});
};
